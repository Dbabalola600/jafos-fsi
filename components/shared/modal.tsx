import { MouseEventHandler } from "react"


type ModalProps = {
    mainButtonTitle: string | any
    modalInfo: string | any
    smButtonTitle: string | any
    clickButton: MouseEventHandler<HTMLLabelElement>
}





export default function CusModal(props: ModalProps) {
    return (
        <>
            <label
                htmlFor="my-modal"
                className="btn modal-buton btn-primary"
            >  {props.mainButtonTitle}</label>

            <input type="checkbox" id="my-modal" className="modal-toggle" />

            <div
                className="modal"
            >
                <div
                    className="modal-box relative"
                >
                    <label
                        htmlFor="my-modal"
                        className="btn btn-sm btn-circle absolute right-2 top-2 btn-primary"
                    >
                        X
                    </label>
                    <div
                        className="text-xl text-black"
                    >
                        {props.modalInfo}
                    </div>
                    <div className="modal-action">
                        <label
                            htmlFor="my-modal "
                            onClick={props.clickButton}
                            className="btn btn-primary">
                            {props.smButtonTitle}
                        </label>
                    </div>

                </div>

            </div>
        </>
    )
}