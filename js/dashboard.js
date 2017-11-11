
$(document).ready(function(){
    // $( document ).tooltip();

    jconfirm.defaults = {
        icon: 'fa fa-warning',
        backgroundDismiss: false,
        backgroundDismissAnimation: 'glow',
        escapeKey: true,
        closeIcon:true,
        theme:'modern',
        title: 'Are You Sure?',
        autoClose: 'Cancel|15000',
        animation: 'scaleX',
        animationSpeed: 500,
        type: 'red',
        animationBounce: 1.5,
    }
    var allStudentsData;

    $(function(){
        $('[data-toggle="tooltip"]').tooltip();
        $(".side-nav .collapse").on("hide.bs.collapse", function() {                   
            $(this).prev().find(".fa").eq(1).removeClass("fa-angle-right").addClass("fa-angle-down");
        });
        $('.side-nav .collapse').on("show.bs.collapse", function() {                        
            $(this).prev().find(".fa").eq(1).removeClass("fa-angle-down").addClass("fa-angle-right");        
        });
    })   

    var fullObject = [];
    var fullObjectRef = [];
    var fullObjectMetadata = [];
    $(document.body).on('click', '.startDetection', function(){

        var text = $('#text').val();
        text = JSON.stringify(text);
        // var keywords = $('.complyKeywords').val();
        if(text=='')
        {
            $.alert({
                title:"STOP!!",
                icon:"fa fa-hand-stop-o",
                content:"Input is compulsory to proceed",
                buttons:{
                    action:{
                        text:"OK",
                        btnClass:"btn-success"
                    }
                }
            })
        }else
        {
            $('#loading').show();
            // var result = keywords.split(',');
            // console.log(keywords);
            // console.log(result);
            // var arr = $.map(result, function(el) { return el });
            // console.log(arr[0])
            
            // result1 = JSON.stringify(arr)
            var obj = {detectionText:text}
            $.ajax({
                type:"POST",
                url:"http://13.90.143.244:5000/processData",
                data:obj,
                success:function(data){
                    console.log(data)
                    // console.log(JSON.parse(data));
                    console.log(Object.keys(data).length)
                    var classes = data['response'][0];
                    console.log(classes);
                    $('#graphBtn').css('display', 'block')
                    $('#button').css('display', 'none')
                    for(newClass in classes)
                    {
                        console.log(newClass)
                        console.log(classes[newClass])
                        if(newClass == "HIGH")
                        {
                            var obj = '<div class="bs-calltoaction bs-calltoaction-primary"><div class="row"><div class="col-md-9 cta-contents"><div class="cta-desc">'
                            for(var j=0;j<classes[newClass].length;j++)
                            {
                                obj += '<p><b><i>'+classes[newClass][j][0]+': </i></b>'
                                console.log(classes[newClass][j][0])

                                console.log(classes[newClass][j][1].length)
                                for(var k=0;k<classes[newClass][j][1].length;k++)
                                {
                                    obj += classes[newClass][j][1][k]+' ,  '
                                }
                                obj += '</p>';
                            }
                            obj += '</div></div><div class="col-md-3 cta-button"><a class="btn btn-lg btn-block btn-danger">HIGH</a></div></div></div>'
                            $('#summariesContainer').append(obj)
                        }else if(newClass == "SOME")
                        {

                            var obj = '<div class="bs-calltoaction bs-calltoaction-info"><div class="row"><div class="col-md-9 cta-contents"><div class="cta-desc">'
                            for(var j=0;j<classes[newClass].length;j++)
                            {
                                obj += '<p><b>'+classes[newClass][j][0]+': </b>'
                                console.log(classes[newClass][j][0])

                                console.log(classes[newClass][j][1].length)
                                for(var k=0;k<classes[newClass][j][1].length;k++)
                                {
                                    obj += classes[newClass][j][1][k]+' ,  '
                                }
                                obj += '</p>';
                            }
                            obj += '</div></div><div class="col-md-3 cta-default"><a  class="btn btn-lg btn-block btn-warning">SOME</a></div></div></div>'
                            $('#summariesContainer').append(obj)

                        }else if(newClass == "MINIMAL")
                        {

                            var obj = '<div class="bs-calltoaction bs-calltoaction-basic"><div class="row"><div class="col-md-9 cta-contents"><div class="cta-desc">'
                            for(var j=0;j<classes[newClass].length;j++)
                            {
                                obj += '<p><b>'+classes[newClass][j][0]+': </b>'
                                console.log(classes[newClass][j][0])

                                console.log(classes[newClass][j][1].length)
                                for(var k=0;k<classes[newClass][j][1].length;k++)
                                {
                                    obj += classes[newClass][j][1][k]+' ,  '
                                }
                                obj += '</p>';
                            }
                            obj += '</div></div><div class="col-md-3 cta-button"><a class="btn btn-lg btn-block btn-success">MINIMAL</a></div></div></div>'
                            $('#summariesContainer').append(obj)

                        }

                        $(document.body).on('click', '#graphBtn', function(){
                            var thisUrl = "http://13.90.143.244:5000" + data['response'][1]
                            window.open(
                              thisUrl,
                              '_blank' // <- This is what makes it open in a new window.
                            );
                        })


                    }

                    
               
                            


                    // console.log(data['others'])
                    // console.log(data['scheme'])
                    // $('#summaryTable').DataTable().destroy();
                    // if(!Object.keys(data).length)
                    // {
                    //     $('#summariesContainer').empty();
                    //     $.alert('No result found.')
                    //     $('#loading').hide();
                    //     // $('#summaryTable tbody').find('tr').remove();
                    // }else
                    // {
                    //     $('#summaryTable tbody').find('tr').remove();
                    //     if(1)
                    //     {
                    //         $('#summariesContainer').empty()
                    //         var pickledUrl = url.split('.')

                    //         if(jQuery.inArray("sebi", pickledUrl) !== -1)
                    //             $('#summariesContainer').append('<table  id="summaryTable" class="table table-hover table-striped"><thead><tr><th>S NO.</th><th>CATEGORY</th><th>TITLE</th><th>SOURCE</th><th>METADATA</th><th>SUMMARY</th></tr></thead><tbody></tbody></table>');
                    //         else
                    //             $('#summariesContainer').append('<table  id="summaryTable" class="table table-hover table-striped"><thead><tr><th>S NO.</th><th>CATEGORY</th><th>TITLE</th><th>SOURCE</th></tr></thead><tbody></tbody></table>');
                        
                    //         var j = 1;
                            
                    //         console.log(fullObject)
                    //         for (var property in data) {
                    //             var category = property
                    //             for(var i=0;i<data[category].length;i++)
                    //             {
                    //                 fullObject.push(data[category][i][2])
                    //                 fullObjectRef.push(data[category][i][3])
                    //                 fullObjectMetadata.push(data[category][i][4])
                    //                 if(jQuery.inArray("sebi", pickledUrl) !== -1)
                    //                     var row = '<tr ><td >'+j+'</td><td>'+category+'</td><td>'+data[category][i][0]+'</td><td><a class="btn btn-info pageLink" style="color:white" target="_blank" href="'+data[category][i][1]+'">VIEW</a></td><td><button class="btn btn-warning btn-md viewThisReferences" >VIEW</button></td><td><button class="btn btn-primary btn-md viewThisSummary" >VIEW</button></td></tr>';
                    //                 else if(jQuery.inArray("mca", pickledUrl) !== -1)
                    //                     var row = '<tr ><td >'+j+'</td><td>'+category+'</td><td>'+data[category][i][0]+'</td><td><a class="pageLink" target="_blank" href="http://www.mca.gov.in/'+data[category][i][1]+'">View source</a></td></tr>';
                    //                 else
                    //                     var row = '<tr ><td >'+j+'</td><td>'+category+'</td><td>'+data[category][i][0]+'</td><td><a class="pageLink" target="_blank" href="'+data[category][i][1]+'">View source</a></td></tr>';
                    //                 $('#summaryTable tbody').append(row);
                    //                 j++;
                    //             }
                                
                    //         }
                    //         console.log(fullObject)
                    //         $('#summaryTable').DataTable({
                    //             "columnDefs": [
                    //                 // {"className": "dt-head-center", "targets": "_all"},
                    //                 { "width": "10%", "targets": 0 }
                    //             ],
                    //         })
                    //     }
                    // }

                    $('#loading').hide();
                    
                    
                
                },statusCode:{
                    500:function(){
                        $('#summariesContainer').empty();
                        $.alert('No result found.')
                        $('#loading').hide();
                        // $('#summaryTable tbody').find('tr').remove();

                    }
                    // data = parseJSON(data)
                }
                    
                
            })
        }
        
        // console.log(keywords)
    })
    
    $(document.body).on('click', '#urlSearchClick', function(){
        $('#mainContainer').css('display','none')
        $('#summariesContainer').css('display','none')
        $('#mainContainerHead').css('display','block')
        
    })

    $(document.body).on('click', '#dashboardClick', function(){
        $('#mainContainer').css('display','block')
         $('#summariesContainer').css('display','block')
        $('#mainContainerHead').css('display','none')
    })


    $(document.body).on('click', '.viewThisReferences', function(){
        var index = $(this).parent().closest('tr').index();
        console.log(index)
        console.log(fullObjectRef[index])
        console.log(fullObjectMetadata[index])
        var content = "<b><i>References</i></b>: "
        var ref = fullObjectRef[index];
        for(var i=0;i<fullObjectRef[index]['url'].length;i++)
        {
            content += fullObjectRef[index]['url'][i]
            if(i<=fullObjectRef[index]['url'].length-1) 
                content+=", "
        }
        content += "<br>"
        for(key in fullObjectMetadata[index])
        {
            content+= "<b><i>"+key+"</i></b>: "+ fullObjectMetadata[index][key]+"<br>";
        }

        
        $.confirm({
            title:"MetaData",
            content:content,
            icon:'',
            autoClose:false,    
            columnClass: 'col-md-4 col-md-offset-4',
            buttons:{
                Action:{
                    text:"OK",
                    btnClass:"btn-success"
                },
                Cancel:{
                    isHidden:true
                }
            }

        })
    })
    
        
                
    

    
        $(document.body).on('click', '#logoutBtn', function(){
            location.href = "./index.html"
        })

        $(function(){
            $('.awesome-form .input-group input').focusout(function(){
                var text_val = $(this).val();
                if(text_val === ""){
                    $(this).removeClass('has-value');
                } else {
                    $(this).addClass('has-value');
                }
            });

            $('.awesome-form .input-group select').focusout(function(){
                var text_val = $(this).children('option:selected').val();
                if(text_val === ""){
                    $(this).removeClass('has-value');
                } else {
                    $(this).addClass('has-value');
                }
            });
        }); 

        $(document.body).on('click', '#submitUrlBtn', function(e){
                e.preventDefault();
                var url = $('#urlToSearch').val();
                if(url=="" || url == " ")
                {
                    $.alert({
                        title:"STOP!!",
                        icon:"fa fa-hand-stop-o",
                        content:"Input is mandatory to perform this action",
                        buttons:{
                            action:{
                                text:"OK",
                                btnClass:"btn-success"
                            }
                        }
                    })
                }else
                {
                    // http://www.fakenewsai.com/detect?url=http://www.fakingnews.firstpost.com/technology/facebook-re-introduces-marking-safe-delhi-people-24143
                    console.log(url);
                    $.ajax({
                        type:"GET",
                        url:"http://www.fakenewsai.com/detect",
                        data:{url:url},
                        success:function(data){
                            console.log(data)
                            data = JSON.parse(data)
                            console.log(data)
                            console.log(data['error'])
                            if(data['error'] == false)
                            {
                                console.log(data['result']*100)
                                 var conf  = data['result']*100;
                                 var content = "";
                                if(data['fake'] == true)
                                {
                                    var title = "Attention!!";
                                    var icon = "fa fa-frown-o";
                                    content += "This source is probably fake. Be CAUTIOUS! <br>";
                                    var type = "red";
                                    var btnClass = "btn-danger";
                                    content += "<i><b>Confidence: </b></i>" + conf + " %";
                                }else
                                {
                                    var title = "Congratulations!!";
                                    var icon = "fa fa-smile-o";
                                    content += "You found a genuine knowledge source! <br>";
                                    var type = "green";
                                    var btnClass = "btn-success"
                                }
                                


                                $.alert({
                                    title:title,
                                    icon:icon,
                                    content:content,
                                    type:type,
                                    // theme:'supervan',
                                    buttons:{
                                        action:{
                                            text:"OK",
                                            btnClass:btnClass
                                        }
                                    }
                                })
                                
                            }else
                            {
                                $.alert({
                                    title:"Oops!!",
                                    icon:"fa fa-meh-o",
                                    content:"It seems there is an error with the url provided. Please try again.",
                                    buttons:{
                                        action:{
                                            text:"OK",
                                            btnClass:"btn-success"
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
        })

    
})


