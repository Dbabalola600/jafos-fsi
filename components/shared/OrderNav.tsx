import router from "next/router"

type MyProps = {
    allLink: string
    all: number|any
    pendLink: string
    pend: number|any
    compLink: string
    comp: number|any
    delLink: string
    del: number|any
    cancLink: string
    canc:number|any
}






export default  function OrderNav(props: MyProps) {
    return (
        <div
            className="grid grid-flow-col overflow-x-scroll mt-10 p-5   gap-5  "
        >


            <div
                className="btn btn-primary"
                onClick={() => router.push(props.allLink)}
            >
                All Orders {" "} ({props.all})
            </div>


            <div
                className="btn btn-primary"
                onClick={() => router.push(props.pendLink)}
            >
                Pending Order{" "}  ({props.pend})
            </div>


            <div
                className="btn btn-primary"
                onClick={() => router.push(props.compLink)}
            >
                Completed Order {" "}({props.comp})
            </div>
            <div
                className="btn btn-primary"
                onClick={() => router.push(props.delLink)}
            >
                Delivered Order{" "} ({props.del})
            </div>
            <div
                className="btn btn-primary"
                onClick={() => router.push(props.cancLink)}
            >
                Cancelled Order{" "} ({props.canc})
            </div>


        </div>

    )
}