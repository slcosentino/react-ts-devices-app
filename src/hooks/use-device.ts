import { useDispatch, useSelector } from "react-redux";
import { IDevice } from "../models/IDevice";
import { activeDevice, clearDevice, deleteDevice, fetchAllDevices, saveDevice, updateDevice } from "../redux/reducers/deviceReducer";
import { AppDispatch, RootState } from "../redux/store";

export const useDevice = (): {
  fetchAll: () => void;
  isLoading: boolean;
  addDevice: (device: IDevice) => void;
  clearDevice: () => void;
  deleteDevice: (device: IDevice) => void;
  activeDevice: (device: IDevice) => void;
  isError: boolean;
} => {
  const {isLoading, isError} = useSelector((state: RootState) => state.device);
  const dispatch = useDispatch<AppDispatch>();

  const fetchAll = () => {
    if (!isLoading) {
      dispatch(fetchAllDevices())
    }
  }

  const add = (device: IDevice) => {

    if (!isLoading) {
      if (device.id) {
        dispatch(updateDevice(device))
      }
      else {
        dispatch(saveDevice(device))
      }
    }
  }

  const remove = (device: IDevice) => {
    dispatch(deleteDevice(device));
  }

  const clear = () => {
    dispatch(clearDevice())
  }

  const active = (device: IDevice) => {
    dispatch(activeDevice(device))
  }

  return { fetchAll, isLoading, addDevice: add, clearDevice: clear, deleteDevice: remove, activeDevice: active, isError }

}
