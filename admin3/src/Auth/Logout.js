import React from "react";
import axios from "axios"

const Logout = () => {
  const handleLogout = async () => {
    await axios.post("http://localhost:8003/api/logout");
    alert("Logged out");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
