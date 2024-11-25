import { getAddress } from "../../services/apiGeocoding";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getLocalStorageState from "../../utilities/getLocalStorageState";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
  return { position, address };
});

const initialState = {
  userName: JSON.parse(getLocalStorageState("user")) || "",
  status: "idle",
  error: "",
  position: {},
  address: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddress.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.position = action.payload.position;
      state.address = action.payload.address;
      state.status = "idle";
    });
    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
export const { updateName } = userSlice.actions;
export { fetchAddress };
export default userSlice.reducer;
