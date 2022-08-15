import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import DefaultLayer from "../components/layouts/DefaultLayout"
import Header from '../components/shared/Header'



const Home: NextPage = () => {
  return (

    <DefaultLayer>
      <div
                className="w-full py-20 space-y-12  text-black text-base md:text-xl"

                >
       <Header
       title='WELCOME'
       desc='please select one'/>

        <div className=' grid grid-cols-6  space-y-6  py-10 space-x-10' >


          <div className='col-span-6 mx-auto '>
            <Link
              href="/student">
              <button className="btn btn-lg btn-primary w-[500px] ">
                Student
                </button>
            </Link>
          </div>


          <div className=' col-span-6 mx-auto'>
            <Link
              href="/Caterer">
              <button className="btn btn-lg btn-primary w-[500px]">
                Seller
                </button>
            </Link>
          </div>

         


        </div>


      </div>
    </DefaultLayer>
  )
}

export default Home
