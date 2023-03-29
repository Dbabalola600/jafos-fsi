import Link from "next/link";



type CardProps ={
    ulink: string
    OrderNum: number 
    User: String 
    status: string 
}



export default function OrderCard(props: CardProps) {

return(
    <div>

        <Link
            href={props.ulink}
        >

            <div className="bg-primary rounded-lg  p-3 hover:bg-primary/80">

                <div
                    className="items-center justify-center "
                >
                    <div
                        className="rounded-xl text-center text-sm  bg-black text-white"
                    >
                       Order Status: {props.status}
                    </div>

                </div>
                <div className="flex items-end space-x-3">

                    <div className="w-1/2  text-left relative">


                        <div className="text-black   font-bold text-lg">
                          Order Number:  {props.OrderNum}
                        </div>

                        <p
                            className="text-gray-400"
                        >
                           Name: {props.User}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    </div>


)




}