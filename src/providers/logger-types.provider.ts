type UnknownKeys = Record<string, unknown> | undefined;

export type LogContext = UnknownKeys & {
  user?: {
    id?: string | number;
    ip_address?: string;
    email?: string;
    username?: string;
  };
};

export interface LoggerPlugin {
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, context?: LogContext): void;
  fatal(message: string, context?: LogContext): void;
}
