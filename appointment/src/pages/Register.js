import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { publicRequest } from "../requestMethods"
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import axios from "axios"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://images.news18.com/ibnlive/uploads/2022/01/untitled-design-1-1-164371082616x9.jpg") center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
   width: 40%;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 1px 9px -1px rgba(179,173,179,1);
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    padding: 10px;
    margin: 20px 10px 0px 0px;
`
const Agreement = styled.span`
    font-size: 12px;
    margin: 10px 0px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    background-color: #d90429;
    color: white;
    cursor: pointer;
    padding: 15px 20px;
    border-radius: 6px;
    font-weight: bold;
    font-size: 14px;
    &:hover {
    background-color: #ef233c;
    transform: scale(0.96)
  }
`
const Text = styled.p`
   font-size: 14px;
   text-decoration: underline;
   cursor: pointer;
`
const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,

  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      await publicRequest.post("/auth/register", credentials)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  const onSuccessGoogle = (res) => {
    // console.log(res.credential)
    axios.get("http://localhost:8800/api/auth/protected", {
      headers: {
        Authorization: `Bearer ${res.credential}`
      }
    }).then(response => console.log(response.data)).catch(err => console.log(err))
  }
  const onErrorGoogle = (res) => {

  }
  const googleLogintwo = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (res) => {
      console.log(res)
      axios.post("http://localhost:8800/api/auth/google/register",{code:res.code}).then(response => console.log(response.data)).catch(err => console.log(err))
    },

    onError: (err) => {
      console.log(err)
    },
    scope: 'openid profile email https://www.googleapis.com/auth/calendar'
  })
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" type="name" id="name" onChange={(e) => handleChange(e)} />
          <Input placeholder="last name" type="lastname" id="lastname" onChange={(e) => handleChange(e)} />
          <Input placeholder="username" type="username" id="username" onChange={(e) => handleChange(e)} />
          <Input placeholder="email" type="email" id="email" onChange={(e) => handleChange(e)} required pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" />
          <Input placeholder="password" type="password" id="password" onChange={(e) => handleChange(e)} />
          <Agreement>
            By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleRegister} type="submit">CREATE</Button>
        </Form>
        <Link to="/login" style={{ textDecoration: "none", marginTop: "6px", display: "block" }} >
          <Text>Login</Text>
        </Link>
        <Button onClick={() => googleLogintwo()}>Continue with Google</Button>
      </Wrapper>
    </Container>
  )
}

export default Register