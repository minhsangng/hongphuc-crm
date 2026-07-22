import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { childrens, classes, teachers, users } from "./db/schema.js";
import { eq, and } from "drizzle-orm";
import session from "express-session";

const app = express();
const PORT = ENV.PORT || 5001;

app.use(express.json());

/* SESSION */
app.use(session({
  secret: ENV.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 15 } // Clear after 15 mins
}));

/* HEALTHZ */
app.get("/api/healthz", (req, res) => {
  res.json({ status: 200, success: true });
});

/* CHILDRENS */
app.get("/api/get-all-childrens", async (req, res) => {
  const results = await db.select().from(childrens);
  if (results.length > 0) res.json(results);
  else res.json({ status: 404, message: "Empty list" });
});

app.get("/api/get-children-by-id/:id", async (req, res) => {
  const { id } = req.params;
  const results = await db.select().from(childrens).where(eq(childrens.id, parseInt(id)));
  if (results.length > 0) res.json(results);
  else res.json({ status: 404, message: `Not found children with ID: ${id}` });
});

app.get("/api/get-children-by-class/:id", async (req, res) => {
  const { id } = req.params;
  const results = await db.select({...childrens, className: classes.className, teacherId: classes.teacherId}).from(childrens).innerJoin(classes, eq(classes.id, childrens.id)).where(eq(childrens.classId, parseInt(id)));
  if (results.length > 0) res.json(results);
  else res.json({ status: 404, message: `Not found children in class ID: ${id}` });
});

/* CLASSES */
app.get("/api/get-all-classes", async (req, res) => {
  const results = await db.select({...classes, teacherName: users.fullName}).from(classes).leftJoin(teachers, eq(teachers.id, classes.teacherId)).leftJoin(users, eq(users.id, teachers.userId));
  if (results.length > 0) res.json(results);
  else res.json({ status: 404, message: "Empty list" });
});

app.get("/api/get-class-by-teacher/:id", async (req, res) => {
  const { id } = req.params;
  const results = await db.select({...classes, teacherName: users.fullName}).from(classes).innerJoin(teachers, eq(teachers.id, classes.teacherId)).innerJoin(users, eq(users.id, teachers.userId)).where(eq(classes.teacherId, parseInt(id)));
  if (results.length > 0) res.json(results);
  else res.json({ status: 404, message: `Not found class of teacher with ID: ${id}` });
});

/* TEACHERS */
app.get("/api/get-all-teachers", async (req, res) => {
  const results = await db.select({...classes, teacherName: users.fullName}).from(classes).innerJoin(users, eq(users.id, teachers.userId));
  if (results.length > 0) res.json(results);
  else res.json({ status: 404, message: "Empty list" });
});

/* AUTH */
app.post("/api/login-acount", async (req, res) => {
  const { userName, password } = req.body;
  const result = await db.select({ id: users.id, role: users.role }).from(users).where(and(eq(users.userName, userName.trim()), eq(users.password, password))).limit(1);
  if (result.length === 1) {
    const id = parseInt(result[0].id);
    const role = result[0].role.trim();
    req.session.user = { userName: userName, userId: id, role: role };
    res.json({ status: 200, navigate: ["Giáo viên", "Quản lý"].includes(role) ? "/admin" : "/" });
  } else res.json({ status: 401, message: "Login failed" });
});

app.get("/api/check-auth", (req, res) => {
  if (!req.session.user) {
    return res.json({ status: 401, authenticated: false });
  }
  res.json({ status: 200, authenticated: true, user: req.session.user });
});

/* MESSAGE RUNNING */
app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});