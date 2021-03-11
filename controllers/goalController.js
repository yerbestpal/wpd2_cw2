const goalDAO = require('../models/goalModel')
const db = new goalDAO()

const Moment = require('moment')

// Seed DB
db.init()

exports.get_all_goals = async (req, res) => {
  const today = new Moment()
  await db.getAllGoals().then(listOfAllGoals => {
    console.log(listOfAllGoals)
    res.render('goals/entries', {
      'allGoals': listOfAllGoals,
      'incompleteGoals': listOfAllGoals.filter(goal => goal.isComplete === false),
      'completeGoals': listOfAllGoals.filter(goal => goal.isComplete === true),
      'weekNumber': today.isoWeek(),
      'fromDate': today.startOf('isoWeek').format('ddd D MMM').toString(),
      'toDate': today.endOf('isoWeek').format('ddd D MMM').toString()
    })
    console.log('Promise resolved')
  }).catch(err => {
    console.log('promise rejected', err)
  })
}

exports.get_all_user_goals = async (req, res) => {
  const today = new Moment()
  const user = req.params.user
  await db.getGoalsByUser(user).then(listOfAllGoals => {
    res.render('goals/entries', {
      'allGoals': listOfAllGoals,
      'incompleteGoals': listOfAllGoals.filter(goal => goal.isComplete === false),
      'completeGoals': listOfAllGoals.filter(goal => goal.isComplete === true),
      'weekNumber': today.isoWeek(),
      'fromDate': today.startOf('isoWeek').format('ddd D MMM').toString(),
      'toDate': today.endOf('isoWeek').format('ddd D MMM').toString()
    })
    console.log('Promise resolved')
  }).catch(err => {
    console.log(`Promise rejected: ${err}`)
  })
}

exports.get_all_goals_for_current_week = async (req, res) => {
  const today = new Moment()
  const currentWeek = today.isoWeek()
  await db.getGoalsByWeekNumber(currentWeek).then(listOfAllGoals => {
    res.render('goals/entries', {
      'allGoals': listOfAllGoals,
      'incompleteGoals': listOfAllGoals.filter(goal => goal.isComplete === false),
      'completeGoals': listOfAllGoals.filter(goal => goal.isComplete === true),
      'weekNumber': currentWeek,
      'fromDate': today.startOf('isoWeek').format('ddd D MMM').toString(),
      'toDate': today.endOf('isoWeek').format('ddd D MMM').toString()
    })
    console.log('Promise resolved')
  }).catch(err => {
    console.log(`Promise rejected: ${err}`)
  })
}

exports.get_all_goals_by_week_number = async (req, res) => {
  const today = new Moment()
  const weekNumber = Number(req.params.weekNumber)
  today.isoWeek(weekNumber)
  console.log(weekNumber)
  console.log(today.isoWeek())
  await db.getGoalsByWeekNumber(weekNumber).then(listOfAllGoals => {
    res.render('goals/entries', {
      'allGoals': listOfAllGoals,
      'incompleteGoals': listOfAllGoals.filter(goal => goal.isComplete === false),
      'completeGoals': listOfAllGoals.filter(goal => goal.isComplete === true),
      'weekNumber': weekNumber,
      'fromDate': today.startOf('isoWeek').format('ddd D MMM').toString(),
      'toDate': today.endOf('isoWeek').format('ddd D MMM').toString()
    })
    console.log('Promise resolved')
  }).catch(err => {
    console.log(`Promise rejected: ${err}`)
  })
}

exports.show_new_entry = (req, res) => {
  res.render('goals/new')
}

exports.post_new_entry = async (req, res) => {
  if (!req.body.content) {
    res.status(400).send('Goal must contain content');
    return;
  }

  await db.createEntry(req.body.user, req.body.content, false, req.body.date);
  res.redirect('/');
}

exports.remove_entry = async (req, res) => {
  if (!req.params._id) {
    res.status(400).send('No goal id provided');
    return;
  }

  await db.removeEntry(req.params._id)
  res.redirect('/');
}

exports.update_entry_status = async (req, res) => {
  const id = req.params._id
  if (!id) {
    res.status(400).send('No goal id provided');
    return;
  }

  const goal = await db.getGoalById(id)
  const status =  goal.isComplete
  await db.updateEntryCompletionStatus(id, !status)
  res.redirect('/');
}

exports.show_update_entry = async (req, res) => {
  const id = req.params._id
  const goal = await db.getGoalById(id)
  res.render('goals/update', {
    'user': goal.user,
    'content': goal.content
  })
}

exports.post_update_entry = (req, res) => {
  if (!req.body.content) {
    res.status(400).send('Goal must contain content');
    return;
  }

  db.updateEntry(req.params._id, req.body.user, req.body.content);
  res.redirect('/');
}