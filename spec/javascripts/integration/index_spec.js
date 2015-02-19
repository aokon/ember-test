module("Integration: Index View", {
  afterEach: function() {
    EmberTest.reset();
  }
});


test("valid header", function (){
  visit("/");
});
