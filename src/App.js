import logo from './logo.svg';
import './App.css';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import { 
  createBrowserRouter,
  Route, 
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import Wallet from './pages/Wallet';
import TestWallet from './pages/testwallet';
import Register from './pages/register';
import SignIn from './pages/signin';
import LandingPage from './pages/landingPage';
import AddAccount from './pages/walletPages/addAccount';

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      {/* <div className='modal-body'>
                <div className='modal-card'>

                </div>
            </div> */}
      <Route index element={<LandingPage/>}/>
      <Route path='/login' element={<SignIn/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='/dashboard/wallet' element={<Wallet/>}/>
        <Route path='/dashboard/wallet/addaccount' element={<AddAccount/>}/>
        <Route path='/dashboard/testwallet' element={<TestWallet/>}/>
        <Route path='/dashboard/loans' element={<></>}/>
        <Route path='/dashboard/' element={<></>}/>
        <Route path='/dashboard/' element={<></>}/>
      </Route>
    </Route>
  )
)
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
