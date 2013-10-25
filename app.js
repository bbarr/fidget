
(function() {

  function setByName(name) { return _.find(setTemplates, { name: name }) }
  function actionByName(name) { return _.find(actions, { name: name }) }

  var models = {}
  var collections = {}
  var views = {}

  var state = new Backbone.Model

  views.Nav = Backbone.View.extend({

    el: 'nav',

    events: {
      'click button': 'showSection'
    },

    showSection: function(e) {
      e.preventDefault()
      var sectionName = e.currentTarget.getAttribute('rel')
      state.set('section', sectionName)
    },

    highlight: function(state) {
      this.$buttons.removeClass(this.activeClass)
      this.$el.find('[rel=' + state.get('section') + ']').addClass(this.activeClass)
    },
    
    initialize: function() {
      this.activeClass = 'active'
      this.$buttons = this.$el.find('button')
      state.on('change:section', this.highlight, this)
    }
  })

  views.Dashboard = Backbone.View.extend({

    el: '#dashboard',

    events: {
      'change select.list': 'setList',
      'change select.interval': 'setInterval',
      'click button': 'togglePaused'
    },

    togglePaused: function(e) {
      e.preventDefault()
      state.set('paused', !state.get('paused'))
    },

    setList: function(e) {
      state.set('list', e.currentTarget.value)
    },

    setInterval: function(e) {
      state.set('interval', e.currentTarget.value)
    },

    initialize: function() {
      state.on('change:section', this.showOrHide, this)
      state.on('change:paused', this.updateButtonText, this)
      this.render(state.get('lists'), state.get('intervals'))
      this.$button = this.$el.find('button')
    },

    updateButtonText: function() {
      if (state.get('paused')) {
        this.$button.text('resume')
      } else {
        this.$button.text('pause')
      }
    },

    render: function(lists, intervals) {
      var html = [
        "<p>I want to do something ",
          "<select class='list'>",
            lists.map(function(list) { return "<option>" + list.name + "</option>" }),
          "</select>",
          " every ",
          "<select class='interval'>",
            intervals.map(function(i) { return "<option>" + i + "</option>" }),
          "</select>",
          " minutes.",
        "</p>",
        "<button>pause</button>"
      ].join('')
      this.$el.html(html)
    },

    showOrHide: function(state) {
      if (state.get('section') == 'dashboard') {
        this.$el.show()
      } else {
        this.$el.hide()
      }
    }
  })

  views.Settings = Backbone.View.extend({
    el: '#settings',
    initialize: function() {
      state.on('change:section', this.showOrHide, this)
    },
    showOrHide: function(state) {
      if (state.get('section') == 'settings') {
        this.$el.show()
      } else {
        this.$el.hide()
      }
    }
  })

  views.Lists = Backbone.View.extend({
    el: '#lists',
    initialize: function() {
      state.on('change:section', this.showOrHide, this)
    },
    showOrHide: function(state) {
      if (state.get('section') == 'lists') {
        this.$el.show()
      } else {
        this.$el.hide()
      }
    }
  })

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

  var actions = [
    { name: 'pushups' },
    { name: 'situps' },
    { name: 'jumping jacks' },
    { name: 'plank' }
  ]

  state.set('lists', lists.map(function(set) {
    return _.extend(_.clone(set), {
      actions: set.actions.map(function(action) {
        return [ action[0], _.find(actions, { name: action[1] }) ] 
      })
    })
  }))

  state.set('intervals', [ 15, 30, 45, 60 ])

  new views.Nav
  new views.Dashboard
  new views.Settings
  new views.Lists

  window.state = state;

  state.set('section', 'dashboard')

  state.on('change', function() { console.log(state.attributes); })
})()
