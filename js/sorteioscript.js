
sorteio(window.shortcode,window.postid)
    
    function sorteio(shortcode,postid){
        //transition(window.user.post_link)
        $('.selected-post-icon').attr('style','background:url('+window.post_link+');background-size:160px')//.attr('src',window.post_link)//foto
        $('.name-title').html(window.user.username)
        //$('.layout-3').css('opacity', '1')
        //$('.count-comments').html(`<b>${window.count_comments}</b> comentários`)
        //$('.min-comments').html('varios/min')
        var comments_url='https://www.instagram.com/graphql/query/?query_hash=bc3296d1ce80a24b1b6e40b1e72903f5&shortcode='+shortcode+'&first=50';
        loadComments(comments_url,'null_endcursor',shortcode);
    }

    $('.btexcel').click(function(){
        //console.log('saa')
        export_sheet();
    })

    $('.btsortear').click(function(){
        var numberMax=window.count_comments/*-window.all_threaded*/;
        console.log('max: '+numberMax)
        var numberSorteado=Math.floor(Math.random() * numberMax)+1;
        console.log('sorteado:  '+numberSorteado+' / '+numberMax)
        var commentSorteado=$(`#c-${numberSorteado}`).html()
        console.log(commentSorteado)
        if (commentSorteado.length > 85){
            commentSorteado.substr(0,85)
            commentSorteado=commentSorteado+'...'
        }
        $('.winner-title').text('Comentario sorteado:')
        $('.winner-area').append(`<div class='winner-box'>${commentSorteado}</div>`)
    })

    
    function transition(post_link){
        $('html').css('overflow','hidden')
        $('.colortransition-object').css({'visibility':`visible`,
        'width':`2500px`,
        'height':`2500px`,
         })
        setTimeout(function(){
            $('.colortransition-object').css({'visibility':`visible`,
            'width':`100%`,
            'height':`100%`,
            'border-radius':`0px`,
             })
        }, 300);
        setTimeout(function(){
            $('.layout-background').css({
                'visibility':`visible`,
                'opacity':'1',
            })
        }, 100);
        $('.sortear-box').css('visibility','visible')
        $('.sortear-box').css('opacity','1')
        $('.selected-post-icon').attr('style','background:url('+post_link+')')//foto
        /*$('.sortear-box').css({
            "display":"block",
            "opacity" : "1",
            "transition" : "opacity .8s ease-in-out"
        });*/
        console.log('transitioneed')
    }
    
      
      /*document.addEventListener('mousemove', function(e){
          isMouseInBox(e);
      })*/
