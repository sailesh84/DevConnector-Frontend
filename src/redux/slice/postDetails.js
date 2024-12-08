import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Calling get api - READ POSTS
export const showAllPost = createAsyncThunk("showAllPost", async () => {
    const response = await fetch("https://66378002288fedf693807ca3.mockapi.io/dev/v1/posts");
    try {
        const result = await response.json();
        return result;
    }
    catch (error) {
        // return rejectWithValue(error);
    }
});


export const postDetails = createSlice({
    name: "postDetails",
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        // GET POSTS
        builder.addCase(showAllPost.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(showAllPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });

        builder.addCase(showAllPost.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export default postDetails.reducer;