import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "src/posts");

interface Post {
  slug: string
  content: string
  title: string
  desc: string
  date: string
}

export const getAllPosts = () => {
  const fileNames = fs.readdirSync(postsDir);
  return fileNames.map(fileName => {
    const slug = fileName.replace(".md", "");
    const filePath = path.join(postsDir, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf-8');

    const {content, data: {title, desc, date}} = matter(fileContents);

    const post: Post = {
      slug,
      content,
      title,
      desc,
      date
    }

    return post;
  })
}