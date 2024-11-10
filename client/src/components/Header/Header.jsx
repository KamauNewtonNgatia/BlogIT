import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <h1 className="logo">blog it</h1>
      <div className="nav-links">
        <Link to="/login" className="login">
          log in
        </Link>
        <Link to="/signup" className="signup">
          sign up
        </Link>
      </div>
    </div>
  );
}

export default Header;
