import useMetalPriceLive from "metal-price-live";

export const isProduction = process.env.NEXT_PUBLIC_MODE === "production";

const endpoint = isProduction
  ? process.env.NEXT_PUBLIC_GOLD_API_PRODUCTION_ENDPOINT || ""
  : process.env.NEXT_PUBLIC_GOLD_API_STAGING_ENDPOINT || "";

const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GOLD_API_KEY || ""
  : "test";

const useGoldPrices = () => {
  // const [askPrice, setAskPrice] = useState(0);
  // const [bidPrice, setBidPrice] = useState(0);
  // // const
  // const [k22, setK22] = useState(0);
  // const [k24, setK24] = useState(0);
  // const [high, setHigh] = useState(0);
  // const [low, setLow] = useState(0);
  // const [key, setKey] = useState('');
  // const [timestamp, setTimestamp] = useState(0);

  const { status, data: gold } = useMetalPriceLive(endpoint, apiKey);

  //Only karat gold data is in AED currency.. everything else is USD
  // useEffect(() => {
  //   if (status === 'connected') {
  //     setK22(+gold.priceGram22k);
  //     setK24(+gold.priceGram24k);
  //     setKey(gold.key);
  //     setAskPrice(+gold.askPrice.toFixed(2));
  //     setBidPrice(+gold.bidPrice.toFixed(2));
  //     setHigh(+gold.highPrice.toFixed(2));
  //     setLow(+gold.lowPrice.toFixed(2));
  //     setTimestamp(gold.timestamp);
  //   }
  // }, [status, gold]);

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

  // return {k21Price: priceGram21k, k22Price: k22, k24Price: k24, askPrice, bidPrice, high, low, key, timestamp };
};

export default useGoldPrices;
