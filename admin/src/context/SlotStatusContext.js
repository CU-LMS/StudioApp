import { createContext, useReducer } from "react";
import { useState } from "react";

const INITIAL_STATE = {
    bookedSlots: [],
    loading: false,
    error: null,
};
const SLOT_NO_LIST = [
    11,12,13,14,21,22,23,24,31,32,33,34,41,42,43,44
]
export const SlotStatusContext = createContext(INITIAL_STATE);

const SlotStatusReducer = (state, action) => {
    switch (action.type) {
        case "GET_STATUS_START":
            return {
                bookedSlots: [],
                loading: true,
                error: null,
            };
        case "GET_STATUS_SUCCESS":
            return {
                bookedSlots: action.payload,
                loading: false,
                error: null,
            };
        case "GET_STATUS_FAILURE":
            return {
                bookedSlots: [],
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const SlotStatusContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SlotStatusReducer, INITIAL_STATE);
    const [activeId,setActiveId] = useState(null)
    const [disableSlots,setDisableSlots] = useState([])
    const [dateString,setDateString] = useState(()=>{
        let yourDate = new Date()
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
        const stringDate = yourDate.toISOString().split('T')[0]
        return stringDate
    })
    const handleSlotActive = (slotId)=>{
        setActiveId(slotId)
        //disable others except the given slotId
        disableOthers(slotId)
    }
    const disableOthers = (slotId)=>{
        //disable others except the slotId given in arguments
        const list = SLOT_NO_LIST.filter((slotNo)=>{
          return slotNo !==slotId
        })
        setDisableSlots(list)
    }
    const unCheckSlotActive = ()=>{
        setDisableSlots([])
        setActiveId(null)
    }
    return (
        <SlotStatusContext.Provider
            value={{
                bookedSlots: state.bookedSlots,
                loading: state.loading,
                error: state.error,
                dispatch,
                activeId,
                handleSlotActive,
                disableSlots,
                unCheckSlotActive,
                setDateString,
                dateString,
            }}
        >
            {children}
        </SlotStatusContext.Provider>
    );
};
