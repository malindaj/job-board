import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link';
import Image from 'next/image';
import { kadoaJobDescription } from '@/store/actions'
import clsx from 'clsx'

const KadoaJobListDescription = () => {

  const dispatch = useDispatch();

  const [value, setValue] = useState({
    company_name: ""
  })

  const kadoaJobDetail = useSelector((state) => state.jobDetail.kadoaJob);

  useEffect(() => {
    let real = {}
    if (Object.keys(kadoaJobDetail).length > 0) {
      Object.keys(kadoaJobDetail).map((key) => real[key] = kadoaJobDetail[key])
      setValue({ ...real })
    }
  }, [kadoaJobDetail])

  const ignoreUnNeccessary = rawHTMLContent => {
    // const parser = new DOMParser();
    // const parsedHTML = parser.parseFromString(rawHTMLContent, 'text/html');
    // const mainString = parsedHTML.body.textContent;
    return rawHTMLContent
  }

  return (
    <div className={clsx('fixed h-screen top-0 overflow-y-scroll right-0 bg-white transition-all text-gray-900 z-[2]', Object.keys(kadoaJobDetail).length > 0 ? 'max-w-[800px] p-4' : 'max-w-0')}>

      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center mb-2">
          <div className="border rounded-full w-[60px] h-[60px] mx-auto mr-4 flex justify-center items-center">
            <Image src={value.detailPageData && value.detailPageData.schemaHtml && value.detailPageData.schemaHtml.Organization.logo} width={80} height={80} alt="logo" />
          </div>
          <p>{value.detailPageData && value.detailPageData.company_name}</p>
        </div>
        <p>{value.detailPageData && value.detailPageData.datePosted}</p>
      </div>

      <p className="mb-2">Company description</p>
      <div className="mb-8" dangerouslySetInnerHTML={{ __html: value.detailPageData && value.detailPageData.company_description }} />

      <p className="mb-2">Job title</p>
      <p className="mb-8">{value.detailPageData && value.detailPageData.job_title}</p>

      <p className="mb-2">Job description</p>
      <div className="mb-8" dangerouslySetInnerHTML={{ __html: ignoreUnNeccessary(value.detailPageData && value.detailPageData.description) }} />

      <p className="mb-2">Contack Information</p>
      <div className="flex justify-start items-center flex-wrap">
        {
          value.detailPageData &&
          value.detailPageData.schemaHtml &&
          value.detailPageData.schemaHtml.Organization.contactPoint[0] &&
          Object.keys(value.detailPageData.schemaHtml && value.detailPageData.schemaHtml.Organization.contactPoint[0]).map((item, index) =>
            <p key={index} className="mr-4"><span className="font-bold">{item}</span>: {value.detailPageData.schemaHtml.Organization.contactPoint[0][item]}</p>
          )
        }
      </div>

      <div className="flex justify-between items-center mt-8">
        <div
          className="w-full text-center border rounded-tl-[8px] rounded-bl-[8px] bg-blue-500 opacity-90 px-2 pr-0 py-1 text-[20px] text-gray-100 cursor-pointer hover:bg-blue-600 transition-all"
          onClick={() => dispatch(kadoaJobDescription({ key: "kadoaJob", content: {} }))}
        >
          Close
        </div>
        {value.directoryPageEntryData && value.directoryPageEntryData.link &&
          <Link
            href={value.directoryPageEntryData && value.directoryPageEntryData.link}
            className="w-full text-center border rounded-tr-[8px] rounded-br-[8px] bg-blue-500 opacity-90 px-2 pl-0 py-1 text-[20px] text-gray-100 cursor-pointer hover:bg-blue-600 transition-all"
            target="_black"
          >
            Apply
          </Link>
        }
      </div>
    </div >
  );
};

export default KadoaJobListDescription;
