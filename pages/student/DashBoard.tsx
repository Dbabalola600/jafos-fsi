import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";
import { FormEventHandler, Key, useEffect, useState } from "react";
import { useRouter } from "next/router";
import StuLayout from "./Layout/StuLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import cookie, { getCookie, hasCookie, getCookies } from "cookies-next"

import AvailableStores from "./availableStores"
import Link from "next/link";

type Student = {
    _id: string;
    firstname: string
    lastname: string
    matricno: string
}

type Sellers = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
}





function DashBoard() {
    const [student, setStudent] = useState<Student | null>(null);
    const [sellers, SetSellers] = useState<Sellers[]>([])


    //this works
    // console.log(getCookie("user"))



    const showinfo = async () => {


        const token = getCookie("user")
        const body = {
            _id: token
        }

        const response = await fetch("/api/student/fetchStudent", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Student

       

        setStudent(response)

        const user = JSON.stringify(response, ['student', 'lastname'])

       
       console.log(response)





       const SellerResponse = await fetch("/api/student/fetchSeller", { method: "GET" })
       .then(res => res.json()) as Sellers[]

       SetSellers(SellerResponse)



    }

    useEffect(() => {
        showinfo()

    }, [])

 


    return (
        <StuLayout>
            <>






                <Header
                    title="Dashboard"
                />
                <div className="text-primary text-3xl">
                    Welcome {student?.firstname}
                </div>


                <div
                    className="pt-5"
                >
                    <div  
                    className="text-primary  text-2xl font-bold  underline"
                    >
                        Available Stores
                    </div>
                    
                </div>


                {sellers.map((seller: { _id: Key | null | undefined; storename: string; }) =>
                    <div
                        key={seller._id}
                    >
                        <Link
                            href={`/stores/${seller.storename}`}
                        >
                            <a>
                                <Header
                                    title={seller.storename}
                                />
                            </a>

                        </Link>

                    </div>
                )}


            </>
        </StuLayout>
    )
}



export default DashBoard;




// export async function getServerSideProps(){
//     const seller = await fetch("http://localhost:3000/api/fetchSeller", {method: "GET"}})
//     .then(res=>res.json()) 
// //    const tests = await Test.find();
//    console.log(seller)
   
//     return {
//         props: {
//           sellers: sellers.seller ,
//         },
//       };
// }