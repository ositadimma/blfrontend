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

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<LandingPage/>}/>
      <Route path='/login' element={<SignIn/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='/dashboard/wallet' element={<Wallet/>}/>
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
