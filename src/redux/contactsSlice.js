import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

// export const fetchContacts = createAsyncThunk(
//   "contacts/fetchAll",
//   async function (_, {rejectWithValue}) {
//     try {
//       const response = await fetch(`https://642c80b866a20ec9ce8982be.mockapi.io/contacts`);
//     console.log(response);
//       if (!response.ok) {
//         throw new Error(`Server Error!`);
//     }
//       const data = await response.json();

//     return data;
      
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
    
//   }
// );

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  
  // reducers: {
  //   addContact(state, action) {
  //     state.push(action.payload);
  //   },
  //   deleteContact(state, action) {
  //       const index = state.findIndex(contact => contact.id === action.payload);
  //       console.log(index);
  //     state.splice(index, 1);
  //   },
  // },
  extraReducers: {
    [fetchContacts.pending] (state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled] (state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addContact.pending](state) {
      state.isLoading = true;
    },
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    [deleteContact.pending](state) {
      state.isLoading = true;
    },
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      state.items.splice(index, 1);
    },
    [deleteContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;

// export const { addContact, deleteContact } = contactsSlice.actions;
