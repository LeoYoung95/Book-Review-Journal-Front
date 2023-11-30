import './App.css';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import store from "./reducers/store";
import {Provider} from "react-redux";
import Navbar from './components/navbar.jsx';
import Homepage from './components/homepage.jsx';
import Profile from './components/profile.jsx';
import Signup from './components/signup.jsx';
import Signin from './components/signin.jsx';

function App() {
    return (
        <Provider store={store}>
            <div className="w-full bg-gray-200">
                <BrowserRouter>
                    <div className='mt-[60px]'>
                        <Navbar/>
                        <Routes>
                            <Route path='/' element={<Homepage/>}/>
                            <Route path='/profile' element={<Profile/>}/>
                            <Route path='/signup' element={<Signup/>}/>
                            <Route path='/signin' element={<Signin/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        </Provider>
    );
}

export default App;
