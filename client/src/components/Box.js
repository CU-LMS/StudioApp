import { useState } from 'react'
import styled from 'styled-components'
import { useContext } from 'react'
import { SlotStatusContext } from '../context/SlotStatusContext'
import { Tooltip } from 'antd'
import { useEffect } from 'react'
const BoxContainer = styled.div`
    width: 100px;
    height: 70px;
    margin: 10px;
    padding: 10px;
    display:flex;
    align-items: center;
    justify-content: center;
    background-color:  ${props => props.booked ? "#6C757D" : (props.active ? "#ef233c" : "#DEE2E6")};
    margin: 8px;
    border-radius: 8px;
    border-style: solid;
    border-color: #DEE2E6;
    border-width: 1px;
    cursor: ${props => props.booked || props.disable? "not-allowed" : "pointer"};
    transition: ease background-color 250ms;
    &:hover {
    transform: scale(0.92)
  } 
`
const Text = styled.p``
const Box = ({ slot }) => {
    const [active, setActive] = useState(false)
    const { bookedSlots,activeIds,handleSlotActive,disableSlots,unCheckSlotActive,dateString,loading,setTimingNo} = useContext(SlotStatusContext)
    const handleClick = (slotIds) => {
        if (!slot.ids.every(ae=>bookedSlots.includes(ae)) && !slot.ids.every(ae=>disableSlots.includes(ae))) {
            if(slot.ids.every(ae=>activeIds.includes(ae))){
            setActive(prev => !prev)
            unCheckSlotActive()
            }else{
                setActive(prev=>!prev)
                handleSlotActive(slotIds)
                setTimingNo(slot.timingNo)
            }
        } 
    }
    useEffect(()=>{
         setActive(false)
    },[dateString,loading])
    return (
        //arr1.some( ai => arr2.includes(ai) );  arr2 include atleast one element of arr1
        //arr1.every( ai => arr2.includes(ai) ); arr2 include every element of arr1
        <Tooltip title={slot.ids.every(ae=>bookedSlots.includes(ae))?"booked": (slot.ids.every(ae=>disableSlots.includes(ae))?"unselect previous":null)} color={slot.ids.every(ae=>bookedSlots.includes(ae))?"cyan":"red"}>
        <BoxContainer active={active} onClick={() => handleClick(slot.ids)} booked={slot.ids.every(ae=>bookedSlots.includes(ae))} disable={slot.ids.every(ae=>disableSlots.includes(ae))}>
            <Text>{slot.time}</Text>
        </BoxContainer>
        </Tooltip>
    )
}

export default Box