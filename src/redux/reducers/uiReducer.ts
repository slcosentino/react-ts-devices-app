import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IToast } from '../../models/IToast';

export interface UiState {
    toast: IToast;
    modalDeviceOpen:boolean;
}

export const initialStateUi: UiState = {
    toast: { message: '', vertical: 'top', horizontal: 'right', isOpen: false, color: "success" },
    modalDeviceOpen: false
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState: initialStateUi,
    reducers: {
        setToast: (state, action: PayloadAction<IToast>) => {
            state.toast =  action.payload;
        }, 
        setModalDevice: (state, action: PayloadAction<boolean>) => {
            state.modalDeviceOpen =  action.payload;
        },        
    }, 
});

export const { setToast, setModalDevice } = uiSlice.actions;

export default uiSlice.reducer;
