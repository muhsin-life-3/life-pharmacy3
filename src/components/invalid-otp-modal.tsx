import ModalContainer from "./modal-container"
import { Dialog } from "@headlessui/react"

const InvalidOTPModal = ({ showModal, setCloseModal }: { showModal: any, setCloseModal: any }) => {
    return (
        <ModalContainer showModal={showModal} setCloseModal={setCloseModal}>
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white  text-left align-middle shadow-xl transition-all">
                <div className="rounded-t-3xl bg-red-500 p-6 text-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mx-auto h-28 w-28">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className=" p-5 text-center">
                    <h3 className="mb-5 text-center text-3xl font-bold">Oops</h3>
                    <p className=" font-semibold text-gray-600">Something went wrong!</p>
                    <p className=" font-semibold text-gray-600">Invalid code. Please enter the correct code.</p>
                    <button onClick={() => { setCloseModal(false) }} type="button" className="mt-10 rounded-lg border border-gray-200 bg-red-500 px-5 py-1.5 text-sm font-medium text-white hover:bg-red-700 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 ">OK</button>
                </div>
            </Dialog.Panel>
        </ModalContainer>
    )
}

export default InvalidOTPModal