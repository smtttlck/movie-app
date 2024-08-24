const { screen, render, waitFor } = require("@testing-library/react");
import React from "react";
import Card from "../components/Card";
import { generateTestData, reducerForMock } from "../utils/testFuncs";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
 
const mockedUsedNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...(jest.requireActual("react-router")),
  useNavigate: () => mockedUsedNavigate
}));

const store = reducerForMock();
const data = generateTestData(1);

beforeEach(() => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Card
                    id={data.id}
                    name={data.name}
                    releaseDate={data.release_date}
                    rating={data.rating}
                    posterPath={`http://localhost:3001/${data.poster_path?.split("public\\")[1]?.split("\\").join('/')}`}
                    array={data.categories}
                />
            </MemoryRouter>
        </Provider>
    );
})

describe('Component prop tests', () => {
    test('Is the card name displayed correctly?', () => {
        expect(screen.getByText(data.name)).toBeInTheDocument();
    })
    test('Is the card release date displayed correctly?', () => {
        expect(screen.getByText(data.release_date)).toBeInTheDocument();
    })
    test('Is the card name rating displayed correctly?', () => {
        expect(screen.getByText(data.rating)).toBeInTheDocument();
    })
    test('Is the card image displayed correctly?', () => {
        const images = screen.getAllByRole('img');
        expect(images[1].src).toEqual(`http://localhost:3001/${data.poster_path?.split("public\\")[1]?.split("\\").join('/')}`);
    })
})

test('Are the categories visible when the card is hovered?', () => {
    const categories = document.querySelector('.card-hover-texts');
    userEvent.hover(categories);
    expect(getComputedStyle(categories).display).toBe('block');
})

test('Is the card click navigating to the correct URL?', async () => {
    userEvent.click(screen.getByText(/Card/i));
    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledWith(`/detail/${data.id}`));
})