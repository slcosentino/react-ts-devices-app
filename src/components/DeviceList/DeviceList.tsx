import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import DeviceItem from '../DeviceItem/DeviceItem';
import { AlertColor, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { IDevice } from '../../models/IDevice';
import { DeviceListHeader } from '../DeviceListHeader/DeviceListHeader';
import { filterDevicesBy } from '../../helpers/filterDevicesBy';
import { RootState } from '../../redux/store';
import { useDevice } from '../../hooks/use-device';
import { useModalDevice } from '../../hooks/use-modal-device';
import { useToast } from '../../hooks/use-toast';

export const ALL_VALUE = 'all'
 
const DeviceList = () => {
    const devices = useSelector((state: RootState) => state.device.devices); 
    const { deleteDevice, activeDevice, isError } = useDevice();   
    const { setModalDevice } = useModalDevice();  
    const [filteredDevices, setFilteredDevices] = useState<IDevice[]>([]);
    const [selectedDeviceType, setSelectedDeviceType] = useState(ALL_VALUE);
    const { toastConfig, setToast } = useToast();

    const handleDelete = (device: IDevice) => {
        deleteDevice(device);
        handleToast();
    }

    const handleToast = () => {
        let msg = 'Device has been deleted.';
        let color: AlertColor = "success";

        if (isError) {
            msg =  'There is an error to  delete the device.';
            color =  "error"
        }
        setToast({ ...toastConfig, isOpen: true, message: msg, color: color });
    }

    useEffect(() => {
        setFilteredDevices(filterDevicesBy(devices, selectedDeviceType));
    }, [devices])

    return (
        <>
            <DeviceListHeader filteredDevices={filteredDevices}
                setFilteredDevices={setFilteredDevices}
                selectedDeviceType={selectedDeviceType}
                setSelectedDeviceType={setSelectedDeviceType}
                setOpen={setModalDevice}
            />

            <TableContainer component={Paper} data-testid='table-devices'>
                <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>SYSTEM NAME</TableCell>
                            <TableCell align="right"> SYSTEM TYPE</TableCell>
                            <TableCell align="right">CAPACITY</TableCell>
                            <TableCell align="right"> &nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDevices.map((device, index) => (

                            <DeviceItem device={device}
                                key={device.system_name + "_" + index}
                                onDelete={() => handleDelete(device)}
                                onSelect={() => {
                                    activeDevice(device);
                                    setModalDevice(true);
                                }}
                            />

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>

    )
}

export default DeviceList
