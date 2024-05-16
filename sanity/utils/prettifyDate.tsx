export function convertMonthToString(date: string) {
  switch (date) {
    case '01':
      return 'januar';
    case '02':
      return 'februar';
    case '03':
      return 'mars';
    case '04':
      return 'april';
    case '05':
      return 'mai';
    case '06':
      return 'juni';
    case '07':
      return 'juli';
    case '08':
      return 'august';
    case '09':
      return 'september';
    case '10':
      return 'oktober';
    case '11':
      return 'november';
    case '12':
      return 'desember';
    default:
      return 'ukjent';
  }
}

export function prettifyDateTime(date: string) {
  if (!date) {
    return '';
  }
  const dateAndTime = date.split('T');
  const dateArray = dateAndTime[0]?.split('-');
  const timeArray = dateAndTime[1]?.split(':');
  const formatedDay = dateArray[2]?.replace(/^0+/, '');
  const formatedDate = `${formatedDay}. ${convertMonthToString(dateArray[1])} ${dateArray[0]}`;
  const formatedTime = `${timeArray[0]}:${timeArray[1]}`;
  const formatedTimeArray = formatedTime.split(':');
  const formatedTimeHour = parseInt(formatedTimeArray[0], 10) + 1;
  const formatedTimeMinutes = formatedTimeArray[1];
  const newformatedTime = `${formatedTimeHour}:${formatedTimeMinutes}`;
  const formatedDateAndTime = `${formatedDate} kl. ${newformatedTime}`;
  return formatedDateAndTime;
}

export function prettifyDateNumbers(date: string) {
  if (!date) {
    return '';
  }
  const dateAndTime = date.split('T');
  const dateArray = dateAndTime[0].split('-');
  const formatedDate = `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`;
  return formatedDate;
}

export function prettifyDateYear(date: string) {
  if (!date) {
    return '';
  }
  const month = convertMonthToString(date.slice(5, -3));
  const day = date.slice(8);
  const formatedDate = `${day}. ${month}`;
  return formatedDate;
}

export default prettifyDateTime;
