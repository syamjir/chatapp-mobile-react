import React, { useState } from "react";
import { BiEnvelope, BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, setResetMessage } from "../redux/user/userSlice";

function SendResetMail({ onIsOpenWindow }) {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { resetPasswordMessage, resetPasswordError, resetPasswordSendStatus } =
    useSelector((state) => state.user);

  function handleSubmit(e) {
    e.preventDefault();
    if (email) {
      dispatch(resetPassword({ email }));
      setEmail("");
    }
  }
  return (
    <div className="fixed inset-0 flex  items-center justify-center backdrop-blur-2xl">
      <div className="grid  relative gap-4 text-center border-b-2 border-main bg-stone-200 p-8    rounded-lg">
        <h2 className="text-lg mb-1 ">Reset Your Password</h2>
        <BiX
          className="text-2xl absolute top-0 right-0 ml-auto text-stone-500  cursor-pointer"
          onClick={() => {
            dispatch(setResetMessage());
            onIsOpenWindow(false);
          }}
        />

        <div className="flex items-center bg-stone-300 p-2 rounded-lg gap-2">
          <BiEnvelope />
          <input
            required
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-none bg-stone-300  font-normal focus:outline-none rounded-lg"
          />
        </div>
        <button
          className="p-2 cursor-pointer font-medium bg-main text-stone-100 rounded-lg "
          onClick={handleSubmit}
        >
          {resetPasswordSendStatus === "loading"
            ? "Loading..."
            : "Send Reset Email"}
        </button>

        <p
          className={`${
            !resetPasswordError ? "text-green-600" : "text-red-600"
          } font-normal  rounded-full`}
        >
          {resetPasswordMessage}
        </p>
      </div>
    </div>
  );
}

export default SendResetMail;
