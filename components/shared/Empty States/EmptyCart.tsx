import Image from "next/image";
import empty_cart from "../../../public/empty_cart.svg"



export default function EmptyCart(){
    return(
        <div
        className=" flex justify-center mt-5 grid-cols-1  "
    >

     
       <Image
            src={empty_cart}
            width={400}
            height={300}
            className='rounded-sm   flex justify-center'
        />

    </div>
    )
}