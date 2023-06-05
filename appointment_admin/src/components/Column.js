import styled from "styled-components"
import Box from "./Box"

const ColumnContainer = styled.div`
    /* width: 10vw;
    height: 60vh; */
    width: 10vw;
    height: 100%;
    margin: 8px;
    /* background-color: yellow; */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`
const Column = ({item}) => {
  return (
    <ColumnContainer>
        {item.slots.map(slot=>{
           return  <Box slot={slot} />
        })}
    </ColumnContainer>
  )
}

export default Column