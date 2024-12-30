import React from "react";
import { useParams } from "react-router-dom";
import { useGetAdAnalysisQuery } from "../../api/api";

const AdSummary = () => {
  const { adId } = useParams<{ adId: string }>();

  const { data, error, isLoading } = useGetAdAnalysisQuery({
    adId: Number(adId),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce200"></div>
          <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce400"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading analysis</p>;
  }

  if (!data) {
    return (
      <p className="text-center text-gray-500">
        No data available for this ad.
      </p>
    );
  }

  const { analysis } = data;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-4xl p-10 bg-gradient-to-br from-gray-800 to-black shadow-xl rounded-xl border-2 border-transparent hover:border-blue-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <h1 className="text-5xl font-bold text-white mb-8 text-center break-words">
          Ad Analysis: {analysis.ad_name}
        </h1>

        <p className="text-2xl font-medium text-gray-300 text-center">
          Ad ID: {analysis.ad_id}
        </p>

        <p className="mt-4 text-3xl font-semibold text-cyan-400 bg-black p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
          Result: {analysis.result}
        </p>

        <div className="mt-8">
          <h2 className="text-3xl font-semibold text-white">Reasons</h2>
          <ul className="list-disc pl-8 mt-4 text-gray-300">
            {analysis.reasons.map((reason, index) => (
              <li key={index} className="text-gray-300 text-xl">
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-semibold text-white">Insights</h2>
          <ul className="list-disc pl-8 mt-4 text-gray-300">
            {analysis.insights.map((insight, index) => (
              <li key={index} className="text-gray-300 text-xl">
                {insight}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-semibold text-white">Suggestions</h2>
          <ul className="list-disc pl-8 mt-4 text-gray-300">
            {analysis.suggestions.map((suggestion, index) => (
              <li key={index} className="text-gray-300 text-xl">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdSummary;
