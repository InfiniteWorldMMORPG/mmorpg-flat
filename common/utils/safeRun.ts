export const safe = <TFn extends (...args: any) => any>(fn: TFn, ...args: Parameters<TFn>): ReturnType<TFn> | Error => {
  try {
    return fn(...args);
  } catch (error) {
    if (error instanceof Error) return error;

    return new Error(`Error in ${fn.name} with message "${String(error)}"`);
  }
};

export const safeAsync = async <TFn extends (...args: any) => Promise<any>>(fn: TFn, ...args: Parameters<TFn>): Promise<Awaited<ReturnType<TFn>> | Error> => {
  try {
    return await fn(...args);
  } catch (error) {
    if (error instanceof Error) return error;

    return new Error(`Error in ${fn.name} with message "${String(error)}"`);
  }
};

export const safeWrap = <TFn extends (...args: any) => any>(fn: TFn) => {
  return (...args: Parameters<TFn>): ReturnType<TFn> | Error => {
    try {
      return fn(...args);
    } catch (error) {
      if (error instanceof Error) return error;

      return new Error(`Error in ${fn.name} with message "${String(error)}`);
    }
  };
};

export const safeWrapAsync = <TFn extends (...args: any) => Promise<any>>(fn: TFn) => {
  return async (...args: Parameters<TFn>): Promise<Awaited<ReturnType<TFn>> | Error> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof Error) return error;

      return new Error(`Error in ${fn.name} with message "${String(error)}`);
    }
  };
};