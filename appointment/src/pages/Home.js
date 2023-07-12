import Navbar from '../components/Navbar';
import DatesPicker from '../components/Date';
import Slot from '../components/Slot';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { slotStatuses, slotStatusesWithType } from '../context/apiCalls';
import { useContext } from 'react';
import { SlotStatusContext } from '../context/SlotStatusContext';
import { Radio, Space } from 'antd';
import TypeWriter from 'typewriter-effect'
import CuBackgroud from '../assets/cubackground.jpg'

const OuterContainer = styled.div`
    height: 100vh;
    /* background: hsla(355, 77%, 52%, 1);
    background: radial-gradient(circle, hsla(355, 77%, 52%, 1) 0%, #002142 85%);
    background: -webkit-radial-gradient(circle, hsla(355, 77%,52%,1)0%); */
    background: linear-gradient(rgba(115,115,115,0.89), rgba(115,115,115,0.89)), url("https://images.news18.com/ibnlive/uploads/2022/01/untitled-design-1-1-164371082616x9.jpg") center;
`
const SmallContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    color: #d90429;
    font-size: 25px;
    font-weight: 600;
    letter-spacing: 1.2px;
`
const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
`
const RadioContainer = styled.div`
    justify-content: center;
    align-items: center;
`
const Card = styled.div`
    display: flex;
    margin-top: 80px;
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 10px;
    align-items: center;
    box-shadow: 0px 1px 9px -1px rgba(179,173,179,1);
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
        <OuterContainer>            
        <Navbar />
        <SmallContainer>
            <TypeWriter
                options={{
                    strings: ['Welcome To IDOL Department Studio Reservation System'],
                    autoStart: true,
                    loop: true,
                }}
                />
        </SmallContainer>
            <Container>
                <DatesPicker datePickerOpen={datePickerOpen} />
                <RadioContainer>
                    <Radio.Group onChange={onChange} value={slotType} size='large' style={{ backgroundColor: "#f1f1f1", padding: '10px', borderRadius: '10px',boxShadow: '0px 1px 9px -1px rgba(179,173,179,1)' }}>
                        <Space direction='vertical' style={{ margin: '8px', padding: '8px' }}>
                            <Radio value='theory'>Theory</Radio>
                            <Radio value='numerical'>Numerical</Radio>
                        </Space>
                    </Radio.Group>
                    <Card>
                        <Colors>
                            <Color ><ColorIndicator type='available' />Available</Color>
                            <Color ><ColorIndicator type='booked' />Booked</Color>
                            <Color ><ColorIndicator type='selectedBooked' />In Queue</Color>
                        </Colors>
                    </Card>
                </RadioContainer>
                <Slot setDatePickerOpen={setDatePickerOpen} slotType={slotType} setSlotType={setSlotType} />
            </Container>
        </OuterContainer>

    )
}

export default Home