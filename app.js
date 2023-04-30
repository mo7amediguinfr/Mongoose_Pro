const mongoose = require('mongoose');
require('dotenv').config();

//connect to mongoDb Atlas databse using URI from env 
const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('mongoDB connected...'))
.catch(() => console.log('err'));


//create a person Shema
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {type: String, required:true},
  age: Number,
  favoriteFoods: [String],
});

// We create a person model
const Person = mongoose.model('Person', personSchema);


//We create a person record 
const person = new Person({
    name: 'Mohamed',
    age: 24,
    favoriteFoods: ['pizza', 'tacos']
  });

//save a person record to database
  person.save()
  .then(()=> console.log('person created successefully....'))
  .catch(err=> console.log(err));


//creating an array of people
const users = [
    {name: 'mohamed', age: 45, favoriteFoods: ['Tajine', 'Rfissa']}, 
    {name: 'Hajar', age: 18, favoriteFoods: ['sushi', 'pizza']},
    {name: 'yassmine', age: 30, favoriteFoods: ['sushi', 'pizza']}
     ]

Person.create(users)
  .then(() => {
    console.log('people are saved');
  })
  .catch(error => {
    console.log(error);
  });

// find all people with the given name
  Person.find({
    name: 'Hajar'  
  })
  .then(res => {
    console.log('all are founded',res)
  })
  .catch(err => {
    console.error(err)
  })

// find a specific person with the given favoriteFood 
  Person.findOne({
    favoriteFoods: 'pizza'  
  })
  .then(res => {
    console.log('the data is founded',res)
  })
  .catch(err => {
    console.error(err)
  })

// find by Id

const persoId ="643e79535d6b0b33ca4c2851"

  Person.findById(persoId)
  .then(res => {
      console.log('person is founded',res);
      })
       .catch(error => {
        console.log(error);
  });

// update the person with a specific Id

const personId ="643e79535d6b0b33ca4c2853"

Person.findById(personId)
.then(res => {res.favoriteFoods.push('Humburger');
res.save()
.then(resultat=> console.log('person updated successefully....', resultat))
 .catch(err=> console.log(err));
})
.catch(err=> console.log(err))

// update a person by name

const personName ="Mohamed"

Person.findOneAndUpdate({name: personName}, {age: 20})
.then(res => console.log('user is updated',res))
.catch(err => console.log(err))


// delete a person by ID

Person.findByIdAndRemove(personId)
.then(res => console.log('user is removed',res))
.catch(err => console.log(err))

// delete all people with given name

Person.deleteMany({ name: 'Hajar' })
.then(() => console.log('all the users with the given name are removed'))
.catch(err => console.log(err))


// find all the people with the given favoriteFoods using Query Building chain

Person.find({favoriteFoods:"pizza"})   // find all user               
         .limit(2)                // limit to 2 documents
         .sort({name: 1})     // sort by name
         .select({age: false}) // skip age
         .exec()                   // execute the query
         .then(docs => {
            console.log(docs)
          })
         .catch(err => {
            console.error(err)
          })










