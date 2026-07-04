
export function randomHexColor(vibrance: number = 0): string {
    const v = Math.max(0, Math.min(1, vibrance));
    const minSaturation = v;
    const saturation = minSaturation + (1 - minSaturation) * Math.random();

    const hue = Math.random() * 360;
    const lightness = 0.4 + Math.random() * 0.2;

    const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = lightness - c / 2;

    let r: number, g: number, b: number;

    if (hue < 60) { r = c; g = x; b = 0; }
    else if (hue < 120) { r = x; g = c; b = 0; }
    else if (hue < 180) { r = 0; g = c; b = x; }
    else if (hue < 240) { r = 0; g = x; b = c; }
    else if (hue < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }

    const toHex = (n: number) =>
        Math.round((n + m) * 255).toString(16).padStart(2, '0');

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}