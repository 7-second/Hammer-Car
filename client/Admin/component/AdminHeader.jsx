
function AdminHeader(){
    let currentAdmin
    const admin = localStorage.getItem("users_data")
    if (admin) {
        currentAdmin = JSON.parse(admin)
    }
    return(
        <>
        
       <div className="w-full h-20 shadow-lg bg-slate-500">
        <h1 className="text-blue-600">
          <span>Admin </span> 
        </h1>

       </div>
        </>
    )
}
export default AdminHeader