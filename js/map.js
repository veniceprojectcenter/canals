angular.module('canalapp').controller('MapCtrl', ['$scope', '$compile', '$q', 'ckConsole', 'ckConsoleMap', '$location', function($scope, $compile, $q, ckConsole, ckConsoleMap, $location){
	/* Displays question mark and vpc logo */
	// function createBrandBox(){
	// 	var info = L.control({position: "bottomleft"});
	// 	info.onAdd = function (map) {
	// 		var htmlContent = '<div class="info" style="width:auto;">'+
	// 			'<span ng-click="showAbout()"><img src="about.png" style="padding-right:7px;cursor:pointer;"></span>'+
	// 			'<a href="http://veniceprojectcenter.org"><img src="vpc25logo.png"></a>'+
	// 			'</div>';
	// 		$scope.compiled = $compile(htmlContent)($scope);
	// 		this._content = $scope.compiled[0];
	// 		return this._content;
	// 	};
	// 	return info;
	// }
	
	$scope.showAbout = function (){
		$('#aboutPanel').show();
	}
	$scope.hideAbout = function (){
		$('#aboutPanel').hide();
	}
	
	$( document ).ready(function() {
		$('#loadingPanel').css('background-color','rgba(0,0,0,0.5)');
		$('#spinner').spin('large', '#fff');
		
		
		var htmlContent = '<span><div ng-include src="\'views/infopopup.html\'"></div></span>';
		var compiledPopup = $compile(htmlContent)($scope);
		$scope.infoPopup = L.popup().setContent(compiledPopup[0]);
		
		$scope.map = L.map("map-canvas", {minZoom: 14}).setView([45.436 , 12.334], 14);
		$scope.baseLayer = new L.TileLayer(
			'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			{ attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }
			).addTo($scope.map);
		L.control.scale().addTo($scope.map);
		// createBrandBox().addTo($scope.map);
		$('#aboutPanel').hide();
		
		$scope.layerControl = L.control.layers({"Map": $scope.baseLayer}, {}).addTo($scope.map);
		
		var styles = {
			"MERGE Ponti": {fillColor: '#FF0000',color: '#FF0000',
					fillOpacity: 1.0, weight: 8, opacity: 1.0},
			"MERGE Canal Segments":  {fillColor: '#00FF00',color: '#000000',
					fillOpacity: 1.0, weight: 1, opacity: 1.0},
			"MERGE Canals":  {fillColor: '#0000FF',color: '#0000FF',
					fillOpacity: 1.0, weight: 1, opacity: 1.0},
		};
		var names = {
			"MERGE Ponti": "Bridges",
			"MERGE Canal Segments":  "Canal Segments",
			"MERGE Canals":  "Canals",
		};
		ckConsoleMap.createMapLayersFromMapData($scope.map, ckConsole.getMap("map-408fc81f-c4ec-2ffe-b476-7290cdf8d9b3", true), function(groupname, layer){
			layer.setStyle(styles[groupname]);
			layer.on('click', showInfoBox);
			$scope.layerControl.addOverlay(layer.getLayer(), names[groupname]);
		}).then(function(map){
			console.log(map);
			$('#loadingPanel').hide();
			$('#spinner').spin(false);
		});
		
		
		function showInfoBox(e, member, marker, layer){
			$scope.popupLayer= layer;
			$scope.popupItem = member;
			$scope.$apply();//make sure to update popup before displaying it
			$scope.infoPopup.setLatLng(e.latlng).openOn($scope.map);
		}
		
		$scope.showMoreInfo = function(){
			$location.path('/moreInfo/'+$scope.popupLayer.properties.moreLink.id+'/'+$scope.popupItem.birth_certificate.ckID);
		}
		
		$scope.visitVenipedia = function(){
			var pageTitle = $scope.popupItem.data.wiki_friendly_title;
			window.open("http://venipedia.org/wiki/index.php?title="+pageTitle);
		}

		$scope.toAbout = function(){
	    $location.path('/about');
	  };
	});
}]);