/*
https://www.instagram.com/graphql/query/?
query_hash=bc3296d1ce80a24b1b6e40b1e72903f5
&variables=%7B%22shortcode%22%3A%22B7KXlUBhCwJ%22%2C%22first%22%3A12%2C%22after%22%3A%22%7B%5C%22cached_comments_cursor%5C%22%3A+%5C%2218088895479094354%5C%22%2C+%5C%22bifilter_token%5C%22%3A+%5C%22KF0BEADIADAAIAAQAAgACAAIAAgAt--f19_v__9_u__rvfv37_-__b_1f_d797p__ZDZM__TedHj_Bvc3f__8____---8_v9__u7W___f-9-7v_7l3fc-NEFS0syCQAA%5C%22%7D%22%7D

"shortcode"="B7KXlUBhCwJ"&
"first"=12&
"after"=\"cached_comments_cursor\"=+\"18088895479094354\"
"bifilter_token\"=+\"KF0BEADIADAAIAAQAAgACAAIAAgAt--f19_v__9_u__rvfv37_-__b_1f_d797p__ZDZM__TedHj_Bvc3f__8____---8_v9__u7W___f-9-7v_7l3fc-NEFS0syCQAA\

*/

//https://www.instagram.com/graphql/query/?query_id=17888483320059182&shortcode=B7KXlUBhCwJ&first=12

/*working
https://www.instagram.com/graphql/query/?query_hash=bc3296d1ce80a24b1b6e40b1e72903f5&shortcode=B7ROiqzns0w&first=12
*/

/*
Para pegar a foto de perfil
*/
            //LOAD COMMENTS

            function antixss(string_comment){
                string_comment.replace('<','').replace('>','');
                return(string_comment);
            }
            var c_loaded=0;
            window.all_threaded=0
            window.number_comments=0;
            window.whait=1;
            
            function loadComments(comments_url,endcursor,shortcode){
                console.log(comments_url)
                
                $.getJSON(comments_url,function(c_postdata){
                    
                    //var all_posts_count=postdata.data.user.edge_owner_to_timeline_media.count;
                    //console.log(c_postdata.data.shortcode_media.edge_media_to_parent_comment.edges)
                    var _comments=c_postdata.data.shortcode_media.edge_media_to_parent_comment.edges;
                    window.count_comments=c_postdata.data.shortcode_media.edge_media_to_parent_comment.count;
                    $('.count-comments').html(`<b>${window.number_comments}</b> comentários`)
                    console.log('comments: '+count_comments)
            
                    try{
                        for(var i=0;i<50/*&& c_loaded<count_comments*/;i++){
                            var comment_username=_comments[i].node.owner.username;
                            var comment_text=_comments[i].node.text;
                            var comment_threaded=_comments[i].node.edge_threaded_comments.count;
                            window.all_threaded=all_threaded+comment_threaded;
                            c_loaded++;
                            
                            /*
                            antixss(comment_username)
                            antixss(comment_text)
                            */
            
                            //var post_html= '<div class="photopreview"><img class="postimg" src="'+ post_url +'"><div class="photoinfo noselect">  '+likes+' '+comments+'</div></dvi>'
                            var post_comment= '<li id="c-'+c_loaded+'" "><b>'+comment_username+':</b> '+comment_text+' </li>'
                            //var post_html= '<img class="postimg" src="'+ post_url +'">'
                            console.log(post_comment)
                            console.log(comment_text)
                            $('.comment-list').append(post_comment)
                            
                        }
                    }catch(e){
                        console.log(e)
                        console.log('finish...')
                    }
                    //console.log(numb)
                    var nextpage=c_postdata.data.shortcode_media.edge_media_to_parent_comment.page_info.has_next_page;
                    window.c_endcursor=c_postdata.data.shortcode_media.edge_media_to_parent_comment.page_info.end_cursor;
                    window.number_comments=window.count_comments-window.all_threaded
                    $('.loaded-comments').html(`${c_loaded}/${window.number_comments}`)
                    $('.count-comments').html(`<b>${window.number_comments}</b> comentários`)
                    console.log('whait: '+window.whait+' whait-c:'+2500*window.whait+' loadeds: '+c_loaded)
                    console.log(comments_url)
                    if(2500*window.whait<=c_loaded){
                        setTimeout(function(){
                            console.log('whait: '+window.whait+' loadeds: '+c_loaded)
                            window.whait+=1;
                            load_more()
                        }, 60000);
                    }else{
                        load_more()
                    }
                    //console.log(window.c_endcursor)
                    function load_more(){
                        if(nextpage /*&& c_loaded<24*2*/){
                            comments_url='https://www.instagram.com/graphql/query/?query_hash=bc3296d1ce80a24b1b6e40b1e72903f5&shortcode='+shortcode+'&first=50&after='+window.c_endcursor;
                            console.log(comments_url)
                            loadComments(comments_url,window.c_endcursor,shortcode)
                        }else{
                            $('.load-status').text('Comentários carregados')
                        }
                    }
            

            
            
                })
            }