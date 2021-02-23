// Tento skript slúži na vygenerovanie dát do databázy.
// Pred spustením skriptu je potrebné mať stiahnuté node_modules ($ npm init)
// a správne nadstavený parameter MONGODB_URI v súbore .env
// Skript sa spúšta cez npm ($ npm run generate)
//
// Otázky boli vytvorené zo stránok https://sk.wikipedia.org/

// pripojenie na mongodb
require('dotenv').config()
const mongoose = require('../utils/mongoose')

// nacitanie modelov
const Account = require('../models/account')
const Category = require('../models/category')
const Question = require('../models/question')

// pomocne funkcie pre generovanie
const addCategory = async function(_id, parent) {
  const category = new Category({
    _id: _id,
    parent: parent
  })
  return category
    .save()
    .then(() => console.log('New category added'))
    .catch((e) => console.log(e))
}

const addQuestion = async function(category, text, type, inputs) {
  const question = new Question({
    category: category,
    text: text,
    type: type,
    inputs: inputs
  })
  return question
    .save()
    .then(() => console.log('New question added'))
    .catch((e) => console.log(e,question))
}

const addAccount = async function(_id, type, first_name, last_name, age, tests) {
  const account = new Account({
    _id: _id,
    type: type,
    first_name: first_name,
    last_name: last_name,
    age: age,
    tests: tests
  })
  return account
    .save()
    .then(() => console.log('New account added'))
    .catch((e) => console.log(e))
}


// vygenerovanie kategorii
const generateCategories = () => {
  addCategory('Matematika')
    addCategory('Aritmetika','Matematika')
      addCategory('Sčítanie','Aritmetika')
      addCategory('Odčítanie','Aritmetika')
    addCategory('Kombinatorika','Matematika')
    addCategory('Geometria','Matematika')
  addCategory('Fyzika')
    addCategory('Mechanika','Fyzika')
    addCategory('Optika','Fyzika')
  addCategory('Dejiny')
}



// vygenerovanie otazok
const generateQuestions = async function() {
  await addQuestion('Sčítanie', '10+21=?', 'text', 
    [{ text:'', correct_answer: '31' }])
  await addQuestion('Sčítanie', '14+3=?', 'text', 
    [{ text:'', correct_answer: '17' }])
  await addQuestion('Sčítanie', '93+11=?', 'text', 
    [{ text:'', correct_answer: '104' }])
  await addQuestion('Sčítanie', '5+4=?', 'multiple_choice', 
    [{ text:'9', correct_answer: '1' }, { text:'9.0', correct_answer: '1' }, { text:'2', correct_answer: '0' }])
  await addQuestion('Sčítanie', 'Usporiadaj od najvačšieko po najmenší', 'order', 
    [{ text:'1+1', correct_answer: '3' }, { text:'8+12', correct_answer: '2' }, { text:'19+3', correct_answer: '1' }])

  await addQuestion('Odčítanie', '33-21=?', 'text', 
    [{ text:'', correct_answer: '12' }])
  await addQuestion('Odčítanie', '7-2=?', 'text', 
    [{ text:'', correct_answer: '5' }])
  await addQuestion('Odčítanie', '99-8=?', 'text', 
    [{ text:'', correct_answer: '91' }])
  await addQuestion('Odčítanie', '87-27=?', 'text', 
    [{ text:'', correct_answer: '60' }])
  await addQuestion('Odčítanie', '2-1=?', 'text', 
    [{ text:'', correct_answer: '1' }])

  await addQuestion('Kombinatorika','Permutácie 5 prvkov je: ', 'multiple_choice',
    [{ text:'3', correct_answer: '0' }, { text:'120', correct_answer: '1' }, { text:'5!', correct_answer: '1' }])
  await addQuestion('Kombinatorika','Kombinácie 2 z 5  je: ', 'multiple_choice',
    [{ text:'10', correct_answer: '1' }, { text:'11', correct_answer: '0' }, { text:'5!', correct_answer: '0' }])
  await addQuestion('Kombinatorika','Kombinácie 1 z 7  je: ', 'text',
    [{ text:'', correct_answer: '7' }])
  await addQuestion('Kombinatorika','Kombinácie 1 z 7  je: ', 'text',
    [{ text:'', correct_answer: '7' }])
  await addQuestion('Kombinatorika', 'Usporiadaj od najvačšieko po najmenší', 'order', 
    [{ text:'20!', correct_answer: '1' }, { text:'C(30,13)', correct_answer: '2' }, 
      { text:'C(1,1)', correct_answer: '3' }])

  await addQuestion('Geometria', 'Súčet všetkých vnútorných uhlov trojuholníka je: ', 'text', 
    [{ text:'', correct_answer: '180' }])
  await addQuestion('Geometria', 'Kolmé priamky zvierajú uhol: ', 'text', 
    [{ text:'', correct_answer: '90' }])
  await addQuestion('Geometria', 'Obvod štvorca so stranou a=2 je: ', 'text', 
    [{ text:'', correct_answer: '8' }])
  await addQuestion('Kombinatorika','Označ priestorové útvary: ', 'multiple_choice',
    [{ text:'kosoštvorec', correct_answer: '0' }, { text:'ihlan', correct_answer: '1' }, 
      { text:'valec', correct_answer: '1' }, { text:'guľa', correct_answer: '1' }, 
      { text:'trojúholník', correct_answer: '0' }])
  await addQuestion('Kombinatorika','Označ ostré uhly: ', 'multiple_choice',
    [{ text:'30', correct_answer: '1' }, { text:'45', correct_answer: '1' }, { text:'120', correct_answer: '0' }])

  await addQuestion('Matematika','Označ  matematické disciplíny: ', 'multiple_choice',
    [{ text:'kombinatorika', correct_answer: '1' }, 
      { text:'algebra', correct_answer: '1' }, { text:'žurnaliskika', correct_answer: '0' }])
  await addQuestion('Matematika', 'Koľko stien má štvorsten: ', 'text', 
    [{ text:'', correct_answer: '4' }])

  await addQuestion('Mechanika', 'Auto prešlo 50km za 30min, jeho priemerná rýchlosť bola: ', 'text', 
    [{ text:'', correct_answer: '100' }])
  await addQuestion('Mechanika', 'Motorka prešla 20km za 20min, jej priemerná rýchlosť bola: ', 'text', 
    [{ text:'', correct_answer: '60' }])
  await addQuestion('Mechanika', 'Chodec prešiel 5km za 60min, jeho priemerná rýchlosť bola: ', 'text', 
    [{ text:'', correct_answer: '5' }])
  await addQuestion('Mechanika','Zoraď od najvačšej po najmenšiu rýchlosť: ', 'order',
    [{ text:'100m/s', correct_answer: '1' }, { text:'20m/s', correct_answer: '2' }, 
      { text:'1m/s', correct_answer: '3' }])

  await addQuestion('Optika','Označ svetelné zdroje: ', 'multiple_choice',
    [{ text:'lampa', correct_answer: '1' }, { text:'slnko', correct_answer: '1' }, 
      { text:'zrkadlo', correct_answer: '0' }, { text:'mesiac', correct_answer: '0' }])
  await addQuestion('Optika','Označ viditelné svetlo: ', 'multiple_choice',
    [{ text:'červené žiarenie', correct_answer: '1' }, { text:'modré žiarenie', correct_answer: '1' }, 
      { text:'gamma žiarenie', correct_answer: '0' }, { text:'rádiové žiarenie', correct_answer: '0' }])
  await addQuestion('Optika','Zoraď od najvačšej po najmenšiu priepustnosť svetla: ', 'order',
    [{ text:'číre', correct_answer: '1' }, { text:'priesvitné', correct_answer: '2' }, 
      { text:'priehľadné', correct_answer: '3' }])
  await addQuestion('Geometria', 'Rýchlosť svetla vo vákuu v km/s je: ', 'text', 
    [{ text:'', correct_answer: '300000' }])

  await addQuestion('Fyzika','Označ  fyzikálne disciplíny: ', 'multiple_choice',
    [{ text:'Termika', correct_answer: '1' }, 
      { text:'Astrofyzika', correct_answer: '1' }, { text:'Astromágia', correct_answer: '0' }])

  await addQuestion('Dejiny', 'V ktorom roku sa začala 2. svetová vojna: ', 'text', 
    [{ text:'', correct_answer: '1939' }])
  await addQuestion('Dejiny', 'V ktorom roku bola objavená amerika: ', 'text', 
    [{ text:'', correct_answer: '1492' }])
  await addQuestion('Dejiny', 'V ktorom roku Neil Armstrong pristál na mesiaci: ', 'text', 
    [{ text:'', correct_answer: '1969' }])
  await addQuestion('Dejiny','Označ členov posádky misie Apollo 11: ', 'multiple_choice',
    [{ text:'Neil Armstrong', correct_answer: '1' }, { text:'Buzz Aldrin', correct_answer: '1' }, 
      { text:'Michael Collins', correct_answer: '1' }, { text:'Lance Armstrong', correct_answer: '0' },
      { text:'Louis Armstrong', correct_answer: '0' }, { text:'Krištof Kolumbus', correct_answer: '0' }])
  return await addQuestion('Dejiny','Zoraď od najstaršiu po najmladšiu dobu praveku: ', 'order',
    [{ text:'kamenná', correct_answer: '1' }, { text:'bronzová', correct_answer: '2' }, 
      { text:'železná', correct_answer: '3' }])
}

// vygenerovanie moderatorov
const generateModerators = () => {
  addAccount('mod01','moderator')
  addAccount('mod02','moderator')
  addAccount('mod03','moderator')
}



// náhodne vyplní dané otázky
const setRandomAnswers = (questions) => {
  const answeredQuestions = []
  for(q of questions) {
    answeredQuestions.push({
      text: q.text,
      type: q.type,
      test_inputs: setRandomAnswersInputs(q.inputs)
    })
  }
  return answeredQuestions
}

const setRandomAnswersInputs = (inputs) => {
  const answeredInputs = []
  for(i of inputs){
    answeredInputs.push({
      text: i.text,
      correct_answer: i.correct_answer,
      answer: ['idk', i.correct_answer][Math.floor(Math.random()*2)]
    })
  }
  return answeredInputs
}


const testgenerator = require('./testgenerator')
var allQuestions = []

// vygeneruje jeden test s odpoveďami
const getRandomTest = function() {
  const selectedQuestions = testgenerator.selectQuestions(allQuestions, 5+Math.floor(Math.random()*10))
  const test = {
    submitted: true,
    test_questions: setRandomAnswers(selectedQuestions)
  }
  return test
}

const getRandomTests = function() {
  const tests = []
  const count = 2+Math.floor(Math.random()*5)
  for(let i = 0; i < count; i++){
    const randomTest = getRandomTest() 
    tests.push(randomTest)
  }
  return tests
}

// vygenerovanie pouzivatelov a testov
const generateUsers = async function () {
  const first_names = ['Adam', 'Boris', 'Cyril', 'Dušan', 'Emil']
  const last_names = ['Zelený', 'Malý', 'Velký', 'Krátky' ,'Dlhý']

  for(let i = 0; i<20; i++){
    let randomTests = getRandomTests()
    await addAccount(
      'user'+i,
      'user',
      first_names[Math.floor(Math.random() * first_names.length)],
      last_names[Math.floor(Math.random() * last_names.length)],
      20+Math.floor(Math.random() * 80),
      randomTests
    )
  }
}

// ukoncenie
const exit = async function(){
  mongoose.disconnect()
  process.exit()
}


// generovanie
const generate = async function(){
  await generateCategories()
  await generateQuestions()
  await generateModerators()
  await Question.find().then((ret) => {
    allQuestions = ret 
    generateUsers()
  })
  setTimeout(exit, 5000)
}

generate()
