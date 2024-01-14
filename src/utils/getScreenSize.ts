import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const fullTailwindConfig = resolveConfig(tailwindConfig);

export function getScreenSize(
  screen: "sm" | "md" | "lg" | "xl" | "2xl"
): number {
  return Number(fullTailwindConfig.theme.screens[screen].replace("px", ""));
}
