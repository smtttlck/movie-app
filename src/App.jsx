import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Media from './pages/Media'
import Detail from './pages/Detail'
import Actor from './pages/Actor'
import Search from './pages/Search'
import MyList from './pages/MyList'

function App() {

  return (
    <Router style={{ backgroundColor: "#fff" }}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/media/:type/:pageNumber' element={<Media />} />
        <Route path='/detail/:type/:id' element={<Detail />} />
        <Route path='/actor/:id' element={<Actor />} />
        <Route path='/search/:key' element={<Search />} />
        <Route path='/myList' element={<MyList />} />
      </Routes>
    </Router>
  )
}

export default App
