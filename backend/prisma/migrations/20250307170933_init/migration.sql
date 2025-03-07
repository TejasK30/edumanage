-- CreateTable
CREATE TABLE "colleges" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "signup_link" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "departments" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "colleges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "custom_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password_hash" TEXT NOT NULL,
    "password_salt" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "otp" TEXT,
    "otp_expiry" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semester_subjects" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "academic_year" TEXT NOT NULL,
    "subjects" JSONB NOT NULL,
    "credits" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "semester_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "parents_phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "caste" TEXT,
    "admission_year" INTEGER,
    "current_semester" INTEGER NOT NULL,
    "current_academic_year" TEXT NOT NULL,
    "total_credits" INTEGER NOT NULL DEFAULT 0,
    "course" TEXT,
    "fees" DECIMAL(65,30) NOT NULL,
    "scholarship" BOOLEAN NOT NULL DEFAULT false,
    "dues" DECIMAL(65,30) NOT NULL,
    "department" TEXT NOT NULL,
    "classname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher_profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "subjects" JSONB,
    "salary" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teacher_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff_profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role_title" TEXT,
    "department" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "staff_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phone_numbers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,

    CONSTRAINT "phone_numbers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_fees" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "base_fees" INTEGER NOT NULL,
    "is_scholarship_applicable" BOOLEAN NOT NULL DEFAULT false,
    "discounted_fees" INTEGER,
    "due_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "student_fees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fee_payments" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_method" TEXT,
    "installment_number" INTEGER,

    CONSTRAINT "fee_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fee_extension_requests" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "requested_new_due_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "reviewed_by" TEXT,
    "reviewed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fee_extension_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "teacher_id" TEXT,
    "feedback_type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "rating" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_postings" (
    "id" TEXT NOT NULL,
    "posted_by" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT,
    "posted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closing_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_postings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_applications" (
    "id" TEXT NOT NULL,
    "job_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "application_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'applied',

    CONSTRAINT "job_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher_resources" (
    "id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "resource_type" TEXT NOT NULL,
    "content" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teacher_resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_learning_paths" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "recommendations" JSONB NOT NULL,
    "generated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "student_learning_paths_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_performance" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "score" INTEGER,
    "attendance_percentage" INTEGER,
    "remarks" TEXT,
    "recorded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "student_performance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "is_present" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timetables" (
    "id" TEXT NOT NULL,
    "class_name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "day_of_week" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timetables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grading" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "comments" TEXT,
    "graded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "grading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semester_results" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "academic_year" TEXT NOT NULL,
    "total_marks" DECIMAL(65,30) NOT NULL,
    "obtained_marks" DECIMAL(65,30) NOT NULL,
    "percentage" DECIMAL(65,30) NOT NULL,
    "sgpa" DECIMAL(65,30) NOT NULL,
    "cgpa" DECIMAL(65,30) NOT NULL,
    "total_credits" INTEGER NOT NULL,
    "earned_credits" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "remarks" TEXT,
    "declared_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "semester_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject_results" (
    "id" TEXT NOT NULL,
    "semester_result_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "subject_code" TEXT NOT NULL,
    "subject_name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "internal_marks" DECIMAL(65,30) NOT NULL,
    "external_marks" DECIMAL(65,30) NOT NULL,
    "total_marks" DECIMAL(65,30) NOT NULL,
    "grade" TEXT NOT NULL,
    "grade_points" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 1,
    "is_backlog" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subject_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semester_attendance" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "academic_year" TEXT NOT NULL,
    "subject_code" TEXT NOT NULL,
    "total_classes" INTEGER NOT NULL,
    "attended_classes" INTEGER NOT NULL,
    "percentage" DECIMAL(65,30) NOT NULL,
    "is_shortage" BOOLEAN NOT NULL DEFAULT false,
    "shortage_reason" TEXT,
    "exempted" BOOLEAN NOT NULL DEFAULT false,
    "exemption_reason" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "semester_attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "backlog_records" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "subject_code" TEXT NOT NULL,
    "original_semester" INTEGER NOT NULL,
    "original_academic_year" TEXT NOT NULL,
    "exam_type" TEXT NOT NULL,
    "attempt_number" INTEGER NOT NULL,
    "exam_date" TIMESTAMP(3) NOT NULL,
    "marks" DECIMAL(65,30),
    "status" TEXT NOT NULL,
    "cleared_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "backlog_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grade_improvements" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "subject_code" TEXT NOT NULL,
    "original_grade" TEXT NOT NULL,
    "original_semester" INTEGER NOT NULL,
    "attempt_date" TIMESTAMP(3) NOT NULL,
    "new_grade" TEXT,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "grade_improvements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_progression" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "cgpa" DECIMAL(65,30) NOT NULL,
    "total_backlogs" INTEGER NOT NULL,
    "is_promoted" BOOLEAN NOT NULL,
    "remarks" TEXT,
    "decided_by" TEXT NOT NULL,
    "decided_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "academic_progression_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_achievements" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "academic_year" TEXT NOT NULL,
    "achievement_type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "awarded_by" TEXT NOT NULL,
    "awarded_date" TIMESTAMP(3) NOT NULL,
    "certificate_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "academic_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "colleges_code_key" ON "colleges"("code");

-- CreateIndex
CREATE UNIQUE INDEX "colleges_signup_link_key" ON "colleges"("signup_link");

-- CreateIndex
CREATE UNIQUE INDEX "users_custom_id_key" ON "users"("custom_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "students_user_id_key" ON "students"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_profiles_user_id_key" ON "teacher_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "staff_profiles_user_id_key" ON "staff_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "semester_subjects" ADD CONSTRAINT "semester_subjects_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_profiles" ADD CONSTRAINT "teacher_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_profiles" ADD CONSTRAINT "teacher_profiles_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_profiles" ADD CONSTRAINT "staff_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_profiles" ADD CONSTRAINT "staff_profiles_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phone_numbers" ADD CONSTRAINT "phone_numbers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_fees" ADD CONSTRAINT "student_fees_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fee_payments" ADD CONSTRAINT "fee_payments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fee_extension_requests" ADD CONSTRAINT "fee_extension_requests_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fee_extension_requests" ADD CONSTRAINT "fee_extension_requests_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "staff_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_posted_by_fkey" FOREIGN KEY ("posted_by") REFERENCES "staff_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job_postings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_resources" ADD CONSTRAINT "teacher_resources_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_learning_paths" ADD CONSTRAINT "student_learning_paths_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_performance" ADD CONSTRAINT "student_performance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetables" ADD CONSTRAINT "timetables_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grading" ADD CONSTRAINT "grading_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grading" ADD CONSTRAINT "grading_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester_results" ADD CONSTRAINT "semester_results_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_results" ADD CONSTRAINT "subject_results_semester_result_id_fkey" FOREIGN KEY ("semester_result_id") REFERENCES "semester_results"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_results" ADD CONSTRAINT "subject_results_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester_attendance" ADD CONSTRAINT "semester_attendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "backlog_records" ADD CONSTRAINT "backlog_records_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade_improvements" ADD CONSTRAINT "grade_improvements_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_progression" ADD CONSTRAINT "academic_progression_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_progression" ADD CONSTRAINT "academic_progression_decided_by_fkey" FOREIGN KEY ("decided_by") REFERENCES "staff_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_achievements" ADD CONSTRAINT "academic_achievements_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
