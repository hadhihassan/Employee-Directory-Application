export function tryCatch<T extends (...args: any[]) => Promise<any>>(fn: T) {
  return async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (err) {
      // rethrow AppError for Apollo to handle; otherwise wrap as AppError
      if (err instanceof Error) throw err;
      throw new Error('Unexpected error');
    }
  };
}

