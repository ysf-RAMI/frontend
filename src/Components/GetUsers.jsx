import axios from "axios";
import { useState } from "react";

export default function GetUsers() {

  const [users, setUsers] = useState([]);

  

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8081",
  });

  function getAllUsers() {
    axiosInstance
      .get("/users/get-all-users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error("Erreur Axios :", error));
  }

  return (
    <>
      <button onClick={getAllUsers}>getAllUsers</button>

      <ul>
        {users.map((user, index) => (
          <li key={user.id || index}>{user.username}</li>
        ))}
      </ul>
    </>
  );
}
