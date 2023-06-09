import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { check } from './api/userApi';
import { setUser } from "./store/slices/user.slice";
import RequireAuth from './hoc/RequireAuth';
import RequireRole from './hoc/RequireRole';
import Layout from './components/Layout/Layout';
import Admin from './pages/Admin/Admin';
import News from './pages/News/News';
import OneNews from './pages/OneNews/OneNews';
import Events from './pages/Events/Events';
import School from './pages/School/School';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Group from './pages/Group/Group';
import Schedule from './pages/Schedule/Schedule';
import NotFound from './pages/NotFound/NotFound';
import Attendance from './pages/Attendance/Attendance';

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    check()
      .then(data => dispatch(setUser(data)))
      .finally(() => setLoading(false));
  }, [dispatch])

  if (loading) {
    return <h1 className='loading'>Loading...</h1>
  }


  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<News />} />
        <Route path='/news/:id' element={<OneNews />} />
        <Route path='/events' element={<Events />} />
        <Route path='/school' element={<School />} />
        <Route path='/profile' element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/group' element={
          <RequireAuth>
            <Group />
          </RequireAuth>
        } />
        <Route path='/schedule' element={
          <RequireAuth>
            <Schedule />
          </RequireAuth>
        } />
        <Route path='/admin' element={
          <RequireRole role="ADMIN">
            <Admin />
          </RequireRole>
        } />
        <Route path='/attendance' element={
          <RequireRole role="TEACHER">
            <Attendance />
          </RequireRole>
        } />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App