import { dbConnect } from "@/utils/dbConnection";
import Link from "next/link";
import DeletePost from "@/components/DeletePost";
export const metadata = {
  title: "A list of previous posts from users",
  description:
    "Here you can see a list of previous posts, click on one to comment!",
};

export default async function Posts({ searchParams }) {
  async function getPosts() {
    const db = dbConnect();

    // const posts = (await db.query(`SELECT * FROM posts`)).rows;
    const posts = (
      await db.query(
        `SELECT posts.id, posts.title, posts.content, category.cat_name FROM posts JOIN category ON posts.cat_id = category.id`
      )
    ).rows;
    //! return posts
    return posts;
  }
  const postData = await getPosts();
  if (searchParams.sort === "desc") {
    postData.reverse();
  }

  return (
    <>
      <h1 className="text-5xl">Posts</h1>
      <Link href={"/posts?sort=asc"}>Sort ascending</Link> -{" "}
      <Link href={"/posts?sort=desc"}>Sort descending</Link>
      {/*//? Will map posts here */}
      <section className="flex  p-10 w-96 gap-4 grid-cols-*  ">
        {postData.map((item) => (
          <div
            className=" flex flex-col gap-x-1  bg-yellow-400 text-gray-900 font-bold rounded-lg p-4 cursor-pointer transition-colors hover:opacity-20 justify-center"
            key={item.id}
          >
            <Link href={`/posts/${item.id}`}>
              <h1 className="text-2xl">{item.title}</h1>
              <br />

              <p>{item.cat_name}</p>
              <br />
            </Link>
            <DeletePost data={item.id} />
          </div>
        ))}
      </section>
    </>
  );
}
