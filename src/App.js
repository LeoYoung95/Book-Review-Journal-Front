import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Homepage from './components/homepage.jsx';
import Profile from './components/profile.jsx';
import Signup from './components/signup.jsx';

function App() {
  return (
    <div className="w-full bg-blue-500">
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/profile' element={<Profile />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
} 

export default App;
