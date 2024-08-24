const { screen, render, waitFor } = require("@testing-library/react");
import React from "react";
import themeReducer, { changeTheme } from "../redux/features/theme";

beforeEach(() => {
    localStorage.clear();
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem');
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Theme initial value tests', () => {
    test('When localstorage is empty, is the theme value light at initial?', () => {
        expect(themeReducer(undefined, { type: 'unknown' }).theme).toBe('light');
    })
    test('When localstorage is dark, is the theme value dark at initial?', async () => {
        localStorage.setItem('theme', 'dark');
        const initialState = {
            theme: localStorage.getItem('theme') || 'light',
        };
        const reducerOutput = themeReducer(initialState, { type: 'unknown' });
        expect(reducerOutput.theme).toBe('dark');
    })
})

describe('Does the theme change with the correct value?', () => {
    test('Does the theme change from light to dark?', () => {
        let reducerOutput = themeReducer(undefined, { type: 'unknown' });
        expect(reducerOutput.theme).toBe('light');
        reducerOutput = themeReducer(reducerOutput, changeTheme());
        expect(reducerOutput.theme).toBe('dark');
    })
    test('Does the theme change from dark to light?', () => {
        localStorage.setItem('theme', 'dark');
        const initialState = {
            theme: localStorage.getItem('theme') || 'light',
        };
        let reducerOutput = themeReducer(initialState, { type: 'unknown' });
        expect(reducerOutput.theme).toBe('dark');
        reducerOutput = themeReducer(reducerOutput, changeTheme());
        expect(reducerOutput.theme).toBe('light');
    })
})