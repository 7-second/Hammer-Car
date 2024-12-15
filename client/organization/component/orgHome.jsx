import image from "../../public/images/nissan.png"

function OrgHome(){
    return(
    <>
    <div className="flex h-full w-full">
        <div className="grid md:grid-cols-4 w-full h-full">

            {/* left 1 section */}
            <div className="hidden md:block col-span-1 w-full h-full">
                <div className="p-20 border-2">
                    <p className="text-3xl">Home</p>
                    <img src={image} alt="" className="object-contain h-24 w-24" />
                </div>
            </div>


            {/* right 3 section */}
            <div className="col-span-3 w-full  h-full">

            </div>
        </div>
    </div>
    </>
    )
}

export default OrgHome