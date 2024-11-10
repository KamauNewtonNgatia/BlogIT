import { useState } from "react";
import { useMutation } from "react-query";
import { Toaster, toast } from "sonner";
import { useNavigate, Link, json } from "react-router-dom";
import "./signupform.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Signupform() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(null);

  const redirect = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async function (newUser) {
      const response = await fetch(`http://localhost:4000/user`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("User created successfully!", {
        duration: 4000,
      });
      setTimeout(() => {
        redirect("/login");
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 4000,
      });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        duration: 4000,
      });
      return;
    }

    const newUser = {
      firstName,
      lastName,
      username,
      email,
      password,
    };
    mutate(newUser);
  }

  return (
    <div className="Overall-signup-form">
      <h2 className="signup-heading">
        Join a community of readers and writers
      </h2>

      <form>
        <Toaster position="bottom-center" richColors />
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          placeholder="e.g., Newton"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          placeholder="e.g., Kamau"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          id="email"
          placeholder="e.g., newton@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="e.g., newtonkamau"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Loading, please wait..." : "Submit"}
        </button>

        <Link to="/login" className="login-link">
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
}

export default Signupform;
