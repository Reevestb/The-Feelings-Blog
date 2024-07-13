import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SeePost from "./SeePost";

export default async function EditButton({ data, content, title }) {
  async function handleSubmit(formData) {
    "use server";

    const title = formData.get("title");
    const content = formData.get("content");
    // console.log(title);

    const db = dbConnect();

    await db.query(`UPDATE posts SET title = ($1) WHERE id = ${data}`, [title]);

    await db.query(`UPDATE posts SET content = ($1) WHERE id = ${data}`, [
      content,
    ]);
    revalidatePath(`/posts`);
    redirect(`/posts`);
  }

  //   const db = dbConnect();
  //   const firstContent = (
  //     await db.query(`SELECT posts.content FROM posts WHERE id = ${data}`, [])
  //   ).rows;
  //   const fC = firstContent[0];
  //   console.log(fC);
  return (
    <main className="flex">
      <SeePost
        data={data}
        content={content}
        title={title}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}
