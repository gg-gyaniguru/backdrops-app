import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    _id: null
}

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {

        },
        removeUser: (state, action) => {

        }
    }
});

export const {setUser, removeUser} = user.actions;
export default user.reducer;