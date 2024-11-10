import React from "react";
import HeaderBlogs from "../../components/HeaderBlogs/HeaderBlogs";
import Previewcards from "../../components/Preview/Previewcards";

function Previewpg() {
  return (
    <div className="ovaerall-preview-page">
      <HeaderBlogs />
      <div className="preview-body">
        <Previewcards />
      </div>
    </div>
  );
}

export default Previewpg;
