import React, { useEffect, useState } from "react";
import axios from "axios"

const Session = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8003/api/session")
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <div>
      {user ? <p>Welcome, {user.username}</p> : <p>Please log in</p>}
    </div>
  );
};

export default Session;
