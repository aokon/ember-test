//= require jquery
//= require development/ember
//= require development/ember-data
//= require ember-qunit

//= require main_include

//= require_tree ./integration

EmberTest.Resolver = Ember.DefaultResolver.extend({namespace: EmberTest})
  setResolver(EmberTest.Resolver.create());

var d = document;
d.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');
d.write('<style>#ember-testing-container { position: absolute; background: white; bottom: 0; right: 0; width: 640px; height: 384px; overflow: auto; z-index: 9999; border: 1px solid #ccc; } #ember-testing { zoom: 50%; }</style>');

__karma__.loaded = function() {};

EmberTest.rootElement = '#ember-testing';
EmberTest.setupForTesting();
EmberTest.injectTestHelpers();

//this gate/check is required given that standard practice in Ember tests to is to call
////Ember.reset() in the afterEach/tearDown for each test.  Doing so, causes the application
////to 're-initialize', resulting in repeated calls to the initialize function below
var karma_started = false;

EmberTest.initializer({
  name: "run tests",
  initialize: function(container, application) {
    if (!karma_started) {
      karma_started = true;
      __karma__.start();
    }
  }
});
