import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { saveSenderId } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { listenMessages } from "../redux/chat/chatSlice";
import { generateChatId } from "../utils/generateChatId";

function ChatListItem({ onContact, contactId }) {
  const [unreadMessages, setUnreadMessages] = useState();
  const { photoURL, displayName, uid } = onContact;
  const { username, userId } = useSelector((state) => state.user);
  const { contactList } = useSelector((state) => state.contactList);
  const loginName = displayName === username ? "You" : displayName;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpenChatBox = async (recieverId) => {
    dispatch(saveSenderId(recieverId));
    dispatch(listenMessages(generateChatId(recieverId, userId)));

    navigate("/chatbox");
  };

  return (
    <div
      className="flex relative items-center gap-3 p-2 hover:bg-stone-300  hover:rounded-2xl tranition-all duration-300 px-1 "
      onClick={() => handleOpenChatBox(uid)}
    >
      {/* <p className=" px-1 bg-red-800 absolute rounded-full text-stone-200 text-xs top-[0rem] ">
        1
      </p> */}
      <div className="w-[50px] h-[50px] bg-gray-500 rounded-2xl overflow-hidden ">
        <img
          src={photoURL}
          alt="chat1"
          className="w-full h-full object-cover "
        />
      </div>
      <section>
        <h5 className="text-lg">{loginName}</h5>
        <div className="text-sm text-stone-700 flex items-center gap-1">
          <FaCheck />
          <FaCheck className="ml-[-0.7rem]" />
          <p>Tap here to see your messages...</p>
        </div>
      </section>
      {/* <p className="bg-stone-200 p-1 px-2 rounded-xl text-sm ml-7 text-stone-600 ">
        `${unreadMessages}M`
      </p> */}
    </div>
  );
}

export default ChatListItem;
