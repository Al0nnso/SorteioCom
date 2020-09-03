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
            //window.whait=1;
            
            function loadComments(comments_url,endcursor,shortcode){
                console.log(comments_url)
                var xhr=new XMLHttpRequest();
                xhr.open("GET", comments_url);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                //Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36
                /*
                var user_agent="Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36"
                xhr.setRequestHeader("User-Agent", user_agent);
                */
                xhr.send(null);
                //console.log(parameters)
                xhr.onreadystatechange= function(){
                  if(xhr.readyState==4){
                    var c_postdata=JSON.parse(xhr.responseText);
                    console.log(c_postdata)
                    $('.winner-title').text('Carregando comentários...')

                    
                    //var all_posts_count=postdata.data.user.edge_owner_to_timeline_media.count;
                    //console.log(c_postdata.data.shortcode_media.edge_media_to_parent_comment.edges)
                    var _comments=c_postdata.data.shortcode_media.edge_media_to_parent_comment.edges;
                    var max_comments=c_postdata.data.shortcode_media.edge_media_to_parent_comment.edges.length;
                    window.count_comments=c_postdata.data.shortcode_media.edge_media_to_parent_comment.count;
                    $('.count-comments').html(`<b>${window.number_comments}</b> comentários`)
                    console.log('comments: '+count_comments)
                    console.log(max_comments)
            
                    for(var i=0;i<max_comments/*&& c_loaded<count_comments*/;i++){
                        var comment_username=_comments[i].node.owner.username;
                        var comment_text=_comments[i].node.text;
                        var comment_threaded=_comments[i].node.edge_threaded_comments.count;
                        //window.all_threaded=all_threaded+comment_threaded;
                        c_loaded++;
                        var thread_list=_comments[i].node.edge_threaded_comments.edges
                        console.log(thread_list)
                        //var post_html= '<div class="photopreview"><img class="postimg" src="'+ post_url +'"><div class="photoinfo noselect">  '+likes+' '+comments+'</div></dvi>'
                        var post_comment= '<tr id="c-'+c_loaded+'" "><td><b class="c_number">'+c_loaded+'</b></td><td><b>'+antixss(comment_username)+':</b></td><td> '+antixss(comment_text)+' </td></tr>'
                        //var post_html= '<img class="postimg" src="'+ post_url +'">'
                        console.log(post_comment)
                        console.log(comment_text)
                        $('.comment-list').append(post_comment)
                        
                        if(comment_threaded>0){
                            for(var x=0;x<comment_threaded-1;x++){
                                c_loaded++;
                                console.log(x)
                                var th_username=thread_list[x].node.owner.username
                                var th_text=thread_list[x].node.text
                                var post_comment= '<tr id="c-'+c_loaded+'" "><td><b class="c_number">'+c_loaded+'</b></td><td><b>'+antixss(th_username)+':</b></td><td> '+antixss(th_text)+' </td></tr>'
                                console.log(post_comment)
                                console.log(comment_text)
                                $('.comment-list').append(post_comment)
                            }
                        }
                            
                        }
                    //console.log(numb)
                    var nextpage=c_postdata.data.shortcode_media.edge_media_to_parent_comment.page_info.has_next_page;
                    window.c_endcursor=c_postdata.data.shortcode_media.edge_media_to_parent_comment.page_info.end_cursor;
                    //window.number_comments=window.count_comments-window.all_threaded
                    $('.loaded-comments').html(`${c_loaded}/${window.count_comments}`)
                    $('.count-comments').html(`<b>${window.count_comments}</b> comentários`)
                    console.log('whait: '+window.whait+' whait-c:'+2500*window.whait+' loadeds: '+c_loaded)
                    console.log(comments_url)
                    console.log(nextpage)
                    //console.log(window.c_endcursor)
                    const load_more=()=>new Promise((resolve,reject)=>{
                        setTimeout(()=>{
                            if(nextpage /*&& c_loaded<24*2*/){
                                comments_url='https://www.instagram.com/graphql/query/?query_hash=bc3296d1ce80a24b1b6e40b1e72903f5&shortcode='+shortcode+'&first=50&after='+window.c_endcursor;
                                console.log(comments_url)
                                loadComments(comments_url,window.c_endcursor,shortcode)
                            }else{
                                $('.loaded-comments').html(`${c_loaded+1}/${window.count_comments}`)
                                $('.winner-title').text('Comentários carregados')
                                console.log('Comentarios carregados')
                            }
                        },3000)
                    })
                    load_more()
            
                }
            }
            }