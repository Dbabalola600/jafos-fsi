



export default function NavBar() {
    return (
        <div className="w-full px-5 md:max-w-7xl md:px-5 m-auto flex items-center justify-between md:bg-red-600">

            {/* logo */}

            <div>
                <button className="flex justify-center items-center  w-20 h-7 md:w-25 md:h-10 text-sm bg-primaryColor rounded-lg text-contColor cursor-pointer hover:brightness-75"
                >
                    Home
                </button>
            </div>


            <div>
                <button className="flex justify-center items-center  w-20 h-7 md:w-25 md:h-10 text-sm bg-contColor rounded-lg text-primaryColor border-primaryColor cursor-pointer hover:brightness-75"

                >
                    services
                </button>
            </div>





            <div>
                <button>
                    Home
                </button>
            </div>
            <div>
                <button className="text-red-700 bg-white rounded-lg">
                    Logout
                </button>
            </div>


        </div>
    )
}