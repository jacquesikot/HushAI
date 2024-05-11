import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Chat {
  id: number;
  created_at: string;
  user_id: string;
  title: string;
  description: string;
}

interface ChatState {
  activeChat: Chat | null;
}

const initialState: ChatState = {
  activeChat: null,
};

const chatReducer = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<Chat>) => {
      state.activeChat = action.payload;
    },
  },
});

export const { setActiveChat } = chatReducer.actions;

export default chatReducer.reducer;
