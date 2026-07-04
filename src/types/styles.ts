
export type UITheme = "dark" | "light";

export type TokenDefintions<V extends string | number | symbol, T, P = void> = Record<V, Partial<T> | ((prop: P) => Partial<T>)>