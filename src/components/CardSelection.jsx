import React from "react";

// Helper function to format numbers in Indian style
const formatNumber = (num) => {
  let formattedNum;

  // Function to apply Indian Numbering System (for commas)
  const applyIndianCommas = (num) => {
    let [integerPart, decimalPart] = num.split(".");

    // Add commas to the integer part in the Indian system
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Return the formatted integer part with the decimal part if any
    if (decimalPart && decimalPart !== "00") {
      return integerPart + "." + decimalPart;
    }
    return integerPart;
  };

  // Check if number is in Crores, Lakhs, or Thousands
  if (num >= 10000000) {
    // Above 1 Crore
    formattedNum = (num / 10000000).toFixed(2); // Convert to crores
    return applyIndianCommas(formattedNum) + " Cr";
  } else if (num >= 100000) {
    // Above 1 Lakh
    formattedNum = (num / 100000).toFixed(2); // Convert to lakhs
    return applyIndianCommas(formattedNum) + " L";
  } else if (num >= 1000) {
    // Above 1 Thousand
    formattedNum = (num / 1000).toFixed(2); // Convert to thousands
    return applyIndianCommas(formattedNum) + " K";
  } else {
    // Below 1000, just format the number with commas
    formattedNum = num.toFixed(2); // Ensure 2 decimal points
    return applyIndianCommas(formattedNum);
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
