export function getTimingStringFromTimingNoOfSlot(timingNo){
    let time = ""
    switch (timingNo) {
      case 1:
        time = "09:40-10:25"
        break;
      case 2:
        time = "10:30-11:15"
        break;
      case 3:
        time = "11:20-12:05"
        break;
      case 4:
        time = "12:10-12:55"
        break;
      case 5:
        time = "02:00-2:45"
        break;
      default:
        return ""
    }
    return time
  }

  export const getCurrentDateString = ()=>{
    let yourDate = new Date()
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
        const stringDate = yourDate.toISOString().split('T')[0]
        return stringDate
  }