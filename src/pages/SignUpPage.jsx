import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiEnvelope, BiUser, BiLock } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { createUser, signUpUser } from "../redux/user/userSlice";
import { validatePhoto } from "../utils/helper";
import { useMoveBack } from "../hooks/useMoveBack";
import { Link, useNavigate } from "react-router-dom";
import { useFocusInput } from "../hooks/useFocusInput";

function SignUpPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const userRef = useFocusInput();
  const { error, status } = useSelector((store) => store.user);
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file && validatePhoto(file)) {
      setPhoto(file);
    } else {
      setPhoto(null); // Reset if validation fails
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // First dispatch to validate user input
    dispatch(createUser(userName, email, password, passwordConfirm, photo));

    if (password === passwordConfirm && !error && photo) {
      // Only proceed with Firebase sign-up if passwords match and no input errors
      dispatch(
        signUpUser({ userEmail: email, password, userName, photo, navigate })
      );
    }
  }

  const inputStyle =
    "flex items-center gap-3 p-2 font-normal px-4 bg-stone-200 rounded-xl";
  return (
    <form
      className="text-text-dark grid gap-6 h-screen   "
      onSubmit={handleSubmit}
    >
      <MdClose className="text-3xl text-main mt-4" onClick={moveBack} />
      <header className="text-center">
        <h2 className=" text-center text-2xl mb-2">Create an Account</h2>
        <p className="font-medium">Be part of something bigger—sign up now!</p>
      </header>
      <div className={inputStyle}>
        <BiUser />
        <input
          ref={userRef}
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="Username"
          className="bg-transparent gap-2 border-none focus:outline-none"
        />
      </div>
      <div className={inputStyle}>
        <BiEnvelope />
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="bg-transparent gap-2 border-none focus:outline-none"
        />
      </div>
      <div className={inputStyle}>
        <BiLock />
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="bg-transparent border-none focus:outline-none"
        />
      </div>
      <div className={inputStyle}>
        <BiLock />
        <input
          required
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          type="password"
          placeholder="Confirm Password"
          className="bg-transparent border-none focus:outline-none"
        />
      </div>

      {error && (
        <span className="bg-red-300 text-center text-sm font-medium py-1 rounded-full">
          {error}
        </span>
      )}
      <div className={inputStyle}>
        <input
          onChange={handlePhotoChange}
          required
          type="file"
          className="text-sm text-gray-400
          file:mr-2 file:py-1 file:px-3 file:border-none file:rounded-full
          file:text-xs file:font-medium
          file:bg-stone-100 file:text-stone-700
          hover:file:cursor-pointer hover:file:bg-gray-600
          hover:file:text-stone-200"
        />
      </div>
      <button className="p-2 rounded-xl bg-main text-stone-100">
        {status === "loading" ? "Loading..." : "Sign Up"}
      </button>
      <footer className="flex pb-3  items-center gap-2 mt-[340px] justify-center ">
        <p className="font-medium">Already have an account ?</p>
        <Link to={"/login"} className="text-blue-700 font-semibold">
          Login
        </Link>
      </footer>
    </form>
  );
}

export default SignUpPage;
