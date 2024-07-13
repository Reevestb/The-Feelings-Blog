import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function deleteButton({ data, params }) {
  async function handleSubmit() {
    "use server";
    // console.log(data);

    //put data in database
    const db = dbConnect();
    await db.query(`DELETE FROM comments WHERE id = ${data} RETURNING *`);
    revalidatePath(`/posts/${params.id}`);
    redirect(`/posts/${params.id}`);
  }

  return (
    <>
      <form action={handleSubmit}>
        <button
          className="flex bg-red-600 rounded text-white items-center text-center
             w-14 justify-center mb-2"
          type="submit"
        >
          Delete
        </button>
      </form>
    </>
  );
}
//  hover:bg-red-600 h-8 hover:text-white
