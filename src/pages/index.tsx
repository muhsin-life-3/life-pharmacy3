import getHomePageData from '@/lib/getHomePageData'
import Image from 'next/image'
import PageStructure from '@/components/page-structure';
import Products from '@/components/products';
import { useLanguage } from '@/hooks/useLanguage';
export default function Home({ homePageData, locale }: { homePageData: any, locale: any }) {
  return (
    homePageData.data.content.map((data: any, ind: number) => (
      <PageStructure data={data} lang={locale} >
        <Products lang={locale} slug={data.section_data_object?.slug} type_key={data.section_data_object?.type_key} />
      </PageStructure>))
  )
}

export async function getStaticProps({ locale }: { locale: any }) {

  const homePageData = await getHomePageData(locale);

  return {
    props: {
      homePageData,
      locale
    }
  }

}