import type { NextPage } from 'next'

import { useEffect, useState } from 'react'
import DefaultLayer from "../components/layouts/DefaultLayout"
import Header from '../components/shared/Header'
import NavButton from '../components/shared/NavButton'



const Home: NextPage = () => {


  const [isLoading, setLoading] = useState(false)


  const connect = async () => {

    
    setLoading(true)
    const response = await fetch("/api/connect", { method: "GET" })
      .then(res => res.json())


      setLoading(false)
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
            title={isLoading? "Loading...": "Student"}
            uLink='/student'
          />

        </div>



        <div className='  mx-auto'>

          <NavButton
            title={isLoading? "Loading...": "Staff"}
            uLink='/staff'
          />

        </div>


        <div className='  mx-auto'>

          <NavButton
            uLink="/seller"
            title={isLoading? "Loading...": "Seller"}
          />

        </div>


        <div className='  mx-auto'>

          <NavButton
            uLink="/creder"
            title={isLoading? "Loading...": "Creder"}
          />

        </div>


      </div>
    </DefaultLayer>
  )
}

export default Home
