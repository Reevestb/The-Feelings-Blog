import Link from "next/link";

export default function Header() {
  return (
    <>
      <h1>Posts Blog</h1>
      <nav className="flex flex-row gap-2">
        <Link href="/">Home</Link>
        <br />
        <Link href="/posts">Posts</Link>
        <br />
        <Link href="/newPosts">Add New Post</Link>
      </nav>
    </>
  );
}
