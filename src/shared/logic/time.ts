
export function formatISODate(ISOString: string): string {
    const date = new Date(ISOString);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes >= 0 && diffMinutes < 60) {
        const minuteLabel = diffMinutes === 1 ? 'minute' : 'minutes';
        return `${diffMinutes} ${minuteLabel} ago`;
    }

    const isSameDay =
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
        date.getFullYear() === yesterday.getFullYear() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getDate() === yesterday.getDate();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const timePart = `${hours}:${minutes}`;

    if (isSameDay) {
        return `Today at ${timePart}`;
    }

    if (isYesterday) {
        return `Yesterday at ${timePart}`;
    }

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayDiff = Math.max(
        1,
        Math.floor((startOfToday.getTime() - startOfDate.getTime()) / (1000 * 60 * 60 * 24)),
    );
    const dayLabel = dayDiff === 1 ? 'day' : 'days';

    return `${dayDiff} ${dayLabel} ago`;
}