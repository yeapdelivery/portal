import { LocalLogger } from "@/providers/local-logger.provider";
import { SentryLogger } from "@/providers/sentry.provider";
import { EnvironmentNameEnum } from "types/enviroment-name.type";

const localLogger = new LocalLogger();
const sentryLogger = new SentryLogger();

export function useLogger(): SentryLogger | LocalLogger {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === EnvironmentNameEnum.PRODUCTION) {
    return sentryLogger;
  }

  return localLogger;
}
