import { ALL_VALUE } from "../components/DeviceList/DeviceList"
import { DeviceType } from "../constants/DeviceType";
import { DEVICES } from "../Data/devices"
import { filterDevicesBy } from "./filterDevicesBy"

describe('filterDevicesBy', () => {

    it('Return all devices', () => {
        const filteredDevices = filterDevicesBy(DEVICES, ALL_VALUE)
        expect(filteredDevices).toEqual(DEVICES)
    })

    it('Return 4 MAC devices', () => {
        const filteredDevices = filterDevicesBy(DEVICES, DeviceType.MAC)
        expect(filteredDevices.length).toBe(4)
    })

    it('Return 3 WINDOWS_SERVER devices', () => {
        const filteredDevices = filterDevicesBy(DEVICES, DeviceType.WINDOWS_SERVER)
        expect(filteredDevices.length).toBe(3)
    })

    it('Return 3 WINDOWS_WORKSTATION devices', () => {
        const filteredDevices = filterDevicesBy(DEVICES, DeviceType.WINDOWS_SERVER)
        expect(filteredDevices.length).toBe(3)
    })

    it('Return 0 if option not exist', () => {
        const filteredDevices = filterDevicesBy(DEVICES, "")
        expect(filteredDevices.length).toBe(0)
    })
});