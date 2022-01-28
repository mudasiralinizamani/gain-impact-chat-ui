import ChatAnswer from "./ChatAnswer";
import ChatText from "./ChatText";

interface properties {
  receiverId: string;
  senderId: string;
  id: string;
  message: string;
  reply: string;
  name: string;
  profilePic: string;
}

function ChatItem(props: properties) {
  return (
    <>
      <ChatAnswer
        hide={localStorage.getItem("id") != props.senderId ? true : false}
        id={props.id}
        text={props.message}
      />
      <ChatText
        hide={
          localStorage.getItem("id") != props.senderId
            ? true
            : false || props.reply === ""
            ? true
            : false
        }
        id={props.receiverId}
        name={props.name}
        profile={props.profilePic}
        text={props.reply}
      />

      <ChatText
        hide={localStorage.getItem("id") != props.senderId ? false : true}
        id={props.receiverId}
        name={props.name}
        profile={props.profilePic}
        text={props.message}
      />
      <ChatAnswer
        id={props.id}
        text={props.reply}
        hide={
          localStorage.getItem("id") != props.senderId
            ? false
            : true || props.reply === ""
            ? true
            : false
        }
      />
    </>
  );
}

export default ChatItem;
