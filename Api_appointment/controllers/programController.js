const Program = require("../models/Program")

// add single program
const addProgram = async (req, res) => {
    try {
        const program = new Program(req.body)
        await program.save()
        res.status(201).json({ msg: "program added successfully" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

//delete course 
const deleteProgram = async (req, res) => {
    try {
        if (req.params.programId) {
            await Program.findOneAndDelete({ _id: req.params.programId })
            return res.status(200).json({ msg: "program deleted successfully" })
        }
        throw new Error('Bad request')
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

//all programs
const getPrograms = async (req, res) => {
    try {
        const { semester, programName } = req.query

        let query = {}
        if (semester && programName) {
            query = {
                semester: semester,
                programName: programName
            }
        } else if (semester) {
            query = {
                semester: semester
            }
        } else if (programName) {
            query = {
                programName: programName
            }
        }

        let programs = Program.find(query).sort({ semester: 1, programName: 1, courseName: 1 })

        // pagination and limit
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 8  //by default 10 is the limit of objects to fetch
        const skip = (page - 1) * limit       // if limit is 10 and page is 2 then, skip will be 10, so it will show the objects after skipping 10 objects from the results

        programs = await programs.skip(skip).limit(limit)

        const totalDocuments = await Program.countDocuments(query)
        const totalPages = Math.ceil(totalDocuments / limit)
        res.status(200).json({ count: totalPages, programs })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}



module.exports = {
    addProgram,
    getPrograms,
    deleteProgram
}