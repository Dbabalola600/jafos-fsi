
import Image from "next/image"
import no_orders from "../../../public/no_orders.svg"



export default function EmptyOrder (){
    return(
        <div
        className=" flex justify-center mt-5 grid-cols-1  "
    >

     
       <Image
            src={no_orders}
            width={400}
            height={300}
            className='rounded-sm   flex justify-center'
        />

    </div>
    )
}