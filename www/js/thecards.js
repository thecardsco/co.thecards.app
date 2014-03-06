var $connect=new Object();
var $me;
var $list=new Array();
var $ajaxResult;
var $loggeduser=window.localStorage.getItem('loggeduser');
var $loggeduser="ozan";
var $user;
var $loc;
function checkConnection()
{
	$connect.online=navigator.onLine;
	$connect.url='http://thecards.co/m/www/pages/php/';
	$connect.ext='.php';
	console.log('online?'+$connect.online);
	$connect.device=new Object();
	$connect.device.ipad=false;
	$connect.device.iphone=false;
	$connect.device.android=false;
	$connect.device.blackberry=false;
	$connect.device.webos=false;
	if(navigator.userAgent.match(/iPad/i)){
		$connect.device.ipad=true;
	}
	if(navigator.userAgent.match(/iPhone/i)){
		$connect.device.iphone=true;
	}
	if(navigator.userAgent.match(/Android/i)){
		$connect.device.android=true;
	}
	if(navigator.userAgent.match(/BlackBerry/i)){
		$connect.device.blackberry=true;
	}
	if(navigator.userAgent.match(/webOS/i)){
		$connect.device.webOS=true;
	}
	return $connect;
}

function pullUser($username,$function)
{
	if ($connect.online)
	{
		ajaxConnect('pullUser',$username,$function);
	}
	else
	{
		$offlineid=window.localStorage.getItem($loggeduser);
		$offlineme=window.localStorage.getItem($offlineid);
		$offlineme=eval('('+$offlineme+')');
		$function($offlineme);
	}
}

function pullList($id,$function)
{
	if ($connect.online)
	{
		ajaxConnect('pullList',$id,$function);
	}
	else
	{
		$list=eval(window.localStorage.getItem('list@'+$me.id));
		var $object=new Array();
		for (var k in $list) {
			$object.push(window.localStorage.getItem($list[k]));
		}
		$function($object);
	}
}

function ajaxConnect($page,$value,$function)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
			var $ajaxResult=eval('(' +  this.responseText + ')');
			$function($ajaxResult);
			}
	}
	xmlhttp.open('GET',$connect.url+$page+$connect.ext+'?q='+$value, false);
	xmlhttp.send();
}

function createcard($id)
{
	if ($("#page-placer").is(":visible")) {
		$('#page-placer').toggle('clip');
	}
	$user=window.localStorage.getItem($id);
	if ($user!=null){
		$user=eval('('+$user+')');
		styleCard($user);
	}
	else
	{
		document.getElementById('page-placer').innerHTML="Bu karta şu anda ulaşamıyorsunuz :(";
	}
}

function styleCard($user)
{
	document.getElementById('card').style.fontFamily="'"+$user.fontfamily+"','Helvetica Neue', 'Helvetica',sans-serif;";
	document.getElementById('card').style.color=$user.fontcolor;
	document.getElementById('card').style.backgroundColor=$user.bgcolor;
	document.getElementById('card').style.backgroundImage='url("http://thecards.co/bg/'+$user.bgimg+'.png")';
	document.getElementById('cardInfo').style.textAlign=$user.align;
	if ($user.imgurl!=null && $user.imgurl!=""){ $logo='<img id="cardLogoImg" src="'+$user.imgurl+'"/>'}else{$logo=' '};
	document.getElementById('cardLogoPlacer').innerHTML=$logo
	document.getElementById('cardName').innerHTML=$user.name+' '+$user.surname;
	document.getElementById('cardTitle').innerHTML=$user.title;
	var $cardContact="<br/>";
	if ($user.gsm!=null && $user.gsm!=""){$cardContact=$cardContact+'<i class="fa fa-mobile"></i> <a href="tel:'+$user.gsm+'">'+$user.gsm+'</a><br/>';}
	if ($user.phone!=null && $user.phone!=""){$cardContact=$cardContact+'<i class="fa fa-phone"></i> <a href="tel:'+$user.phone+'">'+$user.phone+'</a><br/>';}
	if ($user.fax!=null && $user.fax!=""){$cardContact=$cardContact+'<i class="fa fa-print"></i> <a href="tel:'+$user.fax+'">'+$user.fax+'</a><br/>';}
	$cardContact=$cardContact+'<br/><i class="fa fa-envelope"></i> <a href="mailto:'+$user.email+'">'+$user.email+'</a><br/>';
	$cardContact=$cardContact+'<br/>';
	if ($user.company!=null && $user.company!=""){$cardContact=$cardContact+'<strong>'+$user.company+'</strong><br/>';}
	$address = "";
	$loc="";
	if ($user.area!=null && $user.area!="") {
		$address = $address + $user.area +'  ';
		$loc = $loc+$user.area +'  ';
	}
	if ($user.street!=null && $user.street!="") {
		$address = $address + $user.street +'  ';
		$loc = $loc + $user.street +'  ';
	}
	if ($user.building!=null && $user.building!="") {
		$address = $address + $user.building +'  ';
	}
	if ($user.building_no!=null && $user.building_no!="") {
		$address = $address + $user.building_no;
		$loc= $loc+$user.building_no +'  ';
	}
	if ($user.door_no!=null && $user.door_no!="") {
		$address = $address +'/' + $user.door_no;
	} else {
		$address = $address +'  ';
	}
	$address = $address +'<br/>';
	if ($user.postcode!=null && $user.postcode!="") {
		$address = $address + $user.postcode +'  ';
	}
	if ($user.district!=null && $user.district!="") {
		$address = $address + $user.district +'/';
		$loc = $loc+$user.district +'  ';
	}
	if ($user.city!=null && $user.city!="") {
		$address = $address + $user.city +'/';
		$loc= $loc+$user.city +'  ';
	}
	if ($user.country!=null && $user.country!="") {
		$address = $address + $user.country;
		$loc = $loc+$user.country;
	}
	$cardContact=$cardContact+ $address;
	$socialIcons=document.getElementById('cardSocialLogos');
	$socialIcons.innerHTML="";
	if ($user.facebook==null || $user.facebook==""){disableBtn('#facebook');} else {enableBtn('#facebook'); $socialIcons.innerHTML=$socialIcons.innerHTML+' <i class="fa fa-facebook fa-lg"></i>';};
	if ($user.twitter==null || $user.twitter==""){disableBtn('#twitter');} else {enableBtn('#twitter');$socialIcons.innerHTML=$socialIcons.innerHTML+' <i class="fa fa-twitter fa-lg"></i>';};
	if ($user.linkedin==null || $user.linkedin==""){disableBtn('#linkedin');} else {enableBtn('#linkedin');$socialIcons.innerHTML=$socialIcons.innerHTML+' <i class="fa fa-linkedin fa-lg"></i>';};
	if ($user.google==null || $user.google==""){disableBtn('#google');} else {enableBtn('#google');$socialIcons.innerHTML=$socialIcons.innerHTML+' <i class="fa fa-google-plus fa-lg"></i>';};
	if ($user.skype==null || $user.skype==""){disableBtn('#skype');} else {enableBtn('#skype');$socialIcons.innerHTML=$socialIcons.innerHTML+' <i class="fa fa-skype fa-lg"></i>';};
	if ($user.www==null || $user.www==""){disableBtn('#www');} else {enableBtn('#www');$socialIcons.innerHTML=$socialIcons.innerHTML+' <i class="fa fa-globe fa-lg"></i>';};
	if ($user.gsm==null || $user.gsm==""){disableBtn('#gsm'),disableBtn('#sms');} else {enableBtn('#gsm'),enableBtn('#sms');};
	if ($user.phone==null || $user.phone==""){disableBtn('#phone');} else {enableBtn('#phone');};
	if ($loc==null || $loc==""){disableBtn('#location'),disableBtn('#directions');} else {enableBtn('#location'),enableBtn('#directions');};
	document.getElementById('cardContact').innerHTML=$cardContact;
	$('#page-placer').toggle('puff');
}

function touchEvents()
{
	$('#card').disableSelection();
	$('#card').jrumble({
		x: 2,
		y: 2,
		rotation: 1,
		speed: 10
		});	
	var $rumbling=false;
	var element=document.getElementById('card');
	Hammer(element).on("doubletap", function(event) {
		
		if ($rumbling)
		{
			$("#card").trigger('stopRumble'); 
			$rumbling=false;
		}
		else
		{
			$("#card").trigger('startRumble');
			$rumbling=true;
		}
		
	});
	
	Hammer(element).on('swipeup', function(event) {
		if ($rumbling)
		{
			$("#card").trigger('stopRumble');
			$rumbling=false;
			$('#sharebtn').click();
		}
	});
}

function disableBtn($element){
	$($element).addClass('ui-disabled');
}

function enableBtn($element){
	$($element).removeClass('ui-disabled');
}

function gotoURL($type)
{
	switch($type){
		case 'location':
			if($connect.device.iphone || $connect.device.ipad)
			{
				$URL="maps://?q="+$loc;
			}
			else
			{
				$URL="http://maps.apple.com/?q="+$loc;
			}
			break;
		case 'directions':
			if($connect.device.iphone || $connect.device.ipad)
			{
				$URL="maps://?saddr=Current+Location&daddr="+$loc;
			}
			else
			{
				$URL="http://maps.apple.com/??saddr=Current+Location&daddr="+$loc;
			}
			break;
		case 'facebook':
			if($connect.device.iphone || $connect.device.ipad)
			{
				$URL="fb://profile/"+$user.facebook;
			}
			else
			{
				$URL="http://facebook.com/"+$user.facebook;
			}
			break;
		case 'twitter':
			if($connect.device.iphone || $connect.device.ipad)
			{
				$URL="twitter://user?screen_name="+$user.twitter;
			}
			else
			{
				$URL="http://twitter.com/"+$user.twitter;
			}
			break;
		case 'linkedin':
			$URL="http://linkedin.com/pub/"+$user.linkedin;
			break;
		case 'google':
			$URL="http://plus.google.com/+"+$user.google;
			break;
		case 'skype':
			$URL="skype:"+$user.skype;
			break;
		case 'www':
			$URL="http://"+$user.www;
			break;
		default:
			$URL=$type;
			break;
	}
	if ($URL.substring(0,4)!='http')
	{
		window.location=$URL;
	}
	else
	{
		window.open($URL,'_cards');
	}
}

function logOut()
{
	alert('Loggin out '+$me.name);
}

function init(){
	checkConnection();
	$('#page-placer').hide();
	if ($loggeduser!=null)
	{
		pullUser($loggeduser,function ($object) {
			$me=$object;
			if ($connect.online)
			{
				window.localStorage.setItem($me.id,JSON.stringify($me));
			}
			createcard($me.id);
			$leftMenu='<ul data-role="listview" data-autodividers="false" data-inset="false" data-theme="d"><li><a href="#" onClick="createcard(\''+$me.id+'\');$(\'#leftMenu\').panel(\'close\');"><i class="fa fa-user"></i> Kartıma Git</a></li><li><a href="#" onClick="logOut()"><i class="fa fa-exchange"></i> Kullanıcı Değiştir</a></li></ul>'
			document.getElementById('leftMenuDiv').innerHTML=$leftMenu;
		});
		pullList($me.id,function ($object){
			var $listView='<ul data-role="listview" data-autodividers="true" data-inset="false" data-theme="d">';
			for (var k in $object) {
				$item=eval('('+$object[k]+')');
				window.localStorage.setItem($item.id,$object[k]);
				$listView=$listView+'<li data-icon="false"><a href="#" onClick="createcard('+$item.id+');$(\'#rightMenu\').panel(\'close\');">'+$item.name+' '+$item.surname+'</li>';
				$list.push($item.id);
			}
			if($connect.online)
			{
				window.localStorage.setItem('list@'+$me.id,JSON.stringify($list));
			}
			$listView=$listView+'</ul>';
			document.getElementById('rightMenuDiv').innerHTML=$listView;
		});
		touchEvents();
	}
	else {
		window.location.replace('index.html#login');
	}
}