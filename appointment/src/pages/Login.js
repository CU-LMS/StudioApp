import styled from "styled-components"
import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
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
   width: 25%;
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
    flex-direction: column;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    padding: 10px;
    margin: 10px 0;
`
const Button = styled.button`
    width: 40%;
    border: none;
    background-color: ${props => props.disabled ? "#6C757D" : " #d90429"};
    color: white;
    cursor: ${props => props.disabled? "not-allowed": "pointer"};
    padding: 15px 20px;
    margin-bottom: 10px;
    border-radius: 6px;
    font-weight: bold;
    font-size: 14px;
    &:hover {
    background-color: #ef233c;
    transform: scale(0.96)
  }
`
const Text = styled.p`
   font-size: 12px;
   text-decoration: underline;
   cursor: pointer;
   margin: 5px 0; 
`
const Error = styled.span`
    font-size: 12px;
    color: red;
`
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login",{email,password} );
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate("/")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    }
    return (
        <Container>
            <Wrapper>
                <Title>LOGIN</Title>
                <Form>
                    <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                    <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={handleLogin} disabled={loading}>Login</Button>
                    {/* <Link>Forgot your password?</Link> */}
                    {error&&<Error>something went wrong...</Error>}
                    <Link to="/register" style={{ textDecoration: "none" }} >
                        <Text>Create an Account</Text>
                    </Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login