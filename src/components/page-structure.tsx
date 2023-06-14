import { useState, useEffect, FC } from "react";
import { useRouter } from 'next/router';

import DynamicSliderGrid from "./dynamic-slider-grid";
import DynamicGrid from "./dynamic-grid";
import dynamic from "next/dynamic";


interface compProps {
    data: any
    lang: string
    children: any

}

const PageStructure: FC<compProps> = ({ data, lang, children }) => {
    const invalidSlugs = ["recently-viewed", "buy-again", "recently-purchased"]
    const restrictedId = ["c0350501-1e25-4671-93b8-da18a2a0209a"]
    const router = useRouter()

    return (
        <>

            {
                data.section_type === "dynamic_slider_grid" ?
                    <>
                        <div className="min-[566px]:hidden block">
                            <DynamicSliderGrid data={data} isDesktop={false} isMobile={!data.settings.hide_in_mobile_web || data.settings.hide_in_mobile_web === false} />
                        </div>

                        <div className="max-[565px]:hidden block  px-[10px] mx-auto">
                            <DynamicSliderGrid data={data} isDesktop={!data.settings.hide_in_desktop_web || data.settings.hide_in_desktop_web === false} isMobile={false} />
                        </div>
                    </>
                    : null
            }

            <div className="max-w-[1450px] mx-auto  sm:px-[10px] px-[5px]">
                {
                    data.section_type === "dynamic_grid" ?
                        <>
                            <div className={`min-[566px]:hidden block`} style={{ background: data.settings.background_value }}>
                                {data.settings.show_section_title &&
                                    <h4 className="md:text-xl sm:text-lg text-base font-bold flex-1">{data.section_title}</h4>}
                                <DynamicGrid data={data} isDesktop={false} isMobile={!data.settings.hide_in_mobile_web || data.settings.hide_in_mobile_web === false} />
                            </div>
                            <div className="max-[565px]:hidden block" style={{ background: data.settings.background_value }}>
                                {data.settings.show_section_title &&
                                    <h4 className="md:text-xl sm:text-lg text-base font-bold flex-1 text-center">{data.section_title}</h4>}
                                <DynamicGrid data={data} isDesktop={!data.settings.hide_in_desktop_web || data.settings.hide_in_desktop_web === false} isMobile={false} />
                            </div>
                        </>
                        : ""
                }
                {
                    data.section_type === "product_grid" && (data.is_section_visible || data.is_enabled) && !invalidSlugs.includes(data.section_data_object.slug) && !restrictedId.includes(data.section_data_object.id) ?
                        < div style={{ background: data.settings.background_value }}>
                            {data.settings.show_section_title ?
                                <div className="flex justify-between pt-3 mx-4 items-center ">
                                    <h4 className="md:text-2xl sm:text-lg text-base font-bold flex-1">{data.section_title}</h4>
                                    <button onClick={() => { router.push(`/products?collections=${data.section_data_object.slug}`) }} className="bg-[#39f] px-3 text-white text-xs flex items-center rounded py-2 leading-none"><span>View All</span> </button>
                                </div>
                                : null}
                            {children}
                        </div>
                        : null
                }
            </div >
        </>
    )
}

export default PageStructure;