window.addEvent('domready', function() {
	
	/* elements */
	var szNormal = 132, szSmall  = 110, szFull   = 190;
	var kwicks = $$('#topNavi .kwick');
	var fx = new Fx.Elements(kwicks, {wait: false, duration: 200, transition: Fx.Transitions.quadOut});
	kwicks.each(function(kwick, i){
		kwick.addEvent('mouseenter', function(e){
			var obj = {};
			obj[i] = {
				'width': [kwick.getStyle('width').toInt(), szFull]
			};
			kwicks.each(function(other, j){
				if (other != kwick){
					var w = other.getStyle('width').toInt();
					if (w != 50) obj[j] = {'width': [w, szSmall]};
				}
			});
			fx.start(obj);
		});
	});
		
	$('kwicks').addEvent('mouseleave', function(e){
		var obj = {};
		kwicks.each(function(other, j){
			obj[j] = {'width': [other.getStyle('width').toInt(), szNormal]};
		});
		fx.start(obj);
	});
	
	/* // elements */
	
	/* tooltips */
	var Tips1 = new Tips($$('.Tips1'));
	var Tips2 = new Tips($$('.Tips2'), {
		initialize:function(){
			this.fx = new Fx.Style(this.toolTip, 'opacity', {duration: 280, wait: false}).set(0);
		},
		onShow: function(toolTip) {
			this.fx.start(1);
		},
		onHide: function(toolTip) {
			this.fx.start(0);
		}
	});
	
	/* // tooltips */

});