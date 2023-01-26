import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveDeviceAsync, fetchDevicesAsync, deleteDevicesAsync } from '../../api/device.api';
import { IDevice } from '../../models/IDevice';

export interface DeviceState {
  active: IDevice | undefined;
  devices: IDevice[];
  isLoading: boolean;
  isError: boolean;
}

export const initialStateDevice: DeviceState = {
  active: undefined,
  devices: [],
  isLoading: false,
  isError: false
};

export const fetchAllDevices = createAsyncThunk('devices/fetchAll', async () => {
  const result = await fetchDevicesAsync();
  return result;
});

export const saveDevice = createAsyncThunk('device/save', async (device: IDevice) => {  
  const result = await saveDeviceAsync(device);  
  return result;
});

export const updateDevice = createAsyncThunk('device/update', async (device: IDevice) => {
  const result = await saveDeviceAsync(device);
  return result;
});

export const deleteDevice = createAsyncThunk('device/delete', async (device: IDevice) => {
  const result = await deleteDevicesAsync(device);
  return result;
});

export const deviceSlice = createSlice({
  name: 'device',
  initialState: initialStateDevice,
  reducers: {
    activeDevice: (state, action: PayloadAction<IDevice>) => {
      state.active = state.devices.find(item => item.id == action.payload.id)
    },
    clearDevice: (state) => {
      state.active = undefined
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllDevices.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });    
    builder.addCase(fetchAllDevices.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });   
    builder.addCase(fetchAllDevices.fulfilled, (state, action) => {
      state.devices = [...action.payload];
      state.isLoading = false;
    });
    builder.addCase(saveDevice.pending, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(saveDevice.fulfilled, (state, action) => {
      if (action.payload) {
        state.devices = [...state.devices, action.payload];
        state.active = action.payload;
      }
      state.isLoading = false;
    });  
    builder.addCase(saveDevice.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });   
    builder.addCase(updateDevice.pending, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(updateDevice.fulfilled, (state, action) => {
      if (action.payload) {
        state.devices = state.devices.map(device => {
          if (device.id == action.payload.id) {
            return action.payload;
          }
          return device;
        });
        state.active = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(updateDevice.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(deleteDevice.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(deleteDevice.fulfilled, (state, action) => {
      if (state.active?.id == action.payload.id) {
        state.active = undefined;
      }
      state.devices = state.devices.filter(item => item.id != action.payload.id);
      state.isLoading = false;
    });
    builder.addCase(deleteDevice.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { activeDevice, clearDevice, setLoading } = deviceSlice.actions;

export default deviceSlice.reducer;
