import { metalObj } from "../constants/virtual-buy-sell.constants";
import { GoldPrice } from "../types/gold-price.interface";
import { IWebsite } from "../types/identity.interface";
import { formatToFixed } from "./utils";

type TModifiedGoldPrices = {
  tenTola: number | string;
  jewellery22k: number | string;
  gold9999Gm: number | string;
  gold9999Kg: number | string;
  kilobar995: number | string;
};

export function calculateModifiedGoldPrices(
  goldPrice: GoldPrice,
  webInfo: IWebsite,
  decimalPlace = 2
): TModifiedGoldPrices {
  const { gold9999Gm, gold9999Kg, jewellery22k, kilobar995, tenTola } =
    webInfo ?? {};

  const k22 = goldPrice.k22Price;
  const k23 = goldPrice.k23Price;
  const k24 = goldPrice.k24Price;

  return {
    jewellery22k:
      jewellery22k?.modificationType === "Premium"
        ? formatToFixed(k22 + Number(jewellery22k?.amount), decimalPlace)
        : formatToFixed(k22 - Number(jewellery22k?.amount), decimalPlace),

    gold9999Gm:
      gold9999Gm?.modificationType === "Premium"
        ? formatToFixed(k24 + Number(gold9999Gm?.amount), decimalPlace)
        : formatToFixed(k24 - Number(gold9999Gm?.amount), decimalPlace),

    tenTola:
      tenTola?.modificationType === "Premium"
        ? formatToFixed(
            k24 * metalObj.TTB + Number(tenTola?.amount),
            decimalPlace
          )
        : formatToFixed(
            k24 * metalObj.TTB - Number(tenTola?.amount),
            decimalPlace
          ),

    gold9999Kg:
      gold9999Kg?.modificationType === "Premium"
        ? formatToFixed(
            k24 * metalObj.KILOBAR + Number(gold9999Kg?.amount),
            decimalPlace
          )
        : formatToFixed(
            k24 * metalObj.KILOBAR - Number(gold9999Kg?.amount),
            decimalPlace
          ),

    kilobar995:
      kilobar995?.modificationType === "Premium"
        ? formatToFixed(
            k23 * metalObj.KILOBAR + Number(kilobar995?.amount),
            decimalPlace
          )
        : formatToFixed(
            k23 * metalObj.KILOBAR - Number(kilobar995?.amount),
            decimalPlace
          ),
  };
}
