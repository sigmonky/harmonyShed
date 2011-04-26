/**
 * @author Weinstein, Randy 
 */

var harmonyShed = {};

harmonyShed.band = function() {
  var players = {};
  return {
     addPlayer:function(name) {
         players["name"] = name;
         players["toneBank"] = {};
     },
     addTone:function(playerName,noteName,noteURL) {
         players[playerName].toneBank[noteName] = noteURL
     },
     getPlayers: function() {
        return players;
     },
     getToneBank: function(playerName) {
        return players[playerName].toneBank;
     }
  }
}