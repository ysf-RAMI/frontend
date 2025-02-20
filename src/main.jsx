import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import UserAuthProvider from "./Context/Auth/UserAuth.jsx";

createRoot(document.getElementById("root")).render(

      <UserAuthProvider>
        <App />
      </UserAuthProvider>

);
