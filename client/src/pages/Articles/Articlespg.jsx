// import React from 'react'
// import HeaderBlogs from '../../components/HeaderBlogs/HeaderBlogs'
// function Articlespg() {
//   return (

//     <div className='overall-articals-page'>
//         <HeaderBlogs/>
//         <h1>Articals page here</h1>
//         </div>
//   )
// }

// export default Articlespg

import React, { useState, useEffect } from "react";
import HeaderBlogs from "../../components/HeaderBlogs/HeaderBlogs";
import { useParams } from "react-router-dom";

function Articlespg() {
  const { id } = useParams(); // Get the post ID from the URL params
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:4000/posts/${id}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch the post");
        }
        const data = await response.json();
        setPost(data); // Set the post data to state
        setIsLoading(false); // Set loading state to false
      } catch (error) {
        setError(error.message); // Set error state
        setIsLoading(false); // Set loading state to false
      }
    };

    fetchPost(); // Call the fetchPost function on component mount
  }, [id]); // Re-fetch the post data if the post ID changes

  if (isLoading) {
    return <h2>Loading post...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="overall-articles-page">
      <HeaderBlogs />
      <h1>{post.title}</h1> {/* Display the post title */}
      <p>{post.body}</p> {/* Display the post body */}
      <p>
        <strong>Author: </strong>
        {post.user.firstName} {post.user.lastName}
      </p>{" "}
      {/* Display the author's name */}
      {/* You can display more post details here */}
    </div>
  );
}

export default Articlespg;
