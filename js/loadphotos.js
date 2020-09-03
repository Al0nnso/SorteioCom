/*var profilename=$('.usrinput').val()
var url='https://www.instagram.com/'+ profilename + '/?__a=1'
*/
//getjson(window.url)

/*
GET THUMBNAIL PHOTO
https://instagram.com/p/B7r1MCfhizD/media/?size=m

*/

verifyProfile(window.url)

function verifyProfile(url){
    $.getJSON(url,function(userdata){
        if(userdata.graphql.user.is_private){
            alert('O perfil é privado, selecione um perfil público')
            $(".layout-area").load('layout-1.html');
        }else{
            getjson(url)
        }
    })
   
}

function getjson(url){
       
    var numb,userid,endcursor,all_posts_count,nextpage
    
    var loaded=0;

    console.log(url)


    $.getJSON(url,function(data){
        console.log('sdsdz')

        window.user={
            "username":data.graphql.user.username,
            "id":data.graphql.user.id,
            "image":data.graphql.user.profile_pic_url,
            "name":data.graphql.user.full_name,
            "biography":data.graphql.user.biography,
            "number_follows":data.graphql.user.edge_followed_by.count,
            "number_following":data.graphql.user.edge_follow.count,
            "posts":data.graphql.user.edge_owner_to_timeline_media.edges,
            "number_posts":data.graphql.user.edge_owner_to_timeline_media.count,
        }

        load_layout2()
        
        //file information
        var profile_image=data.graphql.user.profile_pic_url;

        //data information
        var username=data.graphql.user.username;
        var fullname=data.graphql.user.full_name;
        var biography=data.graphql.user.biography;
        var number_follows=data.graphql.user.edge_followed_by.count;
        var number_following=data.graphql.user.edge_follow.count;
        var posts=data.graphql.user.edge_owner_to_timeline_media.edges;
        var posts_count=data.graphql.user.edge_owner_to_timeline_media.count;
        var userid=data.graphql.user.id;
        //var number_coments

        var end_cursor=data.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor
        var posts_url='https://www.instagram.com/graphql/query/?query_id=17888483320059182&id='+userid+'&first=12'



        
        getAllPhotos(posts_url,end_cursor);

        function getAllPhotos(posts_url,endcursor){
            console.log('fdxasdasvc')

            $.getJSON(posts_url,function(postdata){
                
                //var all_posts_count=postdata.data.user.edge_owner_to_timeline_media.count;
                var _posts=postdata.data.user.edge_owner_to_timeline_media.edges;

                try{
                    for(var i=0;i<12&&loaded<window.user.number_posts;i++){
                        var post_url=_posts[i].node.display_url;
                        
                        var likes=_posts[i].node.edge_media_preview_like.count;
                        var shortcode=_posts[i].node.shortcode;
                        var postid=_posts[i].node.id;
                        if(!_posts[i].node.comments_disabled){
                            var comments=_posts[i].node.edge_media_to_comment.count;
                        }else{
                            console.log('coment disbled')
                            var comments='disabled'
                        }
                        //var post_html= '<div class="photopreview"><img class="postimg" src="'+ post_url +'"><div class="photoinfo noselect">  '+likes+' '+comments+'</div></dvi>'
                        var post_html= '<div class="photopreview" urlid="'+post_url+'" style="background-image:url('+ post_url+')" id="'+postid+'" onclick="selectphoto(`'+shortcode+'`,`'+postid+'`)"><div id="info-'+postid+'" ></div><div class="photoinfo noselect" >'+comments+'</div></dvi>'
                        //var post_html= '<img class="postimg" src="'+ post_url +'">'
                        console.log(post_html)
                        $('.img-grid').append(post_html)
                        loaded++;
                    }
                }catch{
                    console.log('finish...')
                }
                console.log(posts_url)
                console.log(endcursor)
                //console.log(numb)
                var nextpage=postdata.data.user.edge_owner_to_timeline_media.page_info.has_next_page
                window.endcursor=postdata.data.user.edge_owner_to_timeline_media.page_info.end_cursor

                if(nextpage && loaded<24*2){
                    posts_url='https://www.instagram.com/graphql/query/?query_id=17888483320059182&id='+userid+'&first=12&after='+window.endcursor;
                    console.log(posts_url)
                    getAllPhotos(posts_url,window.endcursor)
                }


            })
        }


    
    console.log(username)
    console.log(fullname)
    console.log(profile_image)
    console.log(number_follows)
    console.log(number_following)
    console.log(posts)
    console.log(posts_count)
    console.log(userid)
    console.log(end_cursor)
    


    //load photos
    /*for(var i=0;i<posts_count;i++){
        console.log(i)
        var post_url=posts[i].node.display_url;
        var likes=posts[i].node.edge_liked_by.count;
        var comments=posts[i].node.edge_media_to_comment.count;
        var post_html= '<img class="postimg" src="'+ post_url +'">'
        console.log(post_html)
        $('.img-grid').append(post_html)
    }
    */

    /*$.ajax({
            url: 'https://www.instagram.com/'+ profilename + '/?__a=1',
            type:'get',
            sucess:function(response){
                $('profile-image').attr('src',response.graphql.user.profile_image_url);
                $('.name').html(response.graphql.user.full_name);
                username=response.graphql.user.username;
                
            }
    })*/


});
}