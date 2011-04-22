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

var Counter1 = makeInstrument();
var Counter2 = makeCounter();
alert(Counter1.value()); /* Alerts 0 */
Counter1.increment();
Counter1.increment();
alert(Counter1.value()); /* Alerts 2 */
Counter1.decrement();
alert(Counter1.value()); /* Alerts 1 */
alert(Counter2.value()); /* Alerts 0 */