"use client";
import { useState } from "react";
import ReactDOM from "react-dom";
import style from "@/components/SeePost.module.css";

export default function SeeEdit({ handleSubmit, data }) {
  const [see, setSee] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.target);
    await handleSubmit(formData); // Call the handleSubmit function
    setSee(false); // Close the modal
  };

  const closeModal = () => {
    setSee(false); // Close the modal
  };

  const modalContent = (
    <div className={style.modalBackdrop}>
      <div className={style.modalContent}>
        <form
          onSubmit={handleFormSubmit}
          action={handleSubmit}
          id={style.editPost}
        >
          <label htmlFor="comment" className="underline">
            Edit Comment
          </label>
          <br />
          <textarea
            name="comment"
            type="text"
            placeholder="Your comment"
            className="text-black w-[18rem] lg:w-[32rem] h-[10rem] rounded-md"
            rows={4}
            defaultValue={data}
          />
          <button
            className="flex hover:bg-red-600 h-8 hover:text-white bg-white rounded text-black items-center text-center
             w-auto p-1 justify-center text-base"
            type="submit"
          >
            Submit Edit
          </button>
          <button
            className={style.closeBtn}
            onClick={closeModal}
            aria-label="Close"
          >
            &times;
          </button>
        </form>
      </div>
    </div>
  );
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
      {see && ReactDOM.createPortal(modalContent, document.body)}

      {/*{see ? (
        <form action={handleSubmit}>
          <label htmlFor="comment">Edit Comment</label>
          <br />
          <textarea
            name="comment"
            type="text"
            placeholder="Your comment"
            className="text-black"
            rows={4}
            defaultValue={data}
          />
          <button
            className="flex hover:bg-red-600 h-8 hover:text-white bg-white rounded text-black items-center text-center
             w-auto p-1 justify-center text-base"
            type="submit"
          >
            Submit Edit
          </button>
        </form>
      ) : null} */}
    </main>
  );
}
