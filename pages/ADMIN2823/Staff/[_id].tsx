import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Header from "../../../components/shared/Header"

import AdminLayout from "../Layout/AdminLayout"
import Money_Format from "../../../components/shared/money_format"
import CusModal from "../../../components/shared/modal"






type Staff = {
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

    console.log(ssd.id)
    const showinfo = async () => {

        const body = {
            _id: ssd._id
        }


        const response = await fetch("/api/admin/staff/fetchStaffId", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Staff
        setStaff(response)




    }


    useEffect(() => {
        showinfo()
    }, [])



    const delOne = async () => {
        setLoading(true)
        const body = {
            user: ssd._id
        }

        const response = await fetch("/api/admin/staff/ridStaff", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    router.push("/ADMIN2823/Staff")
                }
            })



        setLoading(false)
    }





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
                        Staff No: {staff?.staffid}


                    </div>



                    <div>
                        Account Balance: <Money_Format amount={staff?.account_bal} />
                    </div>


                </div>


                <div
                    className="mt-10"
                >

                    <CusModal
                        mainButtonTitle="Delete User"
                        smButtonTitle="Delete"
                        modalInfo="Are you sure you wish to delete the user? user will not be able to be retrieved"
                        clickButton={() => delOne()}
                    />

                </div>
                {/* <button
                    className="btn btn-primary w-full mt-10"
                    onClick={() => delOne()}
                // type="submit"
                >


                    {isLoading ? "Loading..." : "DELETE USER"}
                </button> */}

            </>
        </AdminLayout >
    )
}