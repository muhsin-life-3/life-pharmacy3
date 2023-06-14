import { FC } from "react";
import ImgPage from "./img-page";

interface props {
    data: any,
    isDesktop: boolean,
    isMobile: boolean
}
const DynamicGrid: FC<props> = ({ data, isDesktop, isMobile }) => {

    if (isDesktop === false && isMobile === false) {
        return <></>
    }

    return <div
        className={"grid " + ((isDesktop ? (data.settings.desktop.column > 1 ? `grid-cols-[repeat(${data.settings.desktop.column},auto)]` : "") : (data.settings.mobile.column > 1 ? ` grid-cols-[repeat(${data.settings.mobile.column},auto)]` : "")) + (data.settings.mobile.row > 1 ? ` grid-rows-${data.settings.mobile.row}` : "") + (data.settings.desktop.row > 1 ? ` grid-rows-${data.settings.desktop.row}` : ""))}>
        {data.section_data_array && data.section_data_array.map((sec_data: any) => (
            (sec_data.desktop.is_enabled && isDesktop || sec_data.mobile.is_enabled && isMobile) ?
                ((isDesktop && sec_data.desktop.image_url || isMobile && sec_data.mobile.image_url) ?
                    <ImgPage sectionData={sec_data} d_width={data.section_data_array[0].desktop.width} isDesktop={isDesktop} isMobile={isMobile} m_width={data.section_data_array[0].mobile.width} m_height={data.section_data_array[0].mobile.height} />
                    : "") : null
        ))}
    </div>
}

export default DynamicGrid;