import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { Toaster, toast } from "sonner";
import "./loginform.css";
import useUserStore from "../../store/UserStore";

function Loginform() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPasword] = useState("");
  const navigate = useNavigate();

  const setUser = useUserStore((state) => state.addUser);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (userObj) => {
      const response = await fetch(`http://localhost:4000/auth/login`, {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Invalid email address or password");
      }
      return response.json();
    },

    onSuccess: (data) => {
      setUser(data);
      toast.success("login successful!", { duration: 3000 });
      navigate("/BlogListingPage");
    },
    onError: (error) => {
      toast.error(error.message, { duration: 3000 });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (!emailAddress) {
      return toast.error("email address is required", { duration: 3000 });
    }

    if (!password) {
      return toast.error("password is required", {
        duration: 3000,
      });
    }
    mutate({ emailAddress, password });
  }

  return (
    <>
      <div className="overall-login-container">
        <h2 className="login-form-heading">already have an account? sign in</h2>
        <form>
          <Toaster position="bottom-center" richColors />
          <label htmlFor="email">username/email</label>
          <input
            type="text"
            id="email"
            placeholder="eg example@gmail.com"
            required
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <label htmlFor="password">password</label>
          <input
            type="text"
            id="password"
            placeholder=" eg 1234"
            required
            value={password}
            onChange={(e) => setPasword(e.target.value)}
          />{" "}
          <br />
          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "please wait..." : "Submit"}
          </button>
          <Link to="/signup" className="create-account-link">
            Don't have an account? Create One.
          </Link>
        </form>
      </div>
    </>
  );
}

export default Loginform;
