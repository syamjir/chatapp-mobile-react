import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleSignUp } from "../../services/apiSignUp";
import { handleSignIn } from "../../services/apiLogin";
import { fetchContacts } from "./contactListSlice";
import { handleLogout } from "../../services/apiSignOut";
import { sendPasswordResetMail } from "../../services/apiResetPassword";

export const signUpUser = createAsyncThunk(
  "user/signUp",
  async (
    { userEmail, password, userName, photo, navigate },
    { rejectWithValue }
  ) => {
    try {
      // Handle sign-up and return user data
      const { uid, displayName, email, photoURL } = await handleSignUp(
        userEmail,
        password,
        userName,
        photo
      );

      if (navigate) {
        navigate("/dashboard");
      }
      return { uid, displayName, email, photoURL }; // Return necessary user data
    } catch (error) {
      return rejectWithValue(error.message); // Return error message
    }
  }
);

export const signInUser = createAsyncThunk(
  "user/signIn",
  async ({ userEmail, password, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const { photo, userName, uid, email } = await handleSignIn(
        userEmail,
        password
      );
      console.log(photo, userName, uid, email);
      if (uid && email && dispatch && navigate) {
        dispatch(fetchContacts({ searchEmail: email, currentUserId: uid }));
        navigate("/dashboard");
      }
      return { userName, photo, uid, email };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message); // Handle errors
    }
  }
);

export const signOutUser = createAsyncThunk(
  "user/signOut",
  async ({ navigate }, { rejectWithValue }) => {
    try {
      await handleLogout();
      if (navigate) {
        navigate("/login");
      }
    } catch (err) {
      console.log("Logout error:", err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      await sendPasswordResetMail(email);
      return "Password reset email sent successfully 🙂";
    } catch (err) {
      console.log("Error to send reset email:", err);
      return rejectWithValue(err.message);
    }
  }
);

export const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
  userId: "",
  photo: null,
  error: null,
  status: "idle",
  recieverId: "",
  resetPasswordMessage: "",
  resetPasswordError: "",
  resetPasswordSendStatus: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveSenderId(state, action) {
      state.recieverId = action.payload;
    },
    setResetMessage(state) {
      state.resetPasswordMessage = "";
    },
    createUser: {
      prepare(username, email, password, passwordConfirm, photo) {
        return {
          payload: { username, email, password, passwordConfirm, photo },
        };
      },
      reducer(state, action) {
        state.password = action.payload.password;
        state.passwordConfirm = action.payload.passwordConfirm;
        if (state.password !== state.passwordConfirm) {
          state.error = "Password mismatch, try again!";
        } else {
          state.error = null;
          state.username = action.payload.username;
          state.email = action.payload.email;
          state.photo = action.payload.photo;
        }
      },
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle sign-up
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.username = action.payload.displayName;
        state.email = action.payload.email;
        state.photo = action.payload.photoURL;
        state.userId = action.payload.uid;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        console.log(action.payload);
        state.error =
          action.payload || "There was a problem creating the user!";
        state.status = "idle";
      })

      // Handle sign-in
      .addCase(signInUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.username = action.payload.userName;
        state.photo = action.payload.photo;
        state.userId = action.payload.uid;
        state.email = action.payload.email;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload || "There was a problem logging in!";
        state.status = "idle";
      })

      // handle sign-out
      .addCase(signOutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutUser.fulfilled, (state) => {
        (state.username = ""),
          (state.email = ""),
          (state.password = ""),
          (state.passwordConfirm = ""),
          (state.userId = ""),
          (state.photo = null),
          (state.error = null),
          (state.status = "idle");
      })
      .addCase(signOutUser.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload || "Logout error";
        state.status = "idle";
      });
    // handle send reset password email
    builder
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordMessage = "";
        state.resetPasswordSendStatus = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordSendStatus = "idel";
        state.resetPasswordMessage = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordSendStatus = "idle";
        state.resetPasswordError = action.payload;
      });
  },
});

export const { createUser, saveSenderId, setResetMessage } = userSlice.actions;
export default userSlice.reducer;
