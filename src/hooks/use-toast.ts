import { useDispatch, useSelector } from "react-redux";
import { IToast } from "../models/IToast";
import { setToast } from "../redux/reducers/uiReducer";
import { AppDispatch, RootState } from "../redux/store";

export const useToast = (): {
  setToast: (config: IToast) => void;  
  toastConfig: IToast 
} => {
  const toastConfig = useSelector((state: RootState) => state.ui.toast);
  const dispatch = useDispatch<AppDispatch>();

  const setToastConfig = (config: IToast) => {
    dispatch(setToast(config))
  } 

  return { setToast: setToastConfig, toastConfig };
}
