"use client";

import Image, { StaticImageData } from "next/image";

import { useFetchData } from "../../api/api-stores/queries/use-fetch-data";
import {
  defaultBusinessImage,
  defaultUserImage,
} from "../../constants/image.constants";
import { cn } from "../../lib/utils";
import { Skeleton } from "../ui/skeleton";

type Props = {
  fileName?: string;
  className?: string;
  height?: number;
  width?: number;
  type?: "avatar";
  isLoading?: boolean;
  fallbackImage?: StaticImageData;
};

const baseUrl =
  "https://staging.keycloak.dreamemirates.com/api/v1/media-svc/image";

export const mediaApi = Object.freeze({
  GET_PRESIGNED_URL: `${baseUrl}/get-presigned-url`,
});

const CommonImageShow = ({
  fileName,
  className,
  height = 600,
  width = 600,
  type,
  isLoading = false,
  fallbackImage,
}: Props) => {
  const { data, isLoading: isImageLoading } = useFetchData({
    url: `${mediaApi.GET_PRESIGNED_URL}/${fileName}`,
  });

  const loading = isLoading || isImageLoading;

  const imageUrl =
    (data?.message?.startsWith("http") && data?.message) ||
    fallbackImage ||
    (type === "avatar" ? defaultUserImage : defaultBusinessImage);

  if (loading) {
    return (
      <div
        className={cn("relative size-9 overflow-hidden rounded-md", className)}
      >
        <Skeleton
          className={cn(
            "size-full",
            type === "avatar" ? "rounded-full" : "rounded-md",
            className
          )}
        />
      </div>
    );
  }

  if (type === "avatar") {
    return (
      <div
        className={cn(
          "relative size-9 overflow-hidden rounded-full",
          className
        )}
      >
        <Image
          src={imageUrl}
          alt="Image"
          width={width}
          height={height}
          className={cn("size-full object-cover", className)}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-md", className)}>
      {/* {zoomImage ? (
        <ZoomImage
          src={imageUrl}
          alt="Image"
          width={width}
          height={height}
          className={cn("size-full bg-gray-100", className)}
        />
      ) : (
        <Image
          src={imageUrl}
          alt="Image"
          width={width}
          height={height}
          className={cn("h-full w-full bg-gray-100 object-contain", className)}
        />
      )} */}
      <Image
        src={imageUrl}
        alt="Image"
        width={width}
        height={height}
        className={cn("h-full w-full bg-gray-100 object-contain", className)}
      />
    </div>
  );
};

export default CommonImageShow;
