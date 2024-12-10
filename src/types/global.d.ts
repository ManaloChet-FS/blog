export {}

declare global {
  interface Post {
    slug: string
    content: string
    title: string
    desc: string
    date: string
    hero: string
    heroAlt: string
  }
}