import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../blocks/chat/Sidebar";
import Topbar from "../../blocks/chat/Topbar";

function ChatLayout() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (
      (localStorage.getItem("id") !== null &&
        localStorage.getItem("role") !== "User") ||
      (localStorage.getItem("id") === null &&
        localStorage.getItem("role") === null) ||
      (localStorage.getItem("id") === null &&
        localStorage.getItem("role") !== "User")
    ) {
      enqueueSnackbar("Not Authorized", { variant: "warning" });
      return navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="out">
      <div className="page5 js-page4">
        <Topbar profilePic="/assets/square/img/ava-7.png" />
        <div className="page5__wrapper">
          <Sidebar />
          <div className="page5__container">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLayout;
