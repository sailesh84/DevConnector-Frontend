import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Calling get api - READ USER
export const showAllUser = createAsyncThunk("showAllUser", async () => {
    const response = await fetch("https://66378002288fedf693807ca3.mockapi.io/dev/v1/users");
    try {
        const result = await response.json();
        return result;
    }
    catch (error) {
        // return rejectWithValue(error);
    }
});

//Calling post api - CREATE USER
export const createUser = createAsyncThunk("createUser", async (data, { rejectWithValue }) => {
    const response = await fetch("https://66378002288fedf693807ca3.mockapi.io/dev/v1/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    try {
        const result = await response.json();
        return result;
    }
    catch (error) {
        return rejectWithValue(error);
    }
});


export const userDetails = createSlice({
    name: "userDetails",
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        // GET USER
        builder.addCase(showAllUser.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(showAllUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });

        builder.addCase(showAllUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        // CREATE USER
        builder.addCase(createUser.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
            const loadedPost = action.payload;
            state.data.push(loadedPost);
        });

        builder.addCase(createUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export default userDetails.reducer;