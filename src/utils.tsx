export function formatSeconds(seconds: number) {
  // Format as MM:SS
  seconds = Math.round(seconds);
  return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
};
