/*
	SlideItMoo v1.0 - Image slider
	(c) 2007-2008 Constantin Boiangiu <http://www.php-help.ro>
	MIT-style license.
*/
var SlideItMoo = new Class({
					   
	initialize: function(options){
		this.options = $extend({
			itemsVisible:4,
			showControls:1,
			autoSlide: 8000,
			transition: Fx.Transitions.linear,
			currentElement: 0,
			thumbsContainer: 'thumbs',
			elementScrolled: 'thumb_container',
			overallContainer: 'gallery_container'
		},options || {});	
		
		this.images = $(this.options.thumbsContainer).getElements('span');
		// assumes that all thumbnails have the same width
		this.image_size = this.images[0].getSize();
		this.pos = 'min';
		//console.log(this.image_size);
		//console.log(this.images.length);
		
		// resizes the container div's according to the number of itemsVisible thumbnails
		this.setContainersSize();
		
		this.myFx = new Fx.Scroll(this.options.elementScrolled,{ transition: this.options.transition });
		//onComplete check if the button should be disabled
		this.myFx.addEvent('onComplete', function() {
			if(this.options.currentElement < 1)
			{
				this.bkwd.setStyle('opacity',0.1);
				//console.log('active =');
			}
			else if(this.options.currentElement >= this.images.length-this.options.itemsVisible)
			{
				this.fwd.setStyle('opacity',0.1);
				//console.log('active2 =');
			}
			else
			{
				this.fwd.setStyle('opacity',0.5);
				this.bkwd.setStyle('opacity',0.5);
			};
		}.bind(this));
		
		// adds the forward-backward buttons
		if( this.images.length > this.options.itemsVisible ){
			this.fwd = this.addControlers('addfwd');
			this.bkwd = this.addControlers('addbkwd');
			this.forward();
			this.backward();
			/* if autoSlide is not set, scoll on mouse wheel */
			if( !this.options.autoSlide ){
				$(this.options.thumbsContainer).addEvent('mousewheel', function(ev){
					new Event(ev).stop();
					ev.wheel < 0 ? this.fwd.fireEvent('click') : this.bkwd.fireEvent('click');
					//console.log('mouse wheel');
				}.bind(this));
			}
			else{
				this.startIt = function()
				{
					if(this.options.currentElement == this.images.length-this.options.itemsVisible)
					{
						this.pos = 'max';
						//console.log('top');
						//console.log(this.options.currentElement);
					}
					else if(this.options.currentElement == 0)
					{
						this.pos = 'min';
						//console.log('bottom');
						//console.log(this.options.currentElement);
					};
					
					if(this.pos == 'min')
					{
						//console.log('min');
						this.fwd.fireEvent('click');
					}
					else if(this.pos == 'max')
					{
						//console.log('max');
						this.bkwd.fireEvent('click');
					};
					//console.log('periodical');
				}.bind(this);
				this.autoSlide = this.startIt.periodical(this.options.autoSlide, this);
				this.images.addEvents({
					'mouseover':function(){
						$clear(this.autoSlide);
					}.bind(this),
					'mouseout':function(){
						this.autoSlide = this.startIt.periodical(this.options.autoSlide, this);
					}.bind(this)
				})
			}
		};
		
		// if there's a specific default thumbnail to start with, slide to it
		if( this.options.currentElement!=0 )
		{
			this.options.currentElement-=1;
			this.slide(1);
			//console.log('going to initial item');
		}
	},
	
	setContainersSize: function(){
		$(this.options.overallContainer).set({
			styles:{
				'width': this.options.width
			}
		});
		$(this.options.elementScrolled).set({
			styles:{
				'width': this.options.width
			}
		});
	},
	
	forward: function(){				
		//add event listener
		this.fwd.addEvents
		({
		 	'click': function()
			{
				//console.log('clicking forwards');
				//console.log(this.options.currentElement);
				if(this.options.currentElement <= (this.images.length-this.options.itemsVisible)-1)
				{
					this.slide(1);
				};
			}.bind(this),
			'mouseenter': function()
			{
				if(this.options.autoSlide)
				{
					$clear(this.autoSlide);
				};
				if(this.options.currentElement <= (this.images.length-this.options.itemsVisible)-1)
				{
					changeStyle(this.fwd,'opacity',1,200,Fx.Transitions.Cubic.easeIn);
				};
			}.bind(this),
			'mouseleave': function()
			{
				if(this.options.autoSlide)
				{
					this.autoSlide = this.startIt.periodical(this.options.autoSlide, this);
				};
				if(this.options.currentElement <= (this.images.length-this.options.itemsVisible)-1)
				{
					changeStyle(this.fwd,'opacity',0.5,400,Fx.Transitions.Cubic.easeOut);
				};
			}.bind(this)
		});
	},
	
	backward: function(){			
		//add event listener
		this.bkwd.addEvents
		({
		 	'click': function()
			{
				//console.log('clicking backwards');
				//console.log(this.options.currentElement);
				this.slide(-1);
			}.bind(this),
			'mouseenter': function()
			{
				if(this.options.autoSlide)
				{
					$clear(this.autoSlide);
				};
				if(this.options.currentElement > 0)
				{
					changeStyle(this.bkwd,'opacity',1,200,Fx.Transitions.Cubic.easeIn);
				};
			}.bind(this),
			'mouseleave': function()
			{
				if(this.options.autoSlide)
				{
					this.autoSlide = this.startIt.periodical(this.options.autoSlide, this);
				};
				if(this.options.currentElement > 0)
				{
					changeStyle(this.bkwd,'opacity',0.5,400,Fx.Transitions.Cubic.easeOut);
				};
			}.bind(this)
		});
	},
	
	addControlers: function(cssClass){
		element = new Element('div',{
			'class': cssClass,
			styles:{
				'display': this.options.showControls ? '' : 'none',
				'opacity': 0.5
			}
		}).injectInside($(this.options.overallContainer));
		return element;
	},
	
	slide: function(step){
		/* if autoslice is on, when end is reached, go back to begining */
		/*if(this.options.autoSlide && this.options.currentElement >= this.images.length-this.options.itemsVisible ){
			this.options.currentElement = -1;
		}*/
		
		//console.log('very first step= '+step);
		
		if( ( this.options.currentElement < this.images.length-this.options.itemsVisible && step>0 ) || ( step < 0 && this.options.currentElement !== 0 ) )
		{
			//console.log('strange loop');
			//console.log('this.options.currentElement= '+this.options.currentElement);
			//console.log('this.images.length-this.options.itemsVisible= '+(this.images.length-this.options.itemsVisible));
			//console.log('step= '+step);
			
			this.myFx.cancel();
			this.options.currentElement += step;		
			this.myFx.toElement( this.images[this.options.currentElement] );
			//console.log('new step= '+step);
		}
	}
});

//useful functions
function changeStyle(el,style,css,dura,trans)
{
	el.set('tween',{duration:dura,transition:trans,link:'cancel'}).tween(style,css);
};