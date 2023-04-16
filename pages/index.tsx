import type { NextPage } from 'next'

import { FormEventHandler, useEffect, useState } from 'react'
import DefaultLayer from "../components/layouts/DefaultLayout"
import Header from '../components/shared/Header'
import NavButton from '../components/shared/NavButton'
import Link from 'next/link'
import TextInput from '../components/shared/TextInput'
import GoodMess from '../components/shared/GoodMess'
import ErrMess from '../components/shared/ErrMess'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import Image from "next/image";
import logo from "../public/logo.svg"

const Home: NextPage = () => {





  const router = useRouter()

  const [isLoading, setLoading] = useState(false)

  const [showtoast, settoast] = useState({ message: "", show: false })

  const [showgoodtoast, setgoodtoast] = useState({ message: "", show: false })



  const connect = async () => {


    setLoading(true)
    const response = await fetch("/api/connect", { method: "GET" })
      .then(res => res.json())


    setLoading(false)
  }

  useEffect(() => {
    connect()
  }, [])





  const login: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    setLoading(true)

    const formElements = e.currentTarget.elements as typeof e.currentTarget.elements & {
      matricno: HTMLInputElement
    }
    const form = e.currentTarget.elements as any

    const body = {
      name: form.item(0).value,
      password: form.item(1).value,
    }



    const response = await fetch("/api/login", { method: "POST", body: JSON.stringify(body) })
      .then(res => {

        if (res.status == 204) {
          setgoodtoast({ message: " message", show: true })
          router.push("/student/DashBoard")


        }
        if (res.status == 203) {
          setgoodtoast({ message: " message", show: true })
          router.push("/staff/DashBoard")


        }
        if (res.status == 202) {
          setgoodtoast({ message: " message", show: true })
          router.push("/seller/DashBoard")


        }
        if (res.status == 201) {
          setgoodtoast({ message: " message", show: true })
          router.push("/creder/DashBoard")


        }
        if (res.status == 402) {
          settoast({ message: " message", show: true })

        }
      })

    setLoading(false)

  }


  return (

    <DefaultLayer>
      <div
        className="w-full py-20   text-black text-base md:text-xl"

      >


        <div
          className='grid lg:grid-cols-2  grid-cols-1 space-x-5'
        >

          <div
            className='lg:block hidden '
          >
            <div
            className=' flex justify-center my-40 '
            >
              <Image
                src={logo}
                className='rounded-sm'
              />
            </div>

          </div>


          <div>
            <Header
              title="LOGIN"
              desc="please provide necessary details for sign in"
            />

            <form
              className="w-full py-20 space-y-12  text-black text-base md:text-xl"
              onSubmit={
                login
              }
            >

              {showtoast.show && <ErrMess title="Invalid Credentials" />}
              {showgoodtoast.show && <GoodMess title="login successful" />}

              <div className="mx-auto  w-full ">
                <TextInput
                  placeholder="User Name"
                  name="User Name"
                  type='text'

                />
              </div>


              <div className="mx-auto w-full ">
                <TextInput
                  placeholder="Password"
                  name="Password"
                  type='password'
                />
              </div>




              <div className=" w-full  space-y-6">

                <button className="w-full btn-primary btn "
                  type="submit">
                  {isLoading ? "Loading..." : "SIGN IN"}

                </button>

                <h6 className="text-center md:text-xl w-full">
                  New Student?{" "}
                  <span className=" hover:underline">
                    <Link href="student/CreateAccount">Create a New Student Account</Link>
                  </span>
                </h6>
              </div>




            </form>


          </div>
        </div>





      </div>
    </DefaultLayer>
  )
}

export default Home








{/* <div className='  mx-auto'>

          <NavButton
            title={isLoading ? "Loading..." : "Student"}
            uLink='/student'
          />

        </div>



        <div className='  mx-auto'>

          <NavButton
            title={isLoading ? "Loading..." : "Staff"}
            uLink='/staff'
          />

        </div>


        <div className='  mx-auto'>

          <NavButton
            uLink="/seller"
            title={isLoading ? "Loading..." : "Seller"}
          />

        </div>


        <div className='  mx-auto'>

          <NavButton
            uLink="/creder"
            title={isLoading ? "Loading..." : "Creder"}
          />

        </div> */}