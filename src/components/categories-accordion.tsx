import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'


export default function Example({ acc_data }: { acc_data: any }) {

    const { asPath } = useRouter()



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
        return `category/${slugify(grand_p)}/${parent}/${slugify(child)}`
    }

    return (
        <div className="w-full grid lg:grid-cols-2 px-2">
            {acc_data.children.map((cat_data: any, indx: number) => (
                cat_data.sections.length > 0 ?
                    <div className="mx-auto w-full rounded-2xl bg-white p-2">
                        <Disclosure defaultOpen={true}>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-100 px-4 py-2 text-left text-sm font-medium text-slate-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                                        <h2 className='font-semibold'>{cat_data.name}</h2>
                                        <ChevronUpIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 font-bold`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm  bg-[#f4f7ff] backdrop-blur-lg rounded-xl my-2  text-gray-500">
                                        <div className="grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 gap-y-5 p-2">{cat_data.sections.map((ch_data: any) => (
                                            <Link href={generatePath(acc_data.name, cat_data.slug, ch_data.name)} className=" xl:flex mx-2  hover:bg-white rounded-lg p-2 hover:shadow-sm group/item">
                                                <Image className="xl:mx-0 mx-auto group-hover/item:scale-110 transition scale-100 duration-200 ease-in-out h-[50px] w-[50px]" src={LoadImages(ch_data.images)} height={50} width={50} alt={ch_data.name} />
                                                <p className="xl:mx-3 xl:my-auto mt-3 xl:text-left ml-0 text-center text-[11px] my-auto ">{ch_data.name}</p>
                                            </Link>
                                        ))}</div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                    : null
            ))}

        </div>
    )
}