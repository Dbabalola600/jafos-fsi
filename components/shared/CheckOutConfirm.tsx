import { MouseEventHandler } from "react"



type MyProps = {
    product: string
    amount: any
    quantity: any

}




export default function CheckOutConfirm(props: MyProps) {
    return (
        <div className="bg-primary rounded-lg p-3 pb-5 ">
            <div className="flex items-end break-words  text-white">

                <div className="w-full  grid grid-cols-1 lg:grid-cols-2    text-left relative">


                    <p className="">
                        {props.product}
                    </p>

                    <p
                        className=""
                    >
                        ₦  {props.amount}
                    </p>


                    <p
                    >
                        Quantity:   {props.quantity}
                    </p>
                </div>
            </div>







        </div>
    )
}