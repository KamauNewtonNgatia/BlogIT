import "./Hero.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>
          Share Your Story with the World – Inspire, Engage, and Leave Your
          Mark!
        </h1>
        <p className="fs-4">
          Unleash Your Voice and Connect with Readers Worldwide – Our Platform
          Empowers You to Share, Inspire, and Grow with Every Post.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="btn btn-lg bg-warning"
        >
          Start Writing
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="btn btn-lg bg-success"
        >
          Explore stories for readers
        </button>
      </div>
      <div className="hero-img"></div>
    </div>
  );
}

export default Hero;
