export function localDateStringToDDMMYYYY(localDateString) {
    // Convert the local date string to a Date object.
    const localDate = new Date(localDateString)
  
    // Get the day, month, and year from the Date object.
    let day = localDate.getDate();
    let month = localDate.getMonth() + 1;
    let year = localDate.getFullYear();
  
    // Add leading zeros to the day and month digits if they are less than 10.
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
  
    // Return the date in DD/MM/YYYY format.
    return day + "/" + month + "/" + year;
  }

export function todayDateStringToSendToBackend(){
    let yourDate = new Date()
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
    const stringDate = yourDate.toISOString().split('T')[0]
    return stringDate
}

export function getTimingStringFromTimingNoOfSlot(timingNo){
  let time = ""
  switch (timingNo) {
    case 1:
      time = "10:00-10:45"
      break;
    case 2:
      time = "11:00-11:45"
      break;
    case 3:
      time = "12:00-12:45"
      break;
    case 4:
      time = "02:00-02:45"
      break;
    case 5:
      time = "03:00-3:45"
      break;
    default:
      return ""
  }
  return time
}