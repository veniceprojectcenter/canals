L.ArrowLine = L.Path.extend({
	options: {
		fill: true
	},
	
	initialize: function (latlng, angle, length, options) {
		L.Path.prototype.initialize.call(this, options);

		this._latlng = latlng;
		this._mAngle = angle;
		this._mLength = length;
		this._mHeadVisible = true;
	},

	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);
		return this.redraw();
	},

	setAngle: function (angle) {
		this._mAngle = angle;
		return this.redraw();
	},

	setLength: function (length) {
		this._mLength = length;
		return this.redraw();
	},

	setHeadVisible: function (headVisible) {
		this._mHeadVisible = headVisible;
		return this.redraw();
	},
	
	getLatLng: function () {
		return this._latlng;
	},
	
	getAngle: function () {
		return this._mAngle;
	},
	
	getLength: function () {
		return this._mLength;
	},
	
	getHeadVisible: function () {
		return this._mHeadVisible;
	},

	projectLatlngs: function () {
		var latlng = this._latlng,
		    pointTop = this._map.latLngToLayerPoint([latlng.lat+this.getLength()/2, latlng.lng]),
		    pointBottom = this._map.latLngToLayerPoint([latlng.lat-this.getLength()/2, latlng.lng]);
		this._length = pointBottom.y - pointTop.y;
		this._point = this._map.latLngToLayerPoint(latlng);
	},

	getBounds: function () {
		var latlng = this._latlng;

		return new L.LatLngBounds(
		        [latlng.lat - 0.01, latlng.lng - 0.01],
		        [latlng.lat + 0.01, latlng.lng + 0.01]);
	},


	getPathString: function () {
		var l = this._length,
			p = this._point,
			a = this.getAngle(),
			w =  0.00004*l/this.getLength(),//line width
			aA = Math.PI/4,//arrow angle
			aW = 0.00004*l/this.getLength(),//arrow line width
			aL = 0.0002*l/this.getLength(),//arrow line length
			aExtend = aW/Math.sin(aA)+w/(2*Math.tan(aA));//extension of line length for arrow
			
		var bL = p.add([Math.cos(a)*l/2 + Math.sin(a)*w/2, -Math.sin(a)*l/2 + Math.cos(a)*w/2]);
		var bR = p.add([Math.cos(a)*l/2 - Math.sin(a)*w/2, -Math.sin(a)*l/2 - Math.cos(a)*w/2]);
		
		var tL = p.add([-Math.cos(a)*l/2 + Math.sin(a)*w/2, Math.sin(a)*l/2 + Math.cos(a)*w/2]);
		var tR = p.add([-Math.cos(a)*l/2 - Math.sin(a)*w/2, Math.sin(a)*l/2 - Math.cos(a)*w/2]);
		
		var hBL = tL.add([-Math.cos(Math.PI-aA+a)*aL, Math.sin(Math.PI-aA+a)*aL]);
		var hBR = tR.add([-Math.cos(a+aA-Math.PI)*aL, Math.sin(a+aA-Math.PI)*aL]);
		
		var hTL = hBL.add([-Math.cos(Math.PI/2-aA+a)*aW, Math.sin(Math.PI/2-aA+a)*aW]);
		var hTR = hBR.add([-Math.cos(a+aA-Math.PI/2)*aW, Math.sin(a+aA-Math.PI/2)*aW]);
		
		var hT = p.add([-Math.cos(a)*(l/2+aExtend), Math.sin(a)*(l/2+aExtend)]);
		
		if (L.Browser.svg) {
			var result = 'M' + bL.x + ',' + bL.y +
					'L' + bR.x + ',' + bR.y +
					'L' + tR.x + ',' + tR.y;
			if(this.getHeadVisible())
				result +='L' + hBR.x + ',' + hBR.y +
						'L' + hTR.x + ',' + hTR.y +
						'L' + hT.x + ',' + hT.y +
						'L' + hTL.x + ',' + hTL.y +
						'L' + hBL.x + ',' + hBL.y;
					
			result += 'L' + tL.x + ',' + tL.y +
					'z';
			return result;
		}
	}
});