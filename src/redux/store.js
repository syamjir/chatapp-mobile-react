import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import contactListReducer from "./user/contactListSlice";
import chatReducer from "./chat/chatSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    contactList: contactListReducer,
    chat: chatReducer,
  },
});
export default store;
