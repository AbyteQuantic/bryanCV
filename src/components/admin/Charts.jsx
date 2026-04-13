import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';

const COLORS = ['#4CAF50', '#7C4DFF', '#FF6D00', '#00B0FF', '#e53935', '#6b7280', '#f59e0b'];

const COUNTRY_NAMES = {
  US: 'United States', CO: 'Colombia', ES: 'Spain', MX: 'Mexico',
  BR: 'Brazil', DE: 'Germany', GB: 'United Kingdom', FR: 'France',
  AR: 'Argentina', CL: 'Chile', PE: 'Peru', NL: 'Netherlands',
  unknown: 'Unknown',
};

const tooltipStyle = {
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  fontSize: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  padding: '8px 12px',
};

/* Custom tooltip for bar chart */
const BarTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div style={tooltipStyle}>
      <p style={{ margin: 0, fontWeight: 600, color: '#202124' }}>{name}</p>
      <p style={{ margin: '2px 0 0', color: '#6b7280' }}>{value} visits</p>
    </div>
  );
};

/* Custom tooltip for area chart */
const AreaTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={tooltipStyle}>
      <p style={{ margin: 0, fontWeight: 600, color: '#202124' }}>{label}</p>
      <p style={{ margin: '2px 0 0', color: '#4CAF50' }}>{payload[0].value} views</p>
    </div>
  );
};

const Charts = ({ type, data }) => {
  if (!data || data.length === 0) return null;

  if (type === 'bar') {
    const chartData = data.slice(0, 10).map((d) => ({
      name: COUNTRY_NAMES[d.name] || d.name,
      value: d.value,
    }));

    return (
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={36} />
          <Tooltip content={<BarTooltip />} cursor={{ fill: 'rgba(76,175,80,0.06)' }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={40}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'pie') {
    const chartData = data.map((d) => ({
      name: d.name.charAt(0).toUpperCase() + d.name.slice(1),
      value: d.value,
    }));

    return (
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#6b7280' }} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'area') {
    const chartData = data.map((d) => ({
      date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views: d.views,
    }));

    return (
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 8, right: 12, bottom: 8, left: 0 }}>
          <defs>
            <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={36} allowDecimals={false} />
          <Tooltip content={<AreaTooltip />} />
          <Area
            type="monotone"
            dataKey="views"
            stroke="#4CAF50"
            strokeWidth={2}
            fill="url(#viewsGradient)"
            dot={{ r: 4, fill: '#4CAF50', strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#4CAF50', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return null;
};

export default Charts;
