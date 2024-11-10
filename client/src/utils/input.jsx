import React, { useState } from "react";

function Input({ onImageUpload }) {
  const [image, setImage] = useState("");

  const uploadImage = (files) => {
    if (files.length === 0) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "deb8u7su");

    fetch("https://api.cloudinary.com/v1_1/ddljgckmy/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.error("Cloudinary upload error:", errorData);
            throw new Error(errorData.error.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        setImage(data.secure_url);
        console.log("Image URL from Cloudinary:", data.secure_url);
        onImageUpload(data.secure_url);
      })
      .catch((error) => {
        console.error("Error uploading image:", error.message);
      });
  };

  return (
    <div>
      <input type="file" onChange={(e) => uploadImage(e.target.files)} />
      {image && (
        <img
          src={image}
          alt="uploaded"
          style={{ width: "200px", height: "auto", marginTop: "10px" }}
        />
      )}
    </div>
  );
}

export default Input;
