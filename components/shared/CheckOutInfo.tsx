import { MouseEventHandler } from "react"
import Money_Format from "./money_format"



type MyProps = {
    product: string
    amount: any
    quantity: any
    clickButton?: MouseEventHandler<HTMLDivElement> | any
}




export default function CheckOutInfo(props: MyProps) {
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
                        <Money_Format amount={props.amount}/>
                    </p>


                    <p
                    >
                        Quantity:   {props.quantity}
                    </p>
                </div>
            </div>


            <div
                className=" grid lg:grid-cols-1 gap-6 pt-5 grid-cols-1"
            >
                <button
                    type="submit"
                    className="btn bg-black float-right text-white "
                    onClick={props.clickButton}
                > Delete
                </button>
            </div>




        </div>
    )
}