import Link from "next/link";
import router from "next/router";


type histProps = {
    allLink?: string | any
   
    WithLink: string | any
    tokenLink: string | any

    allAmt: any
    WithAmt: any
   
    tokenAmt: any
}




export default function HistBarCred(props: histProps) {
    return (
        <div
            className="grid grid-flow-col overflow-x-scroll mt-10 p-5   gap-5  "
        >


           

            <div
                className="btn btn-primary text-white text-center"
                onClick={() => router.push(props.allLink)}
            >

                All {"   "} {props.allAmt}
            </div>



            {/* debit */}




            <div
                className="btn bg-red-500 text-white text-center"
                onClick={() => router.push(props.WithLink)}
            >

                Withdraws {"   "} {props.WithAmt}
            </div>





            {/* token credit */}
            <div
                className="btn bg-orange-500 text-white text-center"
                onClick={() => router.push(props.tokenLink)}
            >

                Token Credit{"     "} {props.tokenAmt}
            </div>




        </div>

    )
}