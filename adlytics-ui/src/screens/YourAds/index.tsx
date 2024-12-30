import React, { useState } from "react";
import { useGetListQuery } from "../../api/api";
import { useNavigate } from "react-router-dom";

interface Ad {
  AdID: number;
  AdName: string;
}

const ITEMS_PER_PAGE = 50;

const YourAds = () => {
  const { data, error, isLoading } = useGetListQuery();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return <div className="text-center text-gray-500">Loading ads...</div>;
  if (error)
    return <div className="text-center text-red-500">Oops! Something went wrong while loading the ads.</div>;

  const ads = data?.ads;

  if (!ads) {
    return (
      <div className="text-center text-gray-500">
        No ads found or API response is in an unexpected format.
      </div>
    );
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedAds = ads.slice(startIndex, endIndex);

  const totalPages = Math.ceil(ads.length / ITEMS_PER_PAGE);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getRangeText = () => {
    const rangeStart = startIndex + 1;
    const rangeEnd = Math.min(endIndex, ads.length);
    return `${rangeStart} to ${rangeEnd}`;
  };

  const handleAdClick = (adId: number) => {
    navigate(`/ad-summary/${adId}`);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Ads</h1>
      <table className="min-w-full table-auto bg-white border-collapse border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-4 bg-indigo-600 text-white text-left rounded-tl-lg text-xl">Ad ID</th>
            <th className="px-6 py-4 bg-indigo-600 text-white text-left rounded-tr-lg text-xl">Ad Name</th>
          </tr>
        </thead>
        <tbody>
          {paginatedAds.map((item: Ad) => (
            <tr
              key={item.AdID}
              className="bg-gray-900 text-gray-300 transition duration-300 cursor-pointer hover:bg-gradient-to-r hover:from-gray-500 hover:to-green-300 hover:text-white hover:shadow-xl hover:ring-2 hover:ring-indigo-300"
              onClick={() => handleAdClick(item.AdID)}
            >
              <td className="px-6 py-4 border-b border-gray-700 text-lg">{item.AdID}</td>
              <td className="px-6 py-4 border-b border-gray-700 text-lg">{item.AdName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={goToPreviousPage}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg text-gray-700">
          Page {currentPage} of {totalPages} | {getRangeText()}
        </span>
        <button
          onClick={goToNextPage}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default YourAds;
