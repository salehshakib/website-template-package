"use client";
import Image from "next/image";
import { Clock } from "../gold-trading-comp/clock";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, TrendingUp, Coins } from "lucide-react";
import useGoldPrices from "../../hooks/use-gold-prices";
import { calculateModifiedGoldPrices } from "../../lib/identity";
import CommonImageShow from "../common/common-image-show";
import { formatNumberWithCommas } from "../../lib/utils";

export default function GoldTemplateFour({ webInfo }: { webInfo: any }) {
  const goldPrice = useGoldPrices();

  if (!goldPrice) return null;

  const businessName = webInfo?.[0]?.businessInfo?.name;
  const businessImage = webInfo?.[0]?.businessInfo?.profilePhoto;

  // Calculate gold prices using the server-side utility with only goldPrice
  const goldPrices = calculateModifiedGoldPrices(goldPrice, webInfo, 2);

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const productList = [
    {
      name: "TEN TOLA BAR",
      weight: "TTB",
      price: goldPrices.tenTola,
      icon: "/template-images/TEN-TOLA-BAR.jpg",
    },
    {
      name: "JEWELLERY 22K",
      weight: "1GM",
      price: goldPrices.jewellery22k,
      icon: "/template-images/JEWELLERY-22K.jpg",
    },
    {
      name: "GOLD 9999",
      weight: "1GM",
      price: goldPrices.gold9999Gm,
      icon: "/template-images/GOLD-9999.jpg",
    },
    {
      name: "GOLD 9999",
      weight: "1KG",
      price: goldPrices.gold9999Kg,
      icon: "/template-images/GOLD-9999-1KG.jpg",
    },
    {
      name: "KILO BAR 995",
      weight: "1KG",
      price: goldPrices.kilobar995,
      icon: "/template-images/KILO-BAR-995.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-8 px-4">
      <div className="container mx-auto">
        {/* Business info and live price */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-yellow-900/40 to-amber-900/40 backdrop-blur-sm rounded-xl p-6 mb-8 border border-yellow-600/30 shadow-lg shadow-amber-900/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Business info */}
            <div className="flex items-center gap-4">
              {businessImage ? (
                <CommonImageShow
                  fileName={businessImage}
                  type="avatar"
                  className="h-16 w-16 rounded-full border-2 border-yellow-500 shadow-lg shadow-yellow-500/20"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                  <Coins className="h-8 w-8 text-black" />
                </div>
              )}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-300">
                  {businessName || "Gold Trading Co."}
                </h1>
                <p className="text-sm text-yellow-100/80">
                  Premium Gold Services
                </p>
              </div>
            </div>

            {/* Live price */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-yellow-300 mb-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> LIVE GOLD PRICE
              </span>
              <span className="text-2xl md:text-3xl font-bold text-yellow-400">
                ${goldPrice.bidPrice.toFixed(2)}
              </span>
              <span className="text-xs text-yellow-100/70 mt-1">per oz</span>
            </div>

            {/* Clock */}
            <div className="flex items-center gap-2">
              <Clock />
            </div>
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gold products showcase */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 bg-gradient-to-b from-black to-gray-900 rounded-xl overflow-hidden border border-yellow-700/30 shadow-xl"
          >
            <div className="relative h-64">
              <Image
                src="/template-images/goldImage.jpg"
                alt="Gold bars"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h2 className="text-xl font-bold text-yellow-400">
                  Premium Gold Products
                </h2>
                <p className="text-sm text-yellow-200/80">
                  Finest quality at competitive prices
                </p>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center justify-center p-3 bg-black/40 rounded-lg border border-yellow-700/30">
                  <span className="text-xs text-green-400 mb-1 flex items-center gap-1">
                    <ArrowUp className="h-3 w-3" /> BID
                  </span>
                  <span className="text-xl font-bold text-green-300">
                    ${goldPrice.bidPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center p-3 bg-black/40 rounded-lg border border-yellow-700/30">
                  <span className="text-xs text-red-400 mb-1 flex items-center gap-1">
                    <ArrowDown className="h-3 w-3" /> ASK
                  </span>
                  <span className="text-xl font-bold text-red-300">
                    ${goldPrice.askPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center justify-center p-3 bg-black/40 rounded-lg border border-yellow-700/30">
                  <span className="text-xs text-blue-400 mb-1">LOW 24H</span>
                  <span className="text-xl font-bold text-blue-300">
                    ${goldPrice.low.toFixed(2)}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center p-3 bg-black/40 rounded-lg border border-yellow-700/30">
                  <span className="text-xs text-orange-400 mb-1">HIGH 24H</span>
                  <span className="text-xl font-bold text-orange-300">
                    ${goldPrice.high.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gold rates table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 bg-gradient-to-b from-black to-gray-900 rounded-xl overflow-hidden border border-yellow-700/30 shadow-xl"
          >
            <div className="bg-gradient-to-r from-yellow-800 to-amber-900 p-4">
              <h2 className="text-xl font-bold text-white text-center">
                TODAY'S GOLD RATES
              </h2>
              <p className="text-sm text-yellow-200/80 text-center">
                Updated prices with latest market rates
              </p>
            </div>

            <div className="overflow-hidden">
              <div className="grid grid-cols-3 text-center bg-black/60 p-3 font-bold text-yellow-400 border-b border-yellow-700/30">
                <div>PRODUCT</div>
                <div>WEIGHT</div>
                <div>PRICE (AED)</div>
              </div>

              {productList.map((item, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="grid grid-cols-3 items-center p-4 hover:bg-yellow-900/10 transition-colors border-b border-yellow-700/20"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full flex-shrink-0">
                        <Image
                          src={item.icon}
                          alt={item.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      </div>
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                    <div className="text-center text-yellow-100/80">
                      {item.weight}
                    </div>
                    <div className="text-center font-bold text-yellow-300">
                      {formatNumberWithCommas(item.price, true)}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
