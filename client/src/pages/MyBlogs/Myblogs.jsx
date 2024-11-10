import React, { useState } from "react";
import { useQuery } from "react-query";
import useUserStore from "../../store/UserStore";
import { useNavigate } from "react-router-dom";
import HeaderBlogs from "../../components/HeaderBlogs/HeaderBlogs";
import "./myblogs.css";

function Myblogs() {
  const [blogs, setBlogs] = useState([]);
  const userData = useUserStore((state) => state.user);
  const userId = userData?.[0]?.id;

  const navigate = useNavigate();
  const { isError, isLoading, error } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:4000/posts/user/${userId}`,
        { credentials: "include" },
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      setBlogs(data);
    },
  });

  if (isLoading) {
    return <h2>Loading please wait...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <HeaderBlogs />
      <div className="overall-blogs-page">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <div className="blog-content">
              <h2 className="blog-title">{blog.title}</h2>
              <p className="blog-excerpt">{blog.excerpt}</p>
              <p className="blog-date">
                Posted on: {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="blog-author">By {blog.user.firstName}</p>
              <button
                className="read-more"
                onClick={() => navigate("/articles")}
              >
                Read More
              </button>
            </div>
            <img src={blog.image} alt={blog.title} className="blog-image" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Myblogs;
