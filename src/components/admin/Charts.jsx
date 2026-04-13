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
} from 'recharts';

const COLORS = ['#4CAF50', '#7C4DFF', '#FF6D00', '#00B0FF', '#e53935', '#6b7280', '#f59e0b'];

const COUNTRY_NAMES = {
  US: 'United States',
  CO: 'Colombia',
  ES: 'Spain',
  MX: 'Mexico',
  BR: 'Brazil',
  DE: 'Germany',
  GB: 'United Kingdom',
  FR: 'France',
  AR: 'Argentina',
  CL: 'Chile',
  PE: 'Peru',
  NL: 'Netherlands',
  unknown: 'Unknown',
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
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip
            contentStyle={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          />
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
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px', color: '#6b7280' }}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return null;
};

export default Charts;
