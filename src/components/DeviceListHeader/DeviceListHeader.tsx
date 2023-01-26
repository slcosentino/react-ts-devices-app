import { Button, Grid, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { DeviceSort } from '../../constants/DeviceSort';
import { filterDevicesBy } from '../../helpers/filterDevicesBy';
import { getDeviceTypes } from '../../helpers/getDeviceTypes';
import { sortDevicesBy } from '../../helpers/sortDevicesBy';
import { IDevice } from '../../models/IDevice';
import { RootState } from '../../redux/store';
import { ALL_VALUE } from '../DeviceList/DeviceList';

interface DeviceListHeaderProps {
    selectedDeviceType: string;
    setSelectedDeviceType: React.Dispatch<React.SetStateAction<string>>;
    filteredDevices: IDevice[];
    setFilteredDevices: React.Dispatch<React.SetStateAction<IDevice[]>>;
    setOpen: (status: boolean) => void;
}

export const DeviceListHeader = ({
    selectedDeviceType,
    setSelectedDeviceType,
    filteredDevices,
    setFilteredDevices,
    setOpen,
}: DeviceListHeaderProps) => {
    const devices = useSelector((state: RootState) => state.device.devices);
    const [selectedSortBy, setSelectedSortBy] = useState('')
    const [deviceType, setDeviceType] = useState<JSX.Element[]>([])

    const sortByOptions = [
        <MenuItem key={DeviceSort.SYSTEM_NAME} value={DeviceSort.SYSTEM_NAME}>{DeviceSort.SYSTEM_NAME}</MenuItem>,
        <MenuItem key={DeviceSort.SYSTEM_TYPE} value={DeviceSort.SYSTEM_TYPE}>{DeviceSort.SYSTEM_TYPE}</MenuItem>,
        <MenuItem key={DeviceSort.CAPACITY} value={DeviceSort.CAPACITY}>{DeviceSort.CAPACITY}</MenuItem>]

    const getDeviceOptions = () => {
        const options: JSX.Element[] = [<MenuItem key={ALL_VALUE} value={ALL_VALUE}>All</MenuItem>]

        getDeviceTypes().map((deviceType) => {
            options.push(<MenuItem key={deviceType} value={deviceType}>{deviceType}</MenuItem>)
        });

        return options;
    }

    const handleDeviceCard = ({ target }: SelectChangeEvent<string>) => {
        const filteredDevices = devices;
        setSelectedDeviceType(target.value)
        setFilteredDevices(sortDevicesBy(filterDevicesBy(filteredDevices, target.value), selectedSortBy))
    }

    const handleSortBy = ({ target }: SelectChangeEvent<string>) => {
        setSelectedSortBy(target.value)
        setFilteredDevices(sortDevicesBy(filterDevicesBy(filteredDevices, selectedDeviceType), target.value))
    }

    useEffect(() => {
        setDeviceType(getDeviceOptions());
        setSelectedDeviceType(ALL_VALUE);
    }, [])

    return (

        <Grid container style={{marginBottom:30}}>
            <Grid item xs={2}>
                Device card: <Select
                    labelId="device-cart"
                    id="device-card"
                    size='small'
                    variant="standard"
                    value={selectedDeviceType}
                    onChange={handleDeviceCard}
                    data-testid = 'device-card'
                >
                    {deviceType}
                </Select>
            </Grid>
            <Grid item xs={4} style={{textAlign:'left'}}>
                Sort By: <Select
                    labelId="sort-by"
                    id="sort-by"
                    size='small'
                    variant="standard"
                    value={selectedSortBy}
                    onChange={handleSortBy}
                    data-testid = 'sort-by'
                >
                    {sortByOptions}
                </Select>
            </Grid>
            <Grid item xs={6} style={{textAlign:'right'}}>
                <Button 
                    onClick={() => setOpen(true)} 
                    variant="contained"
                    data-testid = 'btn-add-device'
                >
                    Add device
                </Button>
            </Grid>
        </Grid>

    )
}
