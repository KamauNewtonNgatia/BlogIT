import HeaderBlogs from "../../../components/HeaderBlogs/HeaderBlogs";
import Previewcards from "../../../components/Preview/Previewcards";

function BlogListingPage() {
  return (
    <>
      <HeaderBlogs />
      <Previewcards apiUrl="http://localhost:4000/posts" />
    </>
  );
}

export default BlogListingPage;
