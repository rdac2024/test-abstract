import { combineReducers } from "@reduxjs/toolkit";
import userDetailsReducer from "src/redux/userDetail/reducer";

export const rootReducers = combineReducers({
  userDetailsReducer,
});
