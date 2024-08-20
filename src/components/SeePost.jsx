"use client";
import { useState } from "react";
import style from "@/components/SeePost.module.css";

export default function SeeEdit({ handleSubmit, content, title }) {
  const [see, setSee] = useState(false);

  return (
    <main className="flex flex-col">
      <button
        id="secretBtn"
        onClick={() => setSee(!see)}
        className="flex bg-white rounded text-black items-center text-center
             w-14 justify-center hover:bg-black hover:text-white"
      >
        Edit
      </button>
      {see ? (
        <form action={handleSubmit} id={style.editPost}>
          {/* <div className="text-white">
            <h1 className="text-blue-900">
              previous title is: <br />{" "}
            </h1>{" "}
            {title}
          </div> */}
          <label htmlFor="title">New Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Title"
            className="text-black"
            defaultValue={title}
          />

          <label htmlFor="content">New Content</label>

          <textarea
            name="content"
            type="text"
            placeholder="Your content Here"
            id="content"
            className="text-black"
            defaultValue={content}
          />
          {/* <div className="text-white">
            <h1 className="text-blue-900">
              previous content is: <br />{" "}
            </h1>{" "}
            {content}
          </div> */}
          <button
            id={style.submitBtn}
            className="flex hover:bg-red-600 h-8 hover:text-white bg-white rounded text-black items-center text-center
             w-auto justify-center text-base"
            type="submit"
          >
            Submit Edit
          </button>
        </form>
      ) : null}
    </main>
  );
}
