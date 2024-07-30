// Type guard to check if an error is an instance of Error
export function isError(error: unknown): error is Error {
  return error instanceof Error;
}
