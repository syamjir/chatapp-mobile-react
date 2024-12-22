import { useDispatch } from "react-redux";
import { setMessages } from "../redux/chat/chatSlice";

function useGetAllMessages(messages) {
  const dispatch = useDispatch();
  dispatch(setMessages(messages));
}

export default useGetAllMessages;
