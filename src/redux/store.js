import { configureStore } from "@reduxjs/toolkit";
import themeModeSlice from "./features/themeModeSlice";
import appStateSlice from "./features/appStateSlice";
import authModalSlice from "./features/authModalSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import userSlice from "./features/userSlice";

const store = configureStore({
  reducer: {
    themeMode: themeModeSlice,
    appState: appStateSlice,
    authModal: authModalSlice,
    globalLoading: globalLoadingSlice,
    user: userSlice,
  },
});

export default store;
