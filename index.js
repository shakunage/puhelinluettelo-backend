const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
      {
        "name": "Arto Hellas",
        "number": "040-1234561",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "Essi Esimerkki",
        "number": "050-123457",
        "id": 5
      }
    ]
  
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    const currentDate = new Date();
    res.send('Phonebook has info for ' + persons.length + ' persons <br>' + currentDate)
    })

    app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

app.post('/api/persons', (request, response) => {
    const person = request.body
    person.id = Math.ceil(Math.random()*1000+persons.length)
    console.log(person)


    if (!person.name) {
        return response.status(400).json({ 
            error: 'name missing' 
        })
    }

    if (!person.number) {
        return response.status(400).json({ 
            error: 'number missing' 
        })
        }

    const names = persons.map((person) => person.name)

    if (names.includes(person.name)) {
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }

    persons = persons.concat(person)

    response.json(person)

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
      