var App = (function(){

	var fbFriendList = [];

	function renderFriendList() {

		var friendListEl = document.getElementById('friend-list'),
			output = '',
			i;

		for (i = 0; i < fbFriendList.length; i += 1) {
			output += '<li class="friend-item"><img class="friend-picture" src="http://graph.facebook.com/' + fbFriendList[i].id + '/picture?type=normal" alt="' + fbFriendList[i].name +'"> ' + fbFriendList[i].name +'</li>';
		}

		friendListEl.innerHTML = output;

	}

	function getFbFriends() {

		FB.api('/me/friends', {fields: 'name,id,location,birthday'}, function(response) {
			fbFriendList = response.data;
			renderFriendList();
		});

	}

	function fbLogin() {

		FB.login(function(response) {

			if (response.authResponse) {

				document.body.className += ' logged';

				getFbFriends();

			} else {
				console.warn('User cancelled login or did not fully authorize.');
			}

		},{
			scope: 'user_friends'
		});

	}

	function getFbLoginStatus() {

		FB.getLoginStatus(function(response) {

			if (response.authResponse) {

				document.body.className += ' logged';

				getFbFriends();

			} else {

				var fbButton = document.getElementById('fb-login-btn');

				fbButton.addEventListener('click', function(e){
					e.preventDefault();
					fbLogin();
				});
			}

		});

	}

	function init() {

		document.body.className += ' ready';
		
		getFbLoginStatus();

	}

	return {
		init: init
	};

})();



window.fbAsyncInit = function() {

	FB.init({
		appId: '652639308158885',
		xfbml: false,
		version: 'v2.0'
	});

	App.init();

};

(function(d, s, id){

	 var js, fjs = d.getElementsByTagName(s)[0];

	 if (d.getElementById(id)) {
	 	return;
	 }

	 js = d.createElement(s);
	 js.id = id;
	 js.src = '//connect.facebook.net/en_US/sdk.js';
	 fjs.parentNode.insertBefore(js, fjs);

 }(document, 'script', 'facebook-jssdk'));