const express = require('express')
const parser = require('body-parser')
var cors = require('cors');

const app = express()
app.use(parser.json())
app.use(cors());


let todo = []
let done = []
let archive = []
let idCounter = 0

app.get('/ping', (req, res) => {
    res.status(200).json({"message": "Hello world"})
})

app.get("/todo", (req, res) => {
    res.status(200).json({
        "message": "",
        "data": todo
    })
})

app.post("/todo", (req, res) => {
    const todoMessage = req.body.todoMessage
    let id = idCounter + 1
    idCounter++
    
    todo.push({todoMessage, id})
    console.log("todo:", todo)
    res.status(201).json({
        message: "Successfully add todo"
    })
})

app.get("/done", (req, res) => {
    console.log("done", done)
    res.status(200).json({
        "message": "success",
        "data": done
    })
})

app.post('/done', (req, res) => {
    const todoId = parseInt(req.body?.todoId)
    for (let i = 0; i < todo.length; i++) {
        if (todo[i].id === todoId) {
            tempTodo = todo[i]
            todo = todo.filter(function(item) {
                return item.id !== todoId
            })
            done.push(tempTodo)

            res.status(200).json({message:"success"})
            return
        }
    }

    res.status(400).json({message: "todo with corresponding id not found"})
})

app.post('/remove-done', (req, res) => {
    const todoId = parseInt(req.body?.todoId)

    let isFound = false
    let doneData;
    for (let i = 0; i< done.length; i++) {
        if (done[i].id === todoId) {
            isFound = true
            doneData = done[i]
            break
        }
    }

    if (isFound) {
        done = done.filter(function(item) {
            return item.id !== todoId
        })

        archive.push(doneData)
        res.status(200).json({"message": "success"})
        return
    }

    res.status(400).json({"message": "todo with corresponding id not found"})
    return
})

app.get('/archive', (req, res) => {
    res.status(200).json({
        "message":"success",
        "data": archive
    })
})

app.listen(3000, () => {
    console.log("server running at port 3000")
})