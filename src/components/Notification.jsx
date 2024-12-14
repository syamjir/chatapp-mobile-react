import React from "react";
import { BiX } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { signOutUser } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function Notification({ textContent, onIsOpenWindow }) {
  // This functionality is currently not available. Coming soon!
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function confirmLogout() {
    dispatch(signOutUser({ navigate }));
    onIsOpenWindow(false);
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center rounded-lg p-2 backdrop-blur-sm  ">
      <div className="bg-white p-4 flex-col items-center gap-4 rounded-lg shadow-lg border-b-4 border-main flex">
        <div className="flex gap-2">
          <p className="text-center text-lg ">{textContent}</p>
          <BiX
            className="text-3xl text-main  cursor-pointer"
            onClick={() => onIsOpenWindow(false)}
          />
        </div>
        {textContent === "Are you sure you want to log out ?" && (
          <button
            className="p-2 bg-main w-[40%] rounded-lg text-stone-100"
            onClick={confirmLogout}
          >
            Confirm me
          </button>
        )}
      </div>
    </div>
  );
}

export default Notification;
