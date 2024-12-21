import React, { useState } from "react";
import { useGetListQuery } from "../../api/api";
import { useNavigate } from "react-router-dom";

// Define the type for each ad item
interface Ad {
  AdID: number;
  AdName: string;
}

const ITEMS_PER_PAGE = 50;

const YourAds = () => {
  const { data, error, isLoading } = useGetListQuery();
  const navigate = useNavigate(); // To navigate to the ForMe component

  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading items</p>;

  const ads = data?.ads;

  if (!ads) {
    return (
      <p className="text-center text-gray-500">
        No ads found or API response is in an unexpected format.
      </p>
    );
  }

  // Calculate the range of ads to display on the current page
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

  // Navigate to ForMe component on click
  const handleAdClick = (adId: number) => {
    navigate(`/for-me/${adId}`); // Navigate with the AdID in the URL
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Ads</h1>
      <table className="min-w-full table-auto bg-white border-separate border-spacing-2 border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-indigo-600 text-white text-left rounded-tl-lg">
              Ad ID
            </th>
            <th className="px-6 py-3 bg-indigo-600 text-white text-left rounded-tr-lg">
              Ad Name
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedAds.map((item: Ad) => (
            <tr
              key={item.AdID}
              className="hover:bg-gray-50 transition duration-200 cursor-pointer"
              onClick={() => handleAdClick(item.AdID)} // On click, navigate
            >
              <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                {item.AdID}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                {item.AdName}
              </td>
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
