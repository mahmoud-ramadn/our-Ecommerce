import { createSlice } from "@reduxjs/toolkit";
import { TLoading, isString } from "@types";
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";

// Define the shape of the authentication state
interface IAuthState {
    accessToken: string | null;
    user: {
        id: number; 
        email: string;
        firstName: string;
        lastName: string;
    } |  null;
    loading: TLoading;
    error: string | null;
}

// Initial state of the authentication slice
const initialState: IAuthState = {
    user: null,
    accessToken: null,
    loading: "idle",
    error: null,
};

// Create the auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Resets the loading and error state
        resetUI: (state) => {
            state.loading = "idle";
            state.error = null;
        },
        // Logs out the user by resetting the accessToken and user information
        authLogOut: (state) => {
            state.accessToken = null;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        // Handling registration actions
        builder.addCase(actAuthRegister.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAuthRegister.fulfilled, (state) => {
            state.loading = "succeeded";
        });
        builder.addCase(actAuthRegister.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

        // Handling login actions
        builder.addCase(actAuthLogin.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAuthLogin.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        });
        builder.addCase(actAuthLogin.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    }
});

// Export the action creators and reducer
export { actAuthRegister, actAuthLogin };
export const { resetUI, authLogOut } = authSlice.actions;
export default authSlice.reducer;
