import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add a new Post",
  description: "Add a new post with the form to discuss your feelings",
};

export default async function NewPosts() {
  async function handleSavePost(formData) {
    "use server";

    const title = formData.get("title");
    const content = formData.get("content");
    const cat_id = formData.get("cat_id");

    const db = dbConnect();
    await db.query(
      `INSERT INTO posts (title, content, cat_id) VALUES ($1,$2, $3)`,
      [title, content, cat_id]
    );
    revalidatePath("/posts");
    redirect("/posts");
  }

  async function getCategory() {
    const db = dbConnect();

    const category = (await db.query(`SELECT * FROM category`)).rows;
    //! return posts
    return category;
  }
  const catData = await getCategory();

  return (
    <>
      <h1>Add a New Post!</h1>
      <form action={handleSavePost} className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter Title"
          className="text-black"
          required
        />
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          type="text"
          placeholder="Your Content Here"
          id="content"
          className="text-black"
          required
        />
        <label htmlFor="cat_name">Category</label>
        <select name="cat_id" className="text-black">
          {catData.map((item) => (
            <option key={item.id} value={item.id} required>
              {item.cat_name}
            </option>
          ))}
        </select>
        <br />
        <button
          type="submit"
          className="flex hover:bg-red-600 h-8 hover:text-white bg-white rounded text-black items-center"
        >
          Submit
        </button>
      </form>
    </>
  );
}
