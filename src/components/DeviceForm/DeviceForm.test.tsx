import { initialStateDevice } from "../../redux/reducers/deviceReducer";
import { initialStateUi } from "../../redux/reducers/uiReducer";
import { renderWithProviders } from "../../test/testHelper";
import DeviceForm from "./DeviceForm";
import { screen } from '@testing-library/react';

const MODAL_DEVICE_TEST_ID = 'modal-device';

describe('DeviceForm', () => {

    it('DeviceForm has to be in the document', () => {
        const mockedInitialUi = {...initialStateUi, modalDeviceOpen: true}
        renderWithProviders(<DeviceForm />, {
            preloadedState: {
            device: initialStateDevice,
              ui: mockedInitialUi
            }
          })
          
          const modalDeviceResult = screen.queryByTestId(MODAL_DEVICE_TEST_ID)
          expect(modalDeviceResult).toBeInTheDocument();
    });

    it('DeviceForm has not to be in the document', () => {
        const mockedInitialUi = {...initialStateUi, modalDeviceOpen: false}
        renderWithProviders(<DeviceForm />, {
            preloadedState: {
            device: initialStateDevice,
              ui: mockedInitialUi
            }
          })
          const modalDeviceResult = screen.queryByTestId(MODAL_DEVICE_TEST_ID)
          expect(modalDeviceResult).not.toBeInTheDocument();
    });

});