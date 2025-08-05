CREATE TABLE "customer_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"custname" varchar(255) NOT NULL,
	"custtel" varchar(50) NOT NULL,
	"custemail" varchar(255) NOT NULL,
	"size" varchar(20) NOT NULL,
	"delivery" varchar(20) NOT NULL,
	"comments" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
