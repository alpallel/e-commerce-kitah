import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const USERS_KEY = "rt_users";
const CURRENT_KEY = "rt_current_user";

const readUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeUsers = (u) => localStorage.setItem(USERS_KEY, JSON.stringify(u));

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => readUsers());
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CURRENT_KEY));
    } catch {
      return null;
    }
  });

  useEffect(() => writeUsers(users), [users]);
  useEffect(
    () => localStorage.setItem(CURRENT_KEY, JSON.stringify(user)),
    [user]
  );

  const register = ({ name, email, password }) => {
    if (!email || !password) throw new Error("Email and password are required");
    if (users.find((u) => u.email === email))
      throw new Error("Email already registered");
    const newUser = {
      id: Date.now(),
      name: name || email.split("@")[0],
      email,
      password,
    };
    setUsers((prev) => [newUser, ...prev]);
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return newUser;
  };

  const login = ({ email, password }) => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) throw new Error("Invalid credentials");
    setUser({ id: found.id, name: found.name, email: found.email });
    return found;
  };

  const logout = () => setUser(null);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ users, user, register, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
