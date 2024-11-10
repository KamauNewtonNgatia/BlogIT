import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/home/home";
import Signup from "./pages/Home/Signup/Signup";
import Login from "./components/Loginform/Loginform";
import BlogListingPage from "./pages/Home/BlogListingPage/BlogListingPage";
import WritePage from "./pages/Home/WritePage/WritePage";
import Articlespg from "./pages/Articles/Articlespg";
import Myblogs from "./pages/MyBlogs/Myblogs";
import Profile from "./pages/Profile/Profle";
import Previewpg from "./pages/Preview/Previewpg";
const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/BlogListingPage" element={<BlogListingPage />} />
          <Route path="/WritePage" element={<WritePage />} />
          <Route path="/articles" element={<Articlespg />} />
          <Route path="/myblogs" element={<Myblogs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/preview" element={<Previewpg />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
