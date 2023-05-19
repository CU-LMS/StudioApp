import Navbar from '../components/Navbar';
import DatesPicker from '../components/Date';
import Slot from '../components/Slot';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { slotStatuses, slotStatusesWithType } from '../context/apiCalls';
import { useContext } from 'react';
import { SlotStatusContext } from '../context/SlotStatusContext';
import { Radio,Space } from 'antd';
const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
`
const RadioContainer = styled.div`
    justify-content: center;
    align-items: center;
    margin-top: 150px;
`
const Home = () => {
    const { dispatch } = useContext(SlotStatusContext)
    const [datePickerOpen, setDatePickerOpen] = useState(true)
    const [slotType, setSlotType] = useState("");

    const onChange = (e) => {
        setSlotType(e.target.value);
    };

    // useEffect(() => {
    //     // let yourDate = new Date()
    //     // const offset = yourDate.getTimezoneOffset()
    //     // yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
    //     // const stringDate = yourDate.toISOString().split('T')[0]
    //     // // slotStatuses(dispatch, stringDate)
    //     // slotStatusesWithType(dispatch,stringDate,slotType)
    // }, [slotType,stringDate])
    return (
        <>
            <Navbar />
            <Container>
                <DatesPicker datePickerOpen={datePickerOpen} />
                <RadioContainer>
                <Radio.Group onChange={onChange} value={slotType} size='large'>
                    <Space direction='vertical'>
                    <Radio value='theory'>Theory</Radio>
                    <Radio value='numerical'>Numerical</Radio>
                    </Space>
                </Radio.Group>
                </RadioContainer>
                <Slot setDatePickerOpen={setDatePickerOpen} slotType={slotType} setSlotType={setSlotType}/>
            </Container>
        </>
    )
}

export default Home