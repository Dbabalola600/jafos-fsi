import type { NextPage } from 'next'

type HeaderProps = {
    title: string|any;
    desc?: string|any;
}


function Header(props: HeaderProps) {
    return (
        <div className="space-y-5 w-full text-primary">
            <h1 className="heading1 w-full text-center font-bold text-3xl ">{props.title}</h1>
            <div className="heading-info1 w-full text-center break-words pt-4 font-semibold text-2xl ">

                {props.desc}

            </div>
        </div>
    )
}

export default Header;