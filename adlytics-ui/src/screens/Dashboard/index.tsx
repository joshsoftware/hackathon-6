import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingBag,
  Activity,
  Target,
} from "lucide-react";

const Dashboard = () => {
  const chartData = {
    barChart: {
      data: [
        { month: "Jan", sales: 4000, profit: 2400, revenue: 6400 },
        { month: "Feb", sales: 3000, profit: 1398, revenue: 4398 },
        { month: "Mar", sales: 2000, profit: 9800, revenue: 11800 },
        { month: "Apr", sales: 5000, profit: 3200, revenue: 8200 },
        { month: "May", sales: 4500, profit: 2800, revenue: 7300 },
      ],
      insights: {
        summary: "Revenue grew by 23% compared to last quarter",
        details: [
          "Peak revenue day: Saturday ($8.2k)",
          "Lowest revenue day: Monday ($2.1k)",
          "Average daily revenue: $4.5k",
          "Month-over-month growth: 15%",
        ],
        kpis: {
          totalRevenue: "$38,098",
          averageOrder: "$156",
          conversionRate: "3.2%",
        },
      },
    },
    lineChart: {
      data: [
        { date: "2024-01", users: 400, sessions: 240, bounceRate: 20 },
        { date: "2024-02", users: 300, sessions: 139, bounceRate: 25 },
        { date: "2024-03", users: 200, sessions: 980, bounceRate: 15 },
        { date: "2024-04", users: 500, sessions: 320, bounceRate: 18 },
        { date: "2024-05", users: 450, sessions: 280, bounceRate: 22 },
      ],
      insights: {
        summary: "User engagement increased by 15%",
        details: [
          "Peak active hours: 2PM - 6PM",
          "Average session duration: 8.5 minutes",
          "Return visitor rate: 42%",
          "New user growth: 28%",
        ],
        kpis: {
          dailyActiveUsers: "2,845",
          retentionRate: "68%",
          userGrowth: "+15%",
        },
      },
    },
    pieChart: {
      data: [
        { name: "Mobile", value: 400 },
        { name: "Desktop", value: 300 },
        { name: "Tablet", value: 200 },
        { name: "Other", value: 100 },
      ],
      insights: {
        summary: "Mobile usage dominates platform access",
        details: [
          "Mobile conversion rate: 3.2%",
          "Desktop conversion rate: 4.5%",
          "Cross-device users: 28%",
          "Mobile-first users: 65%",
        ],
        kpis: {
          mobileUsers: "12,450",
          desktopUsers: "8,230",
          tabletUsers: "3,120",
        },
      },
    },
    histogram: {
      data: [
        { range: "0-10", count: 120, percentage: 15 },
        { range: "11-20", count: 280, percentage: 35 },
        { range: "21-30", count: 420, percentage: 52.5 },
        { range: "31-40", count: 320, percentage: 40 },
        { range: "41-50", count: 180, percentage: 22.5 },
        { range: "51-60", count: 90, percentage: 11.25 },
      ],
      insights: {
        summary: "Core user base aged 21-30 shows highest engagement",
        details: [
          "Most active age group: 21-30",
          "Highest value customers: 31-40",
          "Fastest growing segment: 21-30",
          "Loyalty program adoption: 45%",
        ],
        kpis: {
          averageAge: "28.5",
          topSegment: "21-30",
          segmentGrowth: "+32%",
        },
      },
    },
  };

  const COLORS = ["#00ff87", "#00ffff", "#ff00ff", "#ff3366"];
  // const NEON_SHADOW = "0 0 10px #00ff87, 0 0 20px #00ff87, 0 0 30px #00ff87";

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,562",
      change: "+12%",
      icon: <DollarSign className="w-8 h-8" />,
      trend: "up",
    },
    {
      title: "Total Visitors",
      value: "25,562",
      change: "+4%",
      icon: <Users className="w-8 h-8" />,
      trend: "up",
    },
    {
      title: "Total Sales",
      value: "12,262",
      change: "-0.8%",
      icon: <ShoppingBag className="w-8 h-8" />,
      trend: "down",
    },
    {
      title: "Active Users",
      value: "2,100",
      change: "+2%",
      icon: <Activity className="w-8 h-8" />,
      trend: "up",
    },
  ];

  const renderInsightCard = (
    insights: {
      summary: string;
      details: string[];
      kpis: { [key: string]: string };
    },
    bgColor = "bg-gray-800/30"
  ) => (
    <div className={`mt-4 p-4 ${bgColor} rounded-lg border border-gray-700`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-gray-300 font-medium">{insights.summary}</p>
        <Target className="w-5 h-5 text-cyan-400 flex-shrink-0" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-gray-400">Key Metrics</h5>
          {Object.entries(insights.kpis).map(
            ([key, value]: [string, string]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-gray-400">
                  {key.replace(/([A-Z])/g, " $1").trim()}:
                </span>
                <span className="text-cyan-400 font-medium">{value}</span>
              </div>
            )
          )}
        </div>
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-gray-400">Highlights</h5>
          {insights.details.map((detail: string, index: number) => (
            <p key={index} className="text-sm text-gray-300">
              • {detail}
            </p>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="p-6 mt-16">
        <header className="py-12 text-center mb-16">
          <h1
            className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
       hover:text-transparent hover:bg-gradient-to-l from-pink-400 to-yellow-400 transition-all duration-500 ease-in-out
       animate__animated animate__fadeInDown"
          >
            Welcome to the Analytics Dashboard
          </h1>
          <p
            className="mt-6 text-2xl text-gray-300 transition-all duration-500 ease-in-out 
      hover:text-cyan-400"
          >
            Gain valuable insights into your business performance with real-time
            data on sales, user activity, device usage, and more. Explore
            trends, key metrics, and track your growth.
          </p>
          <p
            className="mt-4 text-xl text-gray-400 transition-all duration-500 ease-in-out 
      hover:text-emerald-400"
          >
            Monitor key indicators such as revenue, user engagement, and
            demographics to optimize your strategies and achieve better
            outcomes.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-gray-800/50 rounded-xl border border-cyan-400/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                  <p
                    className={`flex items-center mt-2 ${
                      stat.trend === "up" ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 bg-gray-700/50 rounded-lg">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Chart */}
          <section className="p-6 bg-gray-800/50 rounded-xl border border-cyan-400/20 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-6">Revenue Overview</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData.barChart.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #00ff87",
                  }}
                />
                <Legend />
                <Bar dataKey="sales" fill="#00ff87" />
                <Bar dataKey="profit" fill="#00ffff" />
                <Bar dataKey="revenue" fill="#ff00ff" />
              </BarChart>
            </ResponsiveContainer>
            {renderInsightCard(chartData.barChart.insights)}
          </section>

          {/* User Sessions */}
          <section className="p-6 bg-gray-800/50 rounded-xl border border-cyan-400/20 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-6">User Activity</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData.lineChart.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #00ff87",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#00ff87"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="#00ffff"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="bounceRate"
                  stroke="#ff00ff"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
            {renderInsightCard(chartData.lineChart.insights)}
          </section>

          {/* Device Usage */}
          <section className="p-6 bg-gray-800/50 rounded-xl border border-cyan-400/20 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-6">Device Distribution</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={chartData.pieChart.data}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {chartData.pieChart.data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {renderInsightCard(chartData.pieChart.insights)}
          </section>
          {/* Histogram */}
          <section className="p-6 bg-gray-800/50 rounded-xl border border-cyan-400/20 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-6">
              User Age Distribution
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData.histogram.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="range" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #00ff87",
                  }}
                />
                <Legend />
                <Bar dataKey="count" fill="#ff3366" name="User Count" />
              </BarChart>
            </ResponsiveContainer>
            {renderInsightCard(chartData.histogram.insights, "bg-gray-800/40")}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
