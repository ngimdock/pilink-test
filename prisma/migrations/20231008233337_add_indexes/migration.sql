-- CreateIndex
CREATE INDEX "Forum_name_idx" ON "Forum"("name");

-- CreateIndex
CREATE INDEX "Post_title_idx" ON "Post"("title");

-- CreateIndex
CREATE INDEX "Student_email_firstname_lastname_idx" ON "Student"("email", "firstname", "lastname");

-- CreateIndex
CREATE INDEX "University_name_idx" ON "University"("name");
