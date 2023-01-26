import { ALL_VALUE } from "../components/DeviceList/DeviceList";
import { IDevice } from "../models/IDevice";

export const filterDevicesBy = (devices: IDevice[], selectedDeviceType: string) =>
(devices.filter(x => (selectedDeviceType != ALL_VALUE && x.type == selectedDeviceType) || selectedDeviceType == ALL_VALUE))