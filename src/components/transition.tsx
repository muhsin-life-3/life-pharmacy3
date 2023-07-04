import { Transition } from '@headlessui/react'
import { useState, Fragment } from 'react'
import { RadioGroup } from '@headlessui/react'
const TransitionComp = ({  setTransition, children }: { setTransition: any, children: any }) => {

    const [isShowing, setIsShowing] = useState(setTransition)

    return (
        <Transition appear

            show={isShowing}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">

            <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                {children}
            </Transition.Child>

        </Transition>
    )
}

export default TransitionComp