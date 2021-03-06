const mongoose = require('mongoose')

if ( process.argv.length < 3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://annapiir:${password}@annadb-bh8d7.mongodb.net/puhldb?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {

  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })

} else if (process.argv.length === 5) {
  const newName = process.argv[3]
  const newNumber = process.argv[4]
  
  const person = new Person({
  name: newName,
  number: newNumber,
  })

  person.save().then(response => {
    console.log(`lisätään ${newName} numero ${newNumber} luetteloon`);
    mongoose.connection.close();
  })

}
