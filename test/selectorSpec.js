var selector = require('..');
var expect = require('chai').expect;
var createTestDiv = require('./createTestDiv');
var $ = require('jquery');

describe('selector', function () {
  var div;

  beforeEach(function () {
    div = createTestDiv();
  });

  it('should eventually find an element', function () {
    var promise = selector.find('.element').exists();
    setTimeout(function () {
      $('<div class="element"></div>').appendTo(div);
    }, 200);
    return promise;
  });

  it('should eventually click an element', function () {
    var promise = selector.find('.element').click();
    var clicked = false;

    setTimeout(function () {
      $('<div class="element"></div>').click(function () {
        clicked = true;
      }).appendTo(div);
    }, 200);

    return promise.then(function () {
      expect(clicked).to.equal(true);
    });
  });

  it('should eventually enter text into an element', function () {
    var promise = selector.find('.element').typeIn('haha');
    var clicked = false;

    setTimeout(function () {
      $('<input type="text" class="element"></input>').appendTo(div);
    }, 200);

    return promise.then(function () {
      expect($(div).find('input.element').val()).to.equal('haha');
    });
  });

  it('eventually finds an element containing text', function () {
    var promise = selector.find('.element', {text: 'some t'}).exists();
    setTimeout(function () {
      $('<div class="element"><div>some text</div></div>').appendTo(div);
    }, 200);
    return promise;
  });

  it('eventually finds an element containing another element', function () {
    var promise = selector.find('.outer').containing('.inner').exists();
    setTimeout(function () {
      $('<div class="outer"><div>bad</div></div>').appendTo(div);
      $('<div class="outer"><div class="inner">good</div></div>').appendTo(div);
    }, 200);

    return promise.then(function (element) {
      expect($(element).text()).to.equal('good');
    });
  });

  it('can scope with an element', function () {
    var red = $('<div><div class="element">red</div></div>').appendTo(div);
    var blue = $('<div><div class="element">blue</div></div>').appendTo(div);

    return selector.scope(red).find('.element').exists().then(function (element) {
      expect($(element).text()).to.equal('red');
    }).then(function () {
      return selector.scope(blue).find('.element').exists();
    }).then(function (element) {
      expect($(element).text()).to.equal('blue');
    });
  });

  it('can scope with another finder', function () {
    var red = $('<div class="red"><div class="element">red</div></div>').appendTo(div);
    var blue = $('<div class="blue"><div class="element">blue</div></div>').appendTo(div);

    return selector.scope(selector.find('.red')).find('.element').exists().then(function (element) {
      expect($(element).text()).to.equal('red');
    }).then(function () {
      return selector.scope(selector.find('.blue')).find('.element').exists();
    }).then(function (element) {
      expect($(element).text()).to.equal('blue');
    });
  });

  describe('extend', function () {
    it('can return new selectors by extending', function () {
      var user = selector.extend({
        name: function () {
          return this.find('.user-name');
        },

        address: function () {
          return this.find('.user-address');
        }
      });

      var promise = user.name().exists();

      setTimeout(function () {
        $('<div class="user"><div class="user-name">bob</div><div class="user-address">bob\'s address</div></div>').appendTo(div);
      }, 50);

      return promise;
    });

    it('can return new scoped selectors', function () {
      var admin = selector.extend({
        user: function () {
          return user.scope(this.find('.user'));
        }
      });

      var user = selector.extend({
        name: function () {
          return this.find('.user-name');
        },

        address: function () {
          return this.find('.user-address');
        }
      });

      var promise = admin.user().name().exists();

      setTimeout(function () {
        $('<div class="user"><div class="user-name">bob</div><div class="user-address">bob\'s address</div></div>').appendTo(div);
      }, 50);

      return promise;
    });
  });
});
