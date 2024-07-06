import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import Navbar from './components/Navbar'
import { Home, Media, Detail, Actor, Panel, Login } from './pages'

function MainApp() {

  const location = useLocation()
  const isPanelRoute = (location.pathname == ROUTES.LOGIN) || (location.pathname == ROUTES.PANEL)

  return (
    <>
      {!isPanelRoute && <Navbar /> }
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.MEDIA} element={<Media />} />
        <Route path={ROUTES.MOVIE_DETAIL} element={<Detail />} />
        <Route path={ROUTES.ACTOR_DETAIL} element={<Actor />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.PANEL} element={<Panel />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router style={{ backgroundColor: "#fff" }}>
      <MainApp />
    </Router>
  );
}

export default App
