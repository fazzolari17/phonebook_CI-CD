const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const databaseUrl = `mongodb+srv://fullstack:${password}@cluster0.jcoqm6h.mongodb.net/phonebook?retryWrites=true&w=majority`

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 1,
    required: true
  },
  number: {
    type: String,
    minLength: 7,
    required: true
  }
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3) {
  getAllContacts()
} else if (process.argv.length < 5) {
  console.log('Please provide the proper arguments: node mongo.js <password> <contact name> <phone number>')
  process.exit(1)
} else if (process.argv.length === 5) {
  addNewContact()
}
mongoose.connect(databaseUrl)

function addNewContact() {
  mongoose
    .connect(databaseUrl)
    .then((result) => {
      console.log('Connected')

      const contact = new Contact({
        name: name,
        number: number
      })
      return contact.save()
    })
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((error) => console.log(error))
}

function getAllContacts() {
  Contact.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}