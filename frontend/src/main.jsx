import React from "react";
import ReactDOM from "react-dom/client";
import App from "./modules/chat/App.jsx"; 
import { AuthProvider } from "./modules/auth/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);