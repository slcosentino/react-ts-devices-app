import React, { useEffect } from 'react'
import { useDevice } from '../../hooks/use-device';
import DeviceForm from '../DeviceForm/DeviceForm'
import DeviceList from '../DeviceList/DeviceList'
import { ToastMessage } from '../ToastMessage/ToastMessage';

const DevicePage = () => {
    const { fetchAll  } = useDevice();   
    

    useEffect(() => {       
        fetchAll();
    }, []) 
    
    
     
    return (
        <div>
            <div style={{ alignContent: 'center', margin: 'auto', width: '80%', marginTop: '2%' }}>
                <DeviceList></DeviceList>
            </div>           
            <DeviceForm></DeviceForm>          
            <ToastMessage/>
        </div>
    )
}

export default DevicePage
