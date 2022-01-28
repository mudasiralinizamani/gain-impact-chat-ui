interface properties {
  profile: string;
  text: string;
  name: string;
  id: string;
  hide: boolean;
}

function ChatText(props: properties) {
  return (
    <div
      className={`chat__item ${props.hide ? "display-none" : ""}`}
      key={props.id}
    >
      <div className="ava">
        <img className="ava__pic" src={props.profile} alt={props.name} />
      </div>
      <div className="chat__text">{props.text}</div>
    </div>
  );
}

export default ChatText;
