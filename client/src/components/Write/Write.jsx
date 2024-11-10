import React, { useState } from "react";
import { Editor } from "primereact/editor";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Input from "../../utils/input";
import "./Write.css";

function Write() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [imageURL, setImageURL] = useState("");

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (post) => {
      const response = await fetch(`http://localhost:4000/posts`, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      console.log(data);
    },
    onSuccess: () => {
      toast.success("Post created successfully!");
      navigate("/preview");
    },
    onError: () => {
      toast.error("Failed to create post.");
    },
  });

  function handleSubmitPost(e) {
    e.preventDefault();

    if (!imageURL) {
      toast.error("Image is required", { duration: 3000 });
      return;
    }

    if (!title) {
      toast.error("Title is required", { duration: 3000 });
      return;
    }

    if (!excerpt) {
      toast.error("Excerpt is required", { duration: 3000 });
      return;
    }

    if (!body) {
      toast.error("Body is required", { duration: 3000 });
      return;
    }

    const post = {
      title,
      excerpt,
      body,
      image: imageURL,
    };
    console.log("Image URL in post object:", imageURL);

    mutate(post);
  }

  return (
    <div className="overall-write-container">
      <div className="write-content">
        <h1>Create New Post</h1>
        <form onSubmit={handleSubmitPost}>
          <Toaster position="bottom-center" richColors />
          <label htmlFor="file">Upload Image</label>
          <Input onImageUpload={setImageURL} />{" "}
          {/* Pass function to get image URL */}
          <br />
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter your title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            placeholder="Enter excerpt here..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          ></textarea>
          <br />
          <label htmlFor="body">Body</label>
          <Editor
            value={body}
            onTextChange={(e) => setBody(e.htmlValue)}
            style={{ height: "320px" }}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Please wait..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Write;
