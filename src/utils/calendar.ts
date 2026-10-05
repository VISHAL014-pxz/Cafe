import { Reservation } from '../types/cafe';

export function downloadCalendarInvite(reservation: Reservation) {
  const [year, month, day] = reservation.date.split('-').map(Number);
  const [hour, minute] = reservation.time.split(':').map(Number);

  const startDate = new Date(year, month - 1, day, hour, minute);
  const endDate = new Date(startDate.getTime() + 90 * 60 * 1000); // 90 min dining slot

  const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Velvet & Stone//Table Reservation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${reservation.confirmationCode}-${Date.now()}@velvetandstone.cafe`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    `SUMMARY:Table Reservation at Velvet & Stone (${reservation.confirmationCode})`,
    `DESCRIPTION:Reservation for ${reservation.partySize} guests under ${reservation.guestName}. Reference: ${reservation.confirmationCode}. Please arrive 5 minutes early.`,
    'LOCATION:Velvet & Stone, 428 Elmwood Promenade, Metropolis',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `velvet-and-stone-${reservation.confirmationCode}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
