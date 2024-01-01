function getTimeString(time) {
  const d = new Date(0)
  d.setMilliseconds(time * 1000)
  return d.toLocaleString(`en-US`, {
    fractionalSecondDigits: 3,
    hour:                   `2-digit`,
    hourCycle:              `h23`,
    minute:                 `2-digit`,
    second:                 `2-digit`,
    timeZone:               `UTC`,
  }).split(` `)[0]
}

export default function createTimespan(startTime, endTime) {

  if (!(startTime ?? endTime)) return ``

  return `<p class=timespan>`
  + `<time class=start-time datetime='${ getTimeString(startTime) }'>`
  + `${ startTime }</time>`
  + `\u2013` // \u2013 = en dash
  + `<time class=end-time datetime='${ getTimeString(endTime) }'>`
  + `${ endTime }</time>`
  + `</p>`

}
