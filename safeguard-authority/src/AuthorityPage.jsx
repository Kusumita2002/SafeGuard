// src/AuthorityPage.jsx
import React, { useState, useEffect } from "react";
import AuthorityLogin from "./AuthorityLogin";
import AuthorityDashboard from "./AuthorityDashboard";

const AuthorityPage = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("sg_authority_ok") === "yes") {
      setIsAuth(true);
    }
  }, []);

  if (!isAuth) {
    return <AuthorityLogin onSuccess={() => setIsAuth(true)} />;
  }

  return <AuthorityDashboard />;
};

export default AuthorityPage;
