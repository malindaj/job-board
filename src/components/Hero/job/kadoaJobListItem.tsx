import React from "react";
import Image from 'next/image';
import { useDispatch } from "react-redux";
import clsx from 'clsx'
import { kadoaJobDescription } from '@/store/actions'

const KadoaJobListItem = ({ item }) => {

  const dispatch = useDispatch();

  const viewContent = content => {

    const data = {
      key: 'kadoaJob',
      content: content
    }
    dispatch(kadoaJobDescription(data));
  }

  const dateDiffer = date => {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const differenceInTime = currentDate.getTime() - targetDate.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
  }

  return (
    <div className="relative border border-gray-400 mx-auto max-w-[1024px] flex justify-between items-center rounded-[8px] py-4 px-2 my-[8px] hover:border-gray-100 transition-all">

      {item && item.detailPageData &&
        <div className="flex justify-start items-center">
          <div className="p-2">
            <div className="border rounded-full w-[60px] h-[60px] mx-auto flex justify-center items-center">
              <a href={item.detailPageData.schemaHtml.Organization.url} target="_blanck">
                <Image src={item.detailPageData.schemaHtml.Organization.logo} width={80} height={80} alt="logo" />
              </a>
            </div>
            <p className={clsx(isNaN(dateDiffer(item.detailPageData.datePosted)) ? 'hidden' : 'w-[60px] text-center text-[12px]')}>
              {dateDiffer(item.detailPageData.datePosted)} days
            </p>
          </div>
          <div className="pl-2">
            <p className="text-gray-300 text-[14px] inline">
              <a href={item.detailPageData.schemaHtml.Organization.url} target="_blanck">
                {
                  item &&
                  item.detailPageData &&
                  item.detailPageData.company_name
                }
              </a>
            </p>
            <p
              className="text-gray-200 font-bold text-[18px] mb-4 cursor-pointer hover:underline"
              onClick={() => viewContent(item)}
            >
              {
                item &&
                item.detailPageData &&
                item.detailPageData.job_title
              }
            </p>
            <div className=" flex justify-start items-center">
              <p className="mr-1 text-[12px] border border-red-500 rounded-[4px] p-[2px] py-[1px] cursor-pointer">
                {
                  item.detailPageData.job_type
                }
              </p>
              <p className={clsx(item.detailPageData.remote_options !== 'NON_REMOTE' ? 'mr-1 text-[12px] border border-green-500 rounded-[4px] p-[2px] py-[1px] cursor-pointer' : 'hidden')}>
                {
                  item.detailPageData.remote_options !== 'NON_REMOTE' ? 'Remote' : ''
                }
              </p>
              {Object.keys(item.detailPageData.job_location).map((key, index) =>
                <p
                  key={index}
                  className="mr-1 text-[12px] border rounded-[4px] p-[2px] py-[1px] cursor-pointer"
                >
                  {item.detailPageData.job_location[key]}
                </p>
              )}
            </div>
          </div>
        </div>

      }

      <div className="w-1/3 h-full">
        <div className="flex justify-start items-center">
          <p></p>
          <p></p>
          <p></p>
        </div>
        <div className="flex justify-start items-center">
          <p></p>
          <p></p>
          <p></p>
        </div>

      </div>

      <p className={clsx(item && item.detailPageData && item.detailPageData.datePosted === undefined ? 'hidden' : 'absolute bottom-[5px] right-[5px]')}>
        {item && item.detailPageData && item.detailPageData.datePosted}
      </p>
      <p className="absolute top-[5px] right-[5px]"></p>

    </div >
  );
};

export default KadoaJobListItem;
