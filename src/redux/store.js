import { configureStore } from "@reduxjs/toolkit";
import themeModeSlice from "./features/themeModeSlice";
import appStateSlice from "./features/appStateSlice";
import authModalSlice from "./features/authModalSlice";

const store = configureStore({
    reducer:{
        themeMode: themeModeSlice,
        appState: appStateSlice,
        authModal: authModalSlice,
    }
});

export default store;
