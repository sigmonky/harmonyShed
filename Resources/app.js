// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});


//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();

if (Titanium.Media.audioPlaying) {
	Titanium.Media.audioSessionMode = Titanium.Media.AUDIO_SESSION_MODE_AMBIENT;
}

var win = win1;

var sound1 = Titanium.Media.createSound();
sound1.url='bass_c2.m4a'; 
var sound2 = Titanium.Media.createSound();
sound2.url='piano_e2.m4a';
var sound3 = Titanium.Media.createSound();
sound3.url='piano_b2.m4a';
//
//
// PLAY
//
var play = Titanium.UI.createButton({
	title:'Play',
	height:40,
	width:145,
	left:10,
	top:10
});
play.addEventListener('click', function()
{
	sound1.play();
	sound2.play();
	sound3.play();
	pb.max = sound1.duration;
});
win.add(play);

//
// PAUSE
//
var pause = Titanium.UI.createButton({
	title:'Pause',
	height:40,
	width:145,
	right:10,
	top:10
});
pause.addEventListener('click', function()
{
	sound1.pause();
	sound2.pause();
	sound3.pause();
});
win.add(pause);

//
// RESET
//
var reset = Titanium.UI.createButton({
	title:'Reset',
	height:40,
	width:145,
	left:10,
	top:60
});
reset.addEventListener('click', function()
{
	sound1.reset();
	sound2.reset();
	sound3.reset();
	pb.value = 0;

});
win.add(reset);

//
// STOP
//
var stop = Titanium.UI.createButton({
	title:'Stop',
	height:40,
	width:145,
	right:10,
	top:60
});
stop.addEventListener('click', function()
{
	sound1.stop();
	sound2.stop();
	sound3.stop();
	pb.value = 0;
});
win.add(stop);

//
// VOLUME +
//
var volumeUp = Titanium.UI.createButton({
	title:'Volume++',
	height:40,
	width:145,
	left:10,
	top:110
});
volumeUp.addEventListener('click', function()
{
	if (sound1.volume < 1.0)
	{
		sound1.volume += 0.1;
		sound2.volume += 0.1;
		sound3.volume += 0.1;
		var roundedVolume = Math.round(sound.volume*1000)/1000;
		volumeUp.title = 'Volume++ (' + roundedVolume + ')';
		volumeDown.title = 'Volume--';
	}
});
win.add(volumeUp);

//
// VOLUME -
//
var volumeDown = Titanium.UI.createButton({
	title:'Volume--',
	height:40,
	width:145,
	right:10,
	top:110
});
volumeDown.addEventListener('click', function()
{
	if (sound1.volume > 0)
	{
		if (sound1.volume < 0.1) {
			sound1.volume = 0;
			sound2.volume = 0;
			sound3.volume = 0;
		}
		else {
			sound1.volume -= 0.1;
			sound2.volume -= 0.1;
			sound3.volume -= 0.1;
		}
		var roundedVolume = Math.round(sound.volume*1000)/1000;
		volumeDown.title = 'Volume-- (' + roundedVolume + ')';
		volumeUp.title = 'Volume++';
	}

});
win.add(volumeDown);

//
// LOOPING
//
var looping = Titanium.UI.createButton({
	title:'Looping (false)',
	height:40,
	width:145,
	left:10,
	top:160
});
looping.addEventListener('click', function()
{
	sound1.looping = (sound1.looping==false)?true:false;
	sound2.looping = (sound2.looping==false)?true:false;
	sound3.looping = (sound3.looping==false)?true:false;
	looping.title = 'Looping (' + sound1.isLooping() + ')';
});
win.add(looping);

//
// EVENTS
//
sound1.addEventListener('complete', function()
{
	pb.value = 0;
});
sound1.addEventListener('resume', function()
{
	Titanium.API.info('RESUME CALLED');
});

//
//  PROGRESS BAR TO TRACK SOUND DURATION
//
var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var pb = Titanium.UI.createProgressBar({
	min:0,
	value:0,
	width:200
});

if (Ti.Platform.name != 'android') {
	win.setToolbar([flexSpace,pb,flexSpace]);
}
pb.show();

//
// INTERVAL TO UPDATE PB
//
var i = setInterval(function()
{
	if (sound1.isPlaying())
	{
		Ti.API.info('time ' + sound1.time);
		pb.value = sound1.time;

	}
},500);

//
//  CLOSE EVENT - CANCEL INTERVAL
//
win.addEventListener('close', function()
{
	clearInterval(i);
});


