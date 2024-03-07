import { useState } from "react";

export default function SignUpForm({setToken}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loggedInUsername, setLoggedInUsername] = useState(null);


  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Hello 👋");

 if (!username || !password) {
    setError("Username and password are required.");
    return;
  }
  if (password.length < 12) {
    setError("Password must be at least 12 characters long.");
    return;
  }

    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
  method: "POST",
  body: JSON.stringify({
 username, 
 password
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
});
      const result = await response.json();
      setToken(result.token)
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      {loggedInUsername && <p>Welcome, {loggedInUsername}!</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label>
          Password (at least 12 characters):
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}