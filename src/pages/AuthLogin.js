import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AuthLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  let navigate = useNavigate(); // use useNavigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8080/auth/login`, {
        username,
        password,
      });
      // handle successful login
      console.log(response.data);
      setToken(response.data.token);
      setError("");

      console.log("++++token i want to save in locastorage++++++",response.data.token);
      // Store the token in localStorage or cookies
      localStorage.setItem("jwtToken", response.data.token);
      console.log("get token from local storage",localStorage.getItem('jwtToken'));
      
      // Redirect to home page
      navigate("/home"); // use navigate function

    } catch (error) {
      // handle error
      console.error(error);
      setError("Invalid username or password");
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="username" className="form-lable">
            Username:
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="password" className="form-lable">
            Password:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <br />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}