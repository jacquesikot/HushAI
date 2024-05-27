import { format, isToday, isYesterday, parseISO } from 'date-fns';

function getFormattedTime(isoTime: string): string {
  const messageDate = parseISO(isoTime);
  const now = new Date();
  // Check if the date is the same as today

  if (isToday(messageDate)) {
    // Format to "Today h:mma"
    return `Today ${format(messageDate, 'h:mma')}`;
  }

  // Check if the date is the same as yesterday
  if (isYesterday(messageDate)) {
    // Format to "Yesterday h:mma"
    return `Yesterday ${format(messageDate, 'h:mma')}`;
  }

  // Check if the date is within the last 7 days
  const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));

  if (messageDate >= sevenDaysAgo) {
    // Format to "EEEE h:mma" (day of the week)
    return format(messageDate, 'EEEE h:mma');
  }

  // Default: older than 7 days, just show "MMM d, h:mma"
  return format(messageDate, 'MMM d, h:mma');
}

export default getFormattedTime;
