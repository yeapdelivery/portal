import StoreModel, { OpeningHoursVariant } from "@/modules/app/models/store";

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export function checkOpenStore(store: StoreModel) {
  if (!store?.id) return OpeningHoursVariant.CLOSED;

  const { openingHours } = store;

  const today = new Date().getDay();
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  const day = days[today];

  if (!day) return OpeningHoursVariant.CLOSED;

  if (!openingHours) return OpeningHoursVariant.CLOSED;

  if (!openingHours[day]) return OpeningHoursVariant.CLOSED;

  const { openHour, closeHour } = openingHours[day];

  if (!openHour || !closeHour) return OpeningHoursVariant.CLOSED;

  const [openHourHour, openHourMinute] = openHour.split(":");
  const [closeHourHour, closeHourMinute] = closeHour.split(":");

  const openHourDate = new Date();
  openHourDate.setHours(Number(openHourHour));
  openHourDate.setMinutes(Number(openHourMinute));

  const closeHourDate = new Date();
  closeHourDate.setHours(Number(closeHourHour));
  closeHourDate.setMinutes(Number(closeHourMinute));

  if (openHourDate.getHours() > currentHour) return OpeningHoursVariant.CLOSED;
  if (closeHourDate.getHours() < currentHour) return OpeningHoursVariant.CLOSED;
  if (
    openHourDate.getHours() === currentHour &&
    openHourDate.getMinutes() > currentMinute
  )
    return OpeningHoursVariant.CLOSED;
  if (
    closeHourDate.getHours() === currentHour &&
    closeHourDate.getMinutes() < currentMinute
  )
    return OpeningHoursVariant.CLOSED;

  return OpeningHoursVariant.OPEN;
}
