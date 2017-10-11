$(document).ready(function(){
	$(".middlecont").mCustomScrollbar({
		autoDraggerLength:false,
		autoHideScrollbar:true   
	});	
	var listItem = $('.playlist').length
	$('.numberList').text(listItem);
	var playlist=$(".playlist");
	playlist.off().on("click", playAudio);
	$(".headimgIcon").off().on("click", playAudio);
	$(".nextbtn").off().on("click", playAudio);
	var playbtn=$(".playbtn");
	playbtn.children(".play").css("display","block");
	playbtn.off().on("click", playAudio);
	var activeText=$(".activeText");
	var activeicon=$(".activeicon");
	
	var objThis;
	var audio = document.createElement("audio");
	//document.body.append(audio);
	var audIndex = 0;
	// playing audio
	function playAudio()
	{
		/* on next button clicked   ..start*/
		if($(this).hasClass("nextbtn"))
		{
			console.log("playlist.length()=="+playlist.length);
			if(audIndex<playlist.length-1)
			{
				audIndex++;
				console.log("playlist.length()=="+playlist.length);
				objThis=playlist.eq(audIndex);
				playlist.removeAttr("isPlayingSame").find('.imgIcon').removeClass('activepause');
			}
		}
		/* on next button clicked ...end*/
		/* on heading icon clicked   ..start*/
		else if($(this).hasClass("headimgIcon"))
		{
		console.log("audIndex =="+audIndex);
		objThis=playlist.eq(audIndex);
		}
		/* on heading icon clicked    ...end*/
		/* on play button clicked    ..start*/
		else if($(this).hasClass("playbtn"))
		{
		objThis=playlist.eq(audIndex);

		}
		/* on play button clicked    ...end*/
		/* on play list clicked    ..start*/
		else if($(this).hasClass("playlist"))
		{
		objThis=$(this);
		console.log("coming also in this");
		}
		/* on play list clicked */
		/* activate icon and audio description    ...start */
		activeicon.find("img").attr("src",objThis.find("img").attr("src"));
		$(".whitetail").addClass('track-play-active');
		activeText.html(objThis.find(".textname").html());
		/* activate icon and audio description    ...end */
	
	var isPlayingSame=objThis.attr("isPlayingSame");
		if(isPlayingSame==="yes")
		{
			objThis.removeAttr("isPlayingSame");
			audio.pause();
			objThis.find('.imgIcon').addClass('activepause').removeClass('activeplay');
			console.log("same pause");
			$(".whitetail").removeClass('track-play-active');
			playbtn.children(".play").css("display","block");
			playbtn.children(".pause").css("display","none");
		}
		else
		{
			playbtn.children(".play").css("display","none");
			playbtn.children(".pause").css("display","block");
			playlist.removeAttr("isPlayingSame").find('.imgIcon').removeClass('activeplay');
			objThis.attr("isPlayingSame","yes");
			objThis.find('.imgIcon').addClass('activeplay');
			audIndex=objThis.index();
			
			var path=objThis.attr("data-audioPath");
			console.log(audIndex+"===path==="+path);
			if(objThis.attr("isLoaded")==="true")
			{
			console.log("coming in play");
			playlist.find('.imgIcon').removeClass('activepause')
			objThis.find('.imgIcon').addClass('activeplay');
			audio.play();
			}else
			{
			audio.setAttribute("src",path);
			audio.load();
				audio.onloadedmetadata=function(){
				audio.play();
				playlist.removeAttr("isLoaded").find('.imgIcon').removeClass('activepause');
				objThis.attr("isLoaded","true");
				console.log("in loaded...");
				}
				$(audio).bind('timeupdate',function(){
					var value = 0;
					if(audio.currentTime > 0){
						value = Math.floor((100 / audio.duration) * audio.currentTime);
					}
					console.log('value....'+value)
				})

			}
		}
	}
})