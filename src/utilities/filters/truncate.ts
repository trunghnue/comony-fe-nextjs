// utilities/filters/truncate.ts
export function truncateFilter() {
  const truncateText = (value: string, length: string, omission: string): string => {
    const defaultLength = 20;
    const lengthNum = length ? parseInt(length, 10) : defaultLength;
    const ommision = omission ? omission.toString() : "...";

    // return If value is shorter than length
    if (value.length <= lengthNum) {
      return value;
    }

    return value.substring(0, lengthNum) + ommision;
  };

  return truncateText;
}
