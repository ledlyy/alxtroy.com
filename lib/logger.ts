/**
 * Centralized Logger System
 * Logs all application events to files that are automatically committed to GitHub
 * Works in all environments (dev, production, Vercel, etc.)
 */

/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

type LoggerMethod = (...args: unknown[]) => void;

interface Logger {
    info: LoggerMethod;
    warn: LoggerMethod;
    error: LoggerMethod;
    debug: LoggerMethod;
    log: (level: string, ...args: unknown[]) => void;
}

// Noop logger for edge runtime or when winston is not available
const noopLogger: Logger = {
    info: () => { },
    warn: () => { },
    error: () => { },
    debug: () => { },
    log: () => { },
};

let logger: Logger = noopLogger;

// Only initialize logger in Node.js environment
if (typeof window === 'undefined' && typeof process !== 'undefined') {
    try {
        const winston = require('winston');
        const DailyRotateFile = require('winston-daily-rotate-file');
        const path = require('path');
        const fs = require('fs');

        // Ensure logs directory exists
        const logsDir = path.join(process.cwd(), 'logs');
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }

        // Custom format for better readability
        const customFormat = winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.errors({ stack: true }),
            winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
            winston.format.json()
        );

        // Transport for daily rotating files
        const fileRotateTransport = new DailyRotateFile({
            filename: path.join(logsDir, 'app-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '30d', // Keep logs for 30 days
            format: customFormat,
        });

        // Separate error log
        const errorRotateTransport = new DailyRotateFile({
            filename: path.join(logsDir, 'error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            level: 'error',
            maxSize: '20m',
            maxFiles: '30d',
            format: customFormat,
        });

        // Console transport for development
        const consoleTransport = new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        });

        // Create logger instance
        logger = winston.createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: customFormat,
            transports: [
                fileRotateTransport,
                errorRotateTransport,
                // Only log to console in development
                ...(process.env.NODE_ENV !== 'production' ? [consoleTransport] : []),
            ],
            // Prevent crashes from logger errors
            exitOnError: false,
        });

        // Add system info to first log
        logger.info('Logger initialized', {
            environment: process.env.NODE_ENV,
            nodeVersion: process.version,
            platform: process.platform,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Failed to initialize logger:', error);
        logger = noopLogger;
    }
}

/**
 * Log HTTP request
 */
export function logRequest(req: {
    method: string;
    url: string;
    headers?: Record<string, string | string[] | undefined>;
    ip?: string;
}) {
    try {
        logger.info('HTTP Request', {
            type: 'request',
            method: req.method,
            url: req.url,
            ip: req.ip || 'unknown',
            userAgent: req.headers?.['user-agent'],
        });
    } catch (error) {
        console.error('Failed to log request:', error);
    }
}

/**
 * Log HTTP response
 */
export function logResponse(req: { method: string; url: string }, res: { status: number }, duration: number) {
    try {
        const level = res.status >= 500 ? 'error' : res.status >= 400 ? 'warn' : 'info';
        logger.log(level, 'HTTP Response', {
            type: 'response',
            method: req.method,
            url: req.url,
            status: res.status,
            duration: `${duration}ms`,
        });
    } catch (error) {
        console.error('Failed to log response:', error);
    }
}

/**
 * Log errors with full stack trace
 */
export function logError(error: Error | string, context?: Record<string, unknown>) {
    try {
        if (typeof error === 'string') {
            logger.error(error, context);
        } else {
            logger.error(error.message, {
                error: {
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                },
                ...context,
            });
        }
    } catch (err) {
        console.error('Failed to log error:', err);
    }
}

/**
 * Log business events (form submissions, analytics, etc.)
 */
export function logEvent(event: string, data?: Record<string, unknown>) {
    try {
        logger.info('Event', {
            type: 'event',
            event,
            ...data,
        });
    } catch (error) {
        console.error('Failed to log event:', error);
    }
}

/**
 * Log database operations (for future use)
 */
export function logDatabase(operation: string, query?: string, duration?: number) {
    try {
        logger.info('Database Operation', {
            type: 'database',
            operation,
            query,
            duration: duration ? `${duration}ms` : undefined,
        });
    } catch (error) {
        console.error('Failed to log database operation:', error);
    }
}

/**
 * Log authentication events
 */
export function logAuth(action: string, userId?: string, success: boolean = true) {
    try {
        logger.info('Authentication', {
            type: 'auth',
            action,
            userId,
            success,
        });
    } catch (error) {
        console.error('Failed to log auth event:', error);
    }
}

/**
 * Log performance metrics
 */
export function logPerformance(metric: string, value: number, unit: string = 'ms') {
    try {
        logger.info('Performance', {
            type: 'performance',
            metric,
            value,
            unit,
        });
    } catch (error) {
        console.error('Failed to log performance metric:', error);
    }
}

/* eslint-enable @typescript-eslint/no-require-imports */
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
/* eslint-enable @typescript-eslint/no-unsafe-call */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */

export { logger };
