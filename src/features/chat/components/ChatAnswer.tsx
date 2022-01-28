interface properties {
  text: string;
  id: string;
  hide: boolean;
}
function ChatAnswer(props: properties) {
  return (
    <div className={`chat__answer ${props.hide ? "display-none" : ""}`}>
      {props.text}
    </div>
  );
}

export default ChatAnswer;
