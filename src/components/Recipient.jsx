import { useSelector } from "react-redux";
import convertTime from "../utils/convertTime";
//THEY
function Recipient({ onMessage }) {
  const { contactList } = useSelector((state) => state.contactList);
  const { text: message, timestamp, senderId, type, url } = onMessage;

  const recipient = contactList.find((contact) => contact.uid === senderId);
  const { photoURL } = recipient ? recipient : "Unknown user";
  const time = convertTime(timestamp);

  return (
    <div className="relative px-6 py-3 mt-3 rounded-r-xl sm:text-lg rounded-b-xl bg-stone-200 font-medium w-fit">
      <img
        src={photoURL}
        alt="userPhoto"
        className="w-[20px] h-[20px] absolute bottom-0 left-[-10px] rounded-3xl"
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
          className="underline text-blue-600"
          href={url}
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
      <p className="text-[5px] font-normal text-gray-600  absolute left-[3px] bottom-[-9px]">
        {time}
      </p>
    </div>
  );
}

export default Recipient;
