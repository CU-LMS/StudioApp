import { Link } from "react-router-dom"
import styled from "styled-components"


const Sidebar = () => {
    const Container = styled.div`
        width: 180px;
        height: 100vh;
        padding: 20px;
        /* background-color: black; */
        border-right: 1px;
        /* border-width: 1px; */
        box-shadow: 0px 1px 9px -1px rgba(179,173,179,1);
    `
    const Logo = styled.div`
        cursor: pointer;
    `
    const Image = styled.img`
        width: 140px;
        height: 60px;
    `
    const Menu = styled.ul`
        list-style:none;
        margin-top: 100px;
        padding: 5px;
    `
    const ListItem = styled.li`
        cursor: pointer;
        padding: 5px;
        margin: 8px;
        font-size: 20px;
        font-weight: 600;
        
    `
    return (
        <Container>
            <Logo>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Image src="https://www.cuchd.in/about/assets/images/cu-logo.png" />
                </Link>
            </Logo>
            <Menu>
                <ListItem>
                    <Link to="/" style={{ textDecoration: "none", color: "inherit"}}>
                        Home
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="/users" style={{ textDecoration: "none",  color: "inherit"}}>
                        Users
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="/requests" style={{ textDecoration: "none",  color: "inherit" }}>
                        Requests
                    </Link>
                </ListItem>
            </Menu>

        </Container>
    )
}

export default Sidebar