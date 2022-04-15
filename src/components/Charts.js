import React from "react";
import moment from "moment";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function Charts({ coinHistory }) {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      moment(coinHistory?.data?.history[i].timestamp).format("MMM Do, h:mm a")
    );
  }

  const data = [];
  const max = [];

  for (let i = 0; i < coinTimestamp.length; i += 1) {
    data.push({
      name: coinTimestamp[i],
      Price: parseFloat(coinPrice[i]).toFixed(2),
    });
    max.push(coinPrice[i]);
  }

  if (!coinHistory) return <div>Loading..</div>;

  return (
    <div>
      <ResponsiveContainer width="100%" height={380}>
        <AreaChart
          margin={{ top: 0, left: -60, right: 0, bottom: 0 }}
          data={data}
        >
          <Area
            type="monotone"
            strokeWidth={2}
            dataKey="Price"
            stroke="#317DFC"
            animationEasing="linear"
            activeDot={{ stroke: "#eee", strokeWidth: 2, r: 6 }}
            fillOpacity={2}
            fill="url(#gradient)"
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="60%" stopColor="var(--green)" stopOpacity={1} />
              <stop offset="100%" stopColor="var(--green)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            minTickGap={12}
            // interval="preserveStartEnd"
            width={100}
          />
          <YAxis
            dataKey="Price"
            axisLine={false}
            tick={false}
            type="number"
            domain={[Math.min(...max), Math.max(...max)]}
          />
          <Tooltip separator=" $" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Charts;
