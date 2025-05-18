import { useQuery } from "@tanstack/react-query";
import { fetchGet } from "../../../lib/custom-fetch";

const baseUrl = "media-svc/image";

export const mediaApi = Object.freeze({
  // UPLOAD_USER_PROFILE_PHOTO: `${baseUrl}/upload-user-profile-photo`,
  // UPLOAD_KYC_DOCUMENTS: `${baseUrl}/upload-kyc-documents`,
  // UPLOAD_BUSINESS_PROFILE_PHOTO: `${baseUrl}/upload-business-profile-photo`,
  // UPLOAD_BUSINESS_DOCUMENTS: `${baseUrl}/upload-business-documents`,
  // GET_IMAGE: `${baseUrl}`,
  GET_PRESIGNED_URL: `${baseUrl}/get-presigned-url`,
});

export const bigdrawMediaUrl = "/upload";

export const useCommonImage = (
  imagePath?: string,
  isEnabled: boolean | (() => boolean) = true
) => {
  const enabled =
    !!imagePath && (typeof isEnabled === "function" ? isEnabled() : isEnabled);

  return useQuery({
    queryKey: ["imagePath", imagePath],
    queryFn: () => fetchGet(`${mediaApi.GET_PRESIGNED_URL}/${imagePath}`),
    enabled,
    // 10 min
    staleTime: 10 * 60 * 1000,
  });
};
