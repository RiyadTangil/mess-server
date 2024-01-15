"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(statusCode, message, stack = '') {
        super(message); // Calls the constructor of the superclass (Error) with the provided message. This sets the error message for the ApiError instance.
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else { //If no stack is provided, it uses Error.captureStackTrace(static method of the Error object in Node.js) to capture the current stack trace for the instance.
            Error.captureStackTrace(this, this.constructor); //This,allows you to set properties specific to each instance.
            // this.constructor It can be useful for accessing or referencing properties or methods of the class itself.
        }
    }
}
exports.default = ApiError;
