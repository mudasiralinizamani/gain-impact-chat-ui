import ChatAnswer from "./ChatAnswer";
import ChatText from "./ChatText";

interface properties {
  receiverId: string;
  senderId: string;
  id: string;
  message: string;
  name: string;
  profilePic: string;
}

function ChatItem(props: properties) {
  return (
    <>
      <ChatText
        hide={localStorage.getItem("id") != props.receiverId ? true : false}
        id={props.receiverId}
        name={props.name}
        profile={props.profilePic}
        text={props.message}
      />
      <ChatAnswer
        id={props.id}
        text={props.message}
        hide={localStorage.getItem("id") === props.senderId ? false : true}
      />
    </>
  );
}

export default ChatItem;
