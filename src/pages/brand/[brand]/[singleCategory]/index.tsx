import BrandsProductsPage from "@/components/brands-products-page"
import getBrandProductData from "@/lib/getBrandProductData"

export default function SingleBrandPage({ brandsProductsData, brandPara, catPara }: { brandsProductsData: any, brandPara: any, catPara:any }) {
    return (
        <BrandsProductsPage data={brandsProductsData} menuData={["Brands", String(catPara).replace(/-/g, ' ')]} brandPara={brandPara}/>
    )
}

export async function getServerSideProps({ locale, params }: { locale: any, params: any }) {
    const brandsProductsData = await getBrandProductData(params.brand, params.singleCategory)
    return {
        props: {
            brandsProductsData: brandsProductsData.data,
            brandPara: params.brand,
            catPara: params.singleCategory
        }
    }
}