CREATE TABLE "attendances" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attendances_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"time" timestamp DEFAULT now() NOT NULL,
	"teacher_id" integer NOT NULL,
	"class_id" integer NOT NULL,
	"children_id" integer NOT NULL,
	"permission" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "childrens" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "childrens_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"full_name" varchar(30) NOT NULL,
	"date_of_birth" date DEFAULT '01/01/2026' NOT NULL,
	"class_id" integer NOT NULL,
	"fee" numeric DEFAULT 0 NOT NULL,
	"guardian_name" varchar(30) NOT NULL,
	"guardianship" varchar(10) DEFAULT 'Mẹ' NOT NULL,
	"bank_name" varchar(50) DEFAULT 'Chưa có' NOT NULL,
	"bank_number" varchar(20) DEFAULT 'Chưa có' NOT NULL,
	"phone_number" varchar(10) DEFAULT 'Chưa có' NOT NULL,
	"status" varchar DEFAULT 'Đang học' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "classes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "classes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"class_name" varchar(30) NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"teacher_id" integer NOT NULL,
	"status" varchar DEFAULT 'Hoạt động' NOT NULL,
	CONSTRAINT "classes_teacher_id_unique" UNIQUE("teacher_id")
);
--> statement-breakpoint
CREATE TABLE "logs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "logs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"action" varchar(200) NOT NULL,
	"user_id" integer NOT NULL,
	"time_action" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teachers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "teachers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"full_name" varchar(30) NOT NULL,
	"gender" varchar DEFAULT 'Nam' NOT NULL,
	"date_of_birth" date DEFAULT '01/01/2000' NOT NULL,
	"role" varchar(30) DEFAULT 'Giáo viên' NOT NULL,
	"gross" numeric DEFAULT 0 NOT NULL,
	"status" varchar DEFAULT 'Đang làm' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"full_name" varchar NOT NULL,
	"user_name" varchar NOT NULL,
	"password" text NOT NULL,
	"email" varchar(20) NOT NULL,
	"status" varchar DEFAULT 'Hoạt động' NOT NULL,
	CONSTRAINT "users_user_name_unique" UNIQUE("user_name"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
