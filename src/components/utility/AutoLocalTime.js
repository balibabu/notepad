export default function convertUtcToLocal(utcTimeString, targetTimeZone) {
    const utcDate = new Date(utcTimeString);
    const localDateString = utcDate.toLocaleString('en-US', { timeZone: targetTimeZone });
    const localDate = new Date(localDateString);
    const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
    
      const formattedLocalDate = localDate.toLocaleString('en-US', options);
    return formattedLocalDate;
}