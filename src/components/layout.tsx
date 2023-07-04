import Navbar from "./navbar"
import Footer from "./footer"
import { Toaster } from 'react-hot-toast'
import React, { useState } from "react"
import { Providers } from "../redux/providers"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FC } from "react"

interface layoutProps {
  children: any
  data: any,
  brands_data: any,
  isArabic: boolean,
  lang: string,
  langData: any
}

export const Layout: FC<layoutProps> = ({ children, data, brands_data, isArabic, lang, langData }) => {
  function searchButtonOnLeave(e: any) {
    if (!e.target.parentNode.classList.contains("group-search")) {
      document.getElementsByClassName("lg-screen-searchsuggestion-lg")[0].classList.add("hidden");
      (document.getElementById("lg-screen-search") as HTMLInputElement).classList.remove("rounded-b-none", "rounded-xl");
      (document.getElementById("lg-screen-search") as HTMLInputElement).classList.add("rounded-full");
    }
  }

  return (
    <Providers>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <section className="py-0" onMouseDown={(e) => { searchButtonOnLeave(e) }}>
        <Navbar data={data} brands_data={brands_data} isArabic={isArabic} lang={lang} langData={langData}  />
        <main>{children}</main>
        <Footer langData={langData} />
      </section>
    </Providers>
  )
}


