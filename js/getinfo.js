
/*

http://zetcode.com/articles/javascriptjsonurl/
https://www.youtube.com/watch?v=jC9NQ0W0ylI

https://stackoverflow.com/questions/49265013/instagram-a-1max-id-end-cursor-isnt-working-for-public-user-feeds

*/

/*

https://www.instagram.com/graphql/query/?query_id=17888483320059182&id=1422387514&first=12&after=QVFCeGVRUzJGRndJTnB3WjhGZmNGVTZEV29hOS1WR3hxenY1TVY2VHo2NmFWVzNCbGZldkJTT3dibHJZWkFlTV9iWEFfMHlFSnJ0OHRxOVBsSEJHYmlTcg==

https://www.instagram.com/graphql/query/?query_id=17888483320059182&id=USERID&first=12&after=END_CURSOR

*/

        /*
        //file information
        var profile_image=data.graphql.user.username;

        //data information
        var username=data.graphql.user.profile_pic_url;
        var fullname=data.graphql.user.full_name;
        var biography=data.graphql.user.biography;
        var number_follows=data.graphql.user.edge_followed_by.count;
        var number_following=data.graphql.user.edge_follow.count;
        var posts=data.graphql.user.edge_owner_to_timeline_media.edges;
        var posts_count=data.graphql.user.edge_owner_to_timeline_media.count;
        var userid=data.graphql.user.id;
        //var number_coments
        */

    /*
    window.onload = function() 
    { document.getElementsByClassName('showload').style.display = "none"; }
    */

    window.indown=false;

      $('.img-grid').scroll(function() {
        /*if($('.img-grid').scrollTop()/100-(loaded/4) < 25) {
            //alert("near bottom!");
            var posts_url='https://www.instagram.com/graphql/query/?query_id=17888483320059182&id='+userid+'&first=12&after='+window.endcursor;
            getAllPhotos(posts_url,window.endcursor)
            setTimeout(function(){
                //do what you need here
            }, 2000);
        }*/
        //console.log($('.img-grid').scrollTop()/100-(loaded/4))
        //console.log($('.img-grid').scrollTop())
        //console.log(loaded/4)
        if(!window.indown){
            scrolldown()
        }else{
            scrollup()
        }
    
        //console.log($('.img-grid').scrollTop()/100-((loaded/4)))
     });   

       var selected;

       function selectphoto(shortcode,postid){
           //alert(shortcode+' '+postid)
           
           if(selected!=undefined){
               dismarkphoto(selected)
           }
           selected=postid;
           $(`#${postid}`).find("img").css('opacity','.7')
           $(`#info-${postid}`).append('<button onclick="loadsorteio(`'+shortcode+'`,`'+postid+'`)" class="btn btn-light btselect-confirm">Escolher</button>')
           
       }
       
       function loadsorteio(shortcode,postid){
            console.log(`foto: shortcode= ${shortcode} , id= ${postid} selecionada...`)
            window.post_link=$(`#${postid}`).find("img").attr('src')
            console.log(window.post_link)
            window.shortcode=shortcode
            window.postid=postid
            $(".layout-area").load('layout-3.html');
       }
       
       function dismarkphoto(old_selected){
           $(`#${old_selected}`).find("img").css('opacity','1');
           //var elem=document.getElementById(`info-${old_selected}`);
           //var btelem=document.getElementsByClassName('btselect-confirm');
           //$(`#info-${old_selected}`).remove('.btselect-confirm');
           $('button').remove('.btselect-confirm');
           console.log('removed...')
       }

       //vezes=220;
       $('.usrinput').keyup(function() {
           //atualiza a cada tecla inserida no input
           //var profilename=$('.usrinput').val()
           //var url='https://www.instagram.com/'+ profilename + '/?__a=1'
       
       });
       
       function scrolldown(){
           window.scroll(0,window.innerHeight+30);
           $('html').css('overflow-y','scroll')
           $('.scrollup').css('display','block')
           window.indown=true;
       }function scrollup(){
           window.scroll(0,0);
           $('html').css('overflow-y','hidden')
           $('.scrollup').css('display','none')
           window.indown=false;
       }
       
       function failload(){
           //document.write(`Fail to load profile`)
       }
       

       //var user={}
       
