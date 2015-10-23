function dispatchEvent(el, type, char) {
  var event = document.createEvent("Events");
  event.initEvent(type, true, false);
  event.keyCode = event.charCode = char;
  el.dispatchEvent(event);
}

function sendkey(el, char) {
  dispatchEvent(el, "keydown", char);
  dispatchEvent(el, "keyup", char);
  dispatchEvent(el, "keypress", char);
  dispatchEvent(el, "input");
}

function sendkeys(el, text) {
  el.focus();
  if (el.setActive) {
    el.setActive();
  }

  var originalValue = el.value;

  var keyCombo = /<enter>/g;
  var enter = [];
  while ((match = keyCombo.exec(text)) != null) {
    enter.push(match.index);
  }

  if (text.length === 0) {
    sendkey(el, '');
    el.value = '';
  } else {
    for (var n = 0; n < text.length; ++n) {
      if (enter.length && enter[0] === n) {
        n = n+"<enter>".length-1;
        sendkey(el, 13);
      } else {
        var char = text[n];
        el.value =  el.value + char;
        sendkey(el, char.charCodeAt(0));
      }
    }
  }

  if (originalValue !== text){
    dispatchEvent(el, 'change');
  }
};

sendkeys.html = function(el, html) {
  el.innerHTML = html;
  dispatchEvent(el, "input");
};

module.exports = sendkeys;
