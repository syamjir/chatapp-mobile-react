import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchUsers } from "../../services/apiSearchUsers";
import { addContact } from "../../services/apiAddContact";
import { fetchContactsFromDb } from "../../services/apiFetchContacts"; // Assuming this is a separate service

// Thunk to fetch and add contacts
export const fetchContacts = createAsyncThunk(
  "contactList/fetchContacts",
  async ({ searchEmail, currentUserId }, { rejectWithValue }) => {
    try {
      // Get contact from Firestore using the search term
      const contactData = await searchUsers(searchEmail);

      // Add contact in Firestore database
      await addContact(currentUserId, contactData[0].uid, contactData[0]);

      // Fetch updated contact list from Firestore
      const users = await fetchContactsFromDb(currentUserId); // Assuming a service to fetch contacts

      return users;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state for the contact list slice
const initialState = {
  contactList: [],
  error: null,
  status: "idle",
};

// Create the contact list slice
const contactListSlice = createSlice({
  name: "contactList",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contactList = action.payload; // Set the contact list

        state.status = "idle";
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "idle";
        state.error = "There was a problem getting contacts. Try again!";
      });
  },
});

export default contactListSlice.reducer;
