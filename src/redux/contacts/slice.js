import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { deleteContact, addContact, fetchContacts } from './operations';
import { logout } from '../auth/operations';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((item) => item.id !== payload);
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.unshift(payload);
      })
      .addCase(logout.fulfilled, () => initialState)
      .addMatcher(
        isAnyOf(
          addContact.pending,
          deleteContact.pending,
          fetchContacts.pending
        ),
        (state) => {
          state.loading = true;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          addContact.rejected,
          deleteContact.rejected,
          fetchContacts.rejected
        ),
        (state) => {
          state.loading = false;
          state.error = true;
        }
      )
      .addMatcher(
        isAnyOf(
          addContact.fulfilled,
          deleteContact.fulfilled,
          fetchContacts.fulfilled
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const contactsReducer = slice.reducer;
