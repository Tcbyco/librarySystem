/* This is a modified version of tinytest.js. Tiny test was created by 
 * Joe Walnes, and I've included his comments and intro below. This version  
 * (simpleTest), was written by Gordon Zhu as part of his online
 * teaching material for test driven development. The main difference
 * between the two is that the console error output is more descriptive,
 * and the number of tests (broken down into success and failure count)
 * are also displayed to the screen when the page is loaded. 
 * I've also added some comments of my own, and changed the eq() function to test
 * for strict equality, rather than coercive equality.
 * - Toby 
 * 
 * 
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */
 
var TinyTestHelper = {
  renderStats: function(tests, failures) {
    var numberOfTests = Object.keys(tests).length;
    var successes = numberOfTests - failures;
    var summaryString = 'Ran ' + numberOfTests + ' tests: ' 
                        + successes + ' successes, ' 
                        + failures + ' failures.';

    var summaryElement = document.createElement("h1");
    summaryElement.textContent = summaryString;
    document.body.appendChild(summaryElement);
  }
}

var TinyTest = {

  run: function(tests) {
      var failures = 0;
      // Each property name on the test object is a test decription.
      for (var testName in tests) {
          // Assign each test method to a variable.
          var testAction = tests[testName];
          try {
              // Run each method, with this set to TinyTest
              testAction.apply(this);
              console.log('%c' + testName, "color: green;");
          } catch (e) {
              // Counting failure, not success.
              failures++;
              // Store error in collapsed group with title set to test name.
              console.groupCollapsed('%c' + testName, "color: red;");
              console.error(e.stack);
              console.groupEnd();
          }
      }
      setTimeout(function() { // Give document a chance to complete
          if (window.document && document.body) {
              document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
              TinyTestHelper.renderStats(tests, failures);
          }
      }, 0);
  },

  fail: function(msg) {
      throw new Error('fail(): ' + msg);
  },

  assert: function(value, msg) {
      if (!value) {
          throw new Error('assert(): ' + msg);
      }
  },

  assertEquals: function(expected, actual) {
      if (expected != actual) {
          throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
      }
  },

  assertStrictEquals: function(expected, actual) {
      if (expected !== actual) {
          throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
      }
  },

};
// I changed eq to assert strict equals rather than assert equals.

var fail               = TinyTest.fail.bind(TinyTest),
  assert             = TinyTest.assert.bind(TinyTest),
  assertEquals       = TinyTest.assertEquals.bind(TinyTest),
  eq                 = TinyTest.assertStrictEquals.bind(TinyTest), // alias for assertStrictEquals
  assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
  tests              = TinyTest.run.bind(TinyTest);
