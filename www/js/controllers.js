angular.module('calculator.controllers', [])

.controller('MainCtrl', ['$scope','$stateParams', '$timeout', '$rootScope','History',function($scope, $stateParams, $timeout, $rootScope, History){
	$scope.input = "0";
	$scope.start = true;
	$scope.reset = function() {
			$scope.input = "0";
			$scope.start = !$scope.start;
	};
	$scope.calculations = History.all();

	$scope.write = function(c) {
			if($scope.start){
				$scope.input = "";
				$scope.start = !$scope.start;
			}
			$scope.input += c;
	};
		calculScope = $rootScope.$new();
		$scope.calculate = function() {
			try{
				regexp = /^[0-9+%\-()^*/ .]+$/;
				if (!regexp.test($scope.input)) {
					throw new Error();
				} 
				result = calculScope.$eval($scope.input);
				var calculation = History.newCalculation($scope.input, result);
				console.log(calculation);
				$scope.input = result;
				$scope.calculations.push(calculation);
				History.save($scope.calculations);
			}catch (error) {
				$scope.error = "Invalid calculation";
			}
		};
			
		timer = null;
		$scope.$watch('error', function(timer) {
			if (timer) {
				$timeout.cancel(timer);
		 }
			timer = $timeout(function() {
				$scope.error = null
			})
			, 2000})
}])

.controller('HistoryCtrl', ['$scope','History', function($scope, History){
	$scope.calculations = History.all();
}])
