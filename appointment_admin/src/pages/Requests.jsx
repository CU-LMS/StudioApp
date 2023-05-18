import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { userRequest } from '../requestMethods'
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import { message, Result, Spin } from 'antd'

const Container = styled.div`
  display: flex;
`
const Request = styled.div`
  width: 100%;
`
const Button = styled.button`
  border: none;
  margin-left: 5px;
  margin-right: 5px;
  padding: 2px;
`

const Requests = () => {

  const [bookings, setBookings] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true)
  useEffect(() => {
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
  }, [])

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

  return (
    <Container>
      {contextHolder}
      <Sidebar />
      <Request>
        <Navbar />
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
                  <th>timing</th>
                  <th>Date</th>
                  <th>Program</th>
                  <th>Full Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
                {
                  bookings?.map(booking => {
                    return (
                      <tr key={booking.slotBookingsData._id}>
                        <td>{booking.slotBookingsData._id}</td>
                        <td>{booking.studioNo}</td>
                        <td>{Math.trunc(booking.slotNo % 10)}</td>
                        <td>{booking.timingNo}</td>
                        <td>{new Date(booking.slotBookingsData.date).toISOString().substring(0, 10)}</td>
                        <td>{booking.slotBookingsData.program}</td>
                        <td>{`${booking.user_doc.name} ${booking.user_doc.lastname}`}</td>
                        <td>{booking.user_doc.role}</td>
                        <td>{booking.user_doc.email}</td>
                        <td>{<Button onClick={() => handleDelete(booking)}><DeleteOutlined style={{ color: "red", fontSize: "18px", margin: "2px" }} /></Button>}</td>
                      </tr>
                    )
                  })
                }
              </tbody>

            </table> : !loading &&
            <Result
              status="404"
              title="There are no bookings created by teachers"
              subTitle="You are free today, feel free to read some News"
              style={{ margin: '60px' }}
            />
          }
        </Spin>
      </Request>
    </Container>
  )
}

export default Requests