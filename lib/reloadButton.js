var hobostyle = require('hobostyle')
var extend = require('lowscore/extend')

module.exports = function reloadButton (_options) {
  var options = extend({
    style: true,
    class: 'browser-monkey-reload'
  }, _options || {})

  if (options.style) {
    hobostyle.style(
      '.' + options['class'] + ' {' +
        'z-index: 1000;' +
        'position: fixed;' +
        'right: 5px;' +
        'bottom: 5px;' +
        'background-color: rgba(255, 255, 255, 0.85);' +
        'padding: 5px 10px;' +
        'text-decoration: none;' +
        'color: #444444;' +
        'font-family: "Open Sans", sans-serif;' +
      '}' +
      '.' + options['class'] + ':hover {' +
        'color: black;' +
        'box-shadow: rgba(0, 0, 0, 0.15) 2px 2px 5px;' +
      '}')
  }

  var existingLinks = document.querySelectorAll('a.' + options['class'])
  ;[].forEach.call(existingLinks, function (link) {
    document.body.removeChild(link)
  })

  var link = document.createElement('a')
  link.className = options['class']
  link.href = window.location.href
  link.innerText = '⟳ reload'

  document.body.appendChild(link)
}
