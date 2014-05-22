var ang
angular.module('calculator.controllers', [])

.controller('MainCtrl', ['$scope','$stateParams', '$timeout', '$rootScope',function($scope, $stateParams, $timeout, $rootScope){
	$scope.input = "0";
	$scope.start = true;
	$scope.reset = function() {
			$scope.input = "0";
			$scope.start = !$scope.start;
	};
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
//division by zero
//dobule submit
				result = calculScope.$eval($scope.input);
				console.log(result);
				$scope.input = result;
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
