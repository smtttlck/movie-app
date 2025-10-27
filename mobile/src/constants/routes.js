import { HomeScreen, ListScreen, MovieScreen } from "../screens";

// define routes for navigation
export const routes = [
    { name: 'HomeScreen', component: HomeScreen, isTab: true },
    { name: 'MovieScreen', component: MovieScreen, isTab: false },
    { name: 'ListScreen', component: ListScreen, isTab: true },
];