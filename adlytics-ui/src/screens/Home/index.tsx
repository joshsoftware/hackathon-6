import React, { useState, useEffect } from "react";
import { Line, Bar, Pie, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import FileUploader from "../../components/FileUploader";
import { useUploadFileMutation } from "../../api/api";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  RadialLinearScale
);

// Data generation utilities
const generateRandomData = (
  min: number,
  max: number,
  length: number
): number[] => {
  return Array.from({ length }, () =>
    Number((Math.random() * (max - min) + min).toFixed(1))
  );
};

const generateTimePerformance = () => {
  return {
    week: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: generateRandomData(30, 100, 7),
    },
    month: {
      labels: Array.from({ length: 4 }, (_, i) => `Week ${i + 1}`),
      data: generateRandomData(40, 90, 4),
    },
    quarter: {
      labels: ["Jan", "Feb", "Mar"],
      data: generateRandomData(50, 85, 3),
    },
  };
};

const generateMetrics = () => {
  return [
    {
      label: "Active Campaigns",
      value: Math.floor(Math.random() * 30 + 15).toString(),
      change: `+${Math.floor(Math.random() * 5)}`,
    },
    {
      label: "Total Impressions",
      value: `${(Math.random() * 2 + 0.5).toFixed(1)}M`,
      change: `+${Math.floor(Math.random() * 20)}%`,
    },
    {
      label: "Conversion Rate",
      value: `${(Math.random() * 5 + 1).toFixed(1)}%`,
      change: `+${(Math.random() * 1).toFixed(1)}%`,
    },
    {
      label: "Average ROI",
      value: `${Math.floor(Math.random() * 200 + 150)}%`,
      change: `+${Math.floor(Math.random() * 20)}%`,
    },
  ];
};

const generateAdPlacements = () => {
  const platforms = [
    {
      name: "Facebook",
      baseScore: 85,
      recommendation: "Best for brand awareness",
    },
    {
      name: "Instagram",
      baseScore: 82,
      recommendation: "Ideal for visual products",
    },
    {
      name: "Google Ads",
      baseScore: 88,
      recommendation: "High conversion rate",
    },
    { name: "LinkedIn", baseScore: 75, recommendation: "Good for B2B" },
    { name: "TikTok", baseScore: 80, recommendation: "Growing youth audience" },
  ];

  return platforms.map((platform) => ({
    platform: platform.name,
    score: Math.min(100, platform.baseScore + Math.floor(Math.random() * 10)),
    recommendation: platform.recommendation,
  }));
};

const generateTestimonials = () => {
  return [
    {
      name: "Sarah L.",
      testimonial:
        "This platform has revolutionized our marketing strategy. We saw a 40% increase in engagement in just a few weeks.",
      position: "Marketing Manager, ABC Corp",
    },
    {
      name: "John D.",
      testimonial:
        "The insights provided here helped us optimize our campaigns, resulting in better ROI and more leads.",
      position: "Sales Director, XYZ Ltd.",
    },
    {
      name: "Emily W.",
      testimonial:
        "I love how easy it is to understand the data. It helped me make informed decisions faster and more effectively.",
      position: "Digital Marketer, Tech Solutions",
    },
  ];
};

const HomePage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [uploadFile, { isLoading, isError }] = useUploadFileMutation();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };
  const handleUpload = async () => {
    if (!selectedFile) {
      setError("No file selected");
      return;
    }

    try {
      const data = await uploadFile({
        name: selectedFile.name,
        file: selectedFile,
      }).unwrap();
      setError(null);
      console.log("data is in post request : ", data);
    } catch (error) {
      setError("File upload failed");
      console.error("Error uploading file:", error);
    }
  };

  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "week" | "month" | "quarter"
  >("week");
  const [timePerformance, setTimePerformance] = useState(
    generateTimePerformance()
  );
  const [metrics, setMetrics] = useState(generateMetrics());
  const [adPlacements, setAdPlacements] = useState(generateAdPlacements());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [testimonials, setTestimonials] = useState(generateTestimonials());

  // Update data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTimePerformance(generateTimePerformance());
      setMetrics(generateMetrics());
      setAdPlacements(generateAdPlacements());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const lineChartData = {
    labels: timePerformance[selectedTimeframe].labels,
    datasets: [
      {
        label: "Ad Performance Trend",
        data: timePerformance[selectedTimeframe].data,
        fill: false,
        borderColor: "#39ff14",
        tension: 0.1,
        borderWidth: 3,
      },
    ],
  };

  const barChartData = {
    labels: adPlacements.map((p) => p.platform),
    datasets: [
      {
        label: "ROI by Platform",
        data: generateRandomData(200, 400, 5),
        backgroundColor: "#39ff14",
      },
      {
        label: "Cost per Click",
        data: generateRandomData(0.5, 3, 5),
        backgroundColor: "#ff00ff",
      },
    ],
  };

  const radarChartData = {
    labels: ["Engagement", "Conversion", "Reach", "ROI", "Click-through Rate"],
    datasets: [
      {
        label: "Current Performance",
        data: generateRandomData(60, 95, 5),
        backgroundColor: "rgba(57, 255, 20, 0.2)",
        borderColor: "#39ff14",
        borderWidth: 2,
      },
    ],
  };

  const pieChartData = {
    labels: [
      "Organic Search",
      "Paid Search",
      "Social Media",
      "Email",
      "Direct",
    ],
    datasets: [
      {
        data: generateRandomData(10, 35, 5),
        backgroundColor: [
          "rgba(57, 255, 20, 0.6)",
          "rgba(255, 0, 255, 0.6)",
          "rgba(0, 255, 255, 0.6)",
          "rgba(255, 255, 0, 0.6)",
          "rgba(255, 0, 0, 0.6)",
        ],
      },
    ],
  };

  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen mt-20">
        <header className="relative text-white py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            {/* Left Section: Title and Description */}
            <div className="w-1/2 space-y-6">
              <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                Unlock Your Business Potential with Smart Ad Analytics
              </h1>
              <p className="text-xl text-gray-300">
                Drive Growth, Maximize ROI, and Reach Your Target Audience with
                AI-Powered Ad Insights. Transform raw data into actionable
                strategies for better decision-making and measurable success.
              </p>
            </div>

            {/* Right Section: Graphs */}
            <div className="w-1/2 flex justify-center space-x-8">
              {/* Example Graphs */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/2">
                <h3 className="text-xl font-bold mb-4">Ad Performance Trend</h3>
                <Line
                  data={{
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                      {
                        label: "Ad Performance",
                        data: generateRandomData(30, 100, 7),
                        borderColor: "#39ff14",
                        fill: false,
                        tension: 0.1,
                        borderWidth: 3,
                      },
                    ],
                  }}
                  options={{ responsive: true }}
                />
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/2">
                <h3 className="text-xl font-bold mb-4">Traffic Sources</h3>
                <Pie
                  data={{
                    labels: ["Organic", "Paid", "Social", "Email", "Direct"],
                    datasets: [
                      {
                        data: generateRandomData(10, 35, 5),
                        backgroundColor: [
                          "#39ff14",
                          "#ff00ff",
                          "#00ffff",
                          "#ffff00",
                          "#ff0000",
                        ],
                      },
                    ],
                  }}
                  options={{ responsive: true }}
                />
              </div>
            </div>
          </div>
        </header>
        {/* <div className="max-w-md mx-auto mt-10 flex flex-col items-center">
          <h1 className="text-xl font-semibold text-white-800 mb-4">
            File Uploader
          </h1>
          <FileUploader onFileSelect={handleFileSelect} />
          <button
            onClick={handleUpload}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Upload File
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div> */}
        <div className="max-w-md mx-auto mt-10 flex flex-col items-center">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            File Uploader
          </h1>
          <FileUploader onFileSelect={handleFileSelect} />
          <button
            onClick={handleUpload}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload File"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {isError && (
            <p className="text-red-500 mt-2">Error: "File Upload Failed"</p>
          )}
        </div>

        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-green-400">
              Real-time Performance Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-gray-400 text-sm">{metric.label}</h3>
                  <div className="flex items-baseline mt-2">
                    <span className="text-3xl font-bold text-white">
                      {metric.value}
                    </span>
                    <span
                      className={`ml-2 text-sm ${
                        metric.change.startsWith("+")
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-green-400">
              Smart Platform Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adPlacements.map((platform, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{platform.platform}</h3>
                    <span className="text-2xl font-bold text-green-400">
                      {platform.score}%
                    </span>
                  </div>
                  <p className="text-gray-400">{platform.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-green-400">
              Performance Analytics
            </h2>
            <div className="mb-8 flex justify-center gap-4">
              {(["week", "month", "quarter"] as const).map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-4 py-2 rounded ${
                    selectedTimeframe === timeframe
                      ? "bg-green-400 text-black"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Performance Trend</h3>
                <Line data={lineChartData} options={{ responsive: true }} />
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Platform Performance</h3>
                <Bar data={barChartData} options={{ responsive: true }} />
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Performance Metrics</h3>
                <Radar data={radarChartData} options={{ responsive: true }} />
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Traffic Sources</h3>
                <Pie data={pieChartData} options={{ responsive: true }} />
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-green-400">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between min-h-[250px]"
                >
                  <p className="text-gray-400 italic">
                    "{testimonial.testimonial}"
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-white font-bold">
                      {testimonial.name}
                    </span>
                    <span className="text-gray-400">
                      {testimonial.position}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="text-center py-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-400">
            Our Partners
          </h2>
          <div className="flex justify-center gap-8">
            <div className="h-16 flex items-center justify-center bg-gray-800 text-white text-xl font-bold rounded-lg px-6">
              Google
            </div>
            <div className="h-16 flex items-center justify-center bg-gray-800 text-white text-xl font-bold rounded-lg px-6">
              Microsoft
            </div>
            <div className="h-16 flex items-center justify-center bg-gray-800 text-white text-xl font-bold rounded-lg px-6">
              Apple
            </div>
            <div className="h-16 flex items-center justify-center bg-gray-800 text-white text-xl font-bold rounded-lg px-6">
              Amazon
            </div>
            <div className="h-16 flex items-center justify-center bg-gray-800 text-white text-xl font-bold rounded-lg px-6">
              Facebook
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
