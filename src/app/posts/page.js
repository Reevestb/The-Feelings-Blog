import { dbConnect } from "@/utils/dbConnection";
import Link from "next/link";
// import Delete from "@/components/Delete";

export default async function Posts({ searchParams }) {
  async function getPosts() {
    const db = dbConnect();

    const posts = (await db.query(`SELECT * FROM posts`)).rows;
    //! return posts
    return posts;
  }
  const postData = await getPosts();
  if (searchParams.sort === "desc") {
    postData.reverse();
  }
  //   console.log(postData);

  //   async function selId() {
  //     "use server";
  //     const db = dbConnect();
  //     const selId = (await db.query(`SELECT id FROM posts`)).rows;
  //     return selId;
  //   }
  //   const id = await selId();

  //   async function deletePost() {
  //     "use server";
  //     const db = dbConnect();
  //     // const id = deletePost.get("id");
  //     // const id = await selId();
  //     const delPost = (
  //       await db.query(`DELETE FROM posts WHERE id = ${id} RETURNING *`, [id])
  //     ).rows;
  //     return delPost;
  //   }
  //   const delPost = await deletePost();
  //   console.log(id);

  return (
    <>
      <h1 className="text-5xl">Posts</h1>
      <Link href={"/posts?sort=asc"}>Sort ascending</Link> -{" "}
      <Link href={"/posts?sort=desc"}>Sort descending</Link>
      {/* //? Will map posts here */}
      <section className="flex flex-col-reverse">
        {postData.map((item) => (
          <div key={item.id}>
            <Link href={`/posts/${item.id}`}>
              <h1 className="text-2xl">-{item.title}</h1>
            </Link>
          </div>
        ))}
      </section>
      {/* <form action={deletePost}>
            <input name="id"></input>
            <button
              className="flex hover:bg-white h-8 hover:text-red-600 bg-red-600 rounded text-white items-center p-1"
              type="submit"
            >
              DELETE
            </button>
          </form> */}
      {/* <button action={deletePost}>Del</button> */}
      {/* <p>{item.content}</p> */}
    </>
  );
}
