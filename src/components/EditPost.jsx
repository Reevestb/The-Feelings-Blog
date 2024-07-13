import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SeePost from "./SeePost";

export default function EditButton({ data, id }) {
  async function handleSubmit(formData) {
    "use server";
    console.log(data);
    console.log(id);

    const title = formData.get("title");
    console.log(title);

    const db = dbConnect();
    await db.query(`UPDATE posts SET title = ($1) WHERE id = ${data}`, [title]);
    revalidatePath("/posts");
    redirect("/posts");
  }
  return (
    <main className="flex">
      <SeePost data={data} handleSubmit={handleSubmit} />
    </main>
  );
}
