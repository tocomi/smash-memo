export const getTodayDate = () => {
  const now = new Date()
  return now.getFullYear() + '/' + addZeroForDate(now.getMonth() + 1) + '/' + addZeroForDate(now.getDate())
}

const addZeroForDate = (number) => {
  return ('00' + number).slice(-2)
}