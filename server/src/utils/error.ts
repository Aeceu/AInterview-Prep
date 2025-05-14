enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT_ERROR = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export class AppError extends Error {
  statusCode: HttpStatus;
  isOperational: boolean;

  constructor(message: string, statusCode: HttpStatus) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Not found error
export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
// Bad request errror
export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

// Conflict error
export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT_ERROR);
  }
}

// Unauthorized error
export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
