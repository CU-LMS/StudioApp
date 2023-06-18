
import styled from 'styled-components'
import Column from './Column'
import { newData } from '../data'
import { useReducer, useState } from 'react'
import { publicRequest, userRequest } from '../requestMethods'
import { useContext } from 'react'
import { SlotStatusContext } from '../context/SlotStatusContext'
import { Modal, Result, Spin, message, Radio } from 'antd'
import { slotStatuses, slotStatusesWithType } from '../context/apiCalls'
import { ACTION_TYPE, INITIAL_STATE_SLOT_REDUCER, bookingReducer } from '../reducers/slotBookingReducer'
import { AuthContext } from '../context/AuthContext'
import { LoadingOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import axios from 'axios'
import Sucess from '../utils/Sucess'
import ErrorMessage from '../utils/ErrorMessage'
const SEMESTERS = [1,2,3,4,5,6,7,8]
const PROGRAMNAMES = ["BAJMC","BBA", "BCA", "M.Com", "MAJMC", "MBA", "MCA"]
const OuterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
`
const Container = styled.div`
    width: auto;
    height: 70vh;
    margin: 10px;
    padding: 10px;
    /* background-color: green; */
    background-color: lightgrey;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    /* border-color: grey; */
    /* border-style: solid; */
    border-width: 1px;
    box-shadow: 0px 1px 9px -1px rgba(179,173,179,1);
`
const Studio = styled.div`
    height: 6vh;
    margin: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
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
const Select = styled.select`
`
const Option = styled.option`
`
const Slot = ({ setDatePickerOpen, slotType }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { activeIds, dateString, unCheckSlotActive, dispatch, loading, timingNo } = useContext(SlotStatusContext)
    const [program, setProgram] = useState("")
    const [programs, setPrograms] = useState([])
    const [semester,setSemester]  = useState(SEMESTERS[0])
    const [programName,setProgramName] = useState(PROGRAMNAMES[0])
    const [state, dispatchA] = useReducer(bookingReducer, INITIAL_STATE_SLOT_REDUCER)
    const { user } = useContext(AuthContext)
    const [messageApi, contextHolder] = message.useMessage();
    const [showSlots, setShowSlots] = useState(false)
    const header = {
        'Content-Type': 'application/json',
        'token': `Bearer ${user?.accestoken}`
    }
    const handleBook = () => {
        if (activeIds !== []) {
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
            await publicRequest.post("/booking", {
                type: slotType,
                timingNo,
                email: user.email,
                slotBookingData: {
                    user: user._id,
                    program: program,
                    date: dateString,
                    userEmail: user.email
                }
            }, {
                headers: header
            })
            dispatchA({ type: ACTION_TYPE.BOOKING_SUCCESS })
            unCheckSlotActive()
            // slotStatuses(dispatch, dateString)
            slotStatusesWithType(dispatch, dateString, slotType, header)
            success()
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
    const success = () => {
        messageApi.open({
            content: <Sucess/>,
            style: {
                marginTop: "5vh",
            },
            duration: 2,
        });
    };

    const error = () => {
        messageApi.open({
            content: <ErrorMessage/>,
            style: {
                marginTop: "5vh"
            },
            duration: 2,
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
        if (slotType === "" && dateString == null) {
            console.log("slotType:", slotType, " dateString:", dateString)
            setShowSlots(false)
        } else if (slotType !== "" && dateString !== null) {
            slotStatusesWithType(dispatch, dateString, slotType, header)
            setShowSlots(true)
        }
    }, [slotType, dateString])

    const getProgramList = async () => {
        try {
            const res = await axios.get(`http://3.110.176.68/api/program?semester=${semester}&programName=${programName}`)
            setPrograms(res.data.programs)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProgramList()
    }, [semester,programName])

    return (<OuterContainer>
        {contextHolder}
        {showSlots == false ? <Result
            status="403"
            title="please select a slot and date"
            style={{ marginTop: "20vh" }}
        /> : <>
            <Container>
                <Spin indicator={antIcon} spinning={state.posting || loading} size='large'>
                    <Studio>
                        <Name>Studio</Name>
                    </Studio>
                    <Slots>
                        {newData.map((item) => {
                            return item.type === slotType && <Column item={item} />
                        })}
                    </Slots>
                </Spin>
            </Container>
            <Button onClick={handleBook} disable={state.posting || loading}>Book Now</Button>
            <Modal title={`You are booking ${slotType} slot`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Title>Select the program</Title>
                <Form>
                    {/* <Input placeholder="eg: MBA" onChange={(e) => setProgram(e.target.value)} /> */}
                    <Select name="semester" value={semester}  onChange={(e)=>setSemester(SEMESTERS[e.target.options.selectedIndex])}>
                        {
                            SEMESTERS && SEMESTERS.map((item,index)=>(
                                <Option value={item} key={index}>{item}</Option>
                            ))
                        }
                    </Select>
                    <Select name="programName" value={programName} onChange={(e)=>setProgramName(PROGRAMNAMES[e.target.options.selectedIndex])}>
                        {
                            PROGRAMNAMES && PROGRAMNAMES.map((item,index)=>(
                                <Option value={item} key={index}>{item}</Option>
                            ))
                        }
                    </Select>
                    <Select name="programs" value={program} defaultValue={programs[0]?.courseName} onChange={(e)=>setProgram(programs[e.target.options.selectedIndex]?.courseName)}>
                        {
                            programs && programs.map((item) => (
                                <Option value={item?.courseName} key={item._id} >{item?.courseName}</Option>
                            ))
                        }
                    </Select>
                </Form>
            </Modal>

        </>}
    </OuterContainer>
    )
}

export default Slot