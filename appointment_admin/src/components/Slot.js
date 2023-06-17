
import styled from 'styled-components'
import Column from './Column'
import { data } from '../data'
import { useReducer, useState } from 'react'
import { userRequest } from '../requestMethods'
import { useContext } from 'react'
import { SlotStatusContext } from '../context/SlotStatusContext'
import { Modal, Result, Spin, message, Radio, Alert } from 'antd'
import { slotStatuses } from '../context/apiCalls'
import { ACTION_TYPE, INITIAL_STATE_SLOT_REDUCER, bookingReducer } from '../reducers/slotBookingReducer'
import { AuthContext } from '../context/AuthContext'
import { LoadingOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
const OuterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Container = styled.div`
    width: 40vw;
    height: 70vh;
    margin: 20px;
    padding: 20px;
    /* background-color: green; */
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    /* border-color: grey; */
    /* border-style: solid; */
    border-width: 1px;
    box-shadow: 0px 1px 9px -1px rgba(179,173,179,1);
`
const Studio = styled.div`
    height: 10vh;
    margin: 8px;
    display: flex;
    justify-content: space-between;
    border-bottom: solid;
    border-color: rgba(179,173,179,1);
    border-width: 1px;
    align-items: center;
`
const Slots = styled.div`
display: flex;
`
const Name = styled.p`
    font-weight: bold;
    font-size: 18px;
    align-self: center;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center
`
const Span = styled.span`
    font-size: 10px
`
const Button = styled.button`
width: 40%;
height: 40px;
 background-color: ${props => props.disable ? "#6C757D" : "#d90429"};
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 6px;
  cursor: pointer;
  transition: ease background-color 250ms;
  border: none;
  &:hover {
    background-color: #ef233c;
    transform: scale(0.96)
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`
const Title = styled.h3`
`
const Form = styled.form`
`
const Input = styled.input`
`
const Slot = ({ setDatePickerOpen }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { activeId, dateString, unCheckSlotActive, dispatch, loading } = useContext(SlotStatusContext)
    const [program, setProgram] = useState("")
    const [state, dispatchA] = useReducer(bookingReducer, INITIAL_STATE_SLOT_REDUCER)
    const { user } = useContext(AuthContext)
    const [messageApi, contextHolder] = message.useMessage();
    const [showButton, setShowButton] = useState(true)
    const handleBook = () => {
        if (activeId !== null) {
            setDatePickerOpen(false)
            setIsModalOpen(true)
        } else {
            warning()
        }
    }
    const handleCancel = () => {
        setDatePickerOpen(true)
        setIsModalOpen(false)
    }
    const handleOk = async (e) => {
        e.preventDefault()
        setDatePickerOpen(true)
        setIsModalOpen(false)
        dispatchA({ type: ACTION_TYPE.BOOKING_START })
        try {
            const res = await userRequest.post("/booking/admin", {
                slotNo: activeId,
                email: user.email,
                slotBookingData: {
                    user: user._id,
                    program: program,
                    date: dateString,
                    userEmail: user.email
                }
            })
            dispatchA({ type: ACTION_TYPE.BOOKING_SUCCESS })
            unCheckSlotActive()
            slotStatuses(dispatch, dateString)
            success(res.data)
        } catch (err) {
            dispatchA({ type: ACTION_TYPE.BOOKING_FAIL })
            error()
        }
    }
    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'Please select the slot to book',
            style: {
                marginTop: "5vh",
                padding: "2px 10px"
            }
        });
    };
    const success = (data) => {
        setDatePickerOpen(false)
        Modal.success({
            title: 'Congratulations your booking is confirmed',
            content: (
                <div>
                    <p style={{ margin: '10px', padding: '10px', fontSize: '14px', fontWeight: 'bold' }}>{data.msg}</p>
                    <span style={{ margin: '5px', padding: '5px' }}>check your registered email for further details</span>
                </div>
            ),
            onOk() {
                setDatePickerOpen(true)
            }
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Sorry, your booking failed. Please try again!',
            style: {
                marginTop: "5vh"
            }
        });
    };
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 110,
                alignSelf: 'center',
                marginTop: "10px",
                marginRight: "200px"
            }}
            spin
        />
    );
    useEffect(() => {
        const compareDates = () => {
            let yourDate = new Date()
            const offset = yourDate.getTimezoneOffset()
            yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
            const presentDate = yourDate.toISOString().split('T')[0]

            let date1 = new Date(dateString).getTime();
            let date2 = new Date(presentDate).getTime();
            console.log(date2)
            if (date1 < date2) {
                setShowButton(false)
            } else if (date1 > date2) {
                setShowButton(true)
            } else {
                setShowButton(true)
            }
        };
        compareDates()
    }, [dateString])

    return (<OuterContainer>
        {contextHolder}
        <Container>
            <Spin indicator={antIcon} spinning={state.posting || loading} size='large'>
                <Studio>
                    <Name>Studio 1<Span>theory</Span></Name>
                    <Name>Studio 2<Span>theory</Span></Name>
                    <Name>Studio 3<Span>theory</Span></Name>
                    <Name>Studio 4<Span>numerical</Span></Name>
                </Studio>
                <Slots>
                    {data.map((item) => {
                        return <Column item={item} />
                    })}
                </Slots>
            </Spin>
        </Container>
        {showButton && <Button onClick={handleBook} disable={state.posting || loading}>Book Now</Button>}
        <Modal title={`You are booking slot ${activeId % 10} of studio ${Math.floor(activeId / 10)}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Title>Enter the program</Title>
            <Form>
                <Input placeholder="eg: MBA" onChange={(e) => setProgram(e.target.value)} />
            </Form>
        </Modal>
    </OuterContainer>
    )
}

export default Slot