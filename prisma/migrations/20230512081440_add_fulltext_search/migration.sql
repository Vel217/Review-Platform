-- CreateIndex
CREATE FULLTEXT INDEX `Comment_content_idx` ON `Comment`(`content`);

-- CreateIndex
CREATE FULLTEXT INDEX `Film_title_director_idx` ON `Film`(`title`, `director`);

-- CreateIndex
CREATE FULLTEXT INDEX `Review_reviewName_category_content_idx` ON `Review`(`reviewName`, `category`, `content`);

-- CreateIndex
CREATE FULLTEXT INDEX `Tag_title_idx` ON `Tag`(`title`);

-- CreateIndex
CREATE FULLTEXT INDEX `User_name_idx` ON `User`(`name`);
