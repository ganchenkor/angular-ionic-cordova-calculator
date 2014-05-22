angular.module('calculator.services', [])

/**
 * A simple example service that returns some data.
 */

.factory('History', function() {
  return {
    all: function() {
      var historyString = window.localStorage['calculations'];
      if(historyString) {
        return angular.fromJson(historyString);
      }
      return [];
    },
    save: function(calculations) {
      window.localStorage['calculations'] = angular.toJson(calculations);
    },
    newCalculation: function(calculation, value) {
      // Add a new project
      return {
        expression: calculation,
        output: value
      };
    }
  }
})
