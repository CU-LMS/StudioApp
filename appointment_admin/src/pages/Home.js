import Navbar from '../components/Navbar';
import DatesPicker from '../components/Date';
import Slot from '../components/Slot';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { slotStatuses } from '../context/apiCalls';
import { useContext } from 'react';
import { SlotStatusContext } from '../context/SlotStatusContext';

const ParentContainer = styled.div`
    display: flex;
`
const OuterContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    /* background: -webkit-radial-gradient(circle, hsla(355, 77%, 52%, 1) 0%, hsla(210, 100%,13%,1) 85%); */
    background: hsla(355, 77%, 52%, 1);
    background: radial-gradient(circle, hsla(355, 77%, 52%, 1) 0%, #002142 85%);
    background: -webkit-radial-gradient(circle, hsla(355, 77%,52%,1)0%);
`
const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
`
const Home = () => {
    const { dispatch } = useContext(SlotStatusContext)
    const [datePickerOpen, setDatePickerOpen] = useState(true)
    useEffect(() => {
        let yourDate = new Date()
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
        const stringDate = yourDate.toISOString().split('T')[0]
        slotStatuses(dispatch, stringDate)
    }, [dispatch])


    return (
        <ParentContainer>
            <Sidebar />
            <OuterContainer>
                <Navbar />
                <Container>
                    <DatesPicker datePickerOpen={datePickerOpen} />
                    <Slot setDatePickerOpen={setDatePickerOpen} />
                </Container>
            </OuterContainer>
        </ParentContainer>
    )
}
export default Home