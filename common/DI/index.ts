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
    }
  }

  return result as ProviderMap<TMap>;
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
    }
  }

  return result as ResultList<TList>;
};

export const provide = <InjectionType>(token: InjectionToken<InjectionType>, value: InjectionType): void => {
  container[token.id] = value;
};
