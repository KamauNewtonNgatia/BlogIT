import React from "react";
import "./previewcard.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Previewcard({
  body,
  fullNames,
  title,
  imageurl,
  excerpt,
  lastUpdated,
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/articles")}
      className="preview-card-overall-container"
    >
      <div className="all-card-holders-preview">
        <div className="preview-header">
          <div className="preview-img-avatar rounded-circle"></div>
          <div className="name-preview-section">
            <h4>{fullNames}</h4>
          </div>
        </div>
        <div className="preview-body">
          <div className="body-preview-text-box">
            <h1 className="preview-title">{title}</h1>
            <p
              dangerouslySetInnerHTML={{ __html: body }}
              className="text-secondary preview-paragraph"
            ></p>
          </div>
          <div className="img-preview">
            <img src={imageurl} alt="post-img" />
          </div>
        </div>
        <div className="preview-footer"></div>
        <h4>lastUpdate November 2</h4>
      </div>
    </div>
  );
}

export default Previewcard;
