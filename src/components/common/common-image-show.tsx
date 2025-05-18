"use client";

import Image, { StaticImageData } from "next/image";

import { useCommonImage } from "../../api/api-stores/queries/use-common-image";
import { cn } from "../../lib/utils";
import { Skeleton } from "../ui/skeleton";
import {
  defaultBusinessImage,
  defaultUserImage,
} from "../../constants/image.constants";

type Props = {
  fileName?: string;
  className?: string;
  height?: number;
  width?: number;
  type?: "avatar";
  isLoading?: boolean;
  fallbackImage?: StaticImageData;
};

const CommonImageShow = ({
  fileName,
  className,
  height = 600,
  width = 600,
  type,
  isLoading = false,
  fallbackImage,
}: Props) => {
  const { data, isLoading: isImageLoading } = useCommonImage(fileName);

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
