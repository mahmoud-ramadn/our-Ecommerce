import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

// Define the shape of the form data and response types
type TFormData = {
  email: string;
  password: string;
};

type TResponse = {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  accessToken: string;
};

// Create the async thunk for the login action
const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      // Make the POST request to the login endpoint
      const response = await axios.post<TResponse>("/login", formData);
      return response.data;
    } catch (error) {
      // Handle any errors by returning the appropriate error message
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthLogin;
