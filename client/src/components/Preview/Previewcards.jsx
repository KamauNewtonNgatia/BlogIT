import React from "react";
import Previewcard from "./Previewcard";
import { isError, useQuery } from "react-query";
import usePostStore from "../../store/Poststore";
import "./previewcards.css";
import useUserStore from "../../store/UserStore";

function Previewcards({ apiUrl }) {
  //test
  const user = useUserStore((state) => state.user);

  console.log("useer here");
  console.log(user);
  const addPosts = usePostStore((state) => state.addOtherPeoplePost);
  const otherpostsAll = usePostStore((state) => state.posts);

  const { isError, isLoading, error } = useQuery({
    queryFn: async () => {
      const response = await fetch(apiUrl, { credentials: "include" });
      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();

      return data;
    },
    onSuccess: (data) => {
      addPosts(data);
      console.log(otherpostsAll);
    },
  });
  if (isLoading) {
    return <h2>Loading please wait...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  console.log(otherpostsAll[0]);
  return (
    <div className="overall-preview-cards">
      {otherpostsAll[0].map((post) => (
        <Previewcard
          body={post.body}
          imageurl={post.image}
          fullNames={`${post.user.firstName} ${post.user.lastName}`}
          title={post.title}
          excerpt={post.excerpt}
        />
      ))}
    </div>
  );
}

export default Previewcards;
