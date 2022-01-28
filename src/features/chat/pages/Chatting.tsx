import { Button } from "@mui/material";
import { AxiosError } from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../assets/scss/chat/Chatting.scss";
import axios from "../../../core/api/axios";
import { MessageEndpoints, UserEndpoints } from "../../../core/api/endpoints";
import { IMessage } from "../../../core/models/IMessage.interface";
import { IUser } from "../../../core/models/IUser.interface";
import ChatItem from "../components/ChatItem";
import SendIcon from "@mui/icons-material/Send";
import { useSnackbar } from "notistack";

function Chatting() {
  const { user_id } = useParams();
  const [user, setUser] = useState<IUser | null>();
  const [messages, setMessages] = useState<IMessage[]>();
  const [message, setMessage] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getUser = async () =>
      await axios
        .get(UserEndpoints.GetUserById + user_id)
        .then((res) => setUser(res.data))
        .catch((err: AxiosError) => {
          console.log(err.response?.data);
        });
    const getMessages = async () =>
      await axios
        .post<IMessage[]>(MessageEndpoints.GetMessages, {
          senderId: localStorage.getItem("id"),
          receiverId: user_id,
        })
        .then((res) => setMessages(res.data));
    getUser();
    getMessages();
    return () => {
      setUser(null);
      setMessages([]);
    };
  }, [user_id]);

  useEffect(() => {
    const interval = setInterval(() => {
      const getMessages = async () =>
        await axios
          .post<IMessage[]>(MessageEndpoints.GetMessages, {
            senderId: localStorage.getItem("id"),
            receiverId: user_id,
          })
          .then((res) => setMessages(res.data));
      getMessages();
    }, 3000);
    return () => clearInterval(interval);
  }, [user_id]);

  const SendMessage = async (event: SyntheticEvent) => {
    if (message != undefined && message != "") {
      const model = {
        message: message,
        senderId: localStorage.getItem("id"),
        receiverId: user?.id,
      };
      await axios
        .post(MessageEndpoints.Create, model)
        .then((res) => {
          setMessage("");
          if (res.data.succeeded) {
            const getMessages = async () =>
              await axios
                .post<IMessage[]>(MessageEndpoints.GetMessages, {
                  senderId: localStorage.getItem("id"),
                  receiverId: user_id,
                })
                .then((res) => setMessages(res.data));
            getMessages();
          }
        })
        .catch((err: AxiosError) => {
          switch (err.response?.data.code) {
            case "SenderNotFound":
              enqueueSnackbar(err.response.data.error, { variant: "error" });
              break;
            case "ReceiverNotFound":
              enqueueSnackbar(err.response.data.error, { variant: "error" });
              break;
            case "ServerError":
              enqueueSnackbar(err.response.data.error, { variant: "error" });
              break;
            default:
              enqueueSnackbar("Something went wrong", { variant: "warning" });
              break;
          }
        });
    }
  };

  return (
    <div className="chat_wrap">
      <div className="chat">
        <div className="chat__head">
          <div className="message__user">
            <div className="ava">
              <img
                className="ava__pic"
                src={user?.profilePic}
                alt={user?.fullName}
              />
            </div>
            <div className="message__details">
              <div className="message__man">{user?.fullName}</div>
              <div className="message__mail">{user?.email}</div>
            </div>
          </div>
        </div>
        <div className="chat__body">
          {messages?.reverse().map((message: IMessage) => {
            return (
              <ChatItem
                id={message.id}
                message={message.message}
                name={user?.fullName!}
                receiverId={message.receiverId}
                senderId={message.senderId}
                key={message.id}
                profilePic={user?.profilePic!}
              />
            );
          })}
        </div>
        <div className="chat__foot">
          <div className="chat__field">
            <div className="login__field field">
              <div className="field__input field__wrap">
                <input
                  className="message_field"
                  type="text"
                  onChange={(event) => setMessage(event.target.value)}
                  name="message"
                  value={message}
                  placeholder="Type Message"
                />
                <Button
                  size="large"
                  className="message_button"
                  startIcon={<SendIcon />}
                  onClick={SendMessage}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatting;
