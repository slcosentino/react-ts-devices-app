import { useDispatch, useSelector } from "react-redux";
import { setModalDevice } from "../redux/reducers/uiReducer";
import { AppDispatch, RootState } from "../redux/store";

export const useModalDevice = (): {
  setModalDevice: (isOpen: boolean) => void;  
  isOpen: boolean; 
} => {
  const isOpen = useSelector((state: RootState) => state.ui.modalDeviceOpen);
  const dispatch = useDispatch<AppDispatch>();

  const setModalDeviceConfig = (isOpen: boolean) => {
    dispatch(setModalDevice(isOpen))
  } 

  return { setModalDevice: setModalDeviceConfig, isOpen };
}
