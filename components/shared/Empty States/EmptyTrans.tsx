import Image from "next/image"
import empty_card from "../../../public/empty_card.svg"


export default function EmptyTrans(){
    return(
        <div
        className=" flex justify-center mt-5 grid-cols-1  "
    >

     
       <Image
            src={empty_card}
            width={400}
            height={300}
            className='rounded-sm   flex justify-center'
        />

    </div>
    )


}