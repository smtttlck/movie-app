const { screen, render, waitFor } = require("@testing-library/react");
import React from "react";
import Pagination from "../components/Pagination";
import { Provider } from "react-redux";
import { reducerForMock } from "../utils/testFuncs";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
 
const mockedUsedNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...(jest.requireActual("react-router")),
  useNavigate: () => mockedUsedNavigate
}));

const store = reducerForMock();

describe('Pagination numbering tests', () => {
    test('Is the pagination numbering correct when on the first page?', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Pagination
                        pageNumber={1}
                        totalDataCount={100}
                    />
                </MemoryRouter>
            </Provider>
        );
        const pageButtons = Array.from(document.querySelectorAll('.page-link'));
        const buttonNumbers = pageButtons.map(button => button.textContent);
        expect(buttonNumbers).toStrictEqual(["«", "1", "2", "3", "»"]);
    })
    test('Is the pagination numbering correct when on the last page?', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Pagination
                        pageNumber={10}
                        totalDataCount={100}
                    />
                </MemoryRouter>
            </Provider>
        );
        const pageButtons = Array.from(document.querySelectorAll('.page-link'));
        const buttonNumbers = pageButtons.map(button => button.textContent);
        expect(buttonNumbers).toStrictEqual(["«", "8", "9", "10", "»"]);
    })
    test('Is the pagination numbering correct when on the random page?', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Pagination
                        pageNumber={5}
                        totalDataCount={100}
                    />
                </MemoryRouter>
            </Provider>
        );
        const pageButtons = Array.from(document.querySelectorAll('.page-link'));
        const buttonNumbers = pageButtons.map(button => button.textContent);
        expect(buttonNumbers).toStrictEqual(["«", "3", "4", "5", "6", "7", "»"]);
    })
})

describe('Pagination button tests', () => {
    test('Is the first page button disabled when on the first page?', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Pagination
                        pageNumber={1}
                        totalDataCount={100}
                    />
                </MemoryRouter>
            </Provider>
        );
        const pageItem = document.querySelector('.disabled');
        const pageLink = pageItem.firstElementChild;
        const pageSpan = pageLink.firstElementChild;
        expect(pageSpan.textContent).toStrictEqual("«");
    })
    test('Is the last page button disabled when on the last page?', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Pagination
                        pageNumber={10}
                        totalDataCount={100}
                    />
                </MemoryRouter>
            </Provider>
        );
        const pageItem = document.querySelector('.disabled');
        const pageLink = pageItem.firstElementChild;
        const pageSpan = pageLink.firstElementChild;
        expect(pageSpan.textContent).toStrictEqual("»");
    })
    test("Is the active page's button colored?", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Pagination
                        pageNumber={5}
                        totalDataCount={100}
                    />
                </MemoryRouter>
            </Provider>
        );
        const pageItem = document.querySelector('.active');
        const pageLink = pageItem.firstElementChild;
        expect(pageLink.textContent).toBe("5");
    })
})

describe('Pagination navigate tests', () => {
    beforeEach(() => {
        window.scroll = jest.fn();
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Pagination
                        pageNumber={3}
                        totalDataCount={100}
                        table={"Client"}
                    />
                </MemoryRouter>
            </Provider>
        );
    })
    test('Does the first page button navigate to the first page when clicked?', async () => {
        userEvent.click(screen.getByText("«"));
        await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledWith("?page=1"));        
    })
    test('Does the last page button navigate to the last page when clicked?', async () => {
        userEvent.click(screen.getByText("»"));
        await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledWith("?page=10"));        
    })
    test('Do other buttons navigate to the correct page when clicked?', async () => {
        userEvent.click(screen.getByText(4));
        await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledWith("?page=4"));        
    })
})