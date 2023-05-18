import React, { useContext } from 'react'
import styled from 'styled-components'
import Login from './Login'
import { AuthContext } from '../context/AuthContext'

const Container = styled.div`
padding: 20px;
display: flex;
justify-content: space-between;
align-items: center;
margin: 0px 30px 0px 30px;
`
const Left = styled.div`

`
const Greeting = styled.h1`
`
const Navbar = () => {
  const {user} = useContext(AuthContext)
  return (
    <Container>
      <Left>
        <Greeting>
          Hi, {user?`${user.username}`:"there"}
        </Greeting>
      </Left>
      <Login />
    </Container>
  )
}

export default Navbar