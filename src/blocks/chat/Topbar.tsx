interface properties {
  profilePic?: string;
}

function Topbar(props: properties) {
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
        <a className="header__profile">
          <img className="header__pic" src={props.profilePic} alt="" />
        </a>
      </div>
      <div className="header5__bg js-header4-bg" id="js-header-bg"></div>
    </div>
  );
}

export default Topbar;
