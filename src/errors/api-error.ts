class ApiError extends Error {
  public statusCode;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ApiError;
