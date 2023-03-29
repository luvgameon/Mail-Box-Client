import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem("idToken"),
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    ongetToken(state, action) {
      state.token = action.payload;
    },
  },
});
const initialComposeState = {
  compose: false,
};

const ShowComposeSice = createSlice({
  name: "ShowCompose",
  initialState: initialComposeState,
  reducers: {
    toggleCompose(state) {
      state.compose = !state.compose;
    },
  },
});
const initialMailState = {
  Mail: [],
};

const MailSlice = createSlice({
  name: "Mail",
  initialState: initialMailState,
  reducers: {
    onsendreadmail(state, action) {
      if (action.payload == null) {
      } else {
        state.Mail = action.payload;
      }
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    compose: ShowComposeSice.reducer,
    Mail: MailSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const ShowComposeActions = ShowComposeSice.actions;
export const MailActions = MailSlice.actions;

export default store;
