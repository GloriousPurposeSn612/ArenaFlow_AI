/**
 * ArenaFlow AI - Simple Logger Utility
 * Centralizes logging for consistent formatting across the application.
 */
class Logger {
    constructor() {
        this.level = process.env.LOG_LEVEL || 'info';
    }

    info(context, message, data = {}) {
        this._log('INFO', context, message, data);
    }

    warn(context, message, data = {}) {
        this._log('WARN', context, message, data);
    }

    error(context, message, error = null) {
        let details = error ? (error.message || error) : '';
        this._log('ERROR', context, `${message} ${details}`, error && error.stack ? error.stack : {});
    }

    _log(level, context, message, details) {
        const timestamp = new Date().toISOString();
        const output = `[${timestamp}] [${level}] [${context}] ${message}`;
        
        if (level === 'ERROR') {
            console.error(output, Object.keys(details).length ? details : '');
        } else if (level === 'WARN') {
            console.warn(output, Object.keys(details).length ? details : '');
        } else {
            console.log(output, Object.keys(details).length ? details : '');
        }
    }
}

module.exports = new Logger();
