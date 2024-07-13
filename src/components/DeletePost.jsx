import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import style from "@/components/DeletePost.module.css";

export default async function DeletePost({ data }) {
  async function handleSubmit() {
    "use server";
    const db = dbConnect();
    await db.query(`DELETE FROM comments WHERE post_id = ${data} RETURNING *`);
    await db.query(`DELETE FROM posts WHERE id = ${data} RETURNING *`);
    revalidatePath("/posts");
    redirect("/posts");
  }
  //   console.log(data);
  return (
    <form action={handleSubmit}>
      <button
        id={style.delBtn}
        className="flex hover:bg-white h-8 hover:text-red-600 bg-red-600 rounded text-white items-center p-1"
        type="submit"
      >
        DELETE
      </button>
    </form>
  );
}
