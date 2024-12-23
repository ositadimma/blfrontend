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
import Loans from './pages/Loans';
import RequestLoan from './pages/loanpages/requestLoan';
import Lending from './pages/Lending';
import LoanRequests from './pages/loanpages/loanRequests';
import LoanDetails from './pages/loanpages/loanDetails';
import OfferRequest from './pages/loanpages/offerRequest';
import ReviewProposal from './pages/loanpages/reviewProposal';
import ViewOffers from './pages/loanpages/viewOffers';

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
        <Route path='/dashboard/loans' element={<Loans/>}/>
        <Route path='/dashboard/lending' element={<Lending/>}/>
        <Route path='/dashboard/loans/loanrequests' element={<LoanRequests/>}/>
        <Route path='/dashboard/loans/requestloan' element={<RequestLoan/>}/>
        <Route path='/dashboard/loans/loandetails' element={<LoanDetails/>}/>
        <Route path='/dashboard/loans/viewoffers' element={<ViewOffers/>}/>
        <Route path='/dashboard/lendings/offerrequest' element={<OfferRequest/>}/> 
        <Route path='/dashboard/lending/reviewproposal' element={<ReviewProposal/>}/> 
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
