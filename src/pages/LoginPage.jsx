import { useEffect, useRef, useState } from "react";
import { MdClose, MdLock } from "react-icons/md";
import { BiEnvelope } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../redux/user/userSlice";
import { useMoveBack } from "../hooks/useMoveBack";
import { Link, useNavigate } from "react-router-dom";

import { useFocusInput } from "../hooks/useFocusInput";
import SendResetMail from "../components/SendResetMail";

function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpenWindow, setIsOpenWindow] = useState(false);
  const dispatch = useDispatch(); // Hook to dispatch actions
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  // focus email input
  const emailRef = useFocusInput();

  // Extract user-related data from the store
  const { username, photo, status, error, email, userId } = useSelector(
    (state) => state.user
  );
  // Handle the login submission
  function handleLogin(e) {
    e.preventDefault();
    if (userEmail && password) {
      // Dispatch the signInUser thunk action
      dispatch(signInUser({ userEmail, password, navigate }));
    }
  }

  const inputStyle =
    "flex items-center gap-2  py-2  font-normal sm:font-medium sm:text-lg px-4 bg-stone-200 rounded-2xl";

  return (
    <form
      className="text-text-dark grid   gap-6 h-screen   py-2"
      onSubmit={handleLogin}
    >
      {isOpenWindow && <SendResetMail onIsOpenWindow={setIsOpenWindow} />}
      <MdClose className="text-3xl text-main " onClick={moveBack} />
      <h5 className="text-2xl  mt-auto  ">Log in Using Email</h5>
      <div className={inputStyle}>
        <BiEnvelope />
        <input
          required
          ref={emailRef}
          type="email"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="bg-transparent gap-2 border-none focus:outline-none"
        />
      </div>
      <div className={inputStyle}>
        <MdLock />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-transparent border-none focus:outline-none"
        />
      </div>
      {error && (
        <span className="bg-red-300 text-center text-sm font-medium py-1 rounded-full">
          {error}
        </span>
      )}
      <button className="p-2   sm:text-xl rounded-2xl bg-main text-stone-100">
        {status === "loading" ? "Loading..." : "Login"}
      </button>

      <p className="text-center font-normal text-base sm:text-lg ">
        Forgot Password ?{" "}
        <strong
          className="underline cursor-pointer"
          onClick={() => setIsOpenWindow(true)}
        >
          click me
        </strong>
      </p>
      <footer className="flex items-center justify-center text-base sm:text-lg gap-2 mt-[400px] ">
        <p className="font-medium">Don't have an account yet ?</p>
        <Link to={"/signup"} className="text-blue-600  font-semibold">
          Signup now
        </Link>
      </footer>
    </form>
  );
}

export default LoginPage;
