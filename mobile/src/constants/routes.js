import { HomeScreen, MovieScreen } from "../screens";

// define routes for navigation
export const routes = [
    { name: 'Home', component: HomeScreen, isTab: true },
    { name: 'MovieScreen', component: MovieScreen, isTab: false },
];