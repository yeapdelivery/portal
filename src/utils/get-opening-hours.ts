import { OpeningHours } from "@/modules/app/models/store";

export function availableHasOpeningHour(openingHours: OpeningHours): boolean {
  const available = Object.keys(openingHours).map((key, index) => {
    if (!openingHours[key]) {
      return true;
    }

    const { openHour, closeHour } = openingHours[key];

    if (!openHour || !closeHour) {
      return true;
    }

    const open = Number(openHour.replace(":", "."));
    const close = Number(closeHour.replace(":", "."));

    const notNumber = typeof open !== "number" && typeof close !== "number";

    if (notNumber && !open && close) {
      return false;
    }

    if (notNumber && open && !close) {
      return false;
    }

    return true;
  });

  return !available.includes(false);
}

export function availableOpeningHour(openingHours: OpeningHours): boolean {
  const available = Object.keys(openingHours).map((key) => {
    if (!openingHours[key]) {
      return true;
    }

    const { openHour, closeHour } = openingHours[key];

    if (!openHour && !closeHour) {
      return true;
    }

    if (!openHour || !closeHour) {
      return false;
    }

    const open = Number(openHour.replace(":", "."));
    const close = Number(closeHour?.replace(":", "."));

    if (open >= close) {
      return false;
    }

    return true;
  });

  return !available.includes(false);
}
