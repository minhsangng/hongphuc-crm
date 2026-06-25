import { sql } from "drizzle-orm";
import { pgTable, date, timestamp, varchar, text, integer, smallint, numeric } from "drizzle-orm/pg-core";

export const classes = pgTable("classes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  className: varchar("class_name", { length: 30 }).notNull(),
  quantity: integer("quantity").notNull().default(0),
  teacherId: integer("teacher_id").notNull().unique(),
  status: varchar("status").notNull().default("Hoạt động"),
});

export const teachers = pgTable("teachers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  gender: varchar("gender").notNull().default("Nam"),
  dob: date("date_of_birth"),
  userId: integer("user_id").notNull(),
  title: varchar("title", { length: 30 }).notNull().default("Giáo viên"),
  gross: numeric("gross", { precision: 0 }).notNull().default(0),
  status: varchar("status").notNull().default("Đang làm"),
});

export const childrens = pgTable("childrens", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  fullName: varchar("full_name", { length: 30 }).notNull(),
  gender: varchar("gender").notNull().default("Nam"),
  dob: date("date_of_birth"),
  classId: integer("class_id").notNull(),
  fee: numeric("fee", { precision: 0 }).notNull().default(1690000),
  parentName: varchar("parent_name", { length: 30 }).notNull(),
  guardianship: varchar("guardianship", { length: 10 }).notNull().default("Mẹ"),
  bankName: varchar("bank_name", { length: 50 }).notNull().default("Banking"),
  bankNumber: varchar("bank_number", { length: 20 }).notNull().default("000-000-000-000"),
  phoneNumber: varchar("phone_number", { length: 12 }).notNull().default("0000-000-000"),
  status: varchar("status").notNull().default("Đang học"),
});

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  fullName: varchar("full_name", { length: 30 }),
  loginName: varchar("login_name").notNull().unique(),
  password: text("password").notNull(),
  phoneNumber: varchar("phone_number", { length: 12 }).notNull().default("0000-000-000"),
  email: varchar("email", { length: 20 }).notNull().unique(),
  role: varchar("role", { length: 10 }).notNull().default("Vãng lai"),
  status: varchar("status").notNull().default("Hoạt động"),
});

export const semesters = pgTable("semesters", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  semesterName: varchar("semester_name", { length: 30 }).notNull(),
  schoolYear: varchar("school_year", { length: 20 }).notNull(),
  startDate: date("start_date").notNull().defaultNow(),
  endDate: date("end_date"),
  status: varchar("status").notNull().default("Đang diễn ra"),
});

export const attendances = pgTable("attendances", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  time: timestamp("time").notNull().defaultNow(),
  teacherId: integer("teacher_id").notNull(),
  classId: integer("class_id").notNull(),
  childrenId: integer("children_id").notNull(),
  permission: smallint("permission").notNull().default(1),
});

export const cookTables = pgTable("cook_tables", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  startDate: date("start_date").notNull().defaultNow(),
  endDate: date("end_date").notNull().default(sql`CURRENT_DATE + INTERVAL '5 days'`),
});

export const cookTableDetails = pgTable("cook_table_details", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  cookTableId: integer("cook_table_id").notNull(),
  dayweek: varchar("dayweek", { length: 10 }).notNull(),
  breakfast: varchar("breakfast", { length: 30 }).notNull(),
  lunch: varchar("lunch", { length: 30 }).notNull(),
  afternoon: varchar("afternoon", { length: 30 }).notNull(),
  dessert: varchar("dessert", { length: 30 }).notNull(),
});

export const fees = pgTable("fees", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  paidDate: date("paid_date").notNull().defaultNow(),
  childrenId: integer("children_id").notNull(),
  total: numeric("total", { precision: 0 }).notNull().default(1690000),
  status: varchar("status").notNull().default("Chưa thu")
});

export const healthRecords = pgTable("health_records", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  childrenId: integer("children_id").notNull().references(() => childrens.id),
  teacherId: integer("teacher_id").notNull(),
  weight: numeric("weight", { precision: 5, scale: 2 }).notNull(),
  height: numeric("height", { precision: 5, scale: 2 }).notNull(),
  note: varchar("note", { length: 100 }).notNull().default("Bình thường"),
});

export const enrollments = pgTable("enrollments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  childName: varchar("child_name", { length: 50 }).notNull(),
  gender: varchar("gender", { length: 10 }).notNull(),
  dob: date("date_of_birth").notNull(),
  parentName: varchar("parent_name", { length: 50 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 12 }).notNull(),
  email: varchar("email", { length: 30 }),
  address: text("address"),
  desiredClass: varchar("desired_class", { length: 30 }),
  note: varchar("note", { length: 255 }),
  status: varchar("status", { length: 20 }).notNull().default("Chờ duyệt"),
});

export const logs = pgTable("logs", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  action: varchar("action", { length: 255 }).notNull(),
  userId: integer("user_id").notNull(),
  timeAction: timestamp("time_action").notNull().defaultNow(),
});
