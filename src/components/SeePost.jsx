"use client";
import { useState } from "react";
import ReactDOM from "react-dom";
import style from "@/components/SeePost.module.css";

export default function SeeEdit({ handleSubmit, content, title }) {
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
        <form onSubmit={handleFormSubmit} id={style.editPost}>
          <label htmlFor="title">New Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Title"
            className="text-black rounded-md justify-center"
            defaultValue={title}
          />

          <label htmlFor="content">New Content</label>
          <textarea
            name="content"
            id="content"
            placeholder="Your content Here"
            className="text-black w-[18rem] lg:w-[32rem] h-[10rem] rounded-md"
            defaultValue={content}
          />

          <button
            id={style.submitBtn}
            className="flex hover:bg-red-600 h-8 hover:text-white bg-white rounded text-black items-center text-center
               w-auto justify-center text-base"
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
    </main>
  );
}
