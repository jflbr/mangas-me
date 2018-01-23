
//
MangaInfo = {
  name		    : 'One Piece',
  description   : "Luffy veut devenir le roi des pirates!",
  lastChapterNo : 794,
  thumbnail     : "http://unofficial.gagshirts.com.my/wp-content/uploads/2013/02/one-piece-logo-thumbnail.jpg",
  imagePath		: '/images/lecture-en-ligne/one-piece',

  
  currentChapterNumber : 794,
  scanCount	 	 : 15,
  currentScan	 : 1,

};


Subscribed = [ {
		name   	  : 'One Piece',
		sources   : ['http://www.lirescan.com'],
		dirs 	  : ['/one-piece-lecture-en-ligne/'],
		imagePath: '/images/lecture-en-ligne/one-piece'
	}
];




app.factory('mangaDatakkk', ['$http','$q',function($websocket) {

	  function processData(rawHtml){
  		var myPromise = $q.defer();

		var tmp = document.implementation.createHTMLDocument();
	    tmp.body.innerHTML = response.data;

	    res   = tmp.getElementById('pagination');

	    list  = res.getElementsByTagName('li');

	    chapterBeforeLastStr = list[0].getElementsByTagName('a').item(0).innerHTML;
	    chapterBeforeLastStr = [ chapterBeforeLastStr.length -1 ];


		//fetchedManga.scanCount   = list.length - 2;
		//fetchedManga.lastChapter = parseInt(chapterBeforeLastStr)+1;

		myPromise.resolve({'count':list.length - 2, 'last':parseInt(chapterBeforeLastStr)});
		myPromise.$apply();

		return myPromise.promise; 
	  }

	  //Manga data
      var fetchedData = {};
      //Manga data collection
      var collection  = [];


      baseUrl = "http://www.lirescan.com/one-piece-lecture-en-ligne/";

      $.ajax( {
        url: baseUrl,
        type: "get",
        dataType: "html",
    	async:    true,
        success: function(data) {

        	var data_str = "";
        	alert("Success");
        	//alert(data);


    		if( (data.responseText === undefined) || (data.responseText === null) ){
	        	//alert( "data.responseText is null or undefined" );
	        	data_str = data;
            	collection.push( data );
            }
            else
            {
            	data_str = data.responseText;
            	collection.push( data.responseText );
            }
            //$scope.$apply();
        },    
        error: function(status) {
        	alert("Error - status : " + status);
        	
        }

        });

      var methods = {
        	collection: collection
    	};

      

      return methods;
     }]);


  





app.factory('mangaData_initial', ['$http','$q',
  function($http,$q) {

  	function request(mangaLink)
  	{
		//$().ready(function () {

    	baseUrl = "http://www.reddit.com/r/Python/comments/3ef1g1/how_to_do_web_scrapingeffectively/ions/14140914/how-to-use-socket-fetch-webpage-use-python";
    	baseUrl = "http://www.mangapanda.com/one-piece/793";
        baseUrl = "http://readms.com/r/one_piece/794/2860/5";
        baseUrl = "http://www.mangareader.net";
        baseUrl = "http://www.lirescan.com/one-piece-lecture-en-ligne/";
        baseUrl = mangaLink;
            	//baseUrl = "http://www.w3.org/TR/cors/";


        alert("mangaLink: "+ baseUrl);

    	$.ajax( {
        url: baseUrl,
        type: "get",
        dataType: "html",
    	async:    true,
        success: function(data) {

        	alert("Success");
        	alert(data);


    		if( (data === undefined) || (data === null) ){
	        	alert( "data is null or undefined" );
            	return -1
            }
            
            else if( (data.responseText === undefined) || (data.responseText === null) )
            {
	        	alert( "data.responseText is undefined or null" );
	        	if (typeof data === "string")
	        		alert(data.substring(0,50));
	        	else
	        	{
	        		tp = typeof data;
	        		alert("type of data is " + tp);
	        	}
            	return data;
            }
         
            else
            {
            	console.log(data.responseText);
            	return data.responseText;
			}
        },
        error: function(status) {
        	alert("Error: " + status);
        	return -1;
            //console.log("request error:"+url);
        }
    });
		//});//Ready

  	}



  	function requestdd(mangaLink)
  	{

    return 	$http.get( mangaLink ).success( function(response) {		

				var myPromise = $q.defer();

				var tmp = document.implementation.createHTMLDocument();
			    tmp.body.innerHTML = response.data;

			    res   = tmp.getElementById('pagination');

			    list  = res.getElementsByTagName('li');

			    chapterBeforeLastStr = list[0].getElementsByTagName('a').item(0).innerHTML;
			    chapterBeforeLastStr = [ chapterBeforeLastStr.length -1 ];


				//fetchedManga.scanCount   = list.length - 2;
				//fetchedManga.lastChapter = parseInt(chapterBeforeLastStr)+1;

				myPromise.resolve({'count':list.length - 2, 'last':parseInt(chapterBeforeLastStr)});
				myPromise.$apply();

				alert("ATTENTION LA PROMESSE ARRIVE");
				alert(myPromise.promise);

				return myPromise.promise; 

			}, true);  







  		
  	}
		
  	return {

  	getMangasList: function ()
  	{
  		mangaList 	  = [];
  	 	currentManga  = {};
  	 	wishList      = [{
				name   	  : 'One Piece',
				sources   : ['http://www.lirescan.com'],
				dirs 	  : ['/one-piece-lecture-en-ligne/'],
				imagePath : '/images/lecture-en-ligne/one-piece'
			}];



  		fetchedManga = {};
  		for (var k = wishList.length - 1; k >= 0; k--)
  		{
  			var manga = wishList[k];
  			var i = 0;
  			fetchedManga.name 	   = manga.name;
  			fetchedManga.imagePath = manga.imagePath;
  			//alert('name: ' + manga.name);
  			//alert('imagePath: ' + manga.sources);
  			//alert(manga.sources);

  			//for (var source in  manga.sources)
  		    for (var j = manga.sources.length - 1; j >= 0; j--)
  			{
  				var source = manga.sources[j];

  				if( source === 'http://www.lirescan.com' )
  				{
  					alert("source : www.lirescan.com");

  					fetchedManga.description = 'Unavailable';
  					mangaLink = source + manga.dirs[i];
   					
   					res = request(mangaLink);

				    if( (res === -1) || (res === ''))
				    {
						break;	
				    }


					var myPromise = $q.defer();
					var tmp = document.implementation.createHTMLDocument();
				    tmp.body.innerHTML = res;


   					alert( "foooooop" );
   					$foop = $('<form>' + res + '</form>');

   					alert( "foop: " + $foop);

   					$.each($foop.find("meta[content]"), function(idx, item) {
                		lnk = $(item).attr("content");
                			alert(lnk);
	            		});

   					fetchedManga.scanCount    = 0;
					fetchedManga.lastChapter  = 0;

   					//On parse ici!

					//fetchedManga.scanCount   = res.count;
					//fetchedManga.lastChapter = res.last;


  				}
  				i = i + 1;

  			}
  		mangaList.push( fetchedManga ); 

  		}
  		return mangaList;
  	},


    registered: function ()
    {
	  	return mangaList.length===0?[]:mangaList;
    },

  	registeredList: function ()
  	{
  		return wishList;
  	},

  	setCurrentManga: function (name){
  		for( manga in mangaList)
  		{
  			if( manga.name === name )
  			{
  				currentManga = manga;
  			}
  		}
  	},

  	setCurrentChapter: function (value){
  		currentManga.currentChapterNumber = value;
  	}
  	/*,
	
  	getMangasList : function()
  	{
  		return checkOut;
  	*///}

  };

  }]);