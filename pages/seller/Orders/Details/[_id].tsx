
import Header from "../../../../components/shared/Header";
import CatLayout from "../../Layout/CatLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";





type Student = {
    _id: string;
    firstname: string
    lastname: string
    matricno: string
}









export default function index() {
    const router = useRouter()

    let pth = router.asPath.split("/")



    let ssd = router.query
    // console.log(ssd._id)

    const token = getCookie("user")
    console.log(token)

    const [student, setStudent] = useState<Student | null>(null);




    const showinfo = async () => {



        const body = {
            _id:ssd._id
        }

        const response = await fetch("/api/seller/fetchStudent", { method: "POST", body: JSON.stringify(body)})
            .then(res => res.json()) as Student



        setStudent(response)

        const user = JSON.stringify(response, ['student', 'lastname'])


       console.log(response)
    }



    useEffect(() => {
        showinfo()

    }, [])


    return (
        <CatLayout>
            <>

                <Header
                    title="this a an order thingy"
                />



            </>
        </CatLayout>
    )
}