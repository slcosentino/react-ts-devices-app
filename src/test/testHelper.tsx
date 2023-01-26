import { configureStore, PreloadedState } from "@reduxjs/toolkit"
import { RenderOptions } from "@testing-library/react"
import { PropsWithChildren } from "react"
import { Provider } from "react-redux"
import deviceReducer, { initialStateDevice } from "../redux/reducers/deviceReducer"
import uiReducer, { initialStateUi } from "../redux/reducers/uiReducer"
import { RootState, store } from "../redux/store"
import { render } from '@testing-library/react'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>
    store?: typeof store
}
export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = { device: { ...initialStateDevice }, ui: { ...initialStateUi } },

        store = configureStore({ reducer: { device: deviceReducer, ui: uiReducer, }, preloadedState }),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}