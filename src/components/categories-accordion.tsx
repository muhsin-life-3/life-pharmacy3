import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'


export default function Example({ acc_data }: { acc_data: any }) {

    const router = useRouter()

    function LoadImages(imagesrc: any) {
        if (imagesrc.logo === null && imagesrc.banner === null) {
            return "https://www.lifepharmacy.com/images/life.svg"
        }
        else if (imagesrc.logo === null) {
            return imagesrc.banner;
        }
        else {
            return imagesrc.logo;
        }
    }
    function slugify(text: string) {
        return text.toLowerCase().replace(/[\s&/]+/g, '-')
    }
    function generatePath(grand_p: string, parent: string, child: string) {
        return `/category/${slugify(grand_p)}/${parent}/${slugify(child)}`
    }

    return (
        <div className="w-full grid lg:grid-cols-2 px-2">
            {acc_data.children.map((cat_data: any, indx: number) => (
                cat_data.sections.length > 0 ?
                    <div className="mx-auto w-full rounded-2xl bg-white p-2">
                        <Disclosure defaultOpen={true} >
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="rounded-2xl bg-slate-100 px-3 transition-colors duration-300   text-left  font-medium text-slate-900 hover:bg-[#F1F3F4] focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 w-full">
                                        <div className='flex justify-between px-3 py-3 items-center'>      <Link href={generatePath(acc_data.name, cat_data.slug, "")} > <h2 className='font-semibold hover:text-blue-500'>{cat_data.name}</h2></Link>
                                            <ChevronUpIcon
                                                className={`${open ? 'transform rotate-180 ' : ''
                                                    } h-5 w-5 font-bold `}
                                            /> </div>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm mb-2 bg-slate-50 backdrop-blur-lg rounded-xl  text-gray-500">
                                            <div className="grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 gap-y-5 p-2">{cat_data.sections.map((ch_data: any) => (
                                                <Link href={generatePath(acc_data.name, cat_data.slug, ch_data.name)} className="mx-2  hover:bg-white rounded-lg p-2 hover:shadow-md group/item transition-all duration-200">
                                                    <Image className=" mx-auto group-hover/item:scale-110 transition scale-100 duration-200 ease-in-out h-[50px] w-[50px]" src={LoadImages(ch_data.images)} height={50} width={50} alt={ch_data.name} />
                                                    <p className="xl:mx-3 xl:my-auto mt-3  ml-0 text-center text-[11px] my-auto ">{ch_data.name}</p>
                                                </Link>
                                            ))}</div>
                                        </Disclosure.Panel>
                                    </Disclosure.Button>
                                </>
                            )}
                        </Disclosure>
                    </div>
                    : null
            ))}
        </div>
    )
}