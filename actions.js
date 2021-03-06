$(function() {
            
            //Logo directory
            var dir = "img/";
            var imgName = [];
            var img = []; 
    
            //Loading images variables
            //var display = true;
            var bar = $('.bar');
            var percent = $('.percent');
            var status = $('#status');
        
            //Connect to node server
            var socket = io.connect('http://localhost:4567');
            
            //Checkin that connection is established + identification
            socket.on('connect', function () {
                console.log("Connected to Server");
                socket.emit('connected', { client:'webinterface'});    
            });
            
            //Handle message from node server
            socket.on('message', function (message) {
                
                if(message.client == 'webinterface'){
                    console.log("----------message-----------");
                    console.log(message);
                    console.log("----------------------------");
                    if(message.action =='changeCloth'){
                        var clothName; 
                        clothName = message.cloth;
                        changeCloth(clothName);  
                    }
                }       
            });
            
            //Color palettes
            var colorArrayLondon = [];
            colorArrayLondon.push("rgb(240, 125, 0)");
            colorArrayLondon.push("rgb(227, 5, 26)");
            colorArrayLondon.push("rgb(139, 34, 31)");
            colorArrayLondon.push("rgb(0, 73, 141)");
            colorArrayLondon.push("rgb(25, 55, 103)");
            colorArrayLondon.push("rgb(255, 213, 0)");
            colorArrayLondon.push("rgb(0, 130, 93)");
            colorArrayLondon.push("rgb(78, 57, 67)");
            colorArrayLondon.push("rgb(255, 255, 255)");
            colorArrayLondon.push("rgb(223, 223, 229)");
            colorArrayLondon.push("rgb(172, 176, 178)");
            colorArrayLondon.push("rgb(137, 137, 138)");
            colorArrayLondon.push("rgb(223, 223, 229)");
            colorArrayLondon.push("rgb(66, 69, 77)");
            colorArrayLondon.push("rgb(29, 29, 27)");
            
            var colorArrayBob = [];
            colorArrayBob.push("rgb(240, 125, 0)");
            colorArrayBob.push("rgb(227, 5, 26)");
            colorArrayBob.push("rgb(106, 62, 129)");     
            colorArrayBob.push("rgb(139, 34, 31)");
            colorArrayBob.push("rgb(198, 222, 245)");
            colorArrayBob.push("rgb(101, 169, 221)");
            colorArrayBob.push("rgb(30, 147, 198)");
            colorArrayBob.push("rgb(87, 103, 124)");
            colorArrayBob.push("rgb(0, 73, 141)");
            colorArrayBob.push("rgb(185, 207, 38)");
            colorArrayBob.push("rgb(0, 138, 93)");
            colorArrayBob.push("rgb(0, 70, 63)");
            colorArrayBob.push("rgb(255, 213, 0)");
            colorArrayBob.push("rgb(78, 67, 57)");
            colorArrayBob.push("rgb(255, 255, 255)");
            colorArrayBob.push("rgb(223, 223, 229)");
            colorArrayBob.push("rgb(179, 178, 178)");
            colorArrayBob.push("rgb(172, 176, 178)");
            colorArrayBob.push("rgb(66, 69, 77)");
            colorArrayBob.push("rgb(87, 86, 86)");
            colorArrayBob.push("rgb(29, 29, 27)");
            colorArrayBob.push("rgb(25, 55, 103)");
            
            var colorArrayJohn = [];
            colorArrayJohn.push("rgb(227, 5, 26)");
            colorArrayJohn.push("rgb(106, 62, 129)");
            colorArrayJohn.push("rgb(198, 222, 245)");
            colorArrayJohn.push("rgb(30, 147, 198)");
            colorArrayJohn.push("rgb(0, 73, 141)");
            colorArrayJohn.push("rgb(25, 55, 103)");
            colorArrayJohn.push("rgb(185, 207, 38)");
            colorArrayJohn.push("rgb(78, 67, 57)");
            colorArrayJohn.push("rgb(255, 255, 255)");
            colorArrayJohn.push("rgb(172, 176, 178)");
            colorArrayJohn.push("rgb(66, 69, 77)");
            colorArrayJohn.push("rgb(29, 29, 27)");
            
            var colorArraySteve = [];
            colorArraySteve.push("rgb(255, 255, 255)");
            colorArraySteve.push("rgb(189, 211 , 235 )");
            colorArraySteve.push("rgb(253, 238, 245)");
            colorArraySteve.push("rgb(195, 200, 230)");
            colorArraySteve.push("rgb(248, 239, 205)");
            colorArraySteve.push("rgb(203, 231, 226)");
            
            var colorArrayVictor = [];
            colorArrayVictor.push("rgb(220, 101, 30)");
            colorArrayVictor.push("rgb(210, 35, 42)");
            colorArrayVictor.push("rgb(84, 66, 126)");
            colorArrayVictor.push("rgb(112, 54, 66)");
            colorArrayVictor.push("rgb(183, 216, 242)");
            colorArrayVictor.push("rgb(91, 167, 220)");
            colorArrayVictor.push("rgb(0, 146, 196)");
            colorArrayVictor.push("rgb(0, 79, 147)");
            colorArrayVictor.push("rgb(9, 53, 105)");
            colorArrayVictor.push("rgb(151, 183, 60)");
            colorArrayVictor.push("rgb(0, 151, 105)");
            colorArrayVictor.push("rgb(0, 77, 67)");
            colorArrayVictor.push("rgb(255, 212, 0)");
            colorArrayVictor.push("rgb(255, 255, 255)");
            colorArrayVictor.push("rgb(216, 218, 224)");
            colorArrayVictor.push("rgb(167, 169, 172)");
            colorArrayVictor.push("rgb(163, 170, 172)");
            colorArrayVictor.push("rgb(130, 132, 133)");
            colorArrayVictor.push("rgb(110, 110, 112)");
            colorArrayVictor.push("rgb(38, 74, 82)");
            colorArrayVictor.push("rgb(88, 89, 91)");
            colorArrayVictor.push("rgb(0, 0, 0)");
              
            var Clothes = {
            London: 
                {
                name: "London", 
                colors: colorArrayLondon
                }, 
            Bob: 
                {
                name: "Bob", 
                colors: colorArrayBob
                },
            John: 
                {
                name: "John", 
                colors: colorArrayJohn
                },
            Victor: 
                {
                name: "Victor", 
                colors: colorArrayVictor
                },
            Steve: 
                {
                name: "Steve", 
                colors: colorArraySteve
                }
            };
            
            //Get Logo from server
            getImage();
                
            function getImage(){
                
                 $('#containerLogo').empty();
                $('#containerLogoUpload').empty();
                
                 $.ajax({
                  url: "filesManager.php?action=LoadImage",

                }).done(function(result) {
                     console.log("result :   "+result);
                     var resultParsed = JSON.parse(result);

                     for (index = 0; index < resultParsed.length; ++index) {

                         var paths = resultParsed[index].split("/");
                         var absoluteFilename = paths[paths.length-1];
                         var infos = absoluteFilename.split("_");
                         //console.log("name : "+absoluteFilename+"  /   infos.. : "+infos[0]);

                         //Push value in an array
                        imgName.push(absoluteFilename);
                         //Choose logo
                        $("#containerLogo").append($('<img class="imgLogo" src="'+ dir + absoluteFilename + '"></img>'));
                         //upload/modifiy logo
                         createForm(absoluteFilename);
                    } 

                   $( ".imgLogo" ).click(function() {
                         $(".imgLogo").removeClass( "selected" );
                        var selectedURL = $(this).attr('src');
                        $(this).addClass( "selected" );
                       
                        console.log("selectedURL   "+selectedURL );
                        socket.emit('message', { client:'unity', action:'changeImg', url: selectedURL });
                    });
                     
                     
                      //DELETE FORM
                    $('.delete').ajaxForm({
                        beforeSend: function() {
                            console.log("readytodelete");
                        },
                        clearForm: true,        // clear all form fields after successful submit 
                        resetForm: true,  
                        complete: function(xhr) {
                            console.log("File succesfuly deleted");
    //                        console.log(xhr.responseText);
    //                        console.log("done");
                            status.html(JSON.parse(xhr.responseText));
                            //location.reload(); 
                            getImage();
                        }
                    });

                }).fail(function() {
                  console.log("error");
                });
             }
    
            /*Create form around images To delete them*/
            function createForm(absoluteFilename){
                $form = $('<form class="delete" action="filesManager.php" method="post"></form>');
                $form.append('<img class="imgLogoUpload" src="' +dir+absoluteFilename+'" />');
                $form.append('<input type="hidden" value="'+dir+absoluteFilename+'" name="delete_file" />');
                $form.append('</br>');
                $form.append('<label for="prenom">'+absoluteFilename+'</label>');
                $form.append('<input type="submit" value="x" />');                      
                $("#containerLogoUpload").append($form);    
            }
    
            //SEND FORM WITH IMAGE TO PHP
            $('#uploadfile').ajaxForm({
                beforeSend: function() {
                    status.empty();
//                        var image = $('#image').val();
//                        
//                        var paths = image.split('\\');
//                        absoluteFilename = paths[paths.length-1];
//                        console.log("image . "+image+"  absolutefilename "+absFilename);
                    var percentVal = '0%';
                    bar.width(percentVal)
                    percent.html(percentVal);
                },
                uploadProgress: function(event, position, total, percentComplete) {
                    var percentVal = percentComplete + '%';
                    bar.width(percentVal)
                    percent.html(percentVal);
                    //console.log(percentVal, position, total);
                },
                clearForm: true,        // clear all form fields after successful submit 
                resetForm: true,  
                complete: function(xhr) {
//                        console.log("complete");
//                        console.log(xhr.responseText);
//                        console.log("done");

                    status.html(JSON.parse(xhr.responseText));
                    //location.reload();

//                        createForm(absFilename);
//                        addAjaxDelete(absFilename);


                    getImage();

                }
            }); 
         
            function changeCloth(newCloth){
                console.log("Change Cloth to : "+newCloth);
                //$( "#clothName" ).html(Clothes[newCloth]['name']);  
                CreateColorPalette(Clothes[newCloth]['colors']);
            }
            
            function CreateColorPalette(colorArray){
                $("#containerColor").empty();
                for(var i = 0; i<colorArray.length;i++){
                    
                    var div = $('<div class="colorDot"></div>');
                    div.css("background-color", colorArray[i]);
                    $("#containerColor").append(div);
                    //
                    $( ".colorDot" ).click(function() {
                  
                        var selectedColor = $(this).css( "background-color" );
                        
                        console.log("color background: "+$(this));
                        console.log("selected color   "+selectedColor );
                        socket.emit('message', { client:'unity', action:"changeColor", color: selectedColor });
                    
                    });
                    
                }   
            }
                    
    
            $( ".SetPosition" ).click(function() { 
               
                var position = $(this).val();
                 console.log("SetPosition : "+position);
                socket.emit('message', { client:'unity', action:"setPosition", x: "10", y:"20",size:"40",inverted:"false" });                   
            });  
    
            $( ".UpdatePosition" ).click(function() { 
               
                var position = $(this).val();
                 console.log("UpdatePosition : "+position);
                socket.emit('message', { client:'unity', action:"updatePosition", position:position });   
            }); 
    
            $( ".ChangeVet" ).click(function() { 
               
                var position = $(this).val();
                 console.log("ChangeCloth : "+position);
                socket.emit('message', { client:'unity', action:"changeCloth", name:position });   
            });
    
             $( "#Snapshot" ).click(function() { 
               var entreprise = $( "#entreprise" ).val();
                 var nom = $( "#nom" ).val();
                 var prenom = $( "#prénom" ).val();
                 var email = $( "#email" ).val();
               
                 console.log("takeSnapshot : "+entreprise+"  "+nom+"  "+prenom+"  "+email);
                socket.emit('message', { client:'unity', action:"takeSnapshot", entreprise:entreprise, nom:nom, prenom:prenom, email:email });   
            });
    
    
                
           
        }); //END OF JQUERY DOM READY FUNCTION
        