import React from "react";

const CardSection = ({
  coinName,
  currentPrice,
  mCap24,
  ath,
  atl,
  sentiment,
  high24,
  low24,
}) => {
  const cardItems = [
    { title: "Market Cap 24Hrs", value: `${mCap24} %`, color: "#fcdf03" },
    { title: "All Time High", value: `₹${ath}`, color: "#fcdf03" },
    { title: "All Time Low", value: `₹${atl}`, color: "#fcdf03" },
    { title: "Positive Sentiments", value: `${sentiment} %`, color: "#fcdf03" },
    { title: "High 24Hrs", value: `₹${high24}`, color: "rgb(51, 255, 0)" },
    { title: "Low 24Hrs", value: `₹${low24}`, color: "rgb(255, 32, 32)" },
  ];

  return (
    <div>
      <div className="text-4xl font-bold text-white p-4 capitalize">
        {coinName}
      </div>
      <section className="flex flex-wrap justify-center text-yellow-400">
        {cardItems.map(({ title, value, color }, index) => (
          <div
            key={index}
            className="text-white text-center m-3 p-4 w-[11rem] rounded-md bg-slate-900"
          >
            <div>
              <h6>{title}</h6>
              <p className="card-text font-bold text-xl" style={{ color }}>
                {value}
              </p>
            </div>
          </div>
        ))}
      </section>
      <div>
        <div className="text-white text-3xl p-2 text-center">Current Price</div>
        <div className="text-center text-7xl font-bold text-yellow-400">
          ₹{currentPrice}
        </div>
      </div>
    </div>
  );
};

export default CardSection;
