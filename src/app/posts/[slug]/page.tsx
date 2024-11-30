import { getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import MarkdownIt from "markdown-it";
import Link from "next/link";

const md = new MarkdownIt();

async function fetchPost(slug: string) {
  const posts = await getAllPosts();
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
}

export default async function Post({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const post = await fetchPost(slug);

  if (!post) notFound();

  const { title, date, content } = post;
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-semibold">{title}</h1>
          <span className="text-lg">{date}</span>
        </div>
        <div
          className="text-lg"
          dangerouslySetInnerHTML={{ __html: htmlConverter }}
        />
      </section>
    </article>
  );
}

// export async function generateStaticParams() {
//   const posts = getAllPosts();
//   return posts.map((post) => ({
//     params: { slug: post.slug },
//   }));
// }