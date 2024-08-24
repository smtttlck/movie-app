const { screen, render, act } = require("@testing-library/react");
import React from "react";
import { Provider } from "react-redux";
import Modal from "../components/Modal";
import { generateObjectArray, generateTestData, reducerForMock } from "../utils/testFuncs";
import userEvent from "@testing-library/user-event";
import * as api from '../api/Api'

const store = reducerForMock();
const data = generateTestData(1);

const handleSubmit = jest.fn();

jest.spyOn(api, 'fetchData').mockResolvedValue({
    data: data,
    totalDataCount: 1
});

jest.spyOn(api, 'fetchData').mockResolvedValue({
    data: generateObjectArray('categories', 3)
});

jest.spyOn(api, 'fetchData').mockResolvedValue({
    data: generateObjectArray('actors', 3)
});

describe('Does modal work correctly for delete?', () => {    
    beforeEach(async () => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <Modal
                        table="Movie"
                        modalInfo={{ type: "Delete", data: data }} setModalInfo={() => {}}
                        setRefreshTable={() => {}}
                        setToast={() => {}}
                    />
                </Provider>
            );
        })
    })
    test("Is the modal's text correct?", () => {
        expect(screen.getByText('Are you sure you want to delete the Movie named Card 1?')).toBeInTheDocument();
    })
    test("Is the modal's title correct?", () => {    
        expect(screen.getByRole('heading', { name: 'Delete', hidden: 'true' })).toBeInTheDocument();
    })
    test("Is the delete button work correctly?", async () => {    
        const deleteButton = screen.getByRole('button', { name: 'Delete', hidden: 'true' });
        expect(deleteButton).toBeInTheDocument();
        await userEvent.click(deleteButton);
        expect(api.fetchData).toHaveBeenCalledWith('deleteMovie', 1);
    })
})

describe('Does modal work correctly for insert?', () => {
    beforeEach(async () => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <Modal
                        table="Movie"
                        modalInfo={{ type: "Create", data: data }} 
                        setModalInfo={() => {}}
                        setRefreshTable={() => {}}
                        setToast={() => {}}
                    />
                </Provider>
            );
        }) 
    })   
    test('Is input created for all features?', () => {
        const headers = Object.keys(data);
        headers.forEach(header => {
            if(header === 'categories' || header === 'actors') {
                let chechkboxs = screen.getAllByRole('checkbox', { hidden: true });
                expect(chechkboxs.length).toBeGreaterThan(0);
            }
            else if(header !== 'id')
                expect(screen.getByLabelText(header)).toBeInTheDocument();
        }); 
    })   
})

describe('Does modal work correctly for update?', () => {
    beforeEach(async () => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <Modal
                        table="Movie"
                        modalInfo={{ type: "Update", data: data }} 
                        setModalInfo={() => {}}
                        setRefreshTable={() => {}}
                        setToast={() => {}}
                    />
                </Provider>
            );
        }) 
    })   
    test('Are inputs created and filled for all features?', () => {
        const headers = Object.keys(data);
        headers.forEach(header => {
            if(header === 'categories' || header === 'actors') {
                let chechkboxs = screen.getAllByRole('checkbox', { hidden: true });
                expect(chechkboxs.length).toBeGreaterThan(0);
            }
            else if(header.endsWith('_path')) {
                let image = screen.getByRole('img', { hidden: true });
                expect(image).toBeInTheDocument();
                expect(image.src).toBe(`http://localhost:3001/${data[header].split("public\\")[1]?.split("\\").join('/')}`);
            }
            else if(header !== 'id') {
                let input = screen.getByLabelText(header);
                expect(input).toBeInTheDocument();
                expect(input.value).toBe(header !== 'rating' ? data[header] : `${data[header]}`);
            }
        }); 
    })   
})