import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SeeEdit from "./SeeEdit";

export default function EditButton({ data, params, id }) {
  async function handleSubmit(formData) {
    "use server";
    console.log(data);

    const comment = formData.get("comment");
    const db = dbConnect();
    // await db.query(`UPDATE comments WHERE comment = ${data} SET ${data}`);
    await db.query(`UPDATE comments SET comment = ($1) WHERE id = ${id}`, [
      comment,
    ]);
    revalidatePath(`/posts/${params.id}`);
    redirect(`/posts/${params.id}`);
  }

  return (
    <main className="flex">
      <SeeEdit data={data} params={params} handleSubmit={handleSubmit} />
    </main>
  );
}
//  hover:bg-red-600 h-8 hover:text-white
