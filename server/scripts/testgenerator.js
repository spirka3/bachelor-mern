// Modul určený pre generovanie testov zo zvolenými počtami otázok z daných kategórii
const Category = require('../models/category')
const Question = require('../models/question')

const getSubcategories = async function(category) {
  const result = await Category.aggregate(
	[
		{$match: {"_id": category}}, 
		{$graphLookup : {
      from: "categories", startWith: "$_id", connectFromField: "_id", 
      connectToField: "parent", as: "subcategories"}}
	])
  if (result.length === 0) {
    throw 'Caregory ' + category + ' does not exist!'
  }
  return result[0].subcategories.map(s => s._id).concat(result[0]._id)
}

const getQuestionsFromSubcategories = async function(subcategories) {
  const result = await Question.find({ category : {$in: subcategories} })
  return result
}

// náhodne zamieša pole
// zdroj: https://stackoverflow.com/a/6274381
const shuffle = (a) => {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

// z daného poľa otázok questions vráti náhodnú podmožinu o velkosti count
// a zároveň zamieša poradie odpovedí
const selectQuestions = (questions, count, categoryname) => {
  if (questions.length < count) {
    throw 'Not enough questions in the category ' + categoryname
  }
  if (0 >= count) {
    throw 'Question count must be positive number'
  }
  return shuffleQuestionInputs(shuffle(questions).slice(0, count))
}

// pre dané pole questions v každej otázke zamieša poradie odpovedí
const shuffleQuestionInputs = (questions) => {
  for(question of questions) {
    question.inputs = shuffle(question.inputs)
  }
  return questions
}

// pripravy otazky pre uzivatela
// premenuje inputs na test_inputs
const renameInputs = (questions) => {
  const newquestions = []
  for(question of questions) {
    question.test_inputs = question.inputs
    newquestions.push({
      _id: question._id,
      category: question.category,
      text: question.text,
      type: question.type,
      test_inputs: question.inputs
    })
  }
  return newquestions
}

// Vráti vygenerovaný test.
// Vstup je pole objektov {category, count}
const generatetest = async function (testinfo) {
  const newtest = {submitted: false, test_questions: []}
  for (let testcategoryinfo of testinfo){
    const subcategories = await getSubcategories(testcategoryinfo.category)
    const questions = await getQuestionsFromSubcategories(subcategories)
    const selected_questions = selectQuestions(questions, testcategoryinfo.count, testcategoryinfo.category)
    newtest.test_questions = newtest.test_questions.concat(selected_questions)
  }
  newtest.test_questions = shuffle(newtest.test_questions)
  newtest.test_questions = renameInputs(newtest.test_questions)
  return newtest
}

module.exports = {generatetest, selectQuestions}

