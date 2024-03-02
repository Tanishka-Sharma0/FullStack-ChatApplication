import { configureStore } from "@reduxjs/toolkit";
import themeslicerReducer from "./themeslice";
import refreshsidebar from './refreshsidebar';

export const store = configureStore({
  reducer:{
    themeKey : themeslicerReducer,
    refreshkey : refreshsidebar
  }
});
