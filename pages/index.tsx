import type { NextPage } from 'next'

import { useEffect } from 'react'
import DefaultLayer from "../components/layouts/DefaultLayout"
import Header from '../components/shared/Header'
import NavButton from '../components/shared/NavButton'



const Home: NextPage = () => {

  const connect = async () => {
    const response = await fetch("/api/connect", { method: "GET" })
      .then(res => res.json())
  }

  useEffect(() => {
    connect()
  }, [])



  return (

    <DefaultLayer>
      <div
        className="w-full py-20   text-black text-base md:text-xl"

      >
        <Header
          title='WELCOME'
          desc='please select one' />


        <div className='  mx-auto'>

          <NavButton
            title="Student"
            uLink='/student'
          />

        </div>



        <div className='  mx-auto'>

          <NavButton
            title="Staff"
            uLink='/staff'
          />

        </div>


        <div className='  mx-auto'>

          <NavButton
            uLink="/seller"
            title="Seller"
          />

        </div>


        <div className='  mx-auto'>

          <NavButton
            uLink="/creder"
            title="Creders"
          />

        </div>


      </div>
    </DefaultLayer>
  )
}

export default Home
