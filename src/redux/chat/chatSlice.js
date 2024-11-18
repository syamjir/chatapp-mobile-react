import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleListenForMessages } from "../../services/apiListenMessage";
import { handleSendMessage } from "../../services/apiSendMessage";

// Thunk to listen for message in real-time

export const listenMessages = createAsyncThunk(
  "chat/listenForMessages",
  async ({ chatId }, { dispatch, rejectWithValue }) => {
    try {
      handleListenForMessages(chatId, (messages) => {
        dispatch(setMessages(messages));
      });
    } catch (err) {
      console.log("Error fetching message:", err);
      return rejectWithValue(err.message || "Error fetching message");
    }
  }
);

// Thunk to send a new message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatId, userId, text }, { rejectWithValue }) => {
    try {
      await handleSendMessage(chatId, userId, text);
    } catch (err) {
      console.log("Error sending message", err.message);
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  messages: [],
  status: "idle",
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    // handle listen messages
    builder
      .addCase(listenMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listenMessages.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(listenMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //   handle sending message

    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setMessages } = chatSlice.actions;
export default chatSlice.reducer;
