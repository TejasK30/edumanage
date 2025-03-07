import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  date,
  jsonb,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core"

export const colleges = pgTable("colleges", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").unique().notNull(),
  signupLink: text("signup_link").unique().notNull(),
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

export const semesterSubjects = pgTable("semester_subjects", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .references(() => studentProfiles.id)
    .notNull(),
  semester: integer("semester").notNull(),
  academicYear: text("academic_year").notNull(),
  subjects: jsonb("subjects").notNull(),
  credits: integer("credits").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const studentProfiles = pgTable("students", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  fullName: text("full_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  parentsPhone: text("parents_phone").notNull(),
  email: text("email").unique().notNull(),
  address: text("address").notNull(),
  caste: text("caste"),
  admissionYear: integer("admission_year"),
  currentSemester: integer("current_semester").notNull(),
  currentAcademicYear: text("current_academic_year").notNull(),
  totalCredits: integer("total_credits").default(0).notNull(),
  course: text("course"),
  fees: numeric("fees").notNull(),
  scholarship: boolean("scholarship").default(false).notNull(),
  dues: numeric("dues").notNull(),
  department: text("department").notNull(),
  className: text("classname").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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

// Store semester-wise student results
export const semesterResults = pgTable("semester_results", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .references(() => studentProfiles.id)
    .notNull(),
  semester: integer("semester").notNull(),
  academicYear: text("academic_year").notNull(),
  totalMarks: numeric("total_marks").notNull(),
  obtainedMarks: numeric("obtained_marks").notNull(),
  percentage: numeric("percentage").notNull(),
  sgpa: numeric("sgpa").notNull(),
  cgpa: numeric("cgpa").notNull(),
  totalCredits: integer("total_credits").notNull(),
  earnedCredits: integer("earned_credits").notNull(),
  status: text("status").notNull(), // "passed", "failed", "promoted"
  remarks: text("remarks"),
  declaredAt: timestamp("declared_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Store subject-wise results for each semester
export const subjectResults = pgTable("subject_results", {
  id: uuid("id").defaultRandom().primaryKey(),
  semesterResultId: uuid("semester_result_id")
    .references(() => semesterResults.id)
    .notNull(),
  studentId: uuid("student_id")
    .references(() => studentProfiles.id)
    .notNull(),
  subjectCode: text("subject_code").notNull(),
  subjectName: text("subject_name").notNull(),
  credits: integer("credits").notNull(),
  internalMarks: numeric("internal_marks").notNull(),
  externalMarks: numeric("external_marks").notNull(),
  totalMarks: numeric("total_marks").notNull(),
  grade: text("grade").notNull(),
  gradePoints: numeric("grade_points").notNull(),
  status: text("status").notNull(), // "passed", "failed", "absent"
  attempts: integer("attempts").default(1).notNull(),
  isBacklog: boolean("is_backlog").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Store detailed attendance records
export const semesterAttendance = pgTable("semester_attendance", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .references(() => studentProfiles.id)
    .notNull(),
  semester: integer("semester").notNull(),
  academicYear: text("academic_year").notNull(),
  subjectCode: text("subject_code").notNull(),
  totalClasses: integer("total_classes").notNull(),
  attendedClasses: integer("attended_classes").notNull(),
  percentage: numeric("percentage").notNull(),
  isShortage: boolean("is_shortage").default(false).notNull(),
  shortageReason: text("shortage_reason"),
  exempted: boolean("exempted").default(false),
  exemptionReason: text("exemption_reason"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Store backlog/supplementary exam records
export const backlogRecords = pgTable("backlog_records", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .references(() => studentProfiles.id)
    .notNull(),
  subjectCode: text("subject_code").notNull(),
  originalSemester: integer("original_semester").notNull(),
  originalAcademicYear: text("original_academic_year").notNull(),
  examType: text("exam_type").notNull(), // "supplementary", "remedial", "improvement"
  attemptNumber: integer("attempt_number").notNull(),
  examDate: timestamp("exam_date").notNull(),
  marks: numeric("marks"),
  status: text("status").notNull(), // "registered", "appeared", "passed", "failed"
  clearedDate: timestamp("cleared_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Store grade improvement attempts
export const gradeImprovements = pgTable("grade_improvements", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .references(() => studentProfiles.id)
    .notNull(),
  subjectCode: text("subject_code").notNull(),
  originalGrade: text("original_grade").notNull(),
  originalSemester: integer("original_semester").notNull(),
  attemptDate: timestamp("attempt_date").notNull(),
  newGrade: text("new_grade"),
  status: text("status").notNull(), // "registered", "appeared", "improved", "no_improvement"
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Store academic progression status
export const academicProgression = pgTable("academic_progression", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .references(() => studentProfiles.id)
    .notNull(),
  academicYear: text("academic_year").notNull(),
  semester: integer("semester").notNull(),
  status: text("status").notNull(), // "regular", "dropped", "break", "discontinued"
  cgpa: numeric("cgpa").notNull(),
  totalBacklogs: integer("total_backlogs").notNull(),
  isPromoted: boolean("is_promoted").notNull(),
  remarks: text("remarks"),
  decidedBy: uuid("decided_by")
    .references(() => staffProfiles.id)
    .notNull(),
  decidedAt: timestamp("decided_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Store semester-wise achievements/awards
export const academicAchievements = pgTable("academic_achievements", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .references(() => studentProfiles.id)
    .notNull(),
  semester: integer("semester").notNull(),
  academicYear: text("academic_year").notNull(),
  achievementType: text("achievement_type").notNull(), // "rank", "award", "scholarship"
  description: text("description").notNull(),
  awardedBy: text("awarded_by").notNull(),
  awardedDate: timestamp("awarded_date").notNull(),
  certificate: text("certificate_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
