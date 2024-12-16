import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!userId) {
        navigate("/welcome");
      }
    },
    [userId, navigate]
  );
  return userId ? children : null;
}

export default ProtectedRoute;
