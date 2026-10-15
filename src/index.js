import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import Mailer from "./mailer.js";
import { childrens, classes, users, healthRecords, cookTables, cookTableDetails } from "./db/schema.js";
import { eq, and, sql } from "drizzle-orm";
import session from "express-session";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = ENV.PORT || 5001;
const DUMMY_HASH = bcrypt.hashSync("dummy-password", 10);
const loginLimiter = rateLimit({
  windowMs: 60_000,          // khung thời gian: 60 giây
  max: 5,                    // tối đa 5 request / IP / khung
  standardHeaders: true,     // trả header RateLimit-* cho client biết còn bao nhiêu lượt
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { status: 429, message: "Thử đăng nhập quá nhiều lần, vui lòng đợi 1 phút." },
});

app.set("trust proxy", 1);
app.use(express.json());

/* SESSION */
app.use(session({
  name: "sid",
  secret: ENV.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 15, // 15 mins
    secure: ENV.NODE_ENV === "production",
    sameSite: "lax",
  }
}));

/* HEALTHZ */
app.get("/api/v1/healthz", (req, res) => {
  res.json({ status: 200, success: true });
});

/* CHILDRENS */
app.get("/api/v1/get-all-childrens", async (req, res) => {
  const results = await db.select({ ...childrens, className: classes.className, weight: healthRecords.weight, height: healthRecords.height, bmi: sql`ROUND((${healthRecords.weight} / (${healthRecords.height} / 100.0 * ${healthRecords.height} / 100.0))::numeric, 2)`, statusHealth: healthRecords.note }).from(childrens).innerJoin(classes, eq(childrens.classId, classes.id)).leftJoin(healthRecords, eq(childrens.id, healthRecords.childrenId));
  if (results.length > 0) res.json({ status: 200, items: results });
  else res.json({ status: 404, message: "Empty list" });
});

app.get("/api/v1/get-children-by-id/:id", async (req, res) => {
  const { id } = req.params;
  const results = await db.select().from(childrens).where(eq(childrens.classId, parseInt(id)));
  if (results.length > 0) res.json(results);
  else res.json({ status: 404, message: `Not found children with ID: ${id}` });
});

app.get("/api/v1/get-children-by-class/:id", async (req, res) => {
  const { id } = req.params;
  const results = await db.select({ ...childrens, className: classes.className, weight: healthRecords.weight, height: healthRecords.height, bmi: sql`ROUND((${healthRecords.weight} / (${healthRecords.height} / 100.0 * ${healthRecords.height} / 100.0))::numeric, 2)`, statusHealth: healthRecords.note }).from(childrens).innerJoin(classes, eq(childrens.classId, classes.id)).leftJoin(healthRecords, eq(childrens.id, healthRecords.childrenId)).where(eq(childrens.classId, parseInt(id)));
  if (results.length > 0) res.json({ status: 200, items: results});
  else res.json({ status: 404, message: `Not found children in class ID: ${id}` });
});

/* CLASSES */
app.get("/api/v1/get-all-classes", async (req, res) => {
  const results = await db.select({...classes, teacherName: users.fullName}).from(classes).leftJoin(users, eq(users.classId, classes.id));
  if (results.length > 0) res.json(results);
  else res.json({ status: 404, message: "Empty list" });
});

app.get("/api/v1/get-class-by-teacher/:id", async (req, res) => {
  const { id } = req.params;
  const results = await db.select({...classes, teacherName: users.fullName}).from(classes).innerJoin(users, eq(users.classId, classes.id)).where(eq(classes.id, parseInt(id)));
  if (results.length > 0) res.json(results);
  else res.json({ status: 404, message: `Not found class of teacher with ID: ${id}` });
});

/* TEACHERS */
app.get("/api/v1/get-all-teachers", async (req, res) => {
  const results = await db.select({...classes, ...users }).from(classes).innerJoin(users, eq(users.classId, classes.id));
  if (results.length > 0) res.json(results);
  else res.json({ status: 404, message: "Empty list" });
});

/* MENUS */
app.get("/api/v1/get-all-menus", async (req, res) => {
  try {
    const rows = await db
      .select({ id: cookTables.id, startDate: cookTables.startDate, endDate: cookTables.endDate, status: cookTables.status, detailId: cookTableDetails.id, dayweek: cookTableDetails.dayweek, breakfast: cookTableDetails.breakfast, lunch: cookTableDetails.lunch, afternoon: cookTableDetails.afternoon, dessert: cookTableDetails.dessert })
      .from(cookTables).leftJoin(cookTableDetails, eq(cookTables.id, cookTableDetails.cookTableId)).orderBy(cookTables.id, cookTableDetails.id);

    const map = new Map();
    for (const r of rows) {
      if (!map.has(r.id)) {
        map.set(r.id, {
          id: r.id, startDate: r.startDate, endDate: r.endDate, status: r.status, items: [],
        });
      }
      if (r.detailId !== null) {
        map.get(r.id).items.push({
          id: r.detailId, dayweek: r.dayweek, breakfast: r.breakfast, lunch: r.lunch, afternoon: r.afternoon, dessert: r.dessert,
        });
      }
    }

    res.status(200).json([...map.values()]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
});

/* AUTH */
app.post("/api/v1/auth-login", loginLimiter, async (req, res) => {
  try {
    const { userName, password } = req.body ?? {};
    if (typeof userName !== "string" || typeof password !== "string" || !/^[a-f0-9]{64}$/.test(password)) {
      return res.status(400).json({ status: 400, message: "Dữ liệu không hợp lệ" });
    }

    const [user] = await db
      .select({ id: users.id, fullName: users.fullName, role: users.role, classId: users.classId, password: users.password })
      .from(users).where(eq(users.loginName, userName)).limit(1);

    const hash = user?.password ?? DUMMY_HASH;
    const ok = await bcrypt.compare(password, hash);
    if (!user || !ok) {
      return res.status(401).json({ status: 401, message: "Sai tên đăng nhập hoặc mật khẩu" });
    }

    req.session.regenerate((err) => {
      if (err) return res.json({ status: 500, message: "Lỗi phiên đăng nhập" });

      req.session.user = { uid: Number(user.id), fullName: user.fullName, userName, role: user.role.trim(), classId: user.classId };
      req.session.save((err2) => {
        if (err2) return res.json({ status: 500, message: "Lỗi phiên đăng nhập" });
        res.json({ status: 200, message: "Login successful" });
      });
    });
  } catch (e) {
    console.error(e);
    res.json({ status: 500, message: "Lỗi máy chủ" });
  }
});

app.get("/api/v1/auth-checker", (req, res) => {
  if (!req.session.user) {
    return res.json({ status: 401, authenticated: false, user: null });
  }
  res.json({ status: 200, authenticated: true, user: req.session.user });
});

app.post("/api/v1/auth-logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: 500, message: "Logout failed" });
    }
    res.clearCookie("connect.sid", {
      path: "/",
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.json({ status: 200, message: "Logout successful" });
  });
});

/* EMAIL */
app.post("/api/v1/send-email", async (req, res) => {
  try {
    const { subject, html } = req.body ?? {};
    if (typeof subject !== "string" || typeof html !== "string") {
      return res.status(400).json({ status: 400, message: "Dữ liệu không hợp lệ" });
    }

    //await Mailer.sendEmail("nmsangtg26@gmail.com", subject, html);
    const data = await Mailer.getAllMail();
    console.log(data);
    res.json({ status: 200, message: "Gửi mail thành công" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: 500, message: "Gửi mail thất bại" });
  }
});

/* FUNCTION */
function getAgeInMonths(dob) {
  const birth = new Date(dob);
  const now = new Date();
  return (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
}

function classifyBMI(bmi, ageMonths, gender = "Nam") {
  if (!bmi || !ageMonths) return "Chưa xác định";

  // Ngưỡng tham khảo đơn giản hóa cho trẻ 24-72 tháng tuổi (2-6 tuổi)
  // Dựa theo xu hướng chung BMI-for-age percentile của WHO
  let thin = 14.0, normalMax = 16.5, overweight = 18.0;

  if (ageMonths < 36) { // 2-3 tuổi
    thin = 14.5; normalMax = 17.0; overweight = 18.5;
  } else if (ageMonths < 48) { // 3-4 tuổi
    thin = 14.0; normalMax = 16.5; overweight = 18.0;
  } else if (ageMonths < 60) { // 4-5 tuổi
    thin = 13.8; normalMax = 16.2; overweight = 17.8;
  } else { // 5-6 tuổi
    thin = 13.5; normalMax = 16.0; overweight = 17.5;
  }

  if (bmi < thin) return "Thiếu cân";
  if (bmi <= normalMax) return "Bình thường";
  if (bmi <= overweight) return "Thừa cân";
  return "Béo phì";
}

/* SERVE REACT BUILD */
const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

/* MESSAGE RUNNING */
app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});