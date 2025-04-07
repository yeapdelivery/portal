import * as Sentry from "@sentry/nextjs";
import { LogContext, LoggerPlugin } from "./logger-types.provider";
import { useUser } from "@/modules/app/store/user";

export class SentryLogger implements LoggerPlugin {
  getUser() {
    const user = useUser.getState().user;

    return user
      ? {
          id: user.id,
          email: user.email,
          username: user.name,
        }
      : undefined;
  }

  info(message: string, context?: LogContext): void {
    Sentry.captureMessage(message, {
      level: "info",
      extra: context,
      user: context?.user || this.getUser(),
    });
  }

  warn(message: string, context?: LogContext): void {
    Sentry.captureMessage(message, {
      level: "warning",
      extra: context,
      user: context?.user || this.getUser(),
    });
  }

  error(message: string, context?: LogContext, error?: Error): void {
    Sentry.captureMessage(message, {
      level: "error",
      extra: context,
      contexts: {
        error: {
          name: error?.name,
          message: error?.message,
          stack: error?.stack,
        },
      },
      user: context?.user || this.getUser(),
    });
  }

  fatal(message: string, context?: LogContext): void {
    Sentry.captureMessage(message, {
      level: "fatal",
      extra: context,
      user: context?.user || this.getUser(),
    });
  }
}
