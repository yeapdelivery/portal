export function isPastChat(lastMessageAt?: string) {
  if (!lastMessageAt) return false;

  const currentTime = new Date();
  const messageTime = new Date(lastMessageAt);
  const twoHoursInMilliseconds = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
  return currentTime.getTime() - messageTime.getTime() > twoHoursInMilliseconds;
}
