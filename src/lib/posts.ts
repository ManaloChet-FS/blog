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
  hero: string
  heroAlt: string
}

export const getAllPosts = () => {
  // Gets the file names of every file in the posts directory
  const fileNames = fs.readdirSync(postsDir);
  // Creates an array
  return fileNames.map(fileName => {
    // Gets rid of .md at the end of files for the slug
    const slug = fileName.replace(".md", "");
    // Gets the path of the file
    const filePath = path.join(postsDir, fileName);
    // Reads the contents of the file
    const fileContents = fs.readFileSync(filePath, 'utf-8');

    // Parses the metadata and content from the file
    const {content, data: {title, desc, date, hero, heroAlt}} = matter(fileContents);

    const post: Post = {
      slug,
      content,
      title,
      desc,
      date,
      hero,
      heroAlt
    }

    return post;
  })
}