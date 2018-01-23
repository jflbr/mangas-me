app.controller('HomeController', ['$routeParams','$rootScope','$scope','$http','$document','$location','RegisteredManga',function($routeParams,$rootScope,$scope,$http,$document,$location,RegisteredManga){

    function mangaChapter(manga){
        this.name='';
        this.currentImagePath='';
        this.scanCount=0;
        this.lastChapterNumber=0;
        this.number=0;

        if (manga !== undefined && manga !== null)
        {
            this.name=manga.name;
            this.currentImagePath=manag.currentImagePath;
            this.scanCount=manga.currentImagePath;
            this.lastChapterNumber=manga.lastChapterNumber;
            this.number=manga.number;
        }
    }

            

	$scope.registeredMangaList =  RegisteredManga.MangaCollection;
	$scope.mangaDataList 	   = [];
    $scope.currentChapterList     = [0];

	$scope.currentChapter  	   =  new mangaChapter(null);
    $scope.currentScanCount    = 0;



    $scope.viewStates          = { 'LIST':0 ,'CHAPTERS':1,'SCANS':2 };
    $scope.currentViewState    = $scope.viewStates.LIST;
    $rootScope.currentChapterData = {};

    $scope.currentMangaId      = parseInt($routeParams.manga_id);
    $scope.currentChapterNumber= parseInt($routeParams.chapter_number);


    $scope.getMangaDataById  = function(mId){

        //alert("getMangaDataById with id ="+mId);
        var tmp = {'id':-1};
        angular.forEach( $scope.mangaDataList, function( mangaData, key) {
            if (mangaData.id == mId)
            {
                tmp = mangaData;
                return;
            }
        });
        return tmp;
    }

    $scope.getCurrentChapter = function(){
        return  RegisteredManga.getCurrentChapter();
    }

    $scope.getCurrentManga = function(){
        return  RegisteredManga.getCurrentManga();
    }

    $scope.toChaptersView   = function(mangaId){

        var currentManga = $scope.getMangaDataById( mangaId );

        RegisteredManga.setCurrentChapter( currentManga.lastChapter );
        RegisteredManga.setCurrentManga( currentManga );

        $location.path("viewChapters/"+ mangaId);
    }



    $scope.toScansView  = function(mangaId,chapter){
        //$scope.setCurrentChapter(chap);
        //$scope.currentChapter   = 
        var currentManga = $scope.getMangaDataById( mangaId );
        RegisteredManga.setCurrentManga( currentManga );

        RegisteredManga.setCurrentChapter(chapter);

        $scope.fetchChapterData(chapter.number);

        $location.path('viewScans/' + currentManga.id + '/' + RegisteredManga.getCurrentChapter().number );

    }

    $scope.toListView   = function(){
        $scope.currentViewState = $scope.viewStates.LIST;
        $location.path('home');

        //alert("toListView");
    }

    $scope.isCurrentView = function(view)
    {
        return  $scope.currentViewState === view;
    }

    $scope.join = function(s1,s2){
        //alert("join");
        //alert(s1+s2);
        return s1+s2;
    }




    $scope.setCurrentChapter = function(chptr){
        RegisteredManga.setCurrentChapter(chptr);
    }


   $scope.requestedChapter = {};

   $scope.$watch('requestedChapter', function() {

       //alert('hey, requestedChapter has changed!');
        var currentManga   = RegisteredManga.getCurrentManga();
        var currentChapter = RegisteredManga.getCurrentChapter();


        if( currentManga === {} || currentManga === undefined )
            return;

        if( currentChapter === {} || currentChapter === undefined )
            return;

        alert('id: ' + currentManga.id);

        $scope.updateCurrentChapterImages();
   });


    $scope.updateCurrentChapterImages = function(){

        var currentChapter = RegisteredManga.getCurrentChapter();
        if( currentChapter === {} || currentChapter === undefined )
            return;

        images = [];

        for (var i=0; i<currentChapter.scanCount ; i++ ){
            images.push( $scope.nextImagePath() );
        }

        currentChapter.scans = images;
        RegisteredManga.setCurrentChapter( currentChapter );

        return images;
    }


    //Extracts current chapter & scan from the current scan path
    $scope.currentImagePathInfo = function(){
        var imgPathPattern = /(\/.+\/)(\d{1,3})(\/)(\d{1,2})(.+)/;

        var current = RegisteredManga.getCurrentChapter();
        var currentChapter = parseInt( current.currentImagePath.replace( imgPathPattern, "$2") );
        var currentScanNb  = parseInt( current.currentImagePath.replace( imgPathPattern, "$4") );

        return  {'chapter':currentChapter,'scan':currentScanNb };
    }


    //Processes the next scan path
    $scope.nextImagePath = function(){

    	var currentImgPathInfo = $scope.currentImagePathInfo();

    	var currentChapter = currentImgPathInfo.chapter;
    	var currentScanNb  = currentImgPathInfo.scan;

    	var newScanNb	   = currentScanNb;
    	var newChapterNb   = currentChapter;

    	if( currentScanNb < $scope.currentChapter.scanCount ) {
    	    newScanNb = currentScanNb + 1;
    	}
    	//Move onto the next chapter
    	else if ( currentChapter < $scope.currentChapter.lastChapterNumber ) {
    		newScanNb    = 1;
    		newChapterNb = currentChapter + 1;
    	}

    	return $scope.processImagePath( newChapterNb, newScanNb );
    }


    //Processes the previous scan path
    $scope.previousImagePath = function(){

    	var currentImgPathInfo = $scope.currentImagePathInfo();

    	var currentChapter = currentImgPathInfo.chapter;
    	var currentScanNb  = currentImgPathInfo.scan;

    	var newScanNb	   = currentScanNb;
    	var newChapterNb   = currentChapter;

    	if( currentScanNb > 1 )
    	{
    	    newScanNb = currentScanNb - 1;
    	}

    	//Get back to the previous chapter
    	else if ( currentChapter > 1 )
    	{
    		newScanNb    = 1;
    		newChapterNb = currentChapter - 1;

    	}

    	return $scope.processImagePath( newChapterNb, newScanNb );
    }



    //Processes and returns a new scan path given chapter & scan parameters
    $scope.processImagePath = function(chapterNb, scanNb){
    	var imgPathPattern = /(\/.+\/)(\d{1,3})(\/)(\d{1,2})(.+)/;

    	//lirescan.com specific case...
    	scanNb = scanNb < 10? '0' + scanNb : scanNb;
    	return $scope.currentChapter.currentImagePath.replace( imgPathPattern,"$1" + chapterNb + "/" + scanNb + "$5");
    }


    //Extracts manga info from a string
    $scope.extractNameAndChapterNumber = function(str)
    {
    	var pageInfoPattern = /(\w+) (.+) (\d{1,3}) (\w+)/;

    	var name = str.replace( pageInfoPattern, "$2" );
    	var chapterNumber = parseInt( str.replace( pageInfoPattern, "$3" ) ) ;

    	return { "name":name,"number":chapterNumber };
    }


	document.addEventListener( "deviceready", function() {

        if( $scope.mangaDataList.length === $scope.registeredMangaList.length )
        {
            alert("No need to fetch data from the server");   
            return;
        }

        $scope.currentViewState    = $scope.viewStates.LIST;


      	var currentChapter = 0;
      	var numberOfPages  = 0;
      	var currentPage	   = 1;
      	var mangaName	   = '';
      	var currentImage   = '';
      	var rawHTMLData	   = '';


        var baseUrl        = '';


        angular.forEach( $scope.registeredMangaList, function( mangaCfg, key) {
        

	        baseUrl = mangaCfg.serverAddress + mangaCfg.mangaPath;

		    $http.get( baseUrl ).success( function( successResponse ){ 

	      	if( successResponse.data === undefined ){
	      		rawHTMLData = successResponse;
	      	}
		    else{  
				rawHTMLData = successResponse.data;
			}


			$mangaDOM = $('<div>' + rawHTMLData + '</div>');
	                        
	        //find meta tags
	        $.each( $mangaDOM.find( "meta[content]" ), function(idx, item) {
	            var metaData   = $(item).attr("content");
	            var info       = $scope.extractNameAndChapterNumber( metaData );

	            mangaName      = info.name;
	            currentChapter = info.number;
	            //Break after the first occurance
	            return false;
	        });

	        numberOfPages	       = $mangaDOM.find( "#pagination ul li" ).length;
	        currentImage  	       = $mangaDOM.find( "#image_scan" )[0].getAttribute("src");
	        $scope.tmp_thumbnail   = mangaCfg.thumbnail;
	        $scope.tmp_description = mangaCfg.description;
            $scope.tmp_id          = mangaCfg.id;
            $scope.tmp_serverAddr  = mangaCfg.serverAddress;

	        var lastChapter    = { 'name':mangaName,'currentImagePath':currentImage, 'scanCount':numberOfPages,'lastChapterNumber':currentChapter, 'number':currentChapter , 'serverAddr':$scope.tmp_serverAddr, 'mangaPath':mangaCfg.mangaPath};
	        var mangaData      = { 'name':mangaName ,'description': $scope.tmp_description,'chapterCount':currentChapter,'thumbnail':$scope.tmp_thumbnail ,'lastChapter':lastChapter,'id':$scope.tmp_id};
	
            $scope.setCurrentChapter( lastChapter );
		   	$scope.mangaDataList.push( mangaData );



	    }); //$http.get
		
		} );//for loop

    },true);




    $scope.mangasCount = function()
    {
    	return $scope.mangaDataList;
    }



    //Update the current chapter ( number of scans and the base scan path )
    $scope.fetchChapterData = function (chapterNumber) {


            var manga = RegisteredManga.getCurrentManga();
            var currentChapter = RegisteredManga.getCurrentChapter();

            /*
            if ( chapterNumber > manga.lastChapterNumber )
            {
                alert( "The requested chapter does not exist");
                $location.path("home/");
                return;
            }
            */

            newChapterUrl = manga.serverAddress + manga.mangaPath + chapterNumber + "/";

            $http.get( newChapterUrl ).success( function( successResponse ){ 


            if( successResponse.data === undefined ){
                rawHTMLData = successResponse;
            }
            else{  
                rawHTMLData = successResponse.data;
            }


            $mangaDOM = $('<div>' + rawHTMLData + '</div>');
                            

            $scope_tmp_numberOfPages  = $mangaDOM.find( "#pagination ul li" ).length;
            $scope_tmp_currentImage   = $mangaDOM.find( "#image_scan" )[0].getAttribute("src");
    
            currentChapter.currentImagePath = $scope_tmp_numberOfPages;
            currentChapter.numberOfPages    = $scope_tmp_currentImage;


            RegisteredManga.setCurrentChapter( currentChapter );
            $scope.requestedChapter = currentChapter;
        }); //$http.get

    }

}]);