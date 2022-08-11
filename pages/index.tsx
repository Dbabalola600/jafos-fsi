import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import DefaultLayer from "../components/layouts/DefaultLayout"



const Home: NextPage = () => {
  return (

    <DefaultLayer>
      <>
        <div className='text-center text-2xl text-primaryColour placeholder:'>
          WELCOME
          <div> please select one </div>
        </div>


        <div className=' grid grid-cols-6  space-y-6  py-10' >


          <div className='col-span-6 mx-auto '>
            <Link
              href="/">
              <button className="btn btn-lg btn-primary w-[500px] ">Student</button>
            </Link>
          </div>


          <div className=' col-span-6 mx-auto'>
            <Link
              href="/">
              <button className="btn btn-lg btn-primary w-[500px]">Seller</button>
            </Link>
          </div>


        </div>


      </>
    </DefaultLayer>
  )
}

export default Home
