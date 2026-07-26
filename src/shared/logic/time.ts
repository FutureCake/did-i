
export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function formatTimePassedSince(passedTime: number): string {
    if (passedTime < MINUTE) {
        const seconds = Math.floor(passedTime / SECOND);
        return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
    if (passedTime < HOUR) {
        const minutes = Math.floor(passedTime / MINUTE);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }
    if (passedTime < DAY) {
        const hours = Math.floor(passedTime / HOUR);
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    return ""
}

export function formatDateTime(ISOString: string): string {
    const d = new Date(ISOString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `On ${day}/${month}/${year} at ${hours}:${minutes}`;
}

export function timePassedSince(ISOString: string): number {
    const date = new Date(ISOString);
    const now = new Date();
    return now.getTime() - date.getTime();
}