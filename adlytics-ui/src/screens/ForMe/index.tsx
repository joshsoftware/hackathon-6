import React from "react";
import { useParams } from "react-router-dom";
import { useGetAdAnalysisQuery } from "../../api/api";

const ForMe = () => {
  const { adId } = useParams<{ adId: string }>(); // Get `adId` from the URL

  // Fetch the ad analysis data using the `adId`
  const { data, error, isLoading } = useGetAdAnalysisQuery({
    adId: Number(adId),
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading analysis</p>;

  if (!data)
    return (
      <p className="text-center text-gray-500">
        No data available for this ad.
      </p>
    );

  const { analysis } = data;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Ad Analysis: {analysis.ad_name}
      </h1>
      <p className="text-xl font-medium text-gray-700">
        Ad ID: {analysis.ad_id}
      </p>
      <p className="mt-2 text-lg text-gray-600">Result: {analysis.result}</p>

      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-gray-800">Reasons</h2>
        <ul className="list-disc pl-6 mt-2">
          {analysis.reasons.map((reason, index) => (
            <li key={index} className="text-gray-600">
              {reason}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-gray-800">Insights</h2>
        <ul className="list-disc pl-6 mt-2">
          {analysis.insights.map((insight, index) => (
            <li key={index} className="text-gray-600">
              {insight}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-gray-800">Suggestions</h2>
        <ul className="list-disc pl-6 mt-2">
          {analysis.suggestions.map((suggestion, index) => (
            <li key={index} className="text-gray-600">
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ForMe;
