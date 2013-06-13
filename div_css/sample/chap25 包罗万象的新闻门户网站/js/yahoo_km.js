			
	var YoData;
	var getCount = 0;
	
	function randRang(under, over){ 
		
		switch(arguments.length){ 
			case 1: return parseInt(Math.random()*under+1); 
			case 2: return parseInt(Math.random()*(over-under+1) + under); 
			default: return 0; 
		} 
		
	}	
	
	function YahooKm () {	

		var keyWord = '';
		var yahooUrl = 'http://tw.knowledge.yahooapis.com/v1/SEARCH?appid=k5ku.jXV34G8t_2X4P7WpJjNWW95I6zccnJ4rNRIPQHYpcioG0BovpCUJ03fUP0E&p=' 		
		var searchScope = 'content';
		var kmType = '0';
		var page = '1';
		var bigCat = '';
		var middleCat = '';
		var smallCat = '';
		var excludeWord = '';
		var askTime = '';
		var prate = '';
		var s = '';

		this.setKeyWord = function(){
			
			var arg = arguments;
			if (typeof(arg[0]) != 'string')
				return false;			
			keyWord = arg[0];
			
		};
		
		this.setS = function(){
			
			var arg = arguments;
			if (typeof(arg[0]) != 'string')
				return false;			
			s = arg[0];
			
		};
		
		this.setSearchScope = function(){
			
			var arg = arguments;
			if (typeof(arg[0]) != 'string')
				return false;			
			searchScope = arg[0];
			
		};
		
		this.setKmType = function(){
	
			var arg = arguments;
			if (typeof(arg[0]) != 'number')
				return false;			
			if (arg[0] < 0 || arg[0] > 4)
				return false;			
				
			kmType = arg[0];
			
		};
		
		this.setPage = function(){
			
			var arg = arguments;
			if (typeof(arg[0]) != 'number')
				return false;			
			page = arg[0];
			
		};
		
		this.setBigCat = function(){
			
			var arg = arguments;
			if (typeof(arg[0]) != 'number')
				return false;			
			bigCat = arg[0];
			
		};
		
		this.setMiddleCat = function(){
			
			var arg = arguments;
			if (typeof(arg[0]) != 'number')
				return false;			
			middleCat = arg[0];			
			
		};
		
		this.setSmallCat = function(){
			
			var arg = arguments;
			if (typeof(arg[0]) != 'number')
				return false;			
			smallCat = arg[0];
			
		};
		
		this.setAskTime  = function(){
			
			var arg = arguments;
			if (typeof(arg[0]) != 'number')
				return false;	
				
			if (arg[0] < 7 || arg[0] > 11)
				return false;				
			askTime = arg[0];				
		};
		
		this.setPrate  = function(){
			
			var arg = arguments;
			if (typeof(arg[0]) != 'number')
				return false;			
			if (arg[0] < 6 || arg[0] > 9)
				return false;				
			prate = arg[0];

		};
		
		this.setExcludeWord = function(){
			
			var arg = arguments;
			if (typeof(arg[0]) != 'string')
				return false;			
			excludeWord = arg[0];
			
		};
		
		this.getData = function(){
			
			var arg = arguments;
			if (typeof(arg[0]) != 'number')
				getCount = 10;
			else			
				getCount = arg[0];							
										
			yahooUrl = yahooUrl + keyWord;
			
			if (typeof(s) == 'string')
				yahooUrl = yahooUrl + '&s=' + s;
			
			if (typeof(searchScope) == 'string')
				yahooUrl = yahooUrl + '&scope=' + searchScope;
				
			if (typeof(kmType) == 'number' && (kmType >= 0 || kmType <= 4))
				yahooUrl = yahooUrl + '&tab=' + kmType;
				
			if (typeof(page) == 'number')
				yahooUrl = yahooUrl + '&cp=' + page;
								
			if (typeof(bigCat) == 'number')
				yahooUrl = yahooUrl + '&mc=' + bigCat;
				
			if (typeof(middleCat) == 'number')
				yahooUrl = yahooUrl + '&sc=' + middleCat;
				
			if (typeof(smallCat) == 'number')
				yahooUrl = yahooUrl + '&catid=' + smallCat;
				
			if (excludeWord != '')
				yahooUrl = yahooUrl + '&kf=' + decodeURIComponent(excludeWord);
				
			if (typeof(askTime) == 'number' && (askTime >= 7 || askTime <= 11))
				yahooUrl = yahooUrl + '&asktime=' + askTime;
				
			if (typeof(prate) == 'number' && (prate >= 6 || prate <= 9))
				yahooUrl = yahooUrl + '&prate=' + prate;															
				
			yahooUrl = yahooUrl + '&format=json&callback=ws_results';  
												
			if (document.getElementById('script1') != null){
  			var sc = document.getElementById('script1');  	
  			document.body.removeChild(sc);  
  			script1 = null; 	  			
  		}  	
  		
  		if (document.getElementById('script2') != null){
  			var sc = document.getElementById('script2');  	
  			document.body.removeChild(sc);  
  			script2 = null; 	  			
  		}  	
	  	
	  	var script2 = document.createElement("script");
	  	script2.setAttribute('id','script2'); 
	  	script2.setAttribute('type','text/javascript');
			script2.text = 'function ws_results(obj){' +	
		 	'var allYoData = obj.SearchResult.Results;' +	 	
	 	  'if (obj.SearchResult.Results.length < getCount && getCount > 0){' +
	 			'YoData = allYoData.splice(0, getCount);' +
	 	  '}else if (obj.SearchResult.Results.length > getCount && getCount > 0){' +
	 			'for (var i =0;i<getCount;i++){' +
	 				'var aNum = randRang(0,allYoData.length-1);' +
					'var aAry = allYoData.splice(aNum, 1);' +
	 				'if (typeof(YoData) == "undefined"){' +
	 					'YoData = aAry;' +
	 				'}else{' +
	 					'YoData = YoData.concat(aAry);}' +	 				
	 			'}' +	
	 	  '}else{' +
	 			'YoData = allYoData;}try{show();}catch(e){};' +	 		
	 		'}';			 		
			document.body.appendChild(script2); 
			
			var script1 = document.createElement("script"); 
			script2.setAttribute('id','script1'); 
	  	script1.setAttribute('type','text/javascript');
			script1.setAttribute('src', yahooUrl);		
			document.body.appendChild(script1); 								
		};
		
		this.getYoUrl = function(){
			return yahooUrl;
		};	
		
		this.setShow = function(){		
			var arg = arguments;
			if (typeof(arg[0]) == null)	
				return false
			try{
				show = eval(arg[0]);
			}catch(e){}
		};
				
	}
	
	function show(){}
	