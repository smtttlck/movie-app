import { ActorScreen, HomeScreen, ListScreen, MovieScreen } from "../screens";

// define routes for navigation
export const routes = [
    { name: 'HomeScreen', component: HomeScreen, isTab: true },
    { name: 'MovieScreen', component: MovieScreen, isTab: false },
    { name: 'ActorScreen', component: ActorScreen, isTab: false },
    {
        name: 'MovieListScreen', component: ListScreen, isTab: true,
        tabProps: { title: 'Recently Added Movies', query: 'pageSize=12&sort=id&type=desc' }
    },    
    {
        name: 'ActorListScreen', component: ListScreen, isTab: true,
        tabProps: { title: 'Actors', query: 'pageSize=12&sort=id&type=asc' }
    },
];