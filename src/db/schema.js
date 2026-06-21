import { pgTable, date, timestamp, varchar, boolean, text, integer, numeric } from "drizzle-orm/pg-core";

export const classes = pgTable("classes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  className: varchar("class_name", { length: 30 }).notNull(),
  quantity: integer("quantity").notNull().default(0),
  teacherId: integer("teacher_id").notNull().unique(),
  status: varchar("status").notNull().default("Hoạt động"),
});

export const teachers = pgTable("teachers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  fullName: varchar("full_name", { length: 30 }).notNull(),
  gender: varchar("gender").notNull().default("Nam"),
  dateOfBirth: date("date_of_birth").notNull().default("01/01/2000"),
  role: varchar("role", { length: 30 }).notNull().default("Giáo viên"),
  gross: numeric("gross").notNull().default(0),
  status: varchar("status").notNull().default("Đang làm"),
});

export const childrens = pgTable("childrens", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  fullName: varchar("full_name", { length: 30 }).notNull(),
  dateOfBirth: date("date_of_birth").notNull().default("01/01/2026"),
  classId: integer("class_id").notNull(),
  fee: numeric("fee").notNull().default(0),
  guardianName: varchar("guardian_name", { length: 30 }).notNull(),
  guardianship: varchar("guardianship", { length: 10 }).notNull().default("Mẹ"),
  bankName: varchar("bank_name", { length: 50 }).notNull().default("Chưa có"),
  bankNumber: varchar("bank_number", { length: 20 }).notNull().default("Chưa có"),
  phoneNumber: varchar("phone_number", { length: 10 }).notNull().default("Chưa có"),
  status: varchar("status").notNull().default("Đang học"),
});

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  fullName: varchar("full_name").notNull(),
  userName: varchar("user_name").notNull().unique(),
  password: text("password").notNull(),
  email: varchar("email", { length: 20 }).notNull().unique(),
  status: varchar("status").notNull().default("Hoạt động"),
});

export const attendances = pgTable("attendances", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  time: timestamp("time").notNull().defaultNow(),
  teacherId: integer("teacher_id").notNull(),
  classId: integer("class_id").notNull(),
  childrenId: integer("children_id").notNull(),
  permission: boolean("permission").notNull().default(true),
});

export const logs = pgTable("logs", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  action: varchar("action", { length: 200 }).notNull(),
  userId: integer("user_id").notNull(),
  timeAction: timestamp("time_action").notNull().defaultNow(),
});
