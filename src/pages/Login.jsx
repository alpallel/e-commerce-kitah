import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useAsyncError, useNavigate } from "react-router-dom";

// Helper to get CSRF token for Django POST requests
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async () => {
    if (!username || !password) {
      alert("Username and password are required.");
      return;
    }

    const url = "http://127.0.0.1:8000/login/";
    const csrftoken = getCookie('csrftoken');

    // const formData = new FormData();
    // formData.append('username', username);
    // formData.append('password', password);

    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrftoken,
        },
        // body: formData, // Sending as FormData
        body: '{username: ${username}, password: ${password}}', // Sending as JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to login: ${JSON.stringify(errorData)}`);
      }

      // It worked, reset form and refresh list
      setUsername("");
      setPassword("");
      await handleLoginSubmit(); // Refresh the list from the server

    } catch (error) {
      console.error("Error saving product:", error);
      alert(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    try {
      login({ username, password });
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100 pt-20">
      <form
        onSubmit={handleLoginSubmit}
        className="bg-white p-6 rounded shadow w-[24rem]"
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <div className="mb-2 text-red-600">{error}</div>}
        <label className="block mb-2">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-sky-600 text-white px-4 py-2 rounded"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
