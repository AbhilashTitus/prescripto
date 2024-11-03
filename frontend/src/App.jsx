import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MyProfile from './pages/MyProfile'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyAppointments from './pages/MyAppointments'
import Appoinment from './pages/Appoinment'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-appoinments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/appoinment/:docId' element={<Appoinment />} />
  

      </Routes>
    </div>
  )
}

export default App