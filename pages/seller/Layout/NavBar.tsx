
import Link from "next/link";
import { Fragment, useState } from "react";



import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";



export default function NavBar2() {

    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    const logout = async () => {
        //e.preventDefault()


        setLoading(true)

        await fetch("api/logout", { method: "POST" })
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                }
                if (res.status == 400) {
                    console.log("error")
                }

            }).then((data) => {
                window.localStorage.getItem("token")
                window.localStorage.clear()
                router.push('/')
            }).catch(err => {
                console.log(err)
            })
        setLoading(false)
    }
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };
    return (
        <>
            <nav className='flex items-center flex-wrap bg-black p-3 sticky top-0 z-50 '>
                <Link href='/seller/DashBoard'>
                    <a className='inline-flex items-center p-2 mr-4 '>



                        <img
                            src="/logo.svg"
                            alt="Logo"
                            className="w-10"
                        />

                    </a>
                </Link>

                <button
                    className=' inline-flex p-3 hover:primaryColour rounded lg:hidden text-white ml-auto hover:text-white outline-none'
                    onClick={handleClick}
                >

                    <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'

                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 6h16M4 12h16M4 18h16'
                        />
                    </svg>
                </button>




                {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
                <div
                    className={`${active ? '' : 'hidden'
                        }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
                >
                    <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>

                        <Link href='/Caterer/Offerings'>
                            <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-white hover:text-primaryColour '>
                                Offerings
                            </a>
                        </Link>


                        <Link href='/seller/Orders'>
                            <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-white hover:text-primaryColour '>
                                Orders
                            </a>
                        </Link>

                        <button
                            onClick={logout}
                            className='lg:inline-flex lg:w-auto w-full px-5 py-2 rounded text-white font-bold items-center justify-center hover:bg-primaryColour hover:text-black bg-red-600'>
                            {isLoading ? "Loading..." : "LOGOUT"}

                        </button>



                    </div>
                </div>
            </nav>
        </>
    )
}


