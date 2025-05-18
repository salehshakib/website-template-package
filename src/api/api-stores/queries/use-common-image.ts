import { useFetchData } from "./use-fetch-data";

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

const baseUrl = "media-svc/image";

export const mediaApi = Object.freeze({
  // UPLOAD_USER_PROFILE_PHOTO: `${baseUrl}/upload-user-profile-photo`,
  // UPLOAD_KYC_DOCUMENTS: `${baseUrl}/upload-kyc-documents`,
  // UPLOAD_BUSINESS_PROFILE_PHOTO: `${baseUrl}/upload-business-profile-photo`,
  // UPLOAD_BUSINESS_DOCUMENTS: `${baseUrl}/upload-business-documents`,
  // GET_IMAGE: `${baseUrl}`,
  GET_PRESIGNED_URL: `${baseUrl}/get-presigned-url`,
});

export const useCommonImage = (
  imagePath?: string,
  isEnabled: boolean | (() => boolean) = true
) => {
  const enabled =
    !!imagePath && (typeof isEnabled === "function" ? isEnabled() : isEnabled);

  const { data, isLoading } = useFetchData({
    url: enabled
      ? `${baseApiUrl}/${mediaApi.GET_PRESIGNED_URL}/${imagePath}`
      : "",
  });

  return { data, isLoading };
};
