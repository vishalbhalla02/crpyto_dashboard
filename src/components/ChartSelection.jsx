import React, { useState, useEffect, useCallback } from "react";
import Chart from "react-apexcharts";

const ChartSection = ({
  Id,
  priceChange24,
  MarketCap,
  TotVol,
  Circulating,
  twitterF,
}) => {
  const [charts, setCharts] = useState({
    Price: {
      options: {
        chart: { id: "area-datetime" },
        grid: { show: false },
        title: {
          text: "Market Price (INR)",
          style: { fontSize: "14px", fontWeight: "bold", color: "#fcdf03" },
        },
        stroke: { curve: "smooth" },
        xaxis: { type: "datetime" },
        dataLabels: { enabled: false },
        yaxis: { show: false },
        colors: ["#fcdf03"],
        tooltip: {
          y: { formatter: (value) => value.toFixed(2) },
          theme: "dark",
        },
        selection: 365,
      },
      series: [{ name: "Market Price", data: [] }],
    },
    Market_Cap: {
      options: {
        grid: { show: false },
        title: {
          text: "Market Cap (INR)",
          style: { fontSize: "14px", fontWeight: "bold", color: "#ff69f5" },
        },
        stroke: { curve: "smooth" },
        xaxis: { type: "datetime" },
        dataLabels: { enabled: false },
        yaxis: { show: false },
        colors: ["#ff69f5"],
        tooltip: {
          y: { formatter: (value) => value.toFixed(2) },
          theme: "dark",
        },
      },
      series: [{ name: "Market Cap (INR)", data: [] }],
    },
    Tot_Vol: {
      options: {
        grid: { show: false },
        title: {
          text: "Market Volume",
          style: { fontSize: "14px", fontWeight: "bold", color: "#00ffea" },
        },
        stroke: { curve: "smooth" },
        xaxis: { type: "datetime" },
        dataLabels: { enabled: false },
        yaxis: { show: false },
        colors: ["#00ffea"],
        tooltip: {
          y: { formatter: (value) => value.toFixed(2) },
          theme: "dark",
        },
      },
      series: [{ name: "Market Volume", data: [] }],
    },
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${Id}/market_chart?vs_currency=inr&days=${charts.Price.options.selection}`
      );
      const jsonData = await response.json();

      setCharts((prevCharts) => ({
        ...prevCharts,
        Price: {
          ...prevCharts.Price,
          series: [{ name: "Market Price", data: jsonData.prices }],
        },
        Market_Cap: {
          ...prevCharts.Market_Cap,
          series: [{ name: "Market Cap (INR)", data: jsonData.market_caps }],
        },
        Tot_Vol: {
          ...prevCharts.Tot_Vol,
          series: [{ name: "Market Volume", data: jsonData.total_volumes }],
        },
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [Id, charts.Price.options.selection]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const updateSelection = (days) => {
    setCharts((prevCharts) => ({
      ...prevCharts,
      Price: {
        ...prevCharts.Price,
        options: { ...prevCharts.Price.options, selection: days },
      },
    }));
  };

  return (
    <div className=" mx-auto p-4">
      <div className=" flex justify-around">
        <div className="">
          <div className="flex space-x-2 mb-4">
            <button
              className="bg-gray-800 text-white py-1 px-3 rounded"
              onClick={() => updateSelection(1)}
            >
              1D
            </button>
            <button
              className="bg-gray-800 text-white py-1 px-3 rounded"
              onClick={() => updateSelection(7)}
            >
              1W
            </button>
            <button
              className="bg-gray-800 text-white py-1 px-3 rounded"
              onClick={() => updateSelection(30)}
            >
              1M
            </button>
            <button
              className="bg-gray-800 text-white py-1 px-3 rounded"
              onClick={() => updateSelection(182)}
            >
              6M
            </button>
            <button
              className="bg-gray-800 text-white py-1 px-3 rounded"
              onClick={() => updateSelection(365)}
            >
              1Y
            </button>
          </div>
          <Chart
            options={charts.Price.options}
            series={charts.Price.series}
            type="area"
            height="400"
            width="600"
          />
        </div>

        <div className="space-y-4 w-52">
          <div className="bg-gray-800 p-4 rounded text-white">
            <h6 className="font-bold">Market Cap</h6>
            <p className="text-sm font-bold">${MarketCap}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded text-white">
            <h6 className="font-bold">Price Change 24hrs</h6>
            <p className="text-sm font-bold">${priceChange24}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded text-white">
            <h6 className="font-bold">Total Volume</h6>
            <p className="text-sm font-bold">${TotVol}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded text-white">
            <h6 className="font-bold">Circulating Supply</h6>
            <p className="text-sm font-bold">{Circulating}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded text-white">
            <h6 className="font-bold">Twitter Followers</h6>
            <p className="text-sm font-bold">{twitterF}</p>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 space-y-4">
          <div>
            <Chart
              options={charts.Market_Cap.options}
              series={charts.Market_Cap.series}
              type="line"
              height="200"
              width="300"
            />
          </div>
          <div>
            <Chart
              options={charts.Tot_Vol.options}
              series={charts.Tot_Vol.series}
              type="line"
              height="200"
              width="300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
