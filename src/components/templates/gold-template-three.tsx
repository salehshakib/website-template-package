"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import Image from "next/image";

import { Clock } from "../gold-trading-comp/clock";
import CommonImageShow from "../common/common-image-show";
import useGoldPrices from "../../hooks/use-gold-prices";
import { ITemplateProps } from "../../types/identity.interface";
import { calculateModifiedGoldPrices } from "../../lib/identity";
import { formatNumberWithCommas } from "../../lib/utils";
import {
  gold9999Icon,
  gold9999KgIcon,
  jewellery22kIcon,
  kiloBar995Icon,
  tenTolaIcon,
} from "../../constants/image.constants";

export default function GoldTemplateThree({ webInfo }: ITemplateProps) {
  const goldPrice = useGoldPrices();
  if (!goldPrice) return null;

  const businessName = webInfo?.businessInfo?.name;
  const businessImage = webInfo?.businessInfo?.profilePhoto;

  const modifiedGoldPrices = calculateModifiedGoldPrices(goldPrice, webInfo, 2);

  const productList = [
    {
      name: "TEN TOLA BAR",
      weight: "TTB",
      price: modifiedGoldPrices.tenTola,
      icon: tenTolaIcon,
    },
    {
      name: "JEWELLERY 22K",
      weight: "1GM",
      price: modifiedGoldPrices.jewellery22k,
      icon: jewellery22kIcon,
    },
    {
      name: "GOLD 9999",
      weight: "1GM",
      price: modifiedGoldPrices.gold9999Gm,
      icon: gold9999Icon,
    },
    {
      name: "GOLD 9999",
      weight: "1KG",
      price: modifiedGoldPrices.gold9999Kg,
      icon: gold9999KgIcon,
    },
    {
      name: "KILO BAR 995",
      weight: "1KG",
      price: modifiedGoldPrices.kilobar995,
      icon: kiloBar995Icon,
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-b from-black to-gray-900 px-4 py-8 text-white">
      <div className="container mx-auto">
        {/* Main content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left column */}
          <div className="space-y-6">
            {/* Live clock */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg border border-yellow-600 bg-black p-6 shadow-lg"
            >
              {/* Business Logo and Name */}
              <div className="mb-8 flex flex-col items-center justify-center">
                {businessImage ? (
                  <CommonImageShow
                    fileName={businessImage}
                    type="avatar"
                    aspect-square
                    h-full
                    w-full
                    className="h-16 w-16 rounded-md"
                  />
                ) : (
                  <Image
                    src="/avatar-default.png"
                    alt="Avatar"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                )}
                <h1 className="text-center text-2xl font-bold text-yellow-400 md:text-3xl">
                  {businessName}
                </h1>
                <p className="mt-1 text-sm text-yellow-200">
                  Premium Gold Trading
                </p>
              </div>
              <h2 className="mb-2 text-center text-xl font-bold text-yellow-400">
                LIVE GOLD PRICE
              </h2>
              <div className="flex justify-center">
                <Clock />
              </div>
            </motion.div>

            {/* Spot rates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-lg border border-yellow-600 bg-black p-6 shadow-lg"
            >
              <h2 className="mb-4 text-center text-xl font-bold text-yellow-400">
                SPOT RATES
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-yellow-200">
                    <ChevronUp className="mr-1 h-4 w-4 text-green-500" />
                    BID PRICE (oz)
                  </div>
                  <div className="rounded-lg border border-yellow-600 bg-gradient-to-r from-yellow-900 to-black p-3 text-center text-3xl font-bold">
                    ${goldPrice.bidPrice.toFixed(2)}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-yellow-200">
                    <ChevronDown className="mr-1 h-4 w-4 text-red-500" />
                    ASK PRICE (oz)
                  </div>
                  <div className="rounded-lg border border-yellow-600 bg-gradient-to-r from-yellow-900 to-black p-3 text-center text-3xl font-bold">
                    ${goldPrice.askPrice.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gradient-to-r from-red-900 to-red-800 p-3 text-center">
                  <div className="text-xs text-red-200">LOW</div>
                  <div className="font-bold">${goldPrice.low.toFixed(2)}</div>
                </div>

                <div className="rounded-lg bg-gradient-to-r from-green-900 to-green-800 p-3 text-center">
                  <div className="text-xs text-green-200">HIGH</div>
                  <div className="font-bold">${goldPrice.high.toFixed(2)}</div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button className="flex items-center rounded-lg bg-gradient-to-r from-blue-800 to-blue-900 px-4 py-3 text-white transition-colors hover:from-blue-700 hover:to-blue-800">
                  <Download className="mr-2 h-4 w-4" />
                  Download Mobile App
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Gold image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-lg border border-yellow-600 bg-black shadow-lg"
            >
              <Image
                src="/template-images/goldImage.jpg"
                alt="Gold bars"
                width={800}
                height={400}
                className="h-48 w-full object-cover md:h-64"
              />
              <div className="p-4 text-center">
                <h2 className="text-xl font-bold text-yellow-400">
                  Premium Gold Products
                </h2>
                <p className="mt-1 text-sm text-yellow-200">
                  Finest quality gold at competitive prices
                </p>
              </div>
            </motion.div>

            {/* Gold prices table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="overflow-hidden rounded-lg border border-yellow-600 bg-black shadow-lg"
            >
              <div className="bg-gradient-to-r from-yellow-800 to-yellow-900 p-4 text-center">
                <h2 className="text-xl font-bold text-white">
                  TODAY'S GOLD RATES
                </h2>
                <p className="text-sm text-yellow-200">
                  Updated prices with latest market rates
                </p>
              </div>

              <div className="divide-y divide-yellow-800">
                <div className="grid grid-cols-3 bg-black p-3 text-center font-bold text-yellow-400">
                  <div>PRODUCT</div>
                  <div>WEIGHT</div>
                  <div>PRICE (AED)</div>
                </div>

                {productList.map((product, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 items-center p-4 transition-colors hover:bg-yellow-900/20"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600">
                        <Image
                          src={product.icon}
                          alt={product.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                    <div className="text-center">{product.weight}</div>
                    <div className="text-center font-bold">
                      {formatNumberWithCommas(product.price, true)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
