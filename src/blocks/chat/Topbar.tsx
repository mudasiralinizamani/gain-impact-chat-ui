import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import axios from "../../core/api/axios";
import { UserEndpoints } from "../../core/api/endpoints";
import { IUser } from "../../core/models/IUser.interface";

function Topbar() {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const getUser = async () =>
      await axios
        .get(UserEndpoints.GetUserById + localStorage.getItem("id"))
        .then((res) => {
          setUser(res.data);
        })
        .catch((err: AxiosError) => setUser(null));
    getUser();
    return () => setUser(null);
  }, []);

  // function for Opening Sidebar
  const opeSidebar = () => {
    console.log("button is clicked");
    let sidebar = document.getElementById("js-sidebar4");
    let html = document.getElementById("dom_html");
    let body = document.getElementById("dom_body");
    let bg = document.getElementById("js-header-bg");

    sidebar?.classList.add("visible");
    bg?.classList.add("visible");
    html?.classList.add("no-scroll");
    body?.classList.add("no-scroll");
  };
  return (
    <div className="header5 js-header4">
      <button
        onClick={opeSidebar}
        className="header5__burger js-header4-burger"
      >
        <svg className="icon icon-burger">
          <use xlinkHref="/assets/square/img/sprite.svg#icon-burger"></use>
        </svg>
      </button>
      <a className="header5__logo"></a>
      <div className="header__group">
        <div style={{ marginRight: "5px" }}>{user?.fullName}</div>
        <a className="header__profile">
          <img className="header__pic" src={user?.profilePic} alt="" />
        </a>
      </div>
      <div className="header5__bg js-header4-bg" id="js-header-bg"></div>
    </div>
  );
}

export default Topbar;
