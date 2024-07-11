import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function NewPosts() {
  return (
    <>
      <h1>Add a New Post!</h1>
      <form className="flex flex-col">
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
        <input
          name="content"
          type="text"
          placeholder="Your Content Here"
          id="content"
          className="text-black"
          required
        />
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
