import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

type TFormData = {
  FirstName: string;
  LastName: string;
  email: string;
  password: string;
};

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (formData: TFormData, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const res = await axios.post("/register", formData);
       console.log( typeof res.data.accessToken);
       
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthRegister;