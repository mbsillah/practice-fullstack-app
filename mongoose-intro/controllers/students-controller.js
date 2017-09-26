const express = require('express');
const router = express.Router();
const Schema = require("../db/schema.js");

const StudentModel = Schema.StudentModel;

//Index Route
router.get('/', (req, res) => {

    //Find all students in database
    StudentModel.find({})
        .then((students) => {

            //Then, renders 
            res.render('student/index', {
                students: students
            });
        })
        .catch((error) => {
            console.log(error)
        })
})

//New Route
router.get('/new', (req, res) => {
    res.render('student/new')
})

//Show Routh
router.get('/:id', (req, res) => {
    const studentId = req.params.id;
    StudentModel.findById(studentId)
        .then((student) => {
            res.render('student/show', {
                student: student
            })
        })
        .catch((error) => {
            console.log(error)
        })

})
//Edit Route
router.get('/:id/edit', (req, res) => {
    const studentId = req.params.id;
    StudentModel.findById(studentId)
    .then((student) => {
        res.render('student/edit', {
            student: student
        })
    })
    .catch((error) => {
        console.log(error)
    })
})
//Delete
router.get('/:id/delete', (req, res) => {
    const studentId = req.params.id;
    StudentModel.findByIdAndRemove(studentId)
        .then((student) => {
            res.redirect('/students')
        })
        .catch((error) => {
            console.log(error)
        })

})

//router.delete('/:id', (req, res) => {
//    const studentId = req.params.id;
//    StudentModel.findByIdAndRemove(studentId)
//        .then((student) => {
//        res.redirect('/students')
//        })
//        .catch((error) => {
//            console.log(error)
//        })
//
//})

//Post
router.post('/', (req, res) => {
    StudentModel.create(req.body)
        .then(() => {
            res.redirect('/students')
        })
        .catch((error) => {
            console.log(error)
        })
        
})
//Put
router.put('/:id', (req, res) => {
    const studentIdToUpdate = req.params.id;
    const updatedStudent = req.body;
    //first param = student ID to update
    //second param = updated student info as an object (request.body)
    //third object = boilerplate
    StudentModel.findByIdAndUpdate(studentIdToUpdate, updatedStudent, {new: true})
    .then(() => {
        res.redirect(`/students/${studentIdToUpdate}`)
    })
    .catch((error) => {
        console.log(error)
    })
})



module.exports = router;