
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        // NEW: Set error name for better debugging — "ApiError" shows up in logs
        // instead of generic "Error", making it easier to trace issues
        this.name = this.constructor.name

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
    }

export default ApiError ;