
function AdminHeader(){
    let currentAdmin
    const admin=localStorage.GetItem("admin_data")
    if(admin){
        currentAdmin=JSON.parse(admin)
    }
    return(
        <>
        
       <div className="w-full h-20 shadow-lg bg-slate-500">
        <h1 className="text-blue-600">
          <span>Admin </span> {currentAdmin.name}
        </h1>

       </div>
        </>
    )
}
export default AdminHeader