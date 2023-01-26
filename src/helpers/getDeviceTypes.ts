import { DeviceType } from "../constants/DeviceType";

function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
}

export const getDeviceTypes = () => {
    const types: string [] = []
    for (const value of enumKeys(DeviceType)) {
        types.push(DeviceType[value]);       
    }
    return types;
} 