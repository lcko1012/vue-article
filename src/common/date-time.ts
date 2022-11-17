export const convertToLocaleDateString = (time: string | undefined): string => {
  return time ? new Date(time).toLocaleDateString() : "";
};
