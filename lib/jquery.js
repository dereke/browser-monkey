var jquery = require('jquery')
function dispatchEvent (element, eventType) {
  var event

  if (eventType === 'click') {
    element.click()
  } else {
    if (document.createEvent) {
      event = document.createEvent('Event')
      event.initEvent(eventType, true, true)
      element.dispatchEvent(event)
    } else {
      event = document.createEventObject()
      event.eventType = eventType
      event.eventName = eventType
      element.fireEvent('on' + event.eventType, event)
    }
  }
}

if (jquery.fn) {
  jquery.fn.extend({
    innerText: function () {
      var el = this[0].body || this[0]
      return el.innerText || el.textContent
    },

    trigger: function (eventType) {
      for (var i = 0; i < this.length; i++) {
        var element = this[i]
        if (eventType === 'submit' && element.form) {
          if (!jquery.preventFormSubmit) {
            element.form.submit()
          }
          dispatchEvent(element.form, eventType)
        } else {
          dispatchEvent(element, eventType)
        }
      }

      return this
    },

    on: function (eventType, cb) {
      for (var i = 0; i < this.length; i++) {
        var element = this[i]
        element.addEventListener(eventType, cb, false)
      }
      return this
    },

    focus: function () {
      for (var i = 0; i < this.length; i++) {
        var element = this[i]
        element.focus()
      }
      return this
    }
  })
}

module.exports = jquery
