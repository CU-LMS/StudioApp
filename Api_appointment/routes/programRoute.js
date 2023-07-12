const router = require('express').Router()
const { addProgram, getPrograms, deleteProgram } = require('../controllers/programController')


router.route("/").get(getPrograms).post(addProgram)
router.route("/:programId").delete(deleteProgram)

module.exports = router