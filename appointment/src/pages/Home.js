import Navbar from '../components/Navbar';
import DatesPicker from '../components/Date';
import Slot from '../components/Slot';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { slotStatuses, slotStatusesWithType } from '../context/apiCalls';
import { useContext } from 'react';
import { SlotStatusContext } from '../context/SlotStatusContext';
import { Radio, Space } from 'antd';
const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
`
const RadioContainer = styled.div`
    justify-content: center;
    align-items: center;
    margin-top: 150px;
`
const Card = styled.div`
    display: flex;
    margin-top: 120px;
    background-color: lightgrey;
    padding: 10px;
    border-radius: 10px;
    align-items: center;
`
const Colors = styled.ul`
    list-style: none;
    margin: 8px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`
const Color = styled.li`
    display: flex;
    align-items: center;
    font-size: 14px;
`
const ColorIndicator = styled.div`
    height: 18px;
    width: 18px;
    border-radius: 50%;
    margin-right:10px;
    background-color: ${props => props.type == "available" ? "#DEE2E6" : (props.type == 'selected' ? "#ef233c" : (props.type == 'booked' ? "#6C757D" : (props.type == 'selectedBooked' ? '#A020F0' : null)))};
`
const Type = styled.ul`
    list-style: none;
`
const Des = styled.li`
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
                    <Radio.Group onChange={onChange} value={slotType} size='large' style={{backgroundColor: "lightgrey", padding: '10px', borderRadius: '10px'}}>
                        <Space direction='vertical' style={{margin: '8px', padding: '8px'}}>
                            <Radio value='theory'>Theory</Radio>
                            <Radio value='numerical'>Numerical</Radio>
                        </Space>
                    </Radio.Group>
                    <Card>
                        <Colors>
                            <Color ><ColorIndicator type='available' />Available</Color>
                            <Color ><ColorIndicator type='booked' />Booked</Color>
                            <Color ><ColorIndicator type='selected' />Selected</Color>
                            <Color ><ColorIndicator type='selectedBooked' />Selected Booked</Color>
                        </Colors>
                    </Card>
                </RadioContainer>
                <Slot setDatePickerOpen={setDatePickerOpen} slotType={slotType} setSlotType={setSlotType} />
            </Container>
        </>
    )
}

export default Home