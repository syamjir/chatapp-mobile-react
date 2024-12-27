import React, { useEffect, useRef, useState } from "react";
import { BiVideo, BiPhone, BiArrowBack } from "react-icons/bi";
import { FiMic, FiSend } from "react-icons/fi";
import { MdAttachFile } from "react-icons/md";
import Recipient from "../components/Recipient";
import Sender from "../components/Sender";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listenMessages, sendMessage } from "../redux/chat/chatSlice";
import { generateChatId } from "../utils/generateChatId";
import { startRecording, stopRecording } from "../services/apiMediaRecorder";
import { uploadFileToFirebase } from "../services/apiUploadFile";
import Spinner from "../components/Spinner";

import Notification from "../components/Notification";
import { useFocusInput } from "../hooks/useFocusInput";

function ChatBox() {
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [iconColor, setIconColor] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUplaoding] = useState(false);
  const [isOpenWindow, setIsOpenWindow] = useState(false);
  // const [url, setUrl] = useState("");
  const intervalId = useRef(null);
  const chatContainerRef = useRef(null);
  const elRef = useFocusInput();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messages = useSelector((state) => state.chat.messages);
  const { recieverId, userId, username } = useSelector((state) => state.user);
  const { contactList } = useSelector((state) => state.contactList);
  const chatId = generateChatId(userId, recieverId);

  function scrollToBottom() {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }
  useEffect(function () {
    scrollToBottom();
  }, []);
  useEffect(
    function () {
      scrollToBottom();
    },
    [messages]
  );

  useEffect(
    function () {
      if (isRecording) {
        intervalId.current = setInterval(() => {
          setIconColor((prevColor) =>
            prevColor === "text-red-600" ? "" : "text-red-600"
          );
        }, 600);
      } else {
        setIconColor("");
        clearInterval(intervalId.current);
      }
      return () => clearInterval(intervalId.current);
    },
    [isRecording]
  );

  async function handleStartRecording() {
    setIsRecording(true);
    await startRecording();
  }
  async function handleStopRecording() {
    setIsRecording(false);
    const audioBlob = await stopRecording();
    await uploadFileToFirebase(audioBlob, chatId, userId);
  }

 
  useEffect(
    function () {
      dispatch(listenMessages({ chatId }));
    },
    [chatId, dispatch]
  );

  const chatPartner = contactList.find((user) => user.uid === recieverId);
 
  const { displayName, photoURL } = chatPartner;
  const chatPartnerName = displayName === username ? "You" : displayName;

  function handleSendMessage(e) {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      dispatch(sendMessage({ chatId, userId, text: newMessage }));
      setNewMessage("");
      scrollToBottom();
    }
  }

  useEffect(() => {
    async function upload() {
      console.log("file uplaoding");
      if (file) {
        setUplaoding(true);
        try {
          await uploadFileToFirebase(file, chatId, userId);
          scrollToBottom();
        } catch (err) {
          console.log("error: Upload error:", err);
        } finally {
          setUplaoding(false);
          setFile(null);
        }
      }
    }
    upload();
  }, [file]);

  

  return (
    <div className="h-screen w-screen grid grid-rows-[auto_1fr_auto]  ">
      <header className="flex items-center justify-between   bg-stone-300 py-3 sm:py-6 ">
        <div className="flex items-center gap-4  ml-2 ">
          <BiArrowBack
            className="text-3xl sm:text-4xl cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="rounded-2xl  bg-stone-500 w-[50px] h-[50px]">
            <img
              src={photoURL}
              alt="User-photo"
              className="rounded-2xl w-[50px] h-[50px]"
            />
          </div>
          <div>
            <h4 className="sm:text-xl">{chatPartnerName}</h4>
            <p className="text-sm font-normal sm:text-base">online</p>
          </div>
        </div>
        <div className="flex gap-4 mr-2">
          <BiVideo
            className="text-3xl sm:text-4xl cursor-pointer"
            onClick={() => setIsOpenWindow(true)}
          />
          <BiPhone
            className="text-3xl sm:text-4xl cursor-pointer"
            onClick={() => setIsOpenWindow(true)}
          />
        </div>
      </header>
      <section
        className="  flex flex-col 
           px-3 gap-3 overflow-scroll"
        ref={chatContainerRef}
      >
        {messages.map((message) => {
          if (message.senderId === userId) {
            return (
              <div className="ml-auto" key={message.timestamp}>
                <Sender onMessage={message} />
              </div>
            );
          } else if (message.senderId === recieverId) {
            return (
              <div className="mr-auto" key={message.timestamp}>
                <Recipient onMessage={message} />
              </div>
            );
          }
          return null;
        })}
      </section>
      <form
        className="flex items-center  bg-stone-100 w-full  gap-3 h-20  "
        onSubmit={handleSendMessage}
      >
        <div className="flex items-center justify-between p-2 w-[82%] ml-1 bg-stone-200 rounded-2xl gap-4 ">
          <input
            ref={elRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            className="border-none focus:outline-none bg-transparent  w-full  font-medium sm:py-2 ml-2"
          />
          <div className="flex gap-4">
            <div className="relative">
              {uploading && (
                <Spinner
                  onSize={35}
                  containerPosition={"top-[-4px] left-[-3px]"}
                />
              )}
              <input
                className="hidden"
                type="file"
                id="file"
                accept="image/*,video/*,.pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label htmlFor="file">
                <MdAttachFile className="text-2xl sm:text-4xl hover:text-main transition-all duration-200  " />
              </label>
            </div>

            <FiMic
              className={`${iconColor} text-2xl sm:text-4xl`}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
            />
          </div>
        </div>
        <button className=" bg-gray-400   rounded-2xl flex items-center justify-center p-2">
          <FiSend className="text-2xl sm:text-4xl   " />
        </button>
      </form>
      {isOpenWindow && (
        <Notification
          textContent={
            "This functionality is currently not available. Coming soon!"
          }
          onIsOpenWindow={setIsOpenWindow}
        />
      )}
    </div>
  );
}

export default ChatBox;
