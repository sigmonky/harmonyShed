var makeInstrument  = function() {
  var privateName = 0;
  var privateToneBank = new Array();
  var privateName = "";
 
  return {
    addNote: function(toneObject) {
       privateToneBank.push(toneObject)
    },
    setName: function(name) {
      privateName = name;
    },
    getName: function() {
      return privateName;
    },
    playNote:function(noteRequest) {
    	
    }
  }  
};
