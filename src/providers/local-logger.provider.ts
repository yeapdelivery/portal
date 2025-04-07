import { LogContext, LoggerPlugin } from "./logger-types.provider";

export class LocalLogger implements LoggerPlugin {
  info(message: string, context?: LogContext | undefined): void {
    console.log("[LocalLogger]", message, context);
  }

  warn(
    message: string,
    context?: LogContext | undefined,
    error?: Error | undefined
  ): void {
    console.warn("[LocalLogger]", message, context, error);
  }

  error(
    message: string,
    context?: LogContext | undefined,
    error?: Error | undefined
  ): void {
    console.error("[LocalLogger]", message, context, error);
  }

  fatal(message: string, context?: LogContext): void {
    console.error("[LocalLogger]", message, context);
  }
}
