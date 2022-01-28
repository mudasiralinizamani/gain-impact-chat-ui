import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../core/api/axios";
import { MessageEndpoints } from "../core/api/endpoints";
import { IMessage } from "../core/models/IMessage.interface";
import "../assets/scss/shared/UserCard.scss";

interface properties {
  name: string;
  profilePic: string;
  email: string;
  id: string;
  createdAt: string;
  active: boolean;
}

function UserCard(props: properties) {
  const [lastMessage, setLastMessage] = useState<IMessage | null>();

  useEffect(() => {
    const getMessages = async () =>
      await axios
        .post<IMessage[]>(MessageEndpoints.GetMessages, {
          senderId: localStorage.getItem("id"),
          receiverId: props.id,
        })
        .then((res) => {
          console.log(res.data.length);
          if (res.data.length === 0) {
            return setLastMessage(null);
          }
          setLastMessage(res.data[res.data.length - 1]);
        });
    getMessages();
    return () => {
      setLastMessage(null);
    };
  }, []);

  return (
    <Link
      to={`/chat/send/${props.id}`}
      replace={true}
      className={`sidebar2__profile ${
        // If the Current User == Signed User then the Card will not be displayed
        props.id == localStorage.getItem("id") ? "display-none" : ""
      } ${props.active ? "active" : ""}`}
      key={props.id}
    >
      <div className="ava">
        <img className="ava__pic" src={props.profilePic} alt={props.name} />
      </div>
      <div className="sidebar2__details">
        <div className="sidebar2__user">
          <p className="name">{props.name.slice(0, 12)}</p>
          <p className="time">
            {lastMessage?.createdAt.slice(0, 10).replaceAll("-", "/")}
          </p>
        </div>
        <div className="sidebar2__login">
          {lastMessage != null ? lastMessage.message.slice(0, 17) : "Say Hi!"}
        </div>
      </div>
    </Link>
  );
}

export default UserCard;
