const { screen, render, act } = require("@testing-library/react");
import React from "react";
import Table from "../components/Table";
import { generateTestData, reducerForMock } from "../utils/testFuncs";
import { Provider } from "react-redux";
import * as api from '../api/Api'
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const store = reducerForMock();
const datas = generateTestData(5);

jest.spyOn(api, 'fetchData').mockResolvedValue({
    data: datas,
    totalDataCount: 5
});

const setModalInfo = jest.fn();

beforeEach(async () => {
    await act(async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Table table="Movie" setModalInfo={setModalInfo} refreshTable={0} />
                </MemoryRouter>
            </Provider>
        );
    })    
})

describe('Table render tests', () => {
    test('Is the table rendered?', () => {
        expect(screen.getByRole('table')).toBeInTheDocument();
    })
    test('Is the table title displayed correctly?', () => {
        const title = screen.getByRole('heading');
        const rows = screen.getAllByRole('row');
        expect(title.textContent).toBe(`Movie (${rows.length-1} items)`);
    })
    test('Are table headers displayed correctly?', () => {
        const tableHeaders = screen.getAllByRole('columnheader');
        const dataHeaders = Object.keys(datas[0]);
        expect(tableHeaders.length-1).toEqual(dataHeaders.length);
        dataHeaders.forEach((dataHeader, index) => {
            expect(dataHeader.endsWith('_path') ? 'image' : dataHeader).toBe(tableHeaders[index].textContent);
        })
    })
    test('Are table rows displayed correctly??', () => {
        expect(screen.getAllByRole('row').length-1).toEqual(datas.length);
        const dataHeaders = Object.keys(datas[0]);
        datas.forEach(data => {
            dataHeaders.forEach(header => () => {
                expect(screen.getByText(data[header])).toBeInTheDocument();
            })
        })
    })
    test('Are input, button and pagination displayed in the table?', () => {
        expect(screen.getByPlaceholderText('Search by name')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Add New Record' })).toBeInTheDocument();
        expect(document.querySelector('.pagination')).toBeInTheDocument();
    })
})

describe('Table button tests', () => {
    test('Is the search box working correctly?', async () => {
        await userEvent.type(screen.getByPlaceholderText('Search by name'), 'Card 1');
        await userEvent.click(document.querySelector('#search-button'));
        expect(api.fetchData).toHaveBeenCalledWith('getMovie', 'page=1&pageSize=10&name=Card 1');
    })
    test('Does the delete button run the modal with the correct information?', async () => {
        expect(screen.getByText('Card 1')).toBeInTheDocument();
        await userEvent.click(screen.getAllByTitle('Delete')[0]);
        expect(setModalInfo).toHaveBeenCalledWith(expect.objectContaining({ type: 'Delete' }));        
    })
    test('Does the edit button run the modal with the correct information?', async () => {
        expect(screen.getByText('Card 1')).toBeInTheDocument();
        await userEvent.click(screen.getAllByTitle('Edit')[0]);
        expect(setModalInfo).toHaveBeenCalledWith(expect.objectContaining({ type: "Update", data: datas[0],
            categories: datas[0].categories, actors: datas[0].actors }));        
    })
})