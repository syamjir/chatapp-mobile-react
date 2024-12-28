import {
  BiChevronsRight,
  BiPlay,
  BiSolidMessageSquareDots,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div className="relative grid   justify-items-center gap-5 py-2 h-screen ">
      <div className="self-center ">
        <div className=" w-[320px] h-[320px]   sm:w-[450px] sm:h-[450px] rounded-full border-2 border-main flex  items-center justify-center ">
          <div className="w-[220px] h-[220px] sm:w-[350px] sm:h-[350px] rounded-full border-2 border-main flex  items-center justify-center">
            <div className="w-[140px] h-[140px] sm:w-[250px] sm:h-[250px] rounded-full border-2 border-main flex  items-center justify-center ">
              <BiSolidMessageSquareDots className="text-8xl text-main " />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-9">
        <h2
          className="text-text-dark animate-moveInTop text-4xl text-center max-w-xl "
          style={{ animationFillMode: "backwards" }}
        >
          Say hello to the world,anywhere, anytime.
        </h2>
        <div>
          <button
            className="bg-main animate-moveInRight text-stone-100 rounded-full items-center justify-end flex text-xl gap-7 pl-9 pr-2 py-2
              cursor-pointer "
            onClick={() => navigate("/login")}
          >
            Get started
            <div className="bg-stone-200  w-12 h-12 rounded-full flex justify-center items-center">
              <BiChevronsRight className="text-4xl text-main" />
            </div>
          </button>
          <button className="rounded-full animate-moveInLeft text-text-dark items-center bg-stone-200 justify-end flex text-xl gap-4 px-9 py-4 mt-6">
            <div className="bg-main w-8 h-8 rounded-full flex justify-center items-center ">
              <BiPlay className="text-5xl text-stone-300 ml-0.5 " />
            </div>
            Video Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
