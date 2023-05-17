export const useCreateThumbnailPath = () => {
  const getSpaceThumbnailUrl = (imageKey?: string, resize?: number) => {
    if (imageKey && resize) {
      return `${process.env.NEXT_PUBLIC_FRONT_URL}/${imageKey}?w=${resize}`;
    } else if (imageKey) {
      return `${process.env.NEXT_PUBLIC_FRONT_URL}/${imageKey}`;
    }
  };
  return { getSpaceThumbnailUrl };
};
