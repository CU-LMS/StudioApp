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
    const { bookedSlots,activeId,handleSlotActive,disableSlots,unCheckSlotActive,dateString,loading} = useContext(SlotStatusContext)
    const handleClick = (slotId) => {
        if (!bookedSlots.includes(slot.id) && !disableSlots.includes(slotId)) {
            if(activeId === slotId){
            setActive(prev => !prev)
            unCheckSlotActive()
            }else{
                setActive(prev=>!prev)
                handleSlotActive(slotId)
            }
        } 
    }
    useEffect(()=>{
         setActive(false)
    },[dateString,loading])
    return (
        <Tooltip title={bookedSlots.includes(slot.id)?"booked": (disableSlots.includes(slot.id)?"unselect previous":null)} color={bookedSlots.includes(slot.id)?"cyan":"red"}>
        <BoxContainer active={active} onClick={() => handleClick(slot.id)} booked={bookedSlots.includes(slot.id)} disable={disableSlots.includes(slot.id)}>
            <Text>{slot.time}</Text>
        </BoxContainer>
        </Tooltip>
    )
}

export default Box