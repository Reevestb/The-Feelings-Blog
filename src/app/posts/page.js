import { dbConnect } from "@/utils/dbConnection";
import Link from "next/link";
import DeletePost from "@/components/DeletePost";
import post from "@/app/posts/post.module.css";
import EditPost from "@/components/EditPost";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import Filter from "@/components/FilteredCat";

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

  async function getCategory() {
    const db = dbConnect();

    const cats = (await db.query(`SELECT * FROM category`)).rows;
    return cats;
  }
  const cat = await getCategory();

  async function handleSelect(formData) {
    "use server";
    const cat_id = formData.get("category");
    revalidatePath(`/posts/categories/${cat_id}`);
    redirect(`/posts/categories/${cat_id}`);
  }

  return (
    <>
      <section id={post.postsTop}>
        <h1 id={post.postTitle}>Posts</h1>

        <div id={post.ascDesc}>
          <Link
            className="flex bg-blue-400 rounded text-white items-center text-center
             w-auto h-auto justify-center hover:bg-white hover:text-blue-400"
            href={"/posts?sort=asc"}
          >
            Sort ascending
          </Link>
          <Link
            className="flex bg-blue-400 rounded text-white items-center text-center
             w-auto h-auto justify-center hover:bg-white hover:text-blue-400"
            href={"/posts?sort=desc"}
          >
            Sort descending
          </Link>
          {/* <Filter /> */}
        </div>
        <div id={post.postsTop}>
          <form action={handleSelect} className="flex flex-col pt-3">
            <label id={post.formTitle} htmlFor="category">
              Filter By Category
            </label>
            <select name="category" className="text-black">
              {cat.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.cat_name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              //   className="flex bg-white rounded text-black items-center text-center
              //  w-fit justify-center hover:bg-blue-400 hover:text-white mt-2 px-3"
            >
              Change
            </button>
          </form>
        </div>
      </section>
      {/*//? Will map posts here */}
      <section className="grid p-10 w-fit grid-cols-4 grid-rows-* gap-x-20 gap-y-14  ">
        {postData.map((item) => (
          <div
            className=" flex flex-col gap-2 h-auto bg-blue-400 text-white font-bold rounded-lg p-4 pr-10 cursor-pointer transition-colors hover:bg-gray-500 hover:text-blue-400 "
            key={item.id}
            id={post.editForm}
          >
            <Link href={`/posts/${item.id}`}>
              <h1 className="text-2xl w-48">{item.title}</h1>
              <br />
              <p className="text-yellow-300">{item.cat_name}</p>
              <br />
            </Link>
            <EditPost
              data={item.id}
              content={item.content}
              title={item.title}
            />
            <DeletePost data={item.id} />
          </div>
        ))}
      </section>
    </>
  );
}
