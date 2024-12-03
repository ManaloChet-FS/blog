import { getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import MarkdownIt from "markdown-it";
import Link from "next/link";
import Image from "next/image";

const md = new MarkdownIt();

async function fetchPost(slug: string) {
  const posts = await getAllPosts();
  // Returns the post with the matching slug
  return posts.find((post) => post.slug === slug);
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

interface Post {
  title: string
  date: string
  content: string
  desc: string
  hero: string,
  heroAlt: string
}

export default async function Post({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const post = await fetchPost(slug);

  // If no post is found, show the 404 page
  if (!post) notFound();

  const { title, date, content } = post;

  // Converts markdown file to HTML
  const htmlConverter = md.render(content);

  return (
    <article className="text-slate-50 mx-auto p-4 max-w-4xl">
      <Link
        href="/"
        className="inline-block mb-2 transition bg-slate-200 text-zinc-900 font-semibold py-2 px-4 rounded-full hover:bg-zinc-700 hover:text-slate-50"
      >
        &#11164; Go back
      </Link>
      <section className="bg-zinc-900 shadow-lg p-8 rounded-lg border border-zinc-800">
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-4xl font-semibold">{title}</h1>
          <span className="text-sm">{date}</span>
        </div>
        {post.hero && <Image className="rounded-lg mb-8 shadow" priority={true} src={post.hero} width={1000} height={667} alt={post.heroAlt} />}
        <div
          className="text-lg"
          dangerouslySetInnerHTML={{ __html: htmlConverter }}
        />
      </section>
    </article>
  );
}