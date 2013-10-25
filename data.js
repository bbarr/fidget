var data = this.data = {

  intervals: [ 15, 30, 45, 60 ],

  actions: [
    { name: 'pushups' },
    { name: 'situps' },
    { name: 'jumping jacks' },
    { name: 'plank' }
  ],

  setTemplates: [
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
  ],

  user: {
    set: 'easy',
    interval: 15
  }
}

this.data.sets = this.data.setTemplates.map(function(set) {
  return _.extend(_.clone(set), {
    actions: set.actions.map(function(action) {
      return [ action[0], _.find(data.actions, { name: action[1] }) ] 
    })
  })
})

