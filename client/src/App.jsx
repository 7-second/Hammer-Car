
// import CarRegistration from "./Pages/Add_cars/Add"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./Pages/User/home"
import SignIn from "./Pages/User/sign-in"
import SignUp from "./Pages/User/sign-up"

import SuperHome from "./Pages/Super Admin/superHome";
import SuperForm from "./pages/super Admin/superForm";


import Rent from "./Pages/User/components//view all pages/rent";
import Sellall from "./Pages/User/components/view all pages/Sell";

import AdminHome from "./Pages/Admin/Admin home/home";
import OrgHeader from "./pages/organization/component/orgHeader";
import OrgHome from "./Pages/organization/component/orgHome"
import Header from "./Pages/User/components/Header/index";
import AdminHeader from "./Pages/Admin/component/AdminHeader";
import AdminForm from "./Pages/Admin/form/admin-sign-up";
import AddCarForm from "./Pages/organization/Addcars/Add"

// import Organization from "./Pages/Organizations/organization"
// import UserProfile from "./Pages/profile_page/profile"
// import Search from "./Pages/Search/search"


function App() {
  // <div class="bg-cover bg-center h-screen" >
  //           <img src={bg} className="z-10"> </img>    /</div>

  return (

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
        </Route>

        <Route path="/" element={<OrganizationLayout />}>
          
          <Route path="/orghome" element={<OrgHome />} />
          <Route path="/addcar"  element={<AddCarForm />} />
        </Route>

        <Route path="/" element={<AdminLayout />}>
           <Route path="/adminhome" element={<AdminHome />} />
           <Route path="/adminform" element={<AdminForm />} />
        </Route >

        <Route path="superhome" element={<SuperHome />} />
        <Route path="/superform" element={<SuperForm/>} />

      </Routes>
    </BrowserRouter>

    //  {/* <AddCarForm />   */ }



  )
}

export default App


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
