(function() {

  function pad(number, width) {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join( '0' ) + number;
    }
    return number + "";
  }

  rivets.formatters.eq = function(a, b) {
    return a == b
  }

  rivets.formatters.ternary = function(val, a, b) {
    return val ? a : b
  }

  rivets.formatters.asTime = function(time) {
    var duration = moment.duration(time)
    return pad(duration.minutes(), 2) + ':' + pad(duration.seconds(), 2)
  }

  rivets.formatters.preventDefault = function(fn) {
    return function(e) {
      e.preventDefault()
      fn.apply(this, arguments)
    }
  }

  rivets.configure({
    handler: function(target, event, binding) {
      this.call(binding.model, event, target)
    }
  })

  rivets.adapters[':'] = {
    subscribe: function(obj, keypath, callback) {
      obj.on('change:' + keypath, callback)
    },
    unsubscribe: function(obj, keypath, callback) {
      obj.off('change:' + keypath, callback)
    },
    read: function(obj, keypath) {
      return obj.get(keypath)
    },
    publish: function(obj, keypath, value) {
      obj.set(keypath, value)
    }
  }

  var lists = [
    {
      name: 'easy',
      actions: [ 
        [ 10, 'pushups' ],
        [ 10, 'situps' ],
        [ 10, 'jumping jacks' ]
      ]
    },
    {
      name: 'moderate',
      actions: [ 
        [ 20, 'pushups' ],
        [ 20, 'plank' ],
        [ 20, 'jumping jacks' ]
      ]
    },
    {
      name: 'hard',
      actions: [ 
        [ 30, 'pushups' ],
        [ 30, 'situps' ],
        [ 30, 'plank' ]
      ]
    }
  ]

  var intervals = [ 15, 30, 45, 60 ]

  var actions = {
    pushups: {},
    situps: {},
    'jumping jacks': {},
    plank: { timed: true }
  }

  var app = new Backbone.Model;
  app.playOrPause = function() { this.set('paused', !this.get('paused')) }
  app.on('DING', function() {
    var listName = this.get('selectedList')
    var list = _.find(lists, { name: listName })
    var rawAction = _.sample(list.actions)
    var action = rawAction.concat([ actions[rawAction[1]] ])
    var message = [
      'Do ',
      action[0],
      action[2].timed ? ' seconds of ' : ' ',
      action[1]
    ].join('')
    app.set('prompt', message)
    app.reset()
  })
  app.reset = function() {
    app.trigger('change:selectedInterval')
    app.trigger('change:paused')
  }
  app.set('section', 'dashboard')
  app.set('intervals', intervals)
  app.set('lists', lists)

  var timer = new Backbone.Model();
  timer.step = function() {

    if (this.paused) {
      clearTimeout(this.timeout)
      return
    }

    var newCurrent = this.get('current') - 1000
    if (newCurrent < 0) return app.trigger('DING')

    this.set('current', newCurrent)
    this.timout = setTimeout(timer.step, 1000)

  }.bind(timer)

  app.on('change:paused', function() { 
    timer.paused = this.get('paused') 
    if (!timer.paused) timer.step();
  })

  app.on('change:selectedInterval', function() {
    app.timer.set('current', parseInt(app.get('selectedInterval')) * 60 * 1000)
  })

  app.timer = timer

  app.set('selectedInterval', intervals[0])
  app.set('selectedList', lists[0].name)
  app.set('paused', true)

  rivets.bind($('#wrapper'), app)

  window.app = app;
})()
