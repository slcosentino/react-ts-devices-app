export interface IDevice {
    id?: string;
    system_name: string;
    type: "WINDOWS_SERVER" | "WINDOWS_WORKSTATION" | "MAC" | "WINDOWS" | "LINUX";
    hdd_capacity: string;    
} 