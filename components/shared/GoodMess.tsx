


type myProps = {
    title: string
}


function GoodMess(props: myProps) {
    return (

        <div className="alert alert-success shadow-lg ">
            <div>
                <svg
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                    // d="M9 1212 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                </svg>
                <span>{props.title}</span>
            </div>
        </div>

    );
}


export default GoodMess;