    window.fbAsyncInit = function() {
      FB.init({
        appId      : '442567569201949',
        xfbml      : true,
        version    : 'v2.5'
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
 

FB.login(function(response) {
    if (response.authResponse) {
        var access_token =   FB.getAuthResponse()['accessToken'];
        FB.api('/me/photos?access_token='+access_token, 'post', { url: IMAGE_SRC, access_token: access_token }, function(response) {
            if (!response || response.error) {
                //alert('Error occured: ' + JSON.stringify(response.error));
            } else {
                //alert('Post ID: ' + response);
            }
        });
    } else {
        //console.log('User cancelled login or did not fully authorize.');
    }
}, {scope: 'publish_stream'});