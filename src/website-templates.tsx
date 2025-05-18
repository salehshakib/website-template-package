"use client";

import useFetchQuery from "./api/api-stores/queries/use-fetch-query";
import GoldTemplateOne from "./components/templates/gold-template-one";
import GoldTemplateThree from "./components/templates/gold-template-three";
import GoldTemplateTwo from "./components/templates/gold-template-two";
import { buildFSStr } from "./lib/filter-sort-params";
import Loading from "./loading";
import {
  ITemplate,
  IWebsite,
  TGoldPriceData,
} from "./types/identity.interface";

const identityApi = Object.freeze({
  GET_ALL_WEBSITES: "websites",
  GET_ALL_TEMPLATES: "templates/all",
});

interface WebsiteTemplatesProps {
  websiteId: string;
}

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

const currentTime = Math.floor(Date.now() / 1000);

export default function WebsiteTemplates({ websiteId }: WebsiteTemplatesProps) {
  const { data, isLoading: websiteLoading } = useFetchQuery<IWebsite[]>({
    url: identityApi.GET_ALL_WEBSITES,
    params: { filter: searchFilter({ id: websiteId }) },
    isEnabled: !!websiteId,
  });

  const { data: goldPriceData, isLoading: isGoldPriceDataLoading } =
    useFetchQuery<TGoldPriceData[]>({
      url: "https://pricefeed.dreamemirates.com/api/v1/market-price",
      params: {
        startTime: currentTime - 3600,
        endTime: currentTime,
      },
    });

  const { data: templatesData, isLoading: isTemplatesDataLoading } =
    useFetchQuery<ITemplate[]>({
      url: identityApi.GET_ALL_TEMPLATES,
      params: {
        filter: searchFilter({ category: "Website" }),
      },
    });

  const loading =
    websiteLoading || isGoldPriceDataLoading || isTemplatesDataLoading;

  const myWebsite = data?.[0];

  const matchedIndex = templatesData?.findIndex(
    (t: any) => t._id === myWebsite?.templateInfo?._id
  );

  return (
    <>
      {loading ? (
        <Loading />
      ) : matchedIndex === 0 ? (
        <GoldTemplateOne webInfo={myWebsite} goldPriceData={goldPriceData} />
      ) : matchedIndex === 1 ? (
        <GoldTemplateTwo webInfo={myWebsite} goldPriceData={goldPriceData} />
      ) : matchedIndex === 2 ? (
        <GoldTemplateThree webInfo={myWebsite} goldPriceData={goldPriceData} />
      ) : (
        <div className="flex min-h-screen items-center justify-center">
          Template not found
        </div>
      )}
    </>
  );
}
