import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Base API URL stored in Redux
const BASE_API_URL = 'https://intechsol.co/sav/api';

// Async Thunk for signup
export const signupUser = createAsyncThunk('user/signupUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/register`, userData);
    return response.data; // Return the user data from the API
  } catch (error) {
    return rejectWithValue(error.response.data); // Return error message if signup fails
  } 
});

// Async Thunk for login
export const loginUser = createAsyncThunk('user/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/login`, credentials);
    return response.data; // Return user data on successful login
  } catch (error) {
    return rejectWithValue(error.response.message); // Return error message if login fails
  }
});

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (formData, { getState, rejectWithValue }) => {
    const state = getState(); // Get the entire state
    const apiToken = state.user.user.userdata.api_token; // Safely access API token from state

    // console.log('FormData:', formData);
    // console.log('API Token:', apiToken);
    
    try {
      const response = await axios.post(
        'https://intechsol.co/sav/api/edit',
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`, // Attach the API token to the request
          },
        }
      );
      // console.log(response.data);
      
      return response.data.userdata; // Return the updated user data from the API
    } catch (error) {
      console.error('Error updating profile:', error);
      return rejectWithValue(error.response?.data || 'Error updating profile'); // Return meaningful error
    }
  }
);


// Initial state for the user slice
const initialState = {
  isAuthenticated: false,
  user: null,  // This is where user data, including userdata, will be stored
  loading: false,
  error: null,
  baseApiUrl: BASE_API_URL,
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.loading = false;
    },
    // Reducer to update the user state directly
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }; // Merge the updated fields with existing user data
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup case reducers
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;  // Assuming the API returns the full user object on signup
        state.loading = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Signup failed';
      })

      // Login case reducers
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;  // Assuming the API returns userdata on login
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      })

      // Update user profile case reducers
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        // console.log('Updated user data:', action.payload); // Log the response for debugging
        // console.log(state.user);
        
        if (action.payload) {
          state.user.userdata = action.payload; // Assuming the updated user data is returned in this format
          state.loading = false;
          state.error = null;
        } else {
          state.loading = false;
          state.error = action.payload.message || 'Failed to update profile';
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Update profile failed';
      });
  },
});

// Export actions and reducer
export const { logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
