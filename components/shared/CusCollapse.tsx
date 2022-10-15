import { MouseEventHandler } from "react"

type Myprops = {
    title: string | any
    info: string
    clickButton?:MouseEventHandler<HTMLDivElement>| any
}






export default function CusCollapse(props: Myprops) {
    return (
        <div className="collapse mt-5">
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-primaryColour text-white ">
                {props.title}
            </div>
            <div className="collapse-content bg-primaryColour text-white ">

                <div 
                className="mx-auto grid grid-cols-2 pt-5"
                >
                    <div>{props.info}</div>


                    <div className="btn btn-primary btn-sm "
                    onClick={props.clickButton}
                    >
                        show more
                    </div>

                </div>

            </div>
        </div>
    )
}