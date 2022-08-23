


type myProps = {
    title: string
}


function Loginerro(props:myProps) {
    return (

    <div className="alert alert-error shadow-lg ">
        <div>
            <svg 
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{props.title}</span>
        </div>
    </div>

    );
}


export default Loginerro;