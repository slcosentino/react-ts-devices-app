import { DEVICE_API_URL } from "../constants/config"
import { DEVICES } from "../Data/devices"
import { IDevice } from "../models/IDevice"
import { appFetch } from "./appFetch"
import shortid from "shortid"

const isMockedData: boolean = !!process.env.REACT_APP_MOCKED_DATA && JSON.parse(process.env.REACT_APP_MOCKED_DATA);

export const fetchDevicesAsync = async (): Promise<IDevice[]> => {  
  
  if(isMockedData){
    return DEVICES
  }
   
  const responseBody = await appFetch<IDevice[]>(DEVICE_API_URL)  
  return responseBody ? responseBody: [];
   
}

export const saveDeviceAsync = async (device: IDevice):  Promise<IDevice> => {      
  let id = device.id;

  if(isMockedData){
    if(!id){
      id = shortid.generate()
    }
    return {...device, id}
  }

  return saveAsync(device)  
  
}

export const deleteDevicesAsync = async (device: IDevice): Promise<IDevice> => {  
  
  if(isMockedData){
    return device
  }
  
  const responseBody = await appFetch<IDevice>(`${DEVICE_API_URL}/${device.id?.trim()}`,{
    method: "DELETE",   
  })  

  return device;
   
}

const saveAsync = async (device: IDevice) => {
  const url =  device.id ? `${DEVICE_API_URL}/${device.id.trim()}` : DEVICE_API_URL;
  const method = device.id ? "PUT" : "POST"; 
  const  id = device.id;
  delete device.id;

  const responseBody = await appFetch<IDevice>(url,{
    method: method,
    body:JSON.stringify(device),
    headers: {
      'Content-Type': 'application/json'     
    },
  }) 

  let deviceResult = responseBody ? responseBody : device;

  if(id){
    deviceResult = {...device, id}
  }
    
  return deviceResult;
}
 