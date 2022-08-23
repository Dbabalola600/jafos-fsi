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
          desc='please select one' />
      

        <div className='  mx-auto'>
          <Link
            href="/student">
            <button className="btn btn-lg btn-primary btn-block">
              Student
            </button>
          </Link>
        </div>



        <div className='  mx-auto'>
          <Link
            href="/seller">
            <button className="btn btn-lg btn-primary btn-block">
              Seller
            </button>
          </Link>
        </div>


      </div>
    </DefaultLayer>
  )
}

export default Home
