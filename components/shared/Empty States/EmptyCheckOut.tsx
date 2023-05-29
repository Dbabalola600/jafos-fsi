import Image from "next/image";
import empty_checkout from "../../../public/empty_checkout.svg"

export default function EmptyCheckout (){
    return(
        <div
        className=" flex justify-center mt-5 grid-cols-1  "
    >

     
       <Image
            src={empty_checkout}
            width={400}
            height={300}
            className='rounded-sm   flex justify-center'
        />

    </div>
    )
}