"use client";

import useGoldPrices from "../../hooks/use-gold-prices";
import { ITemplateProps } from "../../types/identity.interface";
import { Header } from "../gold-trading-comp/header";
import { PriceDisplay } from "../gold-trading-comp/price-display";
import { PriceHistory } from "../gold-trading-comp/price-history";
import { ProductList } from "../gold-trading-comp/product-list";

const GoldTemplateOne = ({ webInfo, goldPriceData }: ITemplateProps) => {
  const goldPrice = useGoldPrices();

  if (!goldPrice) return null;

  return (
    <div className="min-h-screen bg-[#00072d]">
      <main className="container mx-auto space-y-8 px-8 py-8">
        <Header
          websiteName={webInfo?.businessInfo?.name}
          logo={webInfo?.businessInfo?.profilePhoto}
        />
        <PriceDisplay
          askPriceModification={webInfo?.askPriceModification}
          bidPriceModification={webInfo?.bidPriceModification}
          goldPrice={goldPrice}
          goldPriceData={goldPriceData}
        />
        <div className="grid grid-cols-2 gap-8">
          <PriceHistory
            askPriceModification={webInfo?.askPriceModification}
            bidPriceModification={webInfo?.bidPriceModification}
            goldPrice={goldPrice}
          />
          <ProductList webInfo={webInfo} goldPrice={goldPrice} />
        </div>
      </main>
    </div>
  );
};

export default GoldTemplateOne;
