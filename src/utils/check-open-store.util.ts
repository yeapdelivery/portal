import StoreModel, { OpeningHours } from "@/modules/app/models/store";

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function checkOpenStore(store: StoreModel) {
  if (!store?.id) return false;

  const { openingHours } = store;

  const today = new Date().getDay();
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  if (!openingHours) return false;

  const day = days[today];

  if (!day) return false;

  if (openingHours[day]) return false;

  const { openHour, closeHour } = openingHours[day];

  const [openHourHour, openHourMinute] = openHour.split(":");
  const [closeHourHour, closeHourMinute] = closeHour.split(":");

  const openHourDate = new Date();
  openHourDate.setHours(Number(openHourHour));
  openHourDate.setMinutes(Number(openHourMinute));

  const closeHourDate = new Date();
  closeHourDate.setHours(Number(closeHourHour));
  closeHourDate.setMinutes(Number(closeHourMinute));

  if (openHourDate.getHours() > currentHour) return false;
  if (closeHourDate.getHours() < currentHour) return false;
  if (
    openHourDate.getHours() === currentHour &&
    openHourDate.getMinutes() > currentMinute
  )
    return false;
  if (
    closeHourDate.getHours() === currentHour &&
    closeHourDate.getMinutes() < currentMinute
  )
    return false;

  return true;
}
