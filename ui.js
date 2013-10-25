this.ui = (function() {

  var $sections = $('section')
  var $declaration = $('#declaration')
  var $setSelect = $declaration.find('.sets')
  var $intervalSelect = $declaration.find('.intervals')
  var $nav = $('nav')
  var $navButtons = $nav.find('button')

  return {

    render: {

      nav: function() {
        $navButtons.click(ui.events.menuClicked)
      },

      declaration: function(user, sets, intervals) {

        var html = [
          "<p>I want to do something ",
            "<select>",
              sets.map(function(set) { return "<option>" + set.name + "</option>" }),
            "</select>",
            " every ",
            "<select>",
              intervals.map(function(i) { return "<option>" + i + "</option>" }),
            "</select>",
            " minutes.",
          "</p>",
          "<button>pause</button>"
        ].join('')

        $sections.hide()
        $declaration.html(html).show()

        $declaration.find('button').click(ui.events.togglePause.bind(null, user))
      },

      actor: function() {

      }
    },

    events: {

      menuClicked: function(e) {
        e.preventDefault()
        var section = e.target.getAttribute('rel')
        ui.render[section]()
      },
      
      togglePause: function(user, e) {
        e.preventDefault()
        if (user.paused) {
          user.paused = false
          e.target.innerHTML = 'pause'
          $declaration.removeClass('paused')
        } else {
          user.paused = true
          e.target.innerHTML = 'resume'
          $declaration.addClass('paused')
        }
      }
    }
  }
})()
