import BrandsProductsPage from "@/components/brands-products-page"
import getBrandProductData from "@/lib/getBrandProductData"

export default function SingleBrand({ brandsProductsData, brandPara }: { brandsProductsData: any, brandPara: any }) {
    return (
        <BrandsProductsPage data={brandsProductsData} menuData={["Brands", String(brandPara).replace(/-/g, ' ')]} brandPara={brandPara}/>
    )
}

export async function getServerSideProps({ locale, params }: { locale: any, params: any }) {
    const brandsProductsData = await getBrandProductData(params.brand, "")
    return {
        props: {
            brandsProductsData: brandsProductsData.data,
            brandPara: params.brand
        }
    }
}

