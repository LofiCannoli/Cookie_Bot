export function formatTime(miliseconds){
  let formatedTime = ''

  const msInHour = 3600000;
  const hours = Math.trunc(miliseconds/ msInHour);

  if (hours > 0) {
    formatedTime += `${hours}h `
    miliseconds -= hours * msInHour
  }

  const msInMin = 60000;
  const minutes = Math.trunc(miliseconds/ msInMin);
  if (minutes > 0){
    formatedTime += `${minutes}m`;
  }

  return formatedTime
}
