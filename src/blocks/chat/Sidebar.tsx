import { useSnackbar } from "notistack";
import { Link, useLocation, useNavigate } from "react-router-dom";
import signout from "../../core/helpers/signout";
import "../../assets/scss/blocks/Sidebar.scss";
import UserDetail from "../../shared/UserDetail";
import { IUser } from "../../core/models/IUser.interface";
import { useEffect, useState } from "react";
import { MessageEndpoints, UserEndpoints } from "../../core/api/endpoints";
import axios from "../../core/api/axios";
import { AxiosError } from "axios";
import UserCard from "../../shared/UserCard";
import { IMessage } from "../../core/models/IMessage.interface";
function Sidebar() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [users, setUsers] = useState<IUser[]>();

  useEffect(() => {
    const getUsers = async () =>
      await axios
        .get<IUser[]>(UserEndpoints.GetUsers)
        .then((res) => setUsers(res.data))
        .catch((err: AxiosError) => setUsers([]));
    getUsers();
    return () => setUsers([]);
  }, []);

  const closeSidebar = () => {
    let sidebar = document.getElementById("js-sidebar4");
    let html = document.getElementById("dom_html");
    let body = document.getElementById("dom_body");
    let bg = document.getElementById("js-header-bg");

    sidebar?.classList.remove("visible");
    bg?.classList.remove("visible");
    html?.classList.remove("no-scroll");
    body?.classList.remove("no-scroll");
  };

  const handleSignout = () => {
    signout();
    enqueueSnackbar("Successfully signed out", { variant: "info" });
    navigate("/", { replace: true });
  };
  return (
    <div className="sidebar5 js-sidebar4" id="js-sidebar4">
      <div className="sidebar5__top">
        <button
          onClick={closeSidebar}
          className="sidebar5__close js-sidebar4-close"
        >
          <svg className="icon icon-close">
            <use xlinkHref="/assets/square/img/sprite.svg#icon-close"></use>
          </svg>
        </button>
        <Link className="sidebar5__logo" to=""></Link>
      </div>
      <div className="sidebar5__wrapper">
        <div className="sidebar5__nav">
          {users?.map((user: IUser) => {
            return (
              <UserCard
                email={user.email}
                name={user.fullName}
                profilePic={user.profilePic}
                key={user.id}
                id={user.id}
                createdAt={user.createdAt}
                active={location.pathname.includes(user.id) ? true : false}
              />
            );
          })}
        </div>
      </div>

      <Link to="/" className="sidebar5__logout" onClick={handleSignout}>
        <svg className="icon icon-logout">
          <use xlinkHref="/assets/square/img/sprite.svg#icon-logout"></use>
        </svg>
        Signout
      </Link>
    </div>
  );
}

export default Sidebar;
