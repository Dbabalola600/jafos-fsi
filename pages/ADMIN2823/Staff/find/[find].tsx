import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import AdminLayout from "../../Layout/AdminLayout";
import Header from "../../../../components/shared/Header";
import Money_Format from "../../../../components/shared/money_format";



type Staff ={
    _id: string
    firstname: string
    staffid: string
    lastname: string
    account_bal: number
}






export default function Users() {
    const router = useRouter()

    const [staff, setStaff] = useState<Staff | null>(null);
    const [isLoading, setLoading] = useState(false)

    let ssd = router.query

    console.log(ssd.find)

    const showinfo = async () => {

        const body = {
            find: ssd.find
        }


        const response = await fetch("/api/admin/staff/fetchByStaffId", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Staff
        setStaff(response)

    }


    useEffect(() => {
        showinfo()
    }, [])



    const delOne = async () => {
        setLoading(true)
        const body = {
            user: staff?._id
        }

        const response = await fetch("/api/admin/student/deleteStudent", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    router.push("/ADMIN2823/Students")
                }
            })



        setLoading(false)
    }




    if (staff?.firstname === undefined) {
        return (

            < AdminLayout >
                <>
                    <Header
                        title={"nothing can be found for " + ssd.find}
                    />


                </>
            </AdminLayout >

        )
    } else {
        return (
            < AdminLayout > 
                <>

                    <Header
                        title={staff?.firstname}
                    />


                    <div className=" text-primary mt-5 space-y-5 w-full ">

                        <div>
                            Name:  {staff?.firstname} {" "} {staff?.lastname}


                        </div>

                        <div>
                           Staff No: {staff.staffid}


                        </div>


                    
                        <div>
                            Account Balance: <Money_Format amount= {staff?.account_bal}/>
                        </div>


                    </div>

                    <button
                        className="btn btn-primary w-full mt-10"
                        onClick={() => delOne()}

                    >


                        {isLoading ? "Loading..." : "DELETE USER"}
                    </button>

                </>
            </AdminLayout >
        )
    }


}