const { screen, render, waitFor } = require("@testing-library/react");
import React from "react";
import { Provider } from "react-redux";
import { reducerForMock } from "../utils/testFuncs";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Navbar from "../components/Navbar";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router", () => ({
    ...(jest.requireActual("react-router")),
    useNavigate: () => mockedUsedNavigate
}));

const store = reducerForMock();

beforeEach(() => {
    mockedUsedNavigate.mockClear();
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        </Provider>
    );
})

test('Is the logo rendered?', () => {
    expect(document.querySelector('svg')).toBeInTheDocument();
})

describe('Navbar link tests', () => {
    test('Are home link working correctly?', async () => {
        userEvent.click(screen.getByText('Home'));
        await waitFor(() => {
            expect(mockedUsedNavigate).toHaveBeenCalled();
        });
        const [firstArg] = mockedUsedNavigate.mock.calls[0];
        expect(firstArg).toBe('/');
    })
    test('Are movie link working correctly?', async () => {
        userEvent.click(screen.getByText('Movie'));
        await waitFor(() => {
            expect(mockedUsedNavigate).toHaveBeenCalled();
        });
        const [firstArg] = mockedUsedNavigate.mock.calls[0];
        expect(firstArg).toBe('/media/movie?page=1&pageSize=20');
    })
    test('Are actor link working correctly?', async () => {
        userEvent.click(screen.getByText('Actor'));
        await waitFor(() => {
            expect(mockedUsedNavigate).toHaveBeenCalled();
        });
        const [firstArg] = mockedUsedNavigate.mock.calls[0];
        expect(firstArg).toBe('/media/actor?page=1&pageSize=20&movies=true');
    })
})