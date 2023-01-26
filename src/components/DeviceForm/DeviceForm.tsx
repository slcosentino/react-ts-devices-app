import { TextField, Button, Box, Modal, Typography, AlertColor } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { getDeviceTypes } from '../../helpers/getDeviceTypes';
import { IDevice } from '../../models/IDevice';
import { RootState } from '../../redux/store';
import Select from "react-select";
import { ErrorMsg } from './DeviceForm.styled';
import { useDevice } from '../../hooks/use-device';
import { DeviceType } from '../../constants/DeviceType';
import { useToast } from '../../hooks/use-toast';
import { useModalDevice } from '../../hooks/use-modal-device';

export const DeviceForm = () => {
    const { addDevice, clearDevice, isError } = useDevice();
    const { setModalDevice, isOpen: modalDeviceIsOpen } = useModalDevice();
    const activeDevice = useSelector((state: RootState) => state.device.active);
    const { reset, control, getValues, setValue, handleSubmit, setError, formState: { errors } } = useForm<IDevice>();
    const [isUpdate, setIsUpdate] = useState(false)
    const { toastConfig, setToast } = useToast();

    const handleToast = () => {
        let msg = isUpdate ? 'Device has been updated.' : 'Device has been created.'
        let color: AlertColor = "success";

        if (isError) {
            msg = isUpdate ? 'There is an error to  update the device.' : 'There is an error to create a device.'
            color =  "error"
        }
        setToast({ ...toastConfig, isOpen: true, message: msg, color: color });
    }

    const handleCloseToast = () => {
        setToast({ ...toastConfig, isOpen: false, message: '' })
    }

    const typeOptions =
        getDeviceTypes()
            ?.map(typeOption => ({
                value: typeOption,
                label: typeOption,
            }))
            .sort((x, y) => x.label.localeCompare(y.label))

    const onSubmit = (data: any) => {
        if (toastConfig.isOpen) {
            handleCloseToast();
        }
        const device: IDevice = { ...data };
        addDevice(device);
        handleToast();
    };

    const onClear = () => {
        if (toastConfig.isOpen) {
            handleCloseToast();
        }
        clearDevice();
        reset({ system_name: "", hdd_capacity: "", type: undefined });
        setModalDevice(false);
    };

    useEffect(() => {
        setIsUpdate(false)
        reset({ system_name: "", hdd_capacity: "", type: undefined });
        if (activeDevice) {
            reset(activeDevice);
            setIsUpdate(true)
        }
    }, [activeDevice])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (

        <Modal
            open={modalDeviceIsOpen}
            onClose={() => setModalDevice(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            data-testid='modal-device'
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    {isUpdate ? 'Add Device' : 'Add Device'}
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Controller
                            name="system_name"
                            control={control}
                            rules={{ required: "This is required" }}
                            defaultValue=''
                            render={({ field }) =>
                                <TextField {...field}
                                    placeholder={"System name"}
                                    style={{ width: "100%", marginBottom: 20 }}
                                    error={!!errors.system_name}
                                    helperText={errors.system_name ? errors.system_name.message : null}
                                    size="small"
                                />}
                        />

                        <div style={{ width: "100%", marginBottom: 20 }}   >
                            <Controller
                                name="type"
                                control={control}
                                render={({ field }) => (
                                    <Select {...field}
                                        options={typeOptions}
                                        placeholder="Select type.."
                                        value={getValues().type ? typeOptions.find((c) => c.value === getValues().type) : null}
                                        onChange={(e) => setValue("type", e?.value as keyof typeof DeviceType)}
                                    />
                                )}
                            />
                            {errors?.system_name?.type === "required" && <ErrorMsg>This is required</ErrorMsg>}
                        </div>

                        <Controller
                            name="hdd_capacity"
                            control={control}
                            defaultValue=''
                            rules={{ required: "This is required" }}
                            render={({ field }) =>
                                <TextField {...field}
                                    placeholder={"Capacity"}
                                    style={{ width: "100%", marginBottom: 20 }}
                                    error={!!errors.hdd_capacity}
                                    helperText={errors.hdd_capacity ? errors.hdd_capacity.message : null}
                                    size="small"
                                    onChange={(e) => {
                                        if (isNaN(parseInt(e.target.value))) {
                                            setError("hdd_capacity", {
                                                message: 'Capacity has to be a number.'
                                            });
                                            return;
                                        }
                                        field.onChange(parseInt(e.target.value))
                                    }}
                                />}
                        />
                        <div>
                            <Button type='submit' onClick={handleSubmit(onSubmit)} style={{ marginRight: 5 }} variant="contained">{isUpdate ? "Update" : "Create"} </Button>
                            <Button type='button' onClick={() => onClear()} variant="outlined">CLOSE</Button>
                        </div>


                    </div>

                </form>

            </Box>
        </Modal>

    );
}

export default DeviceForm
