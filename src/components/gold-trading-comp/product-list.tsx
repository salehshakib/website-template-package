"use client";

import Image from "next/image";
import { IWebsite } from "../../types/identity.interface";
import { GoldPrice } from "../../types/gold-price.interface";
import {
  gold9999Icon,
  jewellery22kIcon,
  kiloBar995Icon,
  tenTolaIcon,
} from "../../constants/image.constants";

const decimalPlace = 2;

export function ProductList({
  webInfo,
  goldPrice,
}: {
  webInfo: IWebsite;
  goldPrice: GoldPrice;
}) {
  const { jewellery22k, gold9999Gm, gold9999Kg, tenTola, kilobar995 } =
    webInfo ?? {};

  // const { jewellery22k, gold9999Gm, tenTola, gold9999Kg, kilobar995 } = calculateModifiedGoldPrices(
  //   goldPrice,
  //   webInfo
  // );

  const dynamicProducts = [
    {
      name: "Jewellery 22k",
      weight: "1 GM",
      modificationType: jewellery22k?.modificationType || "",
      amount:
        jewellery22k?.modificationType === "Premium"
          ? (goldPrice.k22Price + jewellery22k?.amount).toFixed(decimalPlace)
          : (goldPrice.k22Price - jewellery22k?.amount).toFixed(decimalPlace) ||
            0,
      currency: "AED",
      image: jewellery22kIcon,
    },
    {
      name: "Gold 9999",
      weight: "1 GM",
      modificationType: gold9999Gm?.modificationType || "",
      amount:
        gold9999Gm?.modificationType === "Premium"
          ? (goldPrice.k24Price + gold9999Gm?.amount).toFixed(decimalPlace)
          : (goldPrice.k24Price - gold9999Gm?.amount).toFixed(decimalPlace) ||
            0,
      currency: "AED",
      image: gold9999Icon,
    },
    {
      name: "Ten Tola",
      weight: "TTB",
      modificationType: tenTola?.modificationType || "",
      amount:
        tenTola?.modificationType === "Premium"
          ? (goldPrice.k24Price * 116.52 + tenTola?.amount).toFixed(
              decimalPlace
            )
          : (goldPrice.k24Price * 116.52 - tenTola?.amount).toFixed(
              decimalPlace
            ) || 0,
      currency: "AED",
      image: tenTolaIcon,
    },
    {
      name: "Gold 9999",
      weight: "1 KG",
      modificationType: gold9999Kg?.modificationType || "",
      amount:
        gold9999Kg?.modificationType === "Premium"
          ? (goldPrice.k24Price * 1000 + gold9999Kg?.amount).toFixed(
              decimalPlace
            )
          : (goldPrice.k24Price * 1000 - gold9999Kg?.amount).toFixed(
              decimalPlace
            ) || 0,
      currency: "AED",
      image: gold9999Icon,
    },
    {
      name: "Kilo Bar 995",
      weight: "1 KG",
      modificationType: kilobar995?.modificationType || "",
      amount:
        kilobar995?.modificationType === "Premium"
          ? (goldPrice.k23Price * 1000 + kilobar995?.amount).toFixed(
              decimalPlace
            )
          : (goldPrice.k23Price * 1000 - kilobar995?.amount).toFixed(
              decimalPlace
            ) || 0,
      currency: "AED",
      image: kiloBar995Icon,
    },
  ];

  return (
    <div>
      <p className="mb-4 text-sm text-white/60">Metal Price</p>
      <div className="space-y-3">
        {dynamicProducts.map((product, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#12132d]/5 p-4 shadow-[inset_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-medium text-white">{product.name}</div>
                <div className="text-sm text-white/60">{product.weight}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-white">{product.amount}</div>
              <div className="text-sm text-white/60">
                {product.modificationType} {product.currency}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
