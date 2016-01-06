


(function() {
  
    window.fbAsyncInit = function() {
        FB.init({
          appId      : '442567569201949',
          status     :true,
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
  
  
  
  
    var canvas = this.__canvas = new fabric.Canvas('c');
    var added_photo = false;

    // Gradient
    fabric.Image.fromURL('images/wana_be.png', function(img) {
      img.evented = false;
      img.selectable = false;
      img.height = 250;
      img.width = 250;

      img.top= 315;
      img.left= 200;

      //img.center ="true";
      canvas.add(img);
      //canvas.centerObject(img);
      //canvas.setActiveObject(img);
      canvas.sendToBack(img);

      var bg = new fabric.Rect({
        top: 0,
        left: 0,
        width: 640,
        height: 640,
        //fill: 'rgb(219,64,43)',
        selectable: false,
        evented: false
      });
      canvas.add(bg);
      canvas.sendToBack(bg);
    });

    // Border

  /*
    canvas.add(new fabric.Rect({
      id: 'frame',
      top: 0,
      left: 0,
      width: 635,
      height: 635,
      fill: 'transparent',
      stroke: 'white',
      strokeWidth: 5,
      selectable: false,
      evented: false
    }));
    
  */

    

    //function createCanvas() {
      // I Am

      /*
      canvas.add(new fabric.Text('I Am', {
        fontFamily: 'Oswald',
        fontWeight: 700,
        fontSize: 100,
        left: 30,
        top: 30,
        fill: 'white',
        selectable: false
      }));

      */
      // RED
      //var red = ['R', 'E', 'D'];
      //var y = 140;var it = [];
     // for(var i=0;i<3;i++) {
      /*
        canvas.add(new fabric.Text(red[i], {
          fontFamily: 'Oswald',
          fontWeight: 700,
          fontSize: 80,
          left: 30,
          top: y,
          fill: 'rgb(219,64,43)',
          selectable: false
        }));

*/
        //

        /*
        canvas.add(new fabric.Line([80, 500, 380, 500], {
            id: 'line',
            stroke: 'white',
            selectable: false,
            //originX: "center",
            hasControls: false
        }));

        */
        canvas.add(new fabric.Textbox('', {
          id: 'textbox_',
          fontFamily: 'Bebas',
          //url('css/BEBAS__.ttf'),
          fontWeight: 700,
          cursorColor: 'white',
          fontSize: 55,
          width: 240,
          left: 200,
          top: 485,
          fill: '#D4001A' ,
          textAlign:'center',
          //backgroundColor: '#D4001A',
          editingBorderColor: 'transparent',
          lockMovementX: true,
          lockMovementY: true,
          hasControls: false,
          hoverCursor: 'text'
        }));
       // y += 100;
     // }

      // Set Editing on box click
      canvas.on({
          'object:selected': function selectedObject(e) {
            if (e.target.id && e.target.id.indexOf('textbox_') > -1) {
              var id = canvas.getObjects().indexOf(e.target);
              canvas.item(id).enterEditing();
            }
          }
      });


      /*

      // #Iamred
      canvas.add(new fabric.Text('iÂ­-am-Â­red.com #IamRED', {
        fontFamily: 'Montserrat',
        fontSize: 18,
        left: 30,
        top: y,
        fill: 'white',
        selectable: false
      }));

      */
      //y += 35;
      // HR

      /*
      canvas.add(new fabric.Line([20, y, 620, y], {
          stroke: 'white',
          selectable: false
      }));

*/
      //y += 20;

      // Album art
      /*canvas.add(new fabric.Rect({
        left: 30,
        top: y,
        fill: 'white',
        width: 120,
        height: 120,
        selectable: false
      }));*/

    /*
      fabric.Image.fromURL('assets/images/cover.jpg', function(img) {
        img.evented = false;
        img.selectable = false;
        img.left = 25;
        img.top = y
        canvas.add(img);
      });

*/

      // Text
      //


      /*

      var txt = "Tiwa Savage has released her brand new album 'R.E.D' which\nis an acronym that defines the album and stands for 'Romance,\nExpression and Dance'. To celebrate this, Tiwa invites you\nall, especially her fans, to join her and define yourselves\nand things that you are passionate about in R.E.D by visiting\niÂ­-amÂ­-red.com";
      canvas.add(new fabric.IText(txt, {
        fontFamily: 'Montserrat',
        fontSize: 15,
        left: 155,
        top: y+2,
        fill: 'white',
        selectable: false,
        editable: false,
        shadow: '1px 1px 1px #444',
        styles: {
          1: {
            53: { fontWeight: '700' }
          },
          2: {
            0: { fontWeight: '700' },
            15: { fontWeight: '700' }
          }
        }
      }));

      */

    //}

    // Upload image

    $('#file-input').change(function(e) {
        var file = e.target.files[0],
            imageType = /image.*/;

        if (!file.type.match(imageType))
            return;

        var reader = new FileReader();
        reader.onload = function (e) {

          var imgObj = new Image();
          imgObj.src = e.target.result;
          imgObj.onload = function () {
            // Remove added photo if exist
            if (added_photo) {
              canvas.item(1).remove();
            }

            added_photo = true;
            var image = new fabric.Image(imgObj);
            EXIF.getData(imgObj, function() {
              switch(EXIF.getTag(this, 'Orientation')){
                 case 8:
                   image.setAngle(-90);
                   break;
                 case 3:
                   image.setAngle(180);
                   break;
                 case 6:
                   image.setAngle(90);
                   break;
              }

              var scale = 1;
              if (image.width < image.height)
                scale = 640/image.width;
              else if (image.height < image.width ||
                 (image.height == image.width && image.width < 640))
                scale = 640/image.height;

              image.set({
                id: 'image',
                originX: "center",
                originY: "center",
                scaleX: scale,
                scaleY: scale,
                top: 320,
                left: 320,
                hasControls: false,
              });

              canvas.add(image);
              // index of 1
              canvas.sendToBack(image);
              canvas.bringForward(image);
              canvas.renderAll();

              // Show slider and download button
              $('#scale-control').show();
              $('#download').show();
              $('#restart').show();
              $('#ownit').show();
              $('#share').show();

              // Scale control
              // set minumum to current scale
              var min = image.getScaleX();
              $('#scale-control').attr({'min':min, 'value':min, 'max':min*3});

              $('#scale-control').on('change', function() {
                image.scale(parseFloat(this.value)).setCoords();
                image.set({
                  top: 320,
                  left: 320
                });

                canvas.renderAll();
              });
            });
          }
        }
        reader.readAsDataURL(file);
    });

    // Load fonts
    WebFontConfig = {
      google: { families: [ 'Oswald:700', 'Montserrat' ] }
    };
    var src = ('https:' === document.location.protocol ? 'https' : 'http') +
          '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    $.getScript(src, function(data) {
        canvas.renderAll();
        canvas.renderAll();

        $('.add').show();
    });

    $('button.add').on('click', function(){
      $('#file-input').trigger('click');
    });
    
    function PostImageToFacebook( authToken, filename, mimeType, imageData, message ) {
        authUser();
        
        // Random boundary defined to separate element in form
        var boundary = '----ThisIsTheBoundary1234567890';
        
        // this is the multipart/form-data boundary we'll use
        var formData = '--' + boundary + '\r\n'
        formData += 'Content-Disposition: form-data; name="source"; filename="' + filename + '"\r\n';
        formData += 'Content-Type: ' + mimeType + '\r\n\r\n';
        
        // let's encode our image file
        for ( var i = 0; i < imageData.length; ++i ) {
          formData += String.fromCharCode( imageData[ i ] & 0xff );
        }
        
        formData += '\r\n';
        formData += '--' + boundary + '\r\n';
        formData += 'Content-Disposition: form-data; name="message"\r\nContent-Type: text/html; charset=utf-8\r\n\r\n';
        formData += message + '\r\n'
        formData += '--' + boundary + '--\r\n';
        
        // Create a POST XML Http Request
        var xhr = new XMLHttpRequest();
        xhr.open( 'POST', 'https://graph.facebook.com/me/photos?access_token=' + authToken, true );
        // Call back function if POST request succeed or fail
        xhr.onload = xhr.onerror = function() {
          if ( !(xhr.responseText.split('"')[1] == "error") ) {
            // If there is no error we redirect the user to the FB post she/he just created
            var userID = xhr.responseText.split('"')[7].split('_')[0];
            var postID = xhr.responseText.split('"')[7].split('_')[1];
            w = window.open('https://www.facebook.com/'+userID+'/posts/'+postID,
                'width=1235,height=530');
          }
          else {
            alert("Error: "+xhr.responseText);
          }
        };
        xhr.setRequestHeader( "Content-Type", "multipart/form-data; boundary=" + boundary );
        
        // Attach the data to the request as binary
        xhr.sendAsBinary( formData );
      }
    
    var accessToken;
   
    
    
    function authUser() {
        FB.login(checkLoginStatus, {scope:'user_posts, user_photos, publish_pages, manage_pages, public_profile, publish_actions'});
      }
      // Check the result of the user status
      function checkLoginStatus(response) {
        if(response && response.status == 'connected') {
          console.log('User is authorized');
          accessToken = response.authResponse.accessToken;
        } else {
          console.log('User is not authorized');
          authUser();
        }
      }
      
      if ( XMLHttpRequest.prototype.sendAsBinary === undefined ) {
        XMLHttpRequest.prototype.sendAsBinary = function(string) {
          var bytes = Array.prototype.map.call(string, function(c) {
            return c.charCodeAt(0) & 0xff;
          });
          this.send(new Uint8Array(bytes).buffer);
        };
      }
      

    $('#share').on('click', function(){
      
      FB.getLoginStatus(checkLoginStatus);
      
      
    
      //authUser();
      
      
     // u=canvas.toDataURL;
     // t=document.title;
    //t=TheImg.getAttribute('alt');
     // window.open('http://www.facebook.com/sharer.php?u='+u+'sharer','toolbar=0,status=0,width=626,height=436');return false;
      
      
      //https://www.facebook.com/dialog/share?app_id=415295758676714&display=popup&href="+encodeURI(e.permalink)+"&redirect_uri="+encodeURI
      
      var Finalimage = canvas.toDataURL("image/jpg");
      
      var encodedPng = Finalimage.substring(Finalimage.indexOf(',')+1,c.length);
      
      
      var decodedPng = Base64Binary.decode(encodedPng);
      
      
      PostImageToFacebook(accessToken,
                  'iwanabe.png',
                  'image/png',
                  decodedPng,
                  "J at www.wannabe.comoin the #wanabechallenge at www.wannabechallange.com");
      
      
      
      /*
      
          FB.ui(
        {
          method: 'share',
          name: '#wanabechallange',
          //href: $(location).attr('href'),
          link: 'http://iwanabe.neocities.org',
          picture: decodedPng,
          caption: 'Join the #wanabechallange!',
          //: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
        },
        function(response) {
          if (response && response.post_id) {
            alert('Succeeded to post');
          }
          else {
            alert('Failed to post');
          }
        }
      );
      
      */
      
      /*
      
      FB.api('me/feed', 'post', { message: body,
                            picture :canvas.toDataURL,
                            description : "DESCRIPTION"
                            }
                    , function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    console.log('Post Id: ' + res.id);
    
                    });
                    
                    */
      
      

    });
    $('#restart').on('click', function(){
      // Remove photo.
      if (added_photo) {
        canvas.item(1).remove();
        added_photo = false;
      }
      // Clear texts
      canvas.forEachObject(function(obj){
        if (obj.id && obj.id.indexOf('textbox_') > -1) {
          obj.setText('');
        }
      });

      canvas.renderAll();
    });
    $('#download').on('click', function(){

      ga('send', 'event', 'Image', 'download');

      // Hide lines and frame


/*
    
      canvas.forEachObject(function(obj){
        if (obj.id && (obj.id.indexOf('line_') > -1 || obj.id.indexOf('frame') > -1))
          obj.set({opacity: 0});
      });
      
      */



      $(this).attr({
        href: canvas.toDataURL("image/png"),
        download: 'iwanabe.png'
      });

/*
      // Show lines and frame
      canvas.forEachObject(function(obj){
        if (obj.id && (obj.id.indexOf('line_') > -1 || obj.id.indexOf('frame') > -1))
          obj.set({opacity: 1});
      });
      
      */

    

      canvas.renderAll();
    });

    $('#scale-control').hide();
    $('#download').hide();
    $('#restart').hide();
    $('#ownit').hide();
    $('share').hide();

    // Set image boundaries
    var bounds = {top: 320, left: 320};
    canvas.on("object:moving", function(e){
        if (e.target.id && e.target.id.indexOf('image') > -1) {
          var obj = e.target;
          obj.setCoords();
          if (obj.getBoundingRect().top > 0 ||
              obj.getBoundingRect().top + obj.getBoundingRect().height < 640)
            obj.top = bounds.top;
          else
            bounds.top = obj.top
          if (obj.getBoundingRect().left > 0 ||
              obj.getBoundingRect().left  + obj.getBoundingRect().width < 640)
            obj.left = bounds.left;
          else
            bounds.left = obj.left;
        }
    });

    var lastid = '';
    $('.recommended').on('click', function() {
      var id = $(this).data('id');
      $('.autocomplete-suggestions').hide();
      if (id == lastid) {
        lastid = '';
        return false;
      }
      $('#'+id).show();
      lastid = id;
      return false;
    });
    $('.autocomplete-suggestion').on('click', function(e) {
      e.preventDefault();
      var value = $(this).html().substring(1);
      // Set value
      canvas.forEachObject(function(obj){
        if (obj.id && obj.id.indexOf('textbox_'+lastid) > -1) {
          obj.setText(value);
          obj.enterEditing();
          canvas.setActiveObject(obj);
          canvas.renderAll();
          $('#'+lastid).hide();
          lastid = '-';
          return;
        }
      });
    });

    function resizeCanvas() {
      var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      if (width < 640) {
        var scaleRatio = width/640;
        var dim = 640*scaleRatio;
        $('.container').css({width: dim+'px', height: dim+'px', marginTop: '0'});
        $('.add').css({top: '20px', right: '20px', marginLeft: '0'});
        canvas.setWidth(dim);
        canvas.setHeight(dim);
        canvas.setZoom(scaleRatio);
      }
    }
    // Responsive scaling
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, false);
})();

