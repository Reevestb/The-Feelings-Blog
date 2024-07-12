import { dbConnect } from "@/utils/dbConnection";
import idStyles from "@/app/posts/[id]/postId.module.css";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
      {onePost.map((item) => (
        <div id="onePostBox" key={item.id}>
          <h1 className="text-3xl">{item.title}</h1>
          <h3>{item.cat_name}</h3>
          <p className="text-lg">{item.content}</p>
        </div>
      ))}
      <section>
        {/* //?comment form will go here */}
        <form className="flex flex-col" action={handleSubmit}>
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
          />
          <br />
          <button
            className="flex hover:bg-red-600 h-8 hover:text-white bg-white rounded text-black items-center text-center"
            type="submit"
          >
            Post Comment
          </button>
        </form>
      </section>
      <br />
      <section id="userComment">
        {comData.map((item) => (
          <div id={idStyles.commentBox} key={item.id}>
            <h1>Username: {item.username}</h1>
            <p>Comment: {item.comment}</p>
          </div>
        ))}
      </section>
    </>
  );
}

//need to naviagte here
//use params to render the data dynamically
