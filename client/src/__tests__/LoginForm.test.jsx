const { screen, render, waitFor } = require("@testing-library/react");
import React from "react";
import LoginForm from "../components/LoginForm";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import * as api from '../api/Api'

jest.mock('../api/Api');

const setToastMock = jest.fn();

const mockedUsedNavigate = jest.fn();
jest.mock("react-router", () => ({
    ...(jest.requireActual("react-router")),
    useNavigate: () => mockedUsedNavigate
}));

describe('Form render tests', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <LoginForm setToast={() => { }} />
            </MemoryRouter>
        )
    })
    test('Are html elements rendered?', () => {
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
    })

    test('Is the warning text displayed when inputs are left blank?', async () => {
        expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
        expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
        await waitFor(() => {
            userEvent.click(screen.getByLabelText('Name'));
            userEvent.click(screen.getByLabelText('Password'));
            userEvent.click(document.body);
            expect(screen.getByText('Name is required')).toBeInTheDocument();
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        });
    })
})

describe('Login tests', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        render(
            <MemoryRouter>
                <LoginForm setToast={setToastMock} />
            </MemoryRouter>
        )
    })
    test('Is failed login working?', async () => {
        api.login.mockRejectedValue(new Error('Login failed'));
        await userEvent.type(screen.getByLabelText('Name'), 'wrongName');
        await userEvent.type(screen.getByLabelText('Password'), 'wrongPassword');
        await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
        await waitFor(() => {
            expect(api.login).toHaveBeenCalledWith({
                name: 'wrongName',
                password: 'wrongPassword',
            });
        });
        expect(setToastMock).toHaveBeenCalledWith({
            show: true,
            message: 'Wrong name or password',
            isSuccessful: false,
        });
        await waitFor(() => expect(mockedUsedNavigate).not.toHaveBeenCalled(), { timeout: 1200 });
    })
    test('Is successful login working?', async () => {
        api.login.mockResolvedValue({ token: 'fakeAuthToken' });
        await userEvent.type(screen.getByLabelText('Name'), 'correctName');
        await userEvent.type(screen.getByLabelText('Password'), 'correctPassword');
        await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
        await waitFor(() => {
            expect(api.login).toHaveBeenCalledWith({
                name: 'correctName',
                password: 'correctPassword',
            });
        });
        expect(setToastMock).toHaveBeenCalledWith({
            show: true,
            message: 'Login',
            isSuccessful: true,
        });
        await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledWith('/panel'), { timeout: 1200 });
    })    
})