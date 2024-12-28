import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
    return(
        <div className="root-layout">
               
            <header>
                <nav> 
                    <h1 style={{marginLeft: 10}}>BlockLend</h1>
                    <NavLink 
                    className={'navl'} 
                    to={'/dashboard'}
                    style={({isActive})=>{
                        return isActive? {backgroundColor: '#2a2a52'}:{}
                    }}
                    >
                        <div >Home</div>
                    </NavLink>
                    <NavLink className={'navl'} to={'/dashboard/profile'}><div >Profile</div></NavLink>
                    <NavLink className={'navl'} to={'/dashboard/wallet'}><div>Wallet</div></NavLink>
                    <NavLink className={'navl'} to={'/dashboard/loans'}><div>Loans</div></NavLink>
                    <NavLink className={'navl'} to={'/dashboard/lending'}><div>Lending</div></NavLink>
                    <NavLink className={'navl'} to={'/dashboard/activity'}><div>Activity</div></NavLink>
                    <NavLink className={'navl'} to={'/dashboard/settings'}><div>Settings</div></NavLink>
                    <NavLink className={'navl'} to={'/dashboard/logout'}><div>Log out</div></NavLink>
                    {/* <NavLink className={'navl'} to={'/about'}><div>about</div></NavLink>
                    <NavLink className={'navl'} to={'/support'}><div>Support</div></NavLink>    */}
                </nav>
            </header>
<main>
    <Outlet/>
</main>
        </div>
    )
} 