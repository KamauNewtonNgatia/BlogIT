import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

function PersonalPostPreview({ id, title, excerpt }) {
  const navigate = useNavigate();

  useQuery({
    queryKey: ["deletedPost"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:4000/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
    },
  });

  function handleRedirectForEditing() {
    if (!id) return;
    navigate(`/edit/${id}`);
  }
  return (
    <div className="overall-personal-container">
      <div className="container-contents">
        <h2>{title}</h2>
      </div>
      <p>{excerpt}</p>
      <div className="controls">
        <button onClick={handleRedirectForEditing}>delete</button>
      </div>
    </div>
  );
}

export default PersonalPostPreview;
