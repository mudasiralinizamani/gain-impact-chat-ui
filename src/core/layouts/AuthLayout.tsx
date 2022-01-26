import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import GainTitle from "../../blocks/auth/GainTitle";

function AuthLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("id") !== null &&
      localStorage.getItem("role") === "User"
    ) {
      return navigate("/chat");
    }
  }, []);

  return (
    <div className="out">
      <GainTitle />
      <div className="page">
        <div className="page__wrapper">
          <div className="entry">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
