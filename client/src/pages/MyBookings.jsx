import React from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import { Radio, Result, Space, Spin, message } from 'antd'
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { useState } from 'react'
import { userRequest } from '../requestMethods'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const InnerContainer = styled.div`
    width: 95%;
`
const RadioContainer = styled.div`
    margin: 20px;
`
const Button = styled.button`
  border: none;
  margin-left: 5px;
  margin-right: 5px;
  padding: 2px;
`
const MyBookings = () => {
    const [bookings, setBookings] = useState([])
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(true)
    const { user } = useContext(AuthContext)
    const [bookingsType, setBookingsType] = useState("today")
    console.log(bookings)
    useEffect(() => {
        let yourDate = new Date()
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
        const stringDate = yourDate.toISOString().split('T')[0]
        async function getBookings() {
            setLoading(true)
            const res = await userRequest.post("/booking/history", {
                userEmail: user.email,
                dateString: stringDate,
                bookingsType
            })
            setLoading(false)
            return res
        }
        getBookings().then(res => setBookings(res.data.bookings))
    }, [bookingsType])

    const handleDelete = async (booking) => {
        const { studioNo, timingNo } = booking
        const date = booking.slotBookingsData.date
        try {
            await userRequest.post("/booking/delete", {
                studioNo,
                timingNo,
                date
            })
        } catch (error) {
            return console.log(error)
        }
        let yourDate = new Date()
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
        const stringDate = yourDate.toISOString().split('T')[0]

        async function getBookings() {
            setLoading(true)
            const res = await userRequest.post("/booking/find", {
                dateString: stringDate
            })
            setLoading(false)
            return res
        }
        getBookings().then(res => setBookings(res.data.bookings))

        success()
    }

    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'Please do approprite action',
            style: {
                marginTop: "5vh",
                padding: "2px 10px"
            }
        });
    };
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Action done successfully',
            style: {
                marginTop: "5vh",
                padding: "2px 10px"
            }
        });
    };
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 110,
                alignSelf: 'center',
                marginTop: '160px'
            }}
            spin
        />
    );
    const onChangeGroup = (e) => {
        setBookingsType(e.target.value);
    };

    return (
        <>
            <Navbar />
            <Container>
                <RadioContainer>
                    <Radio.Group onChange={onChangeGroup} value={bookingsType} size='large'>
                        <Space direction='horizontal'>
                            <Radio value='today'>Today</Radio>
                            <Radio value='upcoming'>Upcoming</Radio>
                            <Radio value='past'>Past</Radio>
                        </Space>
                    </Radio.Group>
                </RadioContainer>
                <InnerContainer>
                <Spin indicator={antIcon} spinning={loading} size='large'>
                    {bookings.length > 0 ?
                        <table className='table text-center table-striped table-hover table-bordered'>
                            <tbody>
                                <tr>
                                    <th>
                                        Booking Id
                                    </th>
                                    <th>Studio No</th>
                                    <th>Slot No</th>
                                    <th>Type</th>
                                    <th>Date</th>
                                    <th>Program</th>
                                    <th>Booked At</th>
                                    <th>Actions</th>
                                </tr>
                                {
                                    bookings?.map(booking => {
                                        return (
                                            <tr key={booking.slotBookingsData._id} className={booking.slotBookingsData?.defaulted == true? "table-danger": booking.slotBookingsData?.completed == true?"table-success": null}>
                                                <td>{booking.slotBookingsData._id}</td>
                                                <td>{booking.studioNo}</td>
                                                <td>{Math.trunc(booking.slotNo % 10)}</td>
                                                <td>{booking.type}</td>
                                                <td>{new Date(booking.slotBookingsData.date).toLocaleDateString()}</td>
                                                <td>{booking.slotBookingsData.program}</td>
                                                <td>{`${new Date(booking.slotBookingsData.bookedAt).toLocaleDateString()} ${new Date(booking.slotBookingsData.bookedAt).toLocaleTimeString()}` }</td>
                                                <td>{bookingsType == "upcoming"? <Button onClick={() => handleDelete(booking)}><DeleteOutlined style={{ color: "red", fontSize: "18px", margin: "2px" }} /></Button>: null}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </table> : !loading &&
                        <Result
                            status="404"
                            title= {`There are no ${bookingsType} bookings`}
                            subTitle="You are free, feel free to read some News"
                            style={{ margin: '60px' }}
                        />
                    }
                </Spin>
                </InnerContainer>
            </Container>
        </>
    )
}

export default MyBookings