
import { Listbox, Transition } from '@headlessui/react'
import { CheckCircleIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { FC, Fragment, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

interface props{
    countries:any, 
    languageClicked:any, 
    languages:any, 
    languageBackClicked:any, 
    parts:any, 
    selectedLanguage:any
}

const MenuLanguage:FC<props>= ({ countries, languageClicked, languages, languageBackClicked, parts, selectedLanguage })=> {
    const searchParams = usePathname()
    const currentPath = searchParams?.substring(7, searchParams.length)

    // const [laguage, setLaguage] = useState(languages[0].name)
    const [chooseCountr, setChooseCountr] = useState(true)
    const [chooseLanguage, setChooseLanguage] = useState(false)
    const router = useRouter()
    function languageClickEvent() {
        setChooseCountr(false)
        setChooseLanguage(true)
        languageClicked(selectedLanguage)
    }
    function languageBackClick() {
        setChooseCountr(true)
        setChooseLanguage(false)
        languageBackClicked()
    }

    function languageChange(langName:string) {
        switch (langName) {
            case "Arabic":
                langName = "ar"
                break

            case "English":
                langName = "en"
                break
        }

        // const routePath = `${parts[0]}-${langName}`
        // console.log(routePath);
        let country = "ae"
        if(parts[0] != "home"){
            country = parts[0]
        }
        
        router.push(`/${country}-${langName}/${currentPath}`)
    }

    function countryChange(countryName:string) {

        switch (countryName) {
            case "UAE":
                countryName = "ae"
                break

            case "SA":
                countryName = "sa"
                break
        }

        let result = ""
        if (searchParams?.includes('/home') || searchParams?.includes('/products')) {
            let index = 0
            if (searchParams?.includes('/home')) {
                index = searchParams?.indexOf('/home');

            }
            else {
                index = searchParams?.indexOf('/products');

            }
            if (searchParams && index != undefined) {
                if (index !== -1) {
                    result = searchParams.substring(index); // get the substring from the index to the end
                }
            }
        }


        router.push(`${countryName}-${parts[1]}${result}`)
    }

    return (
        <>
            {chooseCountr ?
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className={"absolute max-h-80 w-[17rem] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm divide-y-[1px] divide-gray-300"+(selectedLanguage==="Arabic"?" left-0":" right-0")} >

                        <div className='p-2 flex justify-between items-center'>
                            <p>SELECT LANGUAGE</p>
                            <button className=' flex space-x-2 items-center' onClick={() => {
                                languageClickEvent()
                            }}>
                                <p className='text-pink-600'>{selectedLanguage}</p>
                                <ChevronRightIcon className='w-5 h-5 my-auto' />
                            </button>

                        </div>

                        <div className='p-2 '>CHOOSE COUNTRY</div>

                        {countries.map((obj:any, personIdx:number) => (

                            <Listbox.Option onClick={() => { countryChange(obj.country) }}
                                key={personIdx+"country"}
                                className={({ selected }) =>
                                    `flex cursor-default select-none p-2 items-center ${selected ? 'bg-blue-500 text-white' : ''
                                    }`
                                }
                                value={obj.flag}
                            >

                                {({ selected }) => (
                                    <>


                                        <Image src={obj.flag} height={35} width={35} alt="flag-img" className='rounded-lg'/>
                                        <div
                                            className={`block truncate mx-4  ${selected ? 'font-medium' : 'font-normal'
                                                }`}
                                        >
                                            {obj.country}
                                        </div>
                                        {/* {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                ) : null} */}


                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>

                : ""}
            {chooseLanguage ?

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className={"absolute max-h-60 w-[17rem] overflow-auto rounded-md bg-white  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm divide-y-[1px] divide-gray-300"+(selectedLanguage==="Arabic"?" left-0":" right-0")}>
                        <button className="flex space-x-2 p-2 " onClick={() => { languageBackClick() }}>
                            <ChevronLeftIcon className='w-5 h-5' />
                            <div className='text-pink-600'>Back</div>
                        </button>
                        {languages.map((person:any, personIdx:number) => (
                            <Listbox.Option
                                onClick={(e) => { languageChange(person.name) }}
                                key={personIdx+"lang"}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-emerald-100' : 'text-gray-900'
                                    } `
                                }
                                value={person.name}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                }`}
                                        >
                                            {person.name}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-500 ">
                                                <CheckCircleIcon className="h-6 w-6" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
                : ""}
        </>

    )
}


