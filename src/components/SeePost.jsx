"use client";
import { useState } from "react";

export default function SeeEdit({ handleSubmit }) {
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
        <form action={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Title"
            className="text-black"
            required
          />
          <button
            className="flex hover:bg-red-600 h-8 hover:text-white bg-white rounded text-black items-center text-center
             w-auto p-1 justify-center text-base"
            type="submit"
          >
            Submit New Post
          </button>
        </form>
      ) : null}
    </main>
  );
}
