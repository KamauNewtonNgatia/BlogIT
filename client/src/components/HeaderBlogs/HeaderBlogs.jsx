import "./HeaderBlogs.css";
import { Link } from "react-router-dom";
import Articlespg from "../../pages/Articles/Articlespg";

function HeaderBlogs() {
  return (
    <div className="blog-nav-links">
      <ol className="nav-links">
        <Link to={"/preview"}>blog it</Link>
        <Link to="/BlogListingPage">blog listing</Link>
        <Link to={"/WritePage"}>write</Link>
        <Link to={"/myblogs"}>my blogs</Link>
        <Link to={"/profile"}>my profile</Link>
      </ol>
    </div>
  );
}

export default HeaderBlogs;
