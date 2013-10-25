
(function() {

  function setByName(name) { return _.find(setTemplates, { name: name }) }
  function actionByName(name) { return _.find(actions, { name: name }) }

  function promptAction(user, sets) {
    var set = setByName(user.plan)
    var action = _.sample(set.actions)
    ui.render.action(action)
  }

  function declare(user, sets, intervals) {
    ui.render.declaration(user, sets, intervals)
  }

  declare(data.user, data.sets, data.intervals)
})()
