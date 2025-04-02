import React from "react";

const Header = ({ handle_Submit }) => {
  return (
    <div>
      <nav className="bg-yellow-400">
        <div className="flex justify-around items-center p-4">
          <select
            className=" p-2 border border-gray-300 rounded-md w-1/4"
            name="selectCoin"
            onChange={handle_Submit}
          >
            <option value="bitcoin">Bitcoin (BTC)</option>
            <option value="avalanche-2">Avalanche (AVAX)</option>
            <option value="binancecoin">Binance (BNB)</option>
            <option value="cardano">Cardano (ADA)</option>
            <option value="decentraland">Decentraland (MANA)</option>
            <option value="dogecoin">Dogecoin (DOGE)</option>
            <option value="ethereum">Ethereum (ETH)</option>
            <option value="ripple">Ripple (XRP)</option>
            <option value="solana">Solana (SOL)</option>
            <option value="tether">Tether (USDT)</option>
          </select>

          <a className="text-2xl font-bold uppercase text-dark" href="/">
            Crypto Dashboard
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
