import { useSelector } from "react-redux";
import convertTime from "../utils/convertTime";
//ME
//When the user sends a message, they are the sender.
//When the user receives a message, they are the recipient.

function Sender({ onMessage }) {
  const { contactList } = useSelector((state) => state.contactList);
  const { text: message, timestamp, senderId, url, type } = onMessage;
  const sender = contactList.find((contact) => contact.uid === senderId);
  const { photoURL } = sender ? sender : "Unknown user";
  const time = convertTime(timestamp);
  return (
    <div className="relative px-6 py-3 mt-3 sm:text-lg rounded-l-xl rounded-b-xl bg-gray-400 font-medium w-fit">
      <img
        src={photoURL}
        alt="userPhoto"
        className="w-[20px] h-[20px] absolute bottom-[0] right-[-10px] rounded-3xl"
      />
      {type === "audio" ? (
        <audio controls>
          <source src={url} type="audio/webm" />
        </audio>
      ) : type === "video" ? (
        <video controls>
          <source src={url} type="video/webm" />
        </video>
      ) : type === "application" ? (
        <a
          href={url}
          className="underline text-blue-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          view pdf
        </a>
      ) : type === "image" ? (
        <img src={url} alt="image" />
      ) : (
        <p>{message}</p>
      )}
      <p className="text-[5px] font-normal text-gray-600  absolute right-[3px] bottom-[-9px]">
        {time}
      </p>
    </div>
  );
}

export default Sender;
