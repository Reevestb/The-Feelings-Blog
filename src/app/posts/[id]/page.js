import { dbConnect } from "@/utils/dbConnection";
import idStyles from "@/app/posts/[id]/postId.module.css";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import DeleteCom from "@/components/DeleteCom";
import EditCom from "@/components/EditCom";

export async function generateMetadata({ params }) {
  const db = dbConnect();
  const posts = (
    await db.query(`SELECT * FROM posts WHERE posts.id = ${params.id}`)
  ).rows;
  const post = posts[0];

  return {
    title: ` posts - ${post.title}`,
    description: ` ${post.content} `,
  };
}

export default async function PostIdPage({ params }) {
  //get data by filtering by id
  const db = dbConnect();

  const onePost = (
    await db.query(
      `SELECT posts.id, posts.title, posts.content, category.cat_name FROM posts JOIN category ON posts.cat_id = category.id WHERE posts.id = ${params.id}`
    )
  ).rows;

  //handlesubmit for the comment form
  async function handleSubmit(formData) {
    "use server";
    const username = formData.get("username");
    const comment = formData.get("comment");
    const post_id = params.id;

    const db = dbConnect();
    await db.query(
      `INSERT INTO comments (username, comment, post_id) VALUES ($1, $2, $3 )`,
      [username, comment, post_id]
    );
    revalidatePath(`/posts/${params.id}`);
    redirect(`/posts/${params.id}`);
  }

  async function getComments() {
    const db = dbConnect();

    const comments = (
      await db.query(`SELECT * FROM comments WHERE post_id = ${params.id}`)
    ).rows;
    //! return comments
    return comments;
  }
  const comData = await getComments();

  return (
    <>
      <div id={idStyles.singlePost}>
        {onePost.map((item) => (
          <div id={idStyles.onepostbox} key={item.id}>
            <h1 id={idStyles.onePostTitle}>{item.title}</h1>
            <h3 id={idStyles.onePostCat}>{item.cat_name}</h3>
            <p className="text-lg">Content: {item.content}</p>
          </div>
        ))}
      </div>
      <section id={idStyles.commentForm}>
        {/* //?comment form will go here */}
        <form className="flex flex-col justify-center" action={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Your Username"
            className="text-black"
          />
          <label htmlFor="comment">Your Comment</label>
          <textarea
            name="comment"
            type="text"
            placeholder="Your comment"
            className="text-black"
            rows={5}
          />
          <br />
          <button
            className="flex hover:bg-red-600 h-8 hover:text-white bg-white rounded text-black items-center text-center
             w-32 p-1 justify-center text-base"
            type="submit"
          >
            Post Comment
          </button>
        </form>
      </section>
      <br />
      <section id={idStyles.userComment}>
        {comData.map((item) => (
          <div id={idStyles.commentBox} key={item.id}>
            <h1 className="text-2xl">Username: {item.username}</h1>
            <p className="text-lg">Comment: {item.comment}</p>
            <DeleteCom data={item.id} params={params} />
            <EditCom id={item.id} data={item.comment} params={params} />
          </div>
        ))}
      </section>
    </>
  );
}

//need to naviagte here
//use params to render the data dynamically
