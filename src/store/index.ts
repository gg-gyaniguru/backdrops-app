import {configureStore} from "@reduxjs/toolkit";
import user from './slice/user.ts';

const store = configureStore({
    reducer: {
        user
    }
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export default store;