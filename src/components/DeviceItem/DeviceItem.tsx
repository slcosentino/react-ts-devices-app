import { Grid, ListItemIcon, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { IDevice } from '../../models/IDevice'
import { ListItemWrapper } from './DeviceItem.styled'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export interface DeviceItemProps {
    device: IDevice;
    onSelect: () => void;
    onDelete: (device: IDevice) => void
}

const DeviceItem = ({ device, onSelect, onDelete }: DeviceItemProps) => {
    return (
        <TableRow
            key={device.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {device.system_name}
            </TableCell>
            <TableCell align="right"> {device.type}</TableCell>
            <TableCell align="right">{device.hdd_capacity}</TableCell>
            <TableCell align="right"><ListItemIcon>
                <EditIcon onClick={onSelect} style={{ cursor: 'pointer' }} />
                <DeleteIcon onClick={() => onDelete(device)} style={{ cursor: 'pointer' }} />
            </ListItemIcon></TableCell>

        </TableRow>
    )
}

export default DeviceItem
