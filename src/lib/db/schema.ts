import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  date,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core"

export const colleges = pgTable("colleges", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  rating: text("rating").notNull(),
  type: text("type").notNull(),
  departments: text("departments").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  customId: text("custom_id").unique().notNull(),
  email: text("email").unique().notNull(),
  phone: text("phone"),
  passwordHash: text("password_hash").notNull(),
  passwordSalt: text("password_salt").notNull(),
  role: text("role").notNull(),
  isVerified: boolean("is_verified").default(false).notNull(),
  otp: text("otp"),
  otpExpiry: timestamp("otp_expiry"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const studentProfiles = pgTable("student_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  collegeId: uuid("college_id")
    .references(() => colleges.id)
    .notNull(),
  firstName: text("first_name").notNull(),
  middleName: text("middle_name"),
  lastName: text("last_name").notNull(),
  prnNumber: text("prn_number").unique().notNull(),
  caste: text("caste"),
  address: text("address"),
  year: integer("year"),
  course: text("course"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const teacherProfiles = pgTable("teacher_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  collegeId: uuid("college_id")
    .references(() => colleges.id)
    .notNull(),
  firstName: text("first_name").notNull(),
  middleName: text("middle_name"),
  lastName: text("last_name").notNull(),
  department: text("department").notNull(),
  subjects: jsonb("subjects"),
  salary: integer("salary"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const staffProfiles = pgTable("staff_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  collegeId: uuid("college_id")
    .references(() => colleges.id)
    .notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  roleTitle: text("role_title"),
  department: text("department"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const phoneNumbers = pgTable("phone_numbers", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  phoneNumber: text("phone_number").notNull(),
})

export const studentFees = pgTable("student_fees", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .references(() => studentProfiles.id)
    .notNull(),
  baseFees: integer("base_fees").notNull(),
  isScholarshipApplicable: boolean("is_scholarship_applicable").default(false),
  discountedFees: integer("discounted_fees"),
  dueDate: date("due_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const feePayments = pgTable("fee_payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .references(() => studentProfiles.id)
    .notNull(),
  amount: integer("amount").notNull(),
  paymentDate: timestamp("payment_date").defaultNow().notNull(),
  paymentMethod: text("payment_method"),
  installmentNumber: integer("installment_number"),
})

export const feeExtensionRequests = pgTable("fee_extension_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .references(() => studentProfiles.id)
    .notNull(),
  reason: text("reason").notNull(),
  requestedNewDueDate: date("requested_new_due_date").notNull(),
  status: text("status").default("pending"),
  reviewedBy: uuid("reviewed_by").references(() => staffProfiles.id),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const feedbacks = pgTable("feedbacks", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .references(() => studentProfiles.id)
    .notNull(),
  teacherId: uuid("teacher_id").references(() => teacherProfiles.id),
  feedbackType: text("feedback_type").notNull(),
  message: text("message").notNull(),
  rating: integer("rating"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const jobPostings = pgTable("job_postings", {
  id: uuid("id").defaultRandom().primaryKey(),
  postedBy: uuid("posted_by")
    .references(() => staffProfiles.id)
    .notNull(),
  jobTitle: text("job_title").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements"),
  postedAt: timestamp("posted_at").defaultNow().notNull(),
  closingDate: date("closing_date").notNull(),
})

export const jobApplications = pgTable("job_applications", {
  id: uuid("id").defaultRandom().primaryKey(),
  jobId: uuid("job_id")
    .references(() => jobPostings.id)
    .notNull(),
  studentId: uuid("student_id")
    .references(() => studentProfiles.id)
    .notNull(),
  applicationDate: timestamp("application_date").defaultNow().notNull(),
  status: text("status").default("applied"),
})

export const teacherResources = pgTable("teacher_resources", {
  id: uuid("id").defaultRandom().primaryKey(),
  teacherId: uuid("teacher_id")
    .references(() => teacherProfiles.id)
    .notNull(),
  title: text("title").notNull(),
  resourceType: text("resource_type").notNull(),
  content: text("content"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const studentLearningPaths = pgTable("student_learning_paths", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .references(() => studentProfiles.id)
    .notNull(),
  recommendations: jsonb("recommendations").notNull(),
  generatedAt: timestamp("generated_at").defaultNow().notNull(),
})

export const studentPerformance = pgTable("student_performance", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .references(() => studentProfiles.id)
    .notNull(),
  subject: text("subject").notNull(),
  score: integer("score"),
  attendancePercentage: integer("attendance_percentage"),
  remarks: text("remarks"),
  recordedAt: timestamp("recorded_at").defaultNow().notNull(),
})

export const attendance = pgTable("attendance", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .references(() => studentProfiles.id)
    .notNull(),
  date: date("date").notNull(),
  isPresent: boolean("is_present").default(true).notNull(),
})

export const timetables = pgTable("timetables", {
  id: uuid("id").defaultRandom().primaryKey(),
  className: text("class_name").notNull(),
  subject: text("subject").notNull(),
  teacherId: uuid("teacher_id")
    .references(() => teacherProfiles.id)
    .notNull(),
  dayOfWeek: text("day_of_week").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
})

export const grading = pgTable("grading", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .references(() => studentProfiles.id)
    .notNull(),
  teacherId: uuid("teacher_id")
    .references(() => teacherProfiles.id)
    .notNull(),
  subject: text("subject").notNull(),
  grade: text("grade").notNull(),
  comments: text("comments"),
  gradedAt: timestamp("graded_at").defaultNow().notNull(),
})

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  senderId: uuid("sender_id")
    .references(() => users.id)
    .notNull(),
  receiverId: uuid("receiver_id")
    .references(() => users.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
