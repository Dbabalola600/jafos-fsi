
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





type Seller = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
}




type OrderItems = {
    _doc: any
    _id: string;
    product: string;
    storename: string;
    price: number;
    quantity: number;
    amount: number;
    user: string;
    status: string

}









export default function index() {
    const [student, setStudent] = useState<Student | null>(null);
    const [seller, setSeller] = useState<Seller | null>(null);
    const [orderItem, setOrderItem] = useState<OrderItems>()

    const [isLoading, setLoading] = useState(false)







    const router = useRouter()

    let pth = router.asPath.split("/")



    let ssd = router.query
    console.log(ssd._id)

    const token = getCookie("Selluser")
    // console.log(token)




    const showinfo = async () => {


        const body = {
            _id: token
        }

        const response = await fetch("/api/seller/fetchSeller", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Seller


        setSeller(response)
        console.log(response.storename)



        const body2 = {
            _id: ssd._id,

        }

        const Ordresponse = await fetch("/api/seller/order/fetchOrderItem", { method: "POST", body: JSON.stringify(body2) })
            .then(res => res.json()) as OrderItems



        setOrderItem(Ordresponse)



        console.log(Ordresponse)

        const body3 = {
            _id: Ordresponse.user
        }



        const StuResponse = await fetch("/api/seller/fetchStudent", { method: "POST", body: JSON.stringify(body3) })
            .then(res => res.json()) as Student

        setStudent(StuResponse)
        console.log(StuResponse)




    }


    useEffect(() => {
        showinfo()

    }, [])

    async function CompleteStat  () {
        setLoading(true)



        const body = {
            id: ssd._id
        }

        const StatResponse = await fetch("/api/seller/order/compOrderStat", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200){
                    router.push("/seller/Orders")
                }
            })

            setLoading(false)

    }








    async function DeliveredStat  () {
        setLoading(true)

        

        const body = {
            id:ssd._id
        }

        const StatResponse = await fetch("/api/seller/order/deliOrderStat", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200){
                    router.push("/seller/Orders")
                }
            })

            setLoading(false)

    }



    return (
        <CatLayout>
            <>

                <Header
                    title="this a an order thingy"
                    desc={student?.firstname}
                />


              
                    <div
                        key={orderItem?._id}
                        className="text-red-500"
                    >
                        {orderItem?.amount} {" "} {orderItem?.status} {"  "} {orderItem?.quantity} {" "} {orderItem?.product}
                    </div>
              









                <div
                    className="btn btn-primary"
                    onClick={CompleteStat}
                    
                >
                      {isLoading ? "Loading..." : "Completed"}
                </div>



                <div
                    className="btn btn-primary"
                    onClick={DeliveredStat}
                    
                >
                      {isLoading ? "Loading..." : "Delivered"}
                </div>

            </>
        </CatLayout>
    )
}