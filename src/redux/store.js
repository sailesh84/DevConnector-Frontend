import { configureStore } from "@reduxjs/toolkit";
import postDetails from "./slice/postDetails";
import userDetails from "./slice/userDetails";

export const store = configureStore({
    reducer: {
        app: userDetails,
        post: postDetails
    }
});