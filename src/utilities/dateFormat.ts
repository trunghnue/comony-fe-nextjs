export function dateFormat() {
  const toDoubleDigits = (num: number) => {
    let result = String(num);
    if (result.length === 1) {
      result = `0${result}`;
    }
    return result;
  };

  const getYmd = (date: string): string => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = toDoubleDigits(newDate.getMonth() + 1);
    const day = toDoubleDigits(newDate.getDate());
    const hour = toDoubleDigits(newDate.getHours());
    const minutes = toDoubleDigits(newDate.getMinutes());

    return `${year}/${month}/${day}/${hour}/${minutes}`;
  };

  return {
    getYmd,
  };
}
