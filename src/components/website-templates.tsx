"use client";

import { useFetchData } from "../api/api-stores/queries/use-fetch-data";
import { buildFSStr } from "../lib/filter-sort-params";
import Loading from "../loading";
import {
  ITemplate,
  IWebsite,
  TGoldPriceData,
} from "../types/identity.interface";
import GoldTemplateFive from "./templates/gold-template-five";
import GoldTemplateFour from "./templates/gold-template-four";
import GoldTemplateOne from "./templates/gold-template-one";
import GoldTemplateThree from "./templates/gold-template-three";
import GoldTemplateTwo from "./templates/gold-template-two";

const identityApi = Object.freeze({
  GET_ALL_WEBSITES: "websites",
  GET_ALL_TEMPLATES: "templates/all",
});

interface WebsiteTemplatesProps {
  websiteId: string;
  isProduction?: boolean;
}

const currentTime = Math.floor(Date.now() / 1000);

const searchFilter = ({ id, category }: { id?: string; category?: string }) => {
  const filterGroups: [string, string, string][] = [];

  if (id) {
    filterGroups.push(["id", "eq", id]);
  }
  if (category) {
    filterGroups.push(["category", "eq", category]);
  }

  if (filterGroups.length === 0) return "";

  return buildFSStr({ filters: filterGroups });
};

export default function WebsiteTemplates({ websiteId }: WebsiteTemplatesProps) {
  const { data, isLoading: websiteLoading } = useFetchData<IWebsite[]>({
    url: identityApi.GET_ALL_WEBSITES,
    params: { filter: searchFilter({ id: websiteId }) },
  });

  const { data: goldPriceData, isLoading: isGoldPriceDataLoading } =
    useFetchData<TGoldPriceData[]>({
      url: "https://pricefeed.dreamemirates.com/api/v1/market-price",
      params: {
        startTime: currentTime - 3600,
        endTime: currentTime,
      },
    });

  const { data: templatesData, isLoading: isTemplatesDataLoading } =
    useFetchData<ITemplate[]>({
      url: identityApi.GET_ALL_TEMPLATES,
      params: {
        filter: searchFilter({ category: "Website" }),
        sort: "%2BcreatedAt",
      },
    });

  const loading =
    websiteLoading || isGoldPriceDataLoading || isTemplatesDataLoading;

  const myWebsite = data?.[0];

  const matchedIndex = templatesData?.findIndex(
    (t: any) => t._id === myWebsite?.templateInfo?._id
  );

  if (!myWebsite || !goldPriceData) return <Loading />;

  return (
    <>
      {loading ? (
        <Loading />
      ) : matchedIndex === 0 ? (
        <GoldTemplateOne webInfo={myWebsite} goldPriceData={goldPriceData} />
      ) : matchedIndex === 1 ? (
        <GoldTemplateTwo webInfo={myWebsite} goldPriceData={goldPriceData} />
      ) : matchedIndex === 2 ? (
        <GoldTemplateThree webInfo={myWebsite} />
      ) : matchedIndex === 3 ? (
        <GoldTemplateFour webInfo={myWebsite} />
      ) : matchedIndex === 4 ? (
        <GoldTemplateFive webInfo={myWebsite} />
      ) : (
        <div className="flex min-h-screen items-center justify-center">
          Template not found
        </div>
      )}
    </>
  );
}
