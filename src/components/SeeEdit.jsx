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
             w-14 justify-center"
      >
        Edit
      </button>
      {see ? (
        <form action={handleSubmit}>
          <label htmlFor="comment">Edit Comment</label>
          <br />
          <textarea
            name="comment"
            type="text"
            placeholder="Your comment"
            className="text-black"
          />
          <button
            className="flex bg-white rounded text-black items-center text-center
             w-28 justify-center"
            type="submit"
          >
            Submit Edit
          </button>
        </form>
      ) : null}
    </main>
  );
}
