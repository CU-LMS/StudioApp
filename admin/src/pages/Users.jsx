import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import styled from 'styled-components'
import { Result, Space, Spin, Table, Tag, message } from 'antd';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { getUsers } from '../context/apiCalls';
import { userRequest } from '../requestMethods';
import { DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';


const Container = styled.div`
  display: flex;
`
const User = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Button = styled.button`
  border: none;
  margin-left: 5px;
  margin-right: 5px;
  padding: 2px;
`
const Users = () => {

  const [users, setUsers] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  const [loading,setLoading]= useState(true)

  useEffect(() => {
    async function getUsers() {
      setLoading(true)
      const res = await userRequest.get("/user")
      setLoading(false)
      return res
    }
    getUsers().then((res) => setUsers(res.data.users))
  }, [])

  const handleDelete = async (userId) => {
    try {
      await userRequest.delete(`/user/${userId}`)
    } catch (error) {

    }
    async function getUsers() {
      setLoading(true)
      const res = await userRequest.get("/user")
      setLoading(false)
      return res
    }
    getUsers().then((res) => setUsers(res.data.users))
    success()
  }

  const handleStatus = async (userId, status) => {
    let newStatus = ''
    if (status == 'approved') {
      newStatus = 'pending'
    } else if (status == 'pending') {
      newStatus = 'approved'
    }
    try {
      await userRequest.post(`/user/${userId}`, {
        status: newStatus
      })
    } catch (error) {
      console.log(error)
    }
    async function getUsers() {
      setLoading(true)
      const res = await userRequest.get("/user")
      setLoading(false)
      return res
    }
    getUsers().then((res) => setUsers(res.data.users))
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
      <User>
        <Navbar />
        <Spin indicator={antIcon} spinning={loading} size='large'>
       { users.length>0? <table className='table text-center table-striped table-hover table-bordered'>
          <tbody>
            <tr>
              <th>
                ID
              </th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
            {
              users?.map(user => {
                return (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.status}</td>
                    <td>
                     {user.role== "admin"? null: <Button onClick={() => handleDelete(user._id)}><DeleteOutlined style={{ color: "red", fontSize: "18px", margin: "2px" }} /></Button>}
                      {user.role == "admin"? null: <Button onClick={() => handleStatus(user._id, user.status)}>{user.status == "approved" ? <CloseCircleOutlined style={{ color: "red", fontSize: "18px" }} /> : <CheckCircleOutlined style={{ color: "green", fontSize: "18px" }} />}</Button>}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>

        </table>: !loading &&
            <Result
              status="404"
              title="There are no users registered"
              subTitle="It's is sad to know that, know one is using this app"
              style={{ margin: '60px' }}
            />
          }
        </Spin>
      </User>
    </Container>
  )
}

export default Users