import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";
import { FormEventHandler, Key, useEffect, useState } from "react";
import { useRouter } from "next/router";
import StuLayout from "./Layout/StuLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import cookie, { getCookie, hasCookie, getCookies } from "cookies-next"


type Student = {
    _id: string;
    firstname: string
    lastname: string
    matricno: string
}

type Seller ={
    _id: string
    storename: string
}



export async function getServerSideProps(){
    const res = await fetch("http://localhost:3000/api/fetchSeller", {method:"GET"}).then(res=>res.json())
    console.log(res)
return {
    props: {
sellers:res.sellers
    }
}

}



function DashBoard({sellers}:InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [student, setStudent] = useState<Student | null>(null);


    //this works
    // console.log(getCookie("user"))



    const showinfo = async () => {


        const token = getCookie("user")
        const body = {
            _id: token
        }

        const response = await fetch("http://localhost:3000/api/student/fetchStudent", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Student

        // console.log(JSON.stringify(response, ['student', 'firstname']))  //displays right information


        setStudent(response)

        const user = JSON.stringify(response, ['student', 'lastname'])

        //    console.log(user) //displays right information

       console.log(response, ['student', 'lastname'])


    }

    useEffect(() => {
        showinfo()

    }, [])

console.log(sellers[2])

    


    return (
        <StuLayout>
            <>






                <Header
                    title="dashboard"
                />
                <div className="text-red-500 text-3xl">
                    welcome {JSON.stringify(student, ['student', 'lastname'])}
                </div>


                <div
                    className="pt-5"
                >
                    <Header
                        title="Available Stores"
                    />
                </div>



{sellers.map((seller: { _id: Key | null | undefined; storename:string })=>{
    <div key= {seller._id}>
<div className="text-red-500">
    {seller.storename}
</div>

    </div>
})

}



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