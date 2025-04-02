import React, { useState, useEffect, useCallback } from "react";
import CardSection from "./components/CardSelection";
import ChartSection from "./components/ChartSelection";
import Header from "./components/Header";

const App = () => {
  const [id, setId] = useState("bitcoin");
  const [data, setData] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleSubmit = (event) => {
    setId(event.target.value);
  };

  return (
    <div>
      <Header handle_Submit={handleSubmit} />
      <div className="bg-slate-700">
        <CardSection
          coinName={data.name}
          currentPrice={data.market_data?.current_price?.inr || ""}
          mCap24={data.market_data?.market_cap_change_percentage_24h || ""}
          ath={data.market_data?.ath?.inr || ""}
          atl={data.market_data?.atl?.inr || ""}
          sentiment={data.sentiment_votes_up_percentage}
          high24={data.market_data?.high_24h?.inr || ""}
          low24={data.market_data?.low_24h?.inr || ""}
        />
        <ChartSection
          Id={id}
          priceChange24={
            data.market_data?.price_change_24h_in_currency?.inr || ""
          }
          MarketCap={data.market_data?.market_cap?.inr || ""}
          TotVol={data.market_data?.total_volume?.inr || ""}
          Circulating={data.market_data?.circulating_supply || ""}
          twitterF={data.community_data?.twitter_followers || ""}
        />
      </div>
    </div>
  );
};

export default App;
