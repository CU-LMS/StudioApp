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

  export const getCurrentDateString = ()=>{
    let yourDate = new Date()
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
        const stringDate = yourDate.toISOString().split('T')[0]
        return stringDate
  }