export default function resolveTokens<TokensObj extends Record<string, any>, Props = void>(
    tokens: TokensObj,
    key: keyof TokensObj,
    props?: Props
): Partial<TokensObj[keyof TokensObj]> {
    const value = tokens[key];
    if (typeof value === "function") {
        return value(props);
    }
    return value ?? {};
}