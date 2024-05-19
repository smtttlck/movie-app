import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import Navbar from './components/Navbar'
import { Home, Media, Detail, Actor, Search, MyList } from './pages'

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
        <Route path={ROUTES.MY_LIST} element={<MyList />} />
      </Routes>
    </Router>
  )
}

export default App
