CREATE TABLE "attendances" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attendances_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"time" timestamp DEFAULT now() NOT NULL,
	"teacher_id" integer NOT NULL,
	"class_id" integer NOT NULL,
	"children_id" integer NOT NULL,
	"permission" smallint DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "childrens" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "childrens_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"full_name" varchar(30) NOT NULL,
	"gender" varchar DEFAULT 'Nam' NOT NULL,
	"date_of_birth" date,
	"class_id" integer NOT NULL,
	"fee" numeric(10, 0) DEFAULT 1690000 NOT NULL,
	"parent_name" varchar(30) NOT NULL,
	"guardianship" varchar(10) DEFAULT 'Mẹ' NOT NULL,
	"bank_name" varchar(50) DEFAULT 'Banking' NOT NULL,
	"bank_number" varchar(20) DEFAULT '000-000-000-000' NOT NULL,
	"phone_number" varchar(12) DEFAULT '0000-000-000' NOT NULL,
	"status" varchar DEFAULT 'Đang học' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "classes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "classes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"class_name" varchar(30) NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"approximate_age" varchar(30),
	"status" varchar DEFAULT 'Hoạt động' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cook_table_details" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cook_table_details_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"cook_table_id" integer NOT NULL,
	"dayweek" varchar(10) NOT NULL,
	"breakfast" varchar(30) NOT NULL,
	"lunch" varchar(30) NOT NULL,
	"afternoon" varchar(30) NOT NULL,
	"dessert" varchar(30) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cook_tables" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cook_tables_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"start_date" date DEFAULT now() NOT NULL,
	"end_date" date DEFAULT CURRENT_DATE + INTERVAL '5 days' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "enrollments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "enrollments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"parent_name" varchar(50) NOT NULL,
	"phone_number" varchar(12) NOT NULL,
	"email" varchar(30),
	"desired_class" varchar(30),
	"note" varchar(255),
	"status" varchar(20) DEFAULT 'Chờ duyệt' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fees" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "fees_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"paid_date" date DEFAULT now() NOT NULL,
	"children_id" integer NOT NULL,
	"total" numeric(10, 0) DEFAULT 1690000 NOT NULL,
	"status" varchar DEFAULT 'Chưa thu' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "health_records" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "health_records_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"children_id" integer NOT NULL,
	"teacher_id" integer NOT NULL,
	"weight" numeric(5, 2) NOT NULL,
	"height" numeric(5, 2) NOT NULL,
	"note" varchar(100) DEFAULT 'Bình thường' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "logs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "logs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"action" varchar(255) NOT NULL,
	"user_id" integer NOT NULL,
	"time_action" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "semesters" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "semesters_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"semester_name" varchar(30) NOT NULL,
	"school_year" varchar(20) NOT NULL,
	"start_date" date DEFAULT now() NOT NULL,
	"end_date" date,
	"status" varchar DEFAULT 'Đang diễn ra' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"full_name" varchar(30),
	"gender" varchar DEFAULT 'Nam' NOT NULL,
	"date_of_birth" date,
	"login_name" varchar NOT NULL,
	"password" text NOT NULL,
	"phone_number" varchar(12) DEFAULT '0000-000-000' NOT NULL,
	"email" varchar(30) NOT NULL,
	"gross" numeric(10, 0) DEFAULT 0 NOT NULL,
	"role" varchar(15) DEFAULT 'Giáo viên' NOT NULL,
	"class_id" integer DEFAULT 0 NOT NULL,
	"hire_date" date DEFAULT now() NOT NULL,
	"status" varchar DEFAULT 'Hoạt động' NOT NULL,
	CONSTRAINT "users_login_name_unique" UNIQUE("login_name"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
