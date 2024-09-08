import Link from "next/link";
import HeaderStyles from "@/components/Header.module.css";
export default function Header() {
  return (
    <main className="flex items-center flex-col m-0 bg-black">
      <h1 id={HeaderStyles.mainTitle}>The Feelings Blog</h1>
      <nav className="flex flex-row gap-2 p-3">
        <Link className={HeaderStyles.button} href="/">
          Home
        </Link>
        <br />
        <Link className={HeaderStyles.button} href="/posts">
          Posts
        </Link>
        <br />
        <Link className={HeaderStyles.button} href="/newPosts">
          Add New Post
        </Link>
      </nav>
    </main>
  );
}
