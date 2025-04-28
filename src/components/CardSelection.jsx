import React from "react";

// Helper function to format numbers in Indian style
const formatNumber = (num) => {
  // Function to format numbers in the Indian currency system with commas
  const formatCurrency = (number) => {
    const parts = number.toString().split(".");
    let integerPart = parts[0];
    const decimalPart = parts.length > 1 ? "." + parts[1] : "";

    // Add commas for the Indian numbering system
    const firstPart = integerPart.slice(0, integerPart.length % 3 || 3);
    const remaining = integerPart
      .slice(integerPart.length % 3 || 3)
      .replace(/\d{2}(?=\d)/g, "$&,");
    integerPart = firstPart + (remaining ? "," + remaining : "");

    return integerPart + decimalPart;
  };

  if (num >= 10000000) {
    return formatCurrency((num / 10000000).toFixed(3)) + " Cr"; // Crore
  } else if (num >= 100000) {
    return formatCurrency((num / 100000).toFixed(3)) + " L"; // Lakh
  } else if (num >= 1000) {
    return formatCurrency((num / 1000).toFixed(3)) + " K"; // Thousand
  } else {
    return formatCurrency(num.toFixed(3)); // Less than 1000
  }
};

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
    {
      title: "Market Cap 24Hrs",
      value: `${mCap24} %`,
      color: "#fcdf03",
      format: false,
    },
    { title: "All Time High", value: ath, color: "#fcdf03", format: true },
    { title: "All Time Low", value: atl, color: "#fcdf03", format: true },
    {
      title: "Positive Sentiments",
      value: `${sentiment} %`,
      color: "#fcdf03",
      format: false,
    },
    {
      title: "High 24Hrs",
      value: high24,
      color: "rgb(51, 255, 0)",
      format: true,
    },
    {
      title: "Low 24Hrs",
      value: low24,
      color: "rgb(255, 32, 32)",
      format: true,
    },
  ];

  return (
    <div>
      <div className="text-4xl font-bold text-white p-4 capitalize">
        {coinName}
      </div>
      <section className="flex flex-wrap justify-center text-yellow-400">
        {cardItems.map(({ title, value, color, format }, index) => (
          <div
            key={index}
            className="text-white text-center m-3 p-4 w-[11rem] rounded-md bg-slate-900"
          >
            <div>
              <h6>{title}</h6>
              <p className="card-text font-bold text-xl" style={{ color }}>
                {format ? `₹${formatNumber(Number(value))}` : value}
              </p>
            </div>
          </div>
        ))}
      </section>
      <div>
        <div className="text-white text-3xl p-2 text-center">Current Price</div>
        <div className="text-center text-7xl font-bold text-yellow-400">
          ₹{formatNumber(Number(currentPrice))}
        </div>
      </div>
    </div>
  );
};

export default CardSection;
