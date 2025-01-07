
// import CarRegistration from "./Pages/Add_cars/Add"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./Pages/User/home"
import SignIn from "./Pages/User/sign-in"
import SignUp from "./Pages/User/sign-up"

import SuperForm from "./Pages/super Admin/superForm";
import SuperHome from "./Pages/super Admin/superHome";


import Rent from "./Pages/User/components//view all pages/rent";
import Sellall from "./Pages/User/components/view all pages/Sell";

import AdminHome from "./Pages/Admin/Admin home/home";
import OrgHeader from "./Pages/organization/component/orgHeader";
import OrgHome from "./Pages/organization/component/orgHome"
import Header from "./Pages/User/components/Header/index";
import AdminHeader from "./Pages/Admin/component/AdminHeader";
import AdminForm from "./Pages/Admin/form/admin-sign-up";
import AddCarForm from "./Pages/organization/Addcars/Add"
import AllMechanics from "./Pages/User/components/All Organization and Mechanics/allMechanics";
import AllOrganization from "./Pages/User/components/All Organization and Mechanics/allOrganization";
import MechDetail from "./Pages/User/components/All Organization and Mechanics/mechDetail";
import OrgDetail from "./Pages/User/components/All Organization and Mechanics/OrgDetail";
import { ThemeProvider } from './context/ThemeContext.jsx';
import LogHeader from "./logHeader.jsx";
import Footer from "./Pages/User/components/Footer/Footer.jsx";
import Search from "./Pages/Search/search.jsx";
import Profile from "./Pages/User/components/profile/profile.jsx";
import UserList from "./Pages/Admin/component/userList.jsx";
import MechanicList from "./Pages/Admin/component/mechList.jsx";
import OrganizationList from "./Pages/Admin/component/orglist.jsx";
import OrgProfile from "./Pages/organization/component/orgProfile.jsx";
import RentalList from "./Pages/organization/component/rental.jsx";
import OrgSale from "./Pages/organization/component/sale.jsx";

// import Organization from "./Pages/Organizations/organization"
// import UserProfile from "./Pages/profile_page/profile"
// import Search from "./Pages/Search/search"


function App() {
  // <div class="bg-cover bg-center h-screen" >
  //           <img src={bg} className="z-10"> </img>    /</div>

  return (
    <ThemeProvider >
    <BrowserRouter>


      <Routes>
  
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        
     

        {/* <Route path="/admin/signup" element={<AdminSignUp />} /> */}
        <Route path="/" element={<Home />} />

        <Route path="/" element={<UserLayout />}>
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/Profile" element={<Profile />} /> */}
          <Route path="/View-all-rent" element={<Rent />} />
          <Route path="/View-all-sell" element={<Sellall />} />
          <Route path="/allmechanic" element={<AllMechanics />} />
          <Route path="/allorganization" element={<AllOrganization />} />
          <Route path="/mechdetail" element={<MechDetail />} />
          <Route path="/orgdetail" element={<OrgDetail />} />
          <Route path="/search"  element={<Search />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/" element={<OrganizationLayout />}>
          
          <Route path="/orghome" element={<OrgHome />} />
          <Route path="/addcar"  element={<AddCarForm />} />
          <Route path="/orgprofile" element={<OrgProfile />} />
          <Route path="/rental-list" element={<RentalList />} />
          <Route path="/sale-list" element={<OrgSale />} />
        </Route>

        <Route path="/" element={<AdminLayout />}>
           <Route path="/adminhome" element={<AdminHome />} />
           <Route path="/adminform" element={<AdminForm />} />
           <Route path="/aduser" element={<UserList />} />
           <Route path="/admech" element={<MechanicList />} />
           <Route path="/adorg" element={<OrganizationList />} />
          
          
        </Route >

        <Route path="superhome" element={<SuperHome />} />
        <Route path="/superform" element={<SuperForm/>} />

      </Routes>
    </BrowserRouter>
    </ThemeProvider>

    //  {/* <AddCarForm />   */ }



  )
}

export default App

function LogLayout() {
  return ( 
    <div className="">
    <LogHeader />
    <main>
      <Outlet />
    </main>
    </div>
  );
}

function UserLayout() {
  let currentUser
  const user = localStorage.getItem("users_data")
  if (user) {
    currentUser = JSON.parse(user)
  }

  if (currentUser && currentUser.role !== "user")
    return null

  return (
    <div className="flex flex-col gap-12">
      <Header />
      {/* <Footer /> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function OrganizationLayout() {

  let currentUser
  const user = localStorage.getItem("org_data")
  if (user) {
    currentUser = JSON.parse(user)
  }

  if (currentUser && currentUser.role !== "user")
    return null
  return (
    <div className="flex flex-col gap-12">
      <OrgHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function AdminLayout(){
  return(
    <div className="">
    <AdminHeader />
    <main>
      <Outlet />
    </main>
  </div>
  );

 

}
