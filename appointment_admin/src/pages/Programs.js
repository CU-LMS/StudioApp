import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import styled from 'styled-components'
import Navbar from '../components/Navbar'

const SEMESTERS = [1,2,3,4,5,6,7,8]
const PROGRAMNAMES = ["BAJMC","BBA", "BCA", "M.Com", "MAJMC", "MBA", "MCA"]

const OuterContainer = styled.div`
    display: flex;
`
const Container = styled.div`
    width: 100%; 
`
const InnerContainer = styled.div`
   display: flex;
   justify-content: center; 
   margin-top: 5vh;
`
const Card = styled.div`
    width: 30vw;
    height: 60vh;
    /* background-color: black; */
    border-radius: 8px;
    /* border: 1px solid grey; */
    border-width: 1px;
    box-shadow: 0px 1px 9px -1px rgba(179,173,179,1);
    padding: 20px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`
const Div = styled.div`
    /* padding: 10px; */
    margin-bottom: 20px;
    display: flex;
    /* gap: 10px; */
`
const Input = styled.input`
     padding: 5px 10px;
`
const DataList = styled.datalist`

`
const Label = styled.label`
    display: inline-block;
        width: 150px;
`

const Programs = () => {
    // const [semester,setSemester] = useState("")
    // const [programName,setProgramName] = useState("")
    // const [courseName,setCourseName] = useState("")

    const [values,setValues] = useState({
        semester: undefined,
        programName: undefined,
        courseName: undefined,
    })
    const handleChange = (e)=>{
        setValues((prev)=>({...prev, [e.target.id]: e.target.value}))
    }
    console.log(values)
    return (
        <OuterContainer>
            <Sidebar />
            <Container>
                <Navbar />
                <InnerContainer>
                     <Card>
                        <h3>Create New Program</h3>
                        <Div>
                            <Label>Semester:</Label>
                            <Input type='number' list='semesters' name='semester' id='semester'  onChange={(e)=>handleChange(e)}/>
                            <DataList id='semesters'>
                            {SEMESTERS && SEMESTERS.map((sem)=>{
                                    return <option key={sem} value={sem}/>
                                })}
                            </DataList>
                        </Div>
                        <Div>
                            <Label>Program Name:</Label>
                        <Input type='text' list='programs' name='programName' id='programName'  onChange={(e)=>handleChange(e)}/>
                            <DataList id='programs'>
                            {PROGRAMNAMES && PROGRAMNAMES.map((program)=>{
                                    return <option key={program} value={program}/>
                                })}
                            </DataList>
                        </Div>
                        <Div>
                            <Label>Course Name:</Label>
                            <Input type='text' placeholder='eg: Design Thinking' autoCorrect='false' name='courseName' id='courseName' onChange={(e)=>handleChange(e)}/>
                        </Div>
                     </Card>
                </InnerContainer>
            </Container>
        </OuterContainer>
    )
}

export default Programs