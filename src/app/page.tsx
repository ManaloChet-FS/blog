import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <header className="py-8">
        <h1 className="text-6xl font-semibold text-center text-slate-50">Chet&apos;s Blog</h1>
      </header>
      <main className="flex flex-col gap-4 items-center">
        {posts && posts.map(post => {
          return (
            <section key={post.slug} className="w-full max-w-xl text-slate-50 bg-zinc-900 shadow-lg rounded-md p-6 border border-zinc-800">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="text-sm">{post.date}</p>
              </div>
              <p className="pt-4 pb-8">{post.desc}</p>
              <div className="text-left">
                <Link className="transition bg-slate-200 text-zinc-900 font-semibold py-2.5 px-4 rounded-full hover:bg-zinc-700 hover:text-slate-50" href={`/posts/${post.slug}`}>Read Post</Link>
              </div>
            </section>
          )
        })}
      </main>
    </>
  );
}
