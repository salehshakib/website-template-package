import useMetalPriceLive from "metal-price-live";

export const isProduction = process.env.NEXT_PUBLIC_MODE === "production";

const endpoint = "wss://api.dreamemirates.com";
const apiKey = "OZzsZ1GQORWllqCY8lydekjQcsJT9a4k";

const useGoldPrices = () => {
  const { status, data: gold } = useMetalPriceLive(endpoint, apiKey);

  if (status === "connected") {
    return {
      k21Price: gold.priceGram21k,
      k22Price: gold.priceGram22k,
      k23Price: gold.priceGram23k,
      k24Price: gold.priceGram24k,
      askPrice: gold.askPrice,
      bidPrice: gold.bidPrice,
      high: gold.highPrice,
      low: gold.lowPrice,
      key: gold.key,
      timestamp: gold.timestamp,
    };
  }
};

export default useGoldPrices;
