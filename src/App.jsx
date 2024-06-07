import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import Navbar from './components/Navbar'
import { Home, Media, Detail, Actor, Search } from './pages'

function App() {

  return (
    <Router style={{ backgroundColor: "#fff" }}>
      <Navbar />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.MEDIA} element={<Media />} />
        <Route path={ROUTES.DETIAL} element={<Detail />} />
        <Route path={ROUTES.ACTOR} element={<Actor />} />
        <Route path={ROUTES.SEARCH} element={<Search />} />
      </Routes>
    </Router>
  )
}

export default App
