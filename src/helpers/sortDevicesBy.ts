import { DeviceSort } from "../constants/DeviceSort";
import { IDevice } from "../models/IDevice";

export const sortDevicesBy = (devices: IDevice[], field: string) => {

    if (field == DeviceSort.SYSTEM_NAME) {    
        return devices.sort((x, y) => x.system_name.localeCompare(y.system_name));
    }

    if (field == DeviceSort.SYSTEM_TYPE) {    
        return devices.sort((x, y) => x.type.localeCompare(y.type));
    }

    if (field == DeviceSort.CAPACITY) {    
        return devices.sort((x, y) => Number(x.hdd_capacity) - Number(y.hdd_capacity));
    }
    
    return devices;
}