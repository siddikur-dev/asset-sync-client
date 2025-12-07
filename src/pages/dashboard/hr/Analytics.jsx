import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Spinner from "../../../components/ui/Spinner";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const res = await axiosSecure.get('/analytics');
      return res.data;
    }
  });

  if (isLoading) return <Spinner />;

  const pieData = [
    { name: 'Returnable', value: data?.assetDistribution?.returnable || 0 },
    { name: 'Non-returnable', value: data?.assetDistribution?.nonReturnable || 0 }
  ];

  const COLORS = ['#3B82F6', '#F59E0B'];

  const barData = data?.topRequestedAssets?.map(asset => ({
    name: asset._id,
    requests: asset.count
  })) || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gradient">Analytics Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-base-100 p-6 rounded-xl shadow-lg">
          <h3 className="text-sm text-base-content/70 mb-2">Total Assets</h3>
          <p className="text-3xl font-bold text-gradient">{data?.totalAssets || 0}</p>
        </div>
        <div className="bg-base-100 p-6 rounded-xl shadow-lg">
          <h3 className="text-sm text-base-content/70 mb-2">Total Requests</h3>
          <p className="text-3xl font-bold text-gradient">{data?.requests?.total || 0}</p>
        </div>
        <div className="bg-base-100 p-6 rounded-xl shadow-lg">
          <h3 className="text-sm text-base-content/70 mb-2">Pending Requests</h3>
          <p className="text-3xl font-bold text-gradient">{data?.requests?.pending || 0}</p>
        </div>
        <div className="bg-base-100 p-6 rounded-xl shadow-lg">
          <h3 className="text-sm text-base-content/70 mb-2">Assigned Assets</h3>
          <p className="text-3xl font-bold text-gradient">{data?.totalAssigned || 0}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-base-100 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Asset Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-base-100 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Top 5 Most Requested Assets</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="requests" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

