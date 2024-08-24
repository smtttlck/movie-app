const { screen, render, waitFor } = require("@testing-library/react");
import React from "react";
import Carousel from "../components/Carousel";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { generateTestData, reducerForMock } from "../utils/testFuncs";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...(jest.requireActual("react-router")),
  useNavigate: () => mockedUsedNavigate
}));

describe("Show More button's tests", () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Carousel datas={[]} navigateParameter="sort=rating&type=desc" />
            </MemoryRouter>
        );
    })
    test('Is there a button?', () => {
        expect(screen.getByRole('button', { name: /Show More/i })).toBeInTheDocument();
    });
    test('Is the name of the button correct?', () => {
        const button = screen.getByRole('button', { name: /Show More/i });
        expect(button.textContent).toBe('Show More');
    });
    test('Is the button click navigating to the correct URL?', async () => {
        userEvent.click(screen.getByRole('button', { name: /Show More/i }));
        await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledWith('/media/movie?page=1&pageSize=20&sort=rating&type=desc'));
    });
});


test('Is the title correct?', () => {
    render(
        <MemoryRouter>
            <Carousel title="Test Title" datas={[]} />
        </MemoryRouter>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
})

describe('Carousel item tests', () => {
    const store = reducerForMock();
    const mockData = generateTestData(8);
    beforeEach(() => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Carousel datas={mockData} />
                </MemoryRouter>
            </Provider>
        );
    })
    test('Renders correct number of cards?', () => {
        const cards = screen.getAllByText(/Card/i);
        expect(cards.length).toEqual(mockData.length);
    });
    test('Is the correct number of cards shown?', () => {
        const cards = document.querySelectorAll('.slick-slide');
        const visibleCards = Array.from(cards).filter(card => card.getAttribute('aria-hidden') === "false");
        expect(visibleCards.length).toEqual(4);
    })
    test("Does the displayed card change when the Next button is clicked?", async () => {
        const currentCard = document.querySelector('.slick-current');
        await waitFor(() => {
            userEvent.click(screen.getByRole('button', { name: /Next/i }));
            const newCurrentCard = document.querySelector('.slick-current');
            expect(currentCard).not.toEqual(newCurrentCard);
        });
    })
})