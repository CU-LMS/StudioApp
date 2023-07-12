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

    const getBookings = async (url, payload) => {
        setLoading(true)
        const res = await userRequest.post(url, {
            ...payload
        })
        return res
    }

    useEffect(() => {
        setBookings([])
        let yourDate = new Date()
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
        const stringDate = yourDate.toISOString().split('T')[0]
        let url = ""
        let payload = {
            userEmail: user.email,
            dateString: stringDate,
            bookingsType
        }
        if (bookingsType == 'waiting') {
            url = "/booking/reserve/history"
        } else if(bookingsType == 'cancelled'){
            url = "/booking/cancelled/history"
        }
        else {
            url = "/booking/history"
        }

        getBookings(url, payload).then((res) => {
            setBookings(res.data.bookings)
            setLoading(false)
        })
    }, [bookingsType])

    const handleDelete = async (booking) => {

        let url = "/booking/delete"
        let payload = {}

        if (bookingsType == 'waiting') {
            url = "/booking/reserve/delete";
            payload = {
                studioNo: booking.studioNo,
                timingNo: booking.timingNo,
                waitingNo: booking.bookings.waitingNo,
                date: booking.bookings.date.substring(0,10),
                slotNo: booking.slotNo
            }
        } else {
            url = "/booking/delete"
            payload = {
                studioNo: booking.studioNo,
                date: booking.slotBookingsData.date.substring(0,10),
                timingNo: booking.timingNo,
                slotNo: booking.slotNo
            }
        }
        try {
            await userRequest.post(url, {
                ...payload
            })
        } catch (error) {
            return console.log(error)
        }
        
        let yourDate = new Date()
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
        const stringDate = yourDate.toISOString().split('T')[0]
        let urlGet = ""
        let payloadGet = {
            userEmail: user.email,
            dateString: stringDate,
            bookingsType
        }
        if (bookingsType == 'waiting') {
            urlGet = "/booking/reserve/history"
        } else {
            urlGet = "/booking/history"
        }
        getBookings(urlGet, payloadGet).then((res) => {
            setBookings(res.data.bookings)
            setLoading(false)
        })

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
    function localDateStringToDDMMYYYY(localDateString) {
        // Convert the local date string to a Date object.
        const localDate = new Date(localDateString)
      
        // Get the day, month, and year from the Date object.
        let day = localDate.getDate();
        let month = localDate.getMonth() + 1;
        let year = localDate.getFullYear();
      
        // Add leading zeros to the day and month digits if they are less than 10.
        if (day < 10) {
          day = "0" + day;
        }
        if (month < 10) {
          month = "0" + month;
        }
      
        // Return the date in DD/MM/YYYY format.
        return day + "/" + month + "/" + year;
      }
      console.log(bookings)
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
                            <Radio value='waiting'>Waiting</Radio>
                            <Radio value='cancelled'>Cancelled</Radio>
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
                                        {bookingsType == 'waiting' ? <th>Waiting Number</th> : null}
                                        <th>Program</th>
                                        <th>Booked At</th>
                                        {bookingsType == 'waiting' || bookingsType == 'upcoming' ?<th>Actions</th>: null}
                                        {bookingsType == 'cancelled' ?<th>Cancelled At</th>: null}
                                    </tr>
                                    {
                                        bookings.length > 0 && (bookingsType == 'waiting' || bookingsType == 'cancelled') ?
                                            bookings?.map(booking => {
                                                return (
                                                    <tr key={booking?.bookings?._id}>
                                                        <td>{booking?.bookings?._id}</td>
                                                        <td>{booking?.studioNo}</td>
                                                        <td>{Math.trunc(booking?.slotNo % 10)}</td>
                                                        <td>{booking?.type}</td>
                                                        <td>{localDateStringToDDMMYYYY(booking.bookings?.date)}</td>
                                                        {bookingsType == 'waiting' ? <td>{booking.bookings?.waitingNo}</td>: null}
                                                        <td>{booking.bookings?.program}</td>
                                                        <td>{`${localDateStringToDDMMYYYY(booking?.bookings?.bookedAt)} ${new Date(booking?.bookings?.bookedAt).toLocaleTimeString()}`}</td>
                                                        {bookingsType == 'waiting'? <td>{bookingsType == "waiting" ? <Button onClick={() => handleDelete(booking)}><DeleteOutlined style={{ color: "red", fontSize: "18px", margin: "2px" }} /></Button> : null}</td>: null}
                                                        {bookingsType == 'cancelled'? <td>{`${localDateStringToDDMMYYYY(booking.bookings?.deletedAt)} ${new Date(booking?.bookings?.deletedAt).toLocaleTimeString()}`}</td>: null}
                                                    </tr>
                                                )
                                            })
                                            :
                                            bookingsType != 'waiting' && bookings.length > 0 && bookings?.map(booking => {
                                                return (
                                                    <tr key={booking?.slotBookingsData?._id} className={booking.slotBookingsData?.defaulted == true ? "table-danger" : booking.slotBookingsData?.completed == true ? "table-success" : null}>
                                                        <td>{booking?.slotBookingsData?._id}</td>
                                                        <td>{booking?.studioNo}</td>
                                                        <td>{Math.trunc(booking?.slotNo % 10)}</td>
                                                        <td>{booking?.type}</td>
                                                        <td>{localDateStringToDDMMYYYY(booking?.slotBookingsData?.date)}</td>
                                                        <td>{booking?.slotBookingsData?.program}</td>
                                                        <td>{`${localDateStringToDDMMYYYY(booking?.slotBookingsData?.bookedAt)} ${new Date(booking?.slotBookingsData?.bookedAt).toLocaleTimeString()}`}</td>
                                                        {bookingsType == 'upcoming'? <td>{bookingsType == "upcoming" ? <Button onClick={() => handleDelete(booking)}><DeleteOutlined style={{ color: "red", fontSize: "18px", margin: "2px" }} /></Button> : null}</td>:null}
                                                    </tr>
                                                )
                                            })
                                    }
                                </tbody>

                            </table> : !loading &&
                            <Result
                                status="404"
                                title={`There are no bookings`}
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