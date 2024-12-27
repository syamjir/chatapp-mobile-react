import { useEffect, useState } from "react";
import {
  BiCamera,
  BiChat,
  BiSearch,
  BiPhoneCall,
  BiCog,
  BiLogOut,
} from "react-icons/bi";
import ChatListItem from "../components/ChatListItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../redux/user/contactListSlice";
import Spinner from "../components/Spinner";
import Notification from "../components/Notification";

function DashboardPage() {
  const [searchEmail, setSearchEmail] = useState("");
  const [activePage, setActivePage] = useState(null);
  const [isOpenWindow, setIsOpenWindow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.userId);
  const { contactList, status } = useSelector((state) => state.contactList);

  function handleFetchContact(e) {
    e.preventDefault();
    if (searchEmail) {
      dispatch(fetchContacts({ searchEmail, currentUserId }));
      setSearchEmail("");
    }
  }

  function handleActivePage(activeEl) {
    setActivePage(activeEl);
  }

  useEffect(function () {
    setActivePage("chats");
  }, []);
  const inputDisabled = status === "loading";
  const activePageStyle = "bg-stone-200 rounded-lg   ";

  return (
    <div className="grid grid-rows-[20px_40px_1fr_20px]  h-screen p-1  py-6 gap-6 ">
      <header className="flex  items-center justify-between ">
        <h2 className="text-4xl text-main">VAva</h2>
        <div className="flex text-4xl text-main gap-4">
          <BiCamera
            onClick={() => setIsOpen(true)}
            className="cursor-pointer"
          />
          <BiLogOut onClick={() => setIsOpenWindow(true)} />
        </div>
      </header>
      <form
        className=" relative flex items-center gap-2 w-full bg-stone-100 px-4 py-3 rounded-xl bg-stone-200 "
        onSubmit={handleFetchContact}
      >
        <BiSearch className="text-2xl text-main" />
        <input
          disabled={inputDisabled}
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          type="email"
          placeholder="Add contacts by email..."
          className="bg-transparent  outline-none text-lg font-medium"
        />
        {status === "loading" && (
          <Spinner onSize={30} containerPosition={"left-3"} />
        )}
      </form>

      <section className=" overflow-scroll flex flex-col gap-4  ">
        {contactList.map((contact) => (
          <ChatListItem
            onContact={contact}
            contactId={contact.uid}
            key={contact.uid}
          />
        ))}
      </section>
      {isOpenWindow && (
        <Notification
          textContent={"Are you sure you want to log out ?"}
          onIsOpenWindow={setIsOpenWindow}
        />
      )}
      {isOpen && (
        <Notification
          textContent={
            "This functionality is currently not available. Coming soon!"
          }
          onIsOpenWindow={setIsOpen}
        />
      )}
      <footer className="flex items-center justify-between  py-3  ">
        <div className="flex flex-col  items-center">
          <div
            className={activePage === "settings" ? activePageStyle : ""}
            onClick={() => handleActivePage("settings")}
          >
            <BiCog
              className="text-4xl w-[50px] text-main cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          </div>
          <p>Settings</p>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col  items-center">
            <div
              className={activePage === "chats" ? activePageStyle : ""}
              onClick={() => handleActivePage("chats")}
            >
              <BiChat className="text-4xl w-[50px] text-main cursor-pointer" />
            </div>
            <p>Chats</p>
          </div>
          <div className="flex flex-col  items-center">
            <div
              className={activePage === "calls" ? activePageStyle : ""}
              onClick={() => handleActivePage("calls")}
            >
              <BiPhoneCall
                className="text-4xl  w-[50px] text-main cursor-pointer"
                onClick={() => {
                  setIsOpen(true);
                }}
              />
            </div>
            <p>Calls</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DashboardPage;
