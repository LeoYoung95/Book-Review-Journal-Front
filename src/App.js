import './App.css';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import store from "./reducers/store.js";
import {Provider} from "react-redux";
import Navbar from './components/navbar.jsx';
import Homepage from './page/homepage.jsx';
import Profile from './components/profile/profile.jsx';
import Signup from './components/auth/signup.jsx';
import Signin from './components/auth/signin.jsx';

import Breadcrumb from './components/breadcrumb.jsx';

function App() {
    return (
        <Provider store={store}>
            <div className="w-full h-[100vh] items-center font-serif">
                <BrowserRouter>
                    <div className='mt-[60px] h-full'>
                        <Navbar/>
                        {/* <Breadcrumb/> */}
                        <Routes>
                            <Route path='/' element={<Homepage/>}/>
                            <Route path='/profile/*' element={<Profile/>}/>
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
