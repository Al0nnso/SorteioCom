
function load_layout2(){

    console.log(window.user)

    var user=window.user;

    var photo_icon=document.getElementsByClassName('.photo-icon');

    /*photo_icon.onload=function(){
        $('.photo-icon').css('width','110px')
        $('.photo-icon').css('height','110px')
        //$('.photo-icon').addClass('.photo-icon');
    }*/
    //photo_icon.
    /*$('.photo-icon').ready(function(){
        $('.photo-icon').css('width','110px')
        $('.photo-icon').css('height','110px')
    });*/

    console.log('SRC= '+user.image)
    $('.photo-icon').attr('src',user.image)
    $('.username-icon').text(user.username)
    $('.posts-icon').text('posts: '+user.number_posts)

}


