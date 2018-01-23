

"http://www.lirescan.com/naruto-lecture-en-ligne/"

app.factory('RegisteredManga', [ function( ) {

    //To delete | "http://unofficial.gagshirts.com.my/wp-content/uploads/2013/02/one-piece-logo-thumbnail.jpg"
    var narutoGaidenCfg = {'serverAddress':"http://www.lirescan.com",'mangaPath':"/naruto-gaiden-lecture-en-ligne/", 'description' : "Naruto va niquer leurs mamans!", 'thumbnail': "http://www.lirescan.com/images/mangas/naruto-gaiden.jpg" };
    var onePieceCfg     = {'serverAddress':"http://www.lirescan.com",'mangaPath':"/one-piece-lecture-en-ligne/", 'description' : "Luffy va tous les niquer xD", 'thumbnail':"http://www.lirescan.com/images/mangas/one-piece.jpg" };
    var bleachCfg       = {'serverAddress':"http://www.lirescan.com",'mangaPath':"/bleach-lecture-en-ligne/", 'description' : "Itchigo va les massacrer!", 'thumbnail': "http://www.lirescan.com/images/mangas/bleach.jpg" };
    var narutoCfg       = {'serverAddress':"http://www.lirescan.com",'mangaPath':"/naruto-lecture-en-ligne/", 'description' : "Naruto les a massacrés :D", 'thumbnail': "http://www.lirescan.com/images/mangas/naruto.jpg" };

    //List to store mangas configuration
    var collection = [ ];

    //TODO: Read configuration file and store cfg into cfgData
    var cfgData    = [ onePieceCfg /*, narutoGaidenCfg*/ ,bleachCfg, narutoCfg];

    for ( var i=0; i<cfgData.length; i++ )
    {
      cfgData[i].id=i;
      collection.push( cfgData[i] );
    }

    this.currentChapter = {};
    this.currentManga   = {};
   
    var methods    = {
        MangaCollection: collection,
        length : collection.length,
        getCurrentChapter : function (){ return this.currentChapter; },
        setCurrentChapter : function (chapter){ this.currentChapter = chapter; },
        getCurrentManga : function (){ return this.currentManga; },
        setCurrentManga : function (manga){ this.currentManga = manga; }
    };    

    return methods;

   }]);