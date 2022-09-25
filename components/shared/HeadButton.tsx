import { MouseEventHandler } from "react"



type HeaderProps={
    title: string|any
    clickButton?: MouseEventHandler<HTMLDivElement>
}




export default function HeadButton(props: HeaderProps) {
    return (


        <div className='  mt-5'>
            <div
                onClick={props.clickButton}
            >
                <label className="btn btn-lg btn-primary btn-block">
                    {props.title}
                </label>
            </div>
        </div>

    )
}