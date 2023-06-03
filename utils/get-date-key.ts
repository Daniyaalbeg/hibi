export const convertDateToKey = (date: Date) => {
  // Convert date to string in format YYYY-MM-DD to standardise date format key in map of events
  return date.toISOString().split("T")[0];
};
