"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  TrendingUp,
  ArrowUp,
  ArrowDown,
  BarChart4,
  DollarSign,
  Building,
} from "lucide-react";
import CommonImageShow from "../common/common-image-show";
import useGoldPrices from "../../hooks/use-gold-prices";
import { calculateModifiedGoldPrices } from "../../lib/identity";
import { cn, formatNumberWithCommas } from "../../lib/utils";

export default function GoldTemplateFive({ webInfo }: { webInfo: any }) {
  const goldPrice = useGoldPrices();
  if (!goldPrice) return null;

  const businessName = webInfo?.[0]?.businessInfo?.name;
  const businessImage = webInfo?.[0]?.businessInfo?.profilePhoto;

  // Calculate gold prices using the server-side utility with only rawPriceData
  const goldPrices = calculateModifiedGoldPrices(goldPrice, webInfo, 2);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900 text-white py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Live price indicator with business info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
        >
          {/* Business info */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/20 shadow-lg flex items-center gap-4">
            {businessImage ? (
              <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-yellow-500">
                <CommonImageShow
                  fileName={businessImage}
                  type="avatar"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-center">
                <Building className="h-6 w-6 text-black" />
              </div>
            )}
            <div>
              <h2 className="font-bold text-lg text-yellow-300">
                {businessName || "Gold Trading Co."}
              </h2>
              <p className="text-xs text-yellow-100/70">
                Premium Gold Services
              </p>
            </div>
          </div>

          {/* Live price */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/20 shadow-lg">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-yellow-400" />
              <span className="text-lg font-medium text-yellow-100">
                Live Gold Price:
              </span>
              <span className="text-2xl font-bold text-yellow-400">
                ${goldPrice.bidPrice.toFixed(2)}
              </span>
              <span className="text-sm text-yellow-100/70">per oz</span>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Market Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-xl"
          >
            <div className="bg-gradient-to-r from-yellow-700 to-amber-800 p-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BarChart4 className="h-5 w-5" /> MARKET OVERVIEW
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Market stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 rounded-xl p-4 border border-green-700/30">
                  <div className="flex flex-col">
                    <span className="text-xs text-green-400 mb-1 flex items-center gap-1">
                      <ArrowUp className="h-3 w-3" /> BID PRICE
                    </span>
                    <span className="text-2xl font-bold text-green-300">
                      ${goldPrice.bidPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 rounded-xl p-4 border border-red-700/30">
                  <div className="flex flex-col">
                    <span className="text-xs text-red-400 mb-1 flex items-center gap-1">
                      <ArrowDown className="h-3 w-3" /> ASK PRICE
                    </span>
                    <span className="text-2xl font-bold text-red-300">
                      ${goldPrice.askPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 rounded-xl p-4 border border-blue-700/30">
                  <div className="flex flex-col">
                    <span className="text-xs text-blue-400 mb-1">24H LOW</span>
                    <span className="text-2xl font-bold text-blue-300">
                      ${goldPrice.low.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/20 rounded-xl p-4 border border-orange-700/30">
                  <div className="flex flex-col">
                    <span className="text-xs text-orange-400 mb-1">
                      24H HIGH
                    </span>
                    <span className="text-2xl font-bold text-orange-300">
                      ${goldPrice.high.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Gold image */}
              <div className="relative h-48 mt-6 rounded-xl overflow-hidden">
                <Image
                  src="/template-images/goldImage.jpg"
                  alt="Gold bars"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-yellow-400">
                    Premium Gold
                  </h3>
                  <p className="text-sm text-yellow-200/80">
                    Finest quality investment
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gold rates table */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-xl"
          >
            <div className="bg-gradient-to-r from-yellow-700 to-amber-800 p-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <DollarSign className="h-5 w-5" /> TODAY'S GOLD RATES
              </h2>
              <p className="text-sm text-yellow-200/80">
                Updated prices with latest market rates
              </p>
            </div>

            <div className="p-6">
              <div className="bg-gray-900/60 rounded-xl overflow-hidden border border-gray-700">
                <div className="grid grid-cols-3 text-center bg-black/40 p-4 font-bold text-yellow-400 border-b border-yellow-700/30">
                  <div>PRODUCT</div>
                  <div>WEIGHT</div>
                  <div>PRICE (AED)</div>
                </div>

                <div className="divide-y divide-gray-700/50">
                  {productList.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={cn(
                        "grid grid-cols-3 items-center p-5 hover:bg-yellow-900/10 transition-colors",
                        index % 2 === 0 ? "bg-black/10" : "bg-transparent"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
                          <Image
                            src={item.icon || "/placeholder.svg"}
                            alt={item.name}
                            width={35}
                            height={35}
                            className="object-contain rounded-full"
                          />
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="text-center text-yellow-100/80 font-medium">
                        {item.weight}
                      </div>
                      <div className="text-center">
                        <span className="text-xl font-bold text-yellow-300 bg-black/20 px-4 py-2 rounded-lg border border-yellow-500/20">
                          {formatNumberWithCommas(item.price)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
