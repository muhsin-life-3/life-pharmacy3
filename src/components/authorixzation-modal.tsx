import { Dialog, Transition, RadioGroup, Listbox } from "@headlessui/react";
import { Fragment } from "react"
import ModalContainer from "./modal-container";
import { Tabs, Tab, TabsHeader, TabsBody, TabPanel } from "@material-tailwind/react"
import PhoneInput from "react-phone-number-input";
import { useState } from "react"
import { isValidPhoneNumber } from "react-phone-number-input";
import { useSession } from "next-auth/react";
import OtpField from "react-otp-field";
import { useTimer } from "use-timer";
import { signIn } from "next-auth/react";

const AuthModal = ({ showModal, setCloseModal, setaddnewAddressFormVisibility, setLocationModal, setnotValidOTPPageVisib, setaddNewAddress }: { showModal: boolean, setCloseModal: any, setaddNewAddress: any, setaddnewAddressFormVisibility: any, setLocationModal: any, setnotValidOTPPageVisib: any }) => {
    const { data: session } = useSession();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneNumberValid, setPhoneNumberValidState] = useState(false);
    const [signInUsing, signInSet] = useState("");
    const [isEmailValid, setEmailValidState] = useState(false);
    const [otpPageVisibility, setOtpPageVisibility] = useState(false);
    const [state, setState] = useState('');
    const [countDownVisible, setCountDownVisible] = useState(false);
    const handleChange = (state: string) => setState(state);
    const [phoneNumberforOTP, setPhoneNumberforOtp] = useState('');

    var addressId = session ? (session.token.addresses.length != 0 ? (session.token.addresses[session.token.addresses.length - 1]?.id) + 1 : 12345 + 1) : ""

    const { time, start, pause, reset, status } = useTimer({
        initialTime: 59,
        timerType: 'DECREMENTAL',
    });


    async function otpIsValid(otpValue: string) {
        if (signInUsing === "Phone") {
            await signIn('credentials', { phone: phoneNumberforOTP, code: otpValue, isPhone: "true", redirect: false })
                .then(async (res) => {
                    if (res?.ok) {
                        setaddNewAddress(true);
                        setaddnewAddressFormVisibility(false)
                        setLocationModal(false);
                    }
                    else {
                        // console.log(error)
                        setnotValidOTPPageVisib(true)
                    }
                })
        }
        else {
            await signIn('credentials', { email: phoneNumberforOTP, code: otpValue, isPhone: "false", redirect: false })
                .then(async (res) => {
                    debugger
                    if (res?.ok) {
                        setaddNewAddress(true);
                        setaddnewAddressFormVisibility(false)
                        setLocationModal(false);
                    }
                    else {
                        setnotValidOTPPageVisib(true)
                    }
                })
            setPhoneNumberValidState(false)
        }
    }


    function sendOTPtoPhoneNo(pHNumber: string, type: string) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw
        if (type === "phone") {
            raw = JSON.stringify({
                "phone": pHNumber
            });
        }
        else if (type === "email") {
            raw = JSON.stringify({
                "email": pHNumber
            });
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        console.log(pHNumber);
        setPhoneNumberforOtp(pHNumber)
        const res = fetch("https://prodapp.lifepharmacy.com/api/auth/request-otp", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error while fetching search data', error));
    }


    const [formData, setFormData] = useState({
        id: addressId,
        entity_id: 1462724,
        name: "",
        phone: "",
        longitude: "55.272887000000000",
        latitude: "25.219370000000000",
        type: "Home",
        country: "United Arab Emirates",
        state: "",
        city: "",
        area: "Satwa/Badaa",
        street_address: "",
        building: "",
        flat_number: "",
        suitable_timing: "0",
        created_at: "2023-03-16T08:09:22.000000Z",
        updated_at: "2023-03-16T08:09:22.000000Z",
        google_address: "Al Satwa - Dubai - United Arab Emirates",
        additional_info: "",
        belongs_to: "user",
        deleted_at: null,
        is_validated: 1
    });


    function isValidCredentials(value: string) {
        if (value != null) {
            if (isValidPhoneNumber(value)) {
                setPhoneNumberValidState(true);
                setFormData({ ...formData, phone: value });
                signInSet("Phone");
            }
            else {
                setPhoneNumberValidState(false);
            }
        }
    }


    function isValidEmail(e: React.ChangeEvent<HTMLInputElement>): void {
        const emailAddress: string = e.target.value;
        if (emailAddress !== null) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)) {
                setEmailValidState(true);
                signInSet("Email");
            } else {
                setEmailValidState(false);
            }
        }
    }

    function startTimer() {
        start();
        setCountDownVisible(true);
    }
    const stopTimer = () => {
        setCountDownVisible(false);
        reset();
        return 0;
    }

    function isValidPhoneNoInput(SetOtpVisb: boolean) {

        if (SetOtpVisb) {
            (document.getElementById("loginOrSignup") as HTMLInputElement).classList.add("hidden")
            setOtpPageVisibility(true);

            setState('');
            startTimer();

            if (signInUsing === "Phone") {
                const phoneNo = ((document.getElementById("phoneInputOTP") as HTMLInputElement).value).replace(/\+|\s/g, "").trim()
                sendOTPtoPhoneNo(phoneNo, "phone");
            }
            else {
                const emailId = (document.getElementById("emailInput") as HTMLInputElement).value

                // document.getElementById("emailInput").value
                sendOTPtoPhoneNo(emailId, "email");
            }
        }
        else {
            (document.getElementById("loginOrSignup") as HTMLInputElement).classList.remove("hidden")
            setOtpPageVisibility(false);
            stopTimer()
        }
    }

    return (
        <ModalContainer showModal={showModal} setCloseModal={setCloseModal}>
            <Dialog.Panel className="w-full sm:max-w-lg max-w-xs transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div id="loginOrSignup">
                    <Dialog.Title
                        as="h3"
                        className="sm:text-2xl font-bold  text-blue-500  mb-3"
                    >
                        <h3>Login Or SignUp</h3>
                    </Dialog.Title>

                    <form className="space-y-6" action="#" >
                        <div className="mt-3 flex-1">
                            <Tabs value="phone" className="border-none ">
                                <TabsHeader >
                                    <Tab key="phone" value="phone">
                                        <span className="sm:text-base text-xs">Using Phone</span>
                                    </Tab>
                                    <Tab key="email" value="email">
                                        <span className="sm:text-base text-xs">Using Email</span>
                                    </Tab>
                                </TabsHeader>
                                <TabsBody >
                                    <TabPanel key="phoneinput" value="phone" >
                                        <div>
                                            <label className=" block mb-2 font-medium text-gray-900 sm:text-base text-sm
 ">Enter your mobile number <span className="text-red-500">*</span></label>
                                            <div className="relative border border-gray-300 pl-3 rounded-lg">
                                                <PhoneInput
                                                    placeholder="Enter phone number"
                                                    value={phoneNumber}
                                                    onChange={isValidCredentials}
                                                    international
                                                    defaultCountry="AE"
                                                    id="phoneInputOTP"
                                                />
                                                {isPhoneNumberValid ?
                                                    <div
                                                        className="absolute top-[21px] right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500"
                                                    >
                                                        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                                        </svg>

                                                    </div> : ""}

                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel key="emailInput" value="email" >
                                        <div className="relative">
                                            <label className="block mb-2  font-medium text-gray-900
">Please enter your email <span className="text-red-500">*</span></label>
                                            <input onChange={isValidEmail} id="emailInput" type="text" name="email" className="text-md font-semibold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-0 focus:border-0 block w-full p-2.5" placeholder="Your Email Address" required />
                                            {isEmailValid ?
                                                <div
                                                    className="absolute top-[60px] right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
                                                    <i className="">
                                                        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                                        </svg>
                                                    </i>
                                                </div> : ""}
                                        </div>
                                    </TabPanel>
                                </TabsBody>
                            </Tabs>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between mb-4">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                    </div>
                                    <div className="sm:text-sm  text-gray-500 text-xs">
                                        By continuing, I agree to the <span><a href="#" className="text-blue-500">Terms of Use</a></span> & <span><a href="#" className="text-blue-500">Privacy Policy</a></span>
                                    </div>
                                </div>
                            </div>
                            <button type="button" disabled={isPhoneNumberValid || isEmailValid ? false : true} onClick={() => { isValidPhoneNoInput(true) }} className={"bg-blue-500 disabled:bg-blue-300" + (" flex justify-center w-full   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ")}>
                                <span className="mr-4 text-white">PROCEED</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
                {otpPageVisibility ?

                    <div className="" id="otpPage">
                        <h3 className="mb-3 text-2xl font-bold text-blue-500 ">OTP Code</h3>
                        <label className="block mb-2 font-medium text-gray-900">Please check your {signInUsing} and enter the OTP code  <span className="text-red-500">*</span></label>

                        <form className="space-y-6" action="#" >

                            <OtpField
                                value={state}
                                onChange={handleChange}
                                numInputs={4}
                                classNames={"flex justify-center "}
                                inputProps={{ className: 'sm:!w-[90px] w-[60px]  mr-5 text-3xl text-center font-bold h-[60px] border-blue-400 focus:ring-0 border-b-4 border-t-0 border-x-0 bg-transparent' }}
                            />


                            <div className="mx-3">


                                {countDownVisible ? <div className="text-sm  text-gray-500 flex justify-between" id="seconds-count">
                                    <p>Didn't Receive Code?</p> <div className="">Request again in {time >= 0 ? time : stopTimer()} seconds</div>
                                </div> : <button onClick={() => { isValidPhoneNoInput(true) }} type="button" className="bg-white hover:bg-blue-600 px-3 py-2 rounded-lg border text-blue-500 border-blue-500  hover:text-white text-xs tracking-widest" >RESEND OTP</button>
                                }


                            </div>
                            <div className="flex space-x-3">
                                <button onClick={() => { isValidPhoneNoInput(false) }} className="bg-white border border-gray-600  justify-center w-1/2 flex items-center focus:bg-black active:text-white focus:text-white hover:bg-gray-700  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg>
                                    <span className="ml-4">Back</span>
                                </button>
                                <button type="button" onClick={(e) => {
                                    e.preventDefault()
                                    otpIsValid(state)
                                }} disabled={state.length === 4 ? false : true} className={" disabled:bg-blue-300 bg-blue-500  items-center flex justify-center w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "}>
                                    <span className="mr-4 text-white ">PROCEED</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div> : null}
            </Dialog.Panel>
        </ModalContainer>
    )


}

export default AuthModal