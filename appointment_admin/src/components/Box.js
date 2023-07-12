import { useState } from 'react'
import styled from 'styled-components'
import { useContext } from 'react'
import { SlotStatusContext } from '../context/SlotStatusContext'
import { Tooltip } from 'antd'
import { useEffect } from 'react'
import { CgUnavailable } from 'react-icons/cg'
const BoxContainer = styled.div`
    max-width: 100px;
    height: 70px;
    margin: 10px;
    padding: 10px;
    display:flex;
    align-items: center;
    justify-content: center;
    background-color:  ${props => props.unavailable ? "#DEE2E6" : (props.booked ? "#6C757D" : (props.active ? "#ef233c" : (props.bulkActive ? "#d38200" : "#DEE2E6")))};
    margin: 8px;
    border-radius: 8px;
    border-style: solid;
    border-color: #DEE2E6;
    border-width: 1px;
    cursor: ${props => props.booked || props.disable || props.unavailable ? "not-allowed" : "pointer"};
    transition: ease background-color 250ms;
    &:hover {
    transform: ${props => props.unavailable == true ? "scale(1)" : "scale(0.98)"}
  } 
`
const Text = styled.p``

const Hr = styled.hr`

`

const Box = ({ slot, studioUnavailable }) => {
    const [active, setActive] = useState(false)
    const { bookedSlots, activeId, handleSlotActive, disableSlots, unCheckSlotActive, dateString, loading, bulkIdsActive, bulkOn } = useContext(SlotStatusContext)
    const handleClick = (slotId) => {

        if (!bookedSlots.includes(slot.id) && !disableSlots.includes(slotId) && !bulkOn) {
            if (activeId === slotId) {
                setActive(prev => !prev)
                unCheckSlotActive()
            } else if (!bulkOn) {
                setActive(prev => !prev)
                handleSlotActive(slotId)
            }
        }
    }
    useEffect(() => {
        setActive(false)
    }, [dateString, loading])
    useEffect(() => {
        if (bulkOn == true) {
            setActive(false)
        }
    }, [bulkOn])
    // // console.log(unavailableStudios)
    // const [unavailable, setUnavailable] = useState(undefined)
    // console.log(unavailableStudios)
    // useEffect(() => {
    //     setUnavailable(unavailableStudios?.filter(item => {
    //         if (item?._id == Math.floor(slot.id / 10))
    //             return item
    //     })[0]?.activeStatus)
    // }, [])
    // console.log(unavailable)
    return (
        <Tooltip title={bookedSlots.includes(slot.id) ? "booked" : (disableSlots.includes(slot.id) ? "unselect previous" : null)} color={bookedSlots.includes(slot.id) ? "cyan" : "red"}>
            <BoxContainer active={active} onClick={() => handleClick(slot.id)} booked={bookedSlots.includes(slot.id)} disable={disableSlots.includes(slot.id)} bulkActive={bulkIdsActive.includes(slot.id)} unavailable={studioUnavailable}>
                {studioUnavailable === true ? <CgUnavailable size={50} color='#aaaaaa' /> : <Text>{slot.time}</Text>}
            </BoxContainer>
        </Tooltip>
    )
}

export default Box