import router from "next/router";



type BarProps = {

    allLink: any
    // drinkLink: any
    // foodLink:any
    // specialLink: any



    all: string
}






export default function ProductBar(props: BarProps) {
    return (
        <div
            className="grid grid-flow-col     "

        //className="grid grid-flow-col overflow-x-scroll mt-10 p-5   gap-5  "

        >




            <div
                className="btn btn-primary text-white text-center"
                onClick={() => router.push(props.allLink)}
            >

                {/* All {"   "}  */} {props.all}
            </div>








            {/* <div
            className="btn bg-black text-white text-center"
            onClick={() => router.push(props.foodLink)}
        >

          Food
        </div>





        <div
            className="btn bg-primary text-white text-center"
            onClick={() => router.push(props.drinkLink)}
        >

           Drinks
        </div>





        <div
            className="btn bg-black text-white text-center"
            onClick={() => router.push(props.specialLink)}
        >

          Special
        </div> */}


        </div>
    )
}