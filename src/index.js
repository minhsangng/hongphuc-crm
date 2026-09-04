import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { childrens, classes, users, healthRecords } from "./db/schema.js";
import { eq, and, sql } from "drizzle-orm";
import session from "express-session";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = ENV.PORT || 5001;

app.set("trust proxy", 1);
app.use(express.json());

/* SESSION */
app.use(session({
  secret: ENV.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
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

/* AUTH */
app.post("/api/v1/auth-login", async (req, res) => {
  const { userName, password } = req.body;
  const result = await db.select({ id: users.id, fullName: users.fullName, role: users.role, classId: users.classId }).from(users).where(and(eq(users.loginName, userName), eq(users.password, password))).limit(1);
  if (result.length === 1) {
    const id = parseInt(result[0].id);
    const fullName = result[0].fullName;
    const role = result[0].role.trim();
    const classId = result[0].classId;
    req.session.user = { fullName: fullName, userName: userName, uid: id, role: role, classId: classId };
    res.json({ status: 200, message: "Login successfull" });
  } else res.json({ status: 401, message: "Login failed" });
});

app.get("/api/v1/auth-checker", (req, res) => {
  if (!req.session.user) {
    return res.json({ status: 401, authenticated: false });
  }
  res.json({ status: 200, authenticated: true, user: req.session.user });
});

app.post("/api/v1/auth-logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ status: 500, message: "Logout failed" });
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