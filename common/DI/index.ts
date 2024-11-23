const container: Record<string | symbol, unknown> = {};

export interface InjectionToken<TProvider = unknown> {
  id: string | symbol;
  guard(value: unknown): value is TProvider;
}

export const inject = <InjectionType>(token: InjectionToken<InjectionType>): InjectionType | never => {
  if (token.id in container) {
    const provider = container[token.id];
    if (token.guard(provider)) return provider;
    throw new Error('Token or provider is invalid!');
  }

  throw new Error('Token is not registered!');
};

type TokenMap = Readonly<Record<string, InjectionToken<unknown>>>;

type ProviderMap<T extends TokenMap> = {
  [K in keyof T]: T[K] extends InjectionToken<infer TProvider> ? TProvider : never;
}

export const injectMap = <const TMap extends TokenMap>(tokenMap: TMap): ProviderMap<TMap> => {
  const result: Record<string, unknown> = {};

  for (const [key, token] of Object.entries(tokenMap)) {
    if (token.id in container) {
      const provider = container[token.id];
      if (token.guard(provider)) result[key] = provider;
    } else {
      console.log('WARNING! Token is not registered!', token, '\n', new Error().stack);
    }
  }

  return result as ProviderMap<TMap>;
};

// type TokenMap = Readonly<Record<string, InjectionToken<unknown>>>;

type LazyProviderMap<T extends TokenMap> = {
  [K in keyof T]: T[K] extends InjectionToken<infer TProvider> ? () => TProvider : never;
}

export const injectMapLazy = <const TMap extends TokenMap>(tokenMap: TMap): LazyProviderMap<TMap> => {
  const result: Record<string, () => unknown> = {};

  for (const [key, token] of Object.entries(tokenMap)) {
    result[key] = () => {
      if (token.id in container) {
        const provider = container[token.id];
        if (token.guard(provider)) return provider;
      } else {
        console.log('WARNING! Token is not registered!', token, '\n', new Error().stack);
        return null;
      }
    }
  }

  return result as LazyProviderMap<TMap>;
};

type TokenList = ReadonlyArray<InjectionToken<unknown>>;

type ResultList<T extends TokenList> = Readonly<{
  [K in keyof T]: T[K] extends InjectionToken<infer TProvider> ? TProvider : never;
}>

export const injectList = <const TList extends TokenList>(tokenList: TList): ResultList<TList> => {
  const result: unknown[] = [];

  for (let index = 0; index < tokenList.length; index += 1) {
    const token = tokenList[index];
    if (token.id in container) {
      const provider = container[token.id];
      if (token.guard(provider)) result[index] = provider;
    } else {
      console.log('WARNING! Token is not registered!', token, '\n', new Error().stack);
    }
  }

  return result as ResultList<TList>;
};

type LazyResultList<T extends TokenList> = Readonly<{
  [K in keyof T]: T[K] extends InjectionToken<infer TProvider> ? TProvider : never;
}>

export const injectListLazy = <const TList extends TokenList>(tokenList: TList): LazyResultList<TList> => {
  const result: Array<() => unknown> = [];

  for (let index = 0; index < tokenList.length; index += 1) {
    result[index] = () => {
      const token = tokenList[index];
      if (token.id in container) {
        const provider = container[token.id];
        if (token.guard(provider)) return provider;
      } else {
        console.log('WARNING! Token is not registered!', token, '\n', new Error().stack);
        return null;
      }
    };
  }

  return result as LazyResultList<TList>;
};

export const provide = <InjectionType>(token: InjectionToken<InjectionType>, value: InjectionType): void => {
  container[token.id] = value;
};
