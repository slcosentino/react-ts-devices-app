import React from 'react';
import { render,  screen } from '@testing-library/react';
import App from './App';

const SELECT_FILTER_DEVICE_TYPE_TEST_ID = 'device-card';
const SELECT_SORT_BY_COLUMN_TEST_ID = 'sort-by';
const BTN_ADD_DEVICE_TEST_ID = 'btn-add-device';
const TABLE_DEVICES_TEST_ID = 'table-devices';


describe('App', () => {

    describe('Device list header', () => {

        it('Select filter device has to be in the document', () => {
            render(<App />);
            const selectFilterByResult = screen.queryByTestId(SELECT_FILTER_DEVICE_TYPE_TEST_ID)
            expect(selectFilterByResult).toBeInTheDocument();
        });

        it('Select sort by has to be in the document', () => {
            render(<App />);
            const selectSortByResult = screen.queryByTestId(SELECT_SORT_BY_COLUMN_TEST_ID)
            expect(selectSortByResult).toBeInTheDocument();
        });

        it('Button add device has to be in the document', () => {
            render(<App />);
            const btnAddDeviceResult = screen.queryByTestId(BTN_ADD_DEVICE_TEST_ID)
            expect(btnAddDeviceResult).toBeInTheDocument();
        });

    });

    describe('Table devices has to be in the document', () => {

        it('Table has to be in the document', () => {
            render(<App />);
            const tableDevicesResult = screen.queryByTestId(TABLE_DEVICES_TEST_ID)
            expect(tableDevicesResult).toBeInTheDocument();
        });
    });

})


