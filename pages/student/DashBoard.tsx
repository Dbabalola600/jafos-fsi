import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";
import { FormEventHandler, Key, useEffect, useState } from "react";
import { useRouter } from "next/router";
import StuLayout from "./Layout/StuLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import cookie, { getCookie, hasCookie, getCookies } from "cookies-next"

import AvailableStores from "./availableStores"
import Link from "next/link";
import HeadButton from "../../components/shared/HeadButton";

type Student = {
    _id: string;
    firstname: string
    lastname: string
    matricno: string
    account_bal: number
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
const router = useRouter()

    //this works
    // console.log(getCookie("user"))



    const showinfo = async () => {


        const token = getCookie("Normuser")
        const body = {
            _id: token
        }

        const response = await fetch("/api/student/fetchStudent", { method: "POST", body: JSON.stringify(body) })
        .then(res => res.json()) as Student
        
      
      

     

        setStudent(response)

        const user = JSON.stringify(response, ['student', 'lastname'])

       
     



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
                    Welcome {student?.firstname} {"  "}
                    {student?.account_bal} Credits
                </div>


                <div
                    className="pt-5"
                >
                    <div  
                    className="text-primary  text-2xl font-bold text-center  underline"
                    >
                        Available Stores
                    </div>
                    
                </div>

                <div
                        className="grid grid-cols-2 space-x-5 mx-auto"
                        >


{sellers.map((seller: { _id: Key | null | undefined; storename: string; }) =>
                    <div
                        key={seller._id}
                    >

                      


                           

<Link
                            href={`/stores/${seller._id}`}
                           >
                            <a>
                            <HeadButton
                            title={seller.storename}
                            
                            />
                            </a>
                           

                            </Link>
                          
                           

                       
                      

                    </div>
                )}
                            
                        </div>
               

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