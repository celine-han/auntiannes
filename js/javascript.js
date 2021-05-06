//상단메인메뉴
$(function(){
    const $mnu = $('header>div>nav>.gnb>li');

    let nowMnuIdx = 0;
    let barWidth = 0;

    $mnu.find('div').append('<span class="bar"></span>');
    const $bar = $mnu.find('.bar');

    barWidth = $mnu.eq(nowMnuIdx).width();

    $bar.eq(nowMnuIdx).width(barWidth);
    

    $(window).on('load', function(){
        barWidth = $mnu.eq(nowMnuIdx).width();
        $bar.css({left:-barWidth});
        $('html, body').stop().animate({scrollTop:0});
    });

    $mnu.on({
        'mouseenter' : function(){
            nowMnuIdx = $mnu.index(this);
            barWidth = $mnu.eq(nowMnuIdx).width();

            $bar.eq(nowMnuIdx).width(barWidth);
            $bar.eq(nowMnuIdx).show().stop().animate({
                left: 0
            });

            $bar.eq(nowMnuIdx).parent().siblings().find('.bar').hide();

            //하위 메뉴 보이게
            $('.gnb>li').eq(nowMnuIdx).find('.lnb').show();
        }
        ,
        'mouseleave' : function(){
            nowIdx = $mnu.index(this);

            $bar.eq(nowMnuIdx).animate({left:-barWidth});
            $bar.eq(nowMnuIdx).parent().siblings().find('.bar').hide();

            //하위메뉴 숨김
            $mnu.eq(nowIdx).find('.lnb').hide();
        }
    });
});


//왼쪽 슬라이드 >아래에서 위
$(function(){
    const $slideImg = $('.main>.img-slide>li');
    const $slideTxt = $('.main>.txt-slide>li');
    const $btnPrev = $('.main>a').eq(0);
    const $btnNext = $('.main>a').eq(1);
    const $pagination = $('.main>.pagination>ol>li');

    let nowIdx = 0;
    let oldIdx = null;
    let movekey = false;
    let intervalKey = null;
    let intervalClear = null;
    let val = 0;

    //다음 이동 함수
    const nextMoveFn = function(){
        movekey=true;
            oldIdx = nowIdx;
    
            if(nowIdx<2){
                nowIdx++;
            }else{
                nowIdx=0;
            }
    
            //왼쪽 이미지 슬라이드 움직이기
            if(nowIdx==0){
                $slideImg.eq(0).css({'z-index':30});
                $slideTxt.eq(0).find('img').css({'z-index':4000});
                $slideImg.eq(0).css({top:927,'z-index':50}).show().animate({top:0},500,function(){
                    $slideImg.eq(2).hide();
                    $slideImg.eq(0).css({'z-index':'inherit'});
                    $slideImg.eq(2).css({'z-index':'inherit'});
                    $slideTxt.eq(0).find('img').css({'z-index':'inherit'});
                });
            }else{
                $slideImg.eq(nowIdx).css({top:927}).show().animate({top:0},500,function(){
                    $slideImg.eq(oldIdx).hide();
                });
            }
    
            // 가운데 이미지 바뀌기
            $slideTxt.children('img').eq(oldIdx).fadeOut();
            $slideTxt.children('img').eq(nowIdx).fadeIn();
    
            //오른쪽 글자
            $slideTxt.children('h2').eq(oldIdx).css({opacity:0});
            $slideTxt.children('h2').eq(nowIdx).css({'margin-top':290}).animate({'margin-top':300, opacity:1});
    
            $slideTxt.eq(oldIdx).children('p').first().css({opacity:0});
            $slideTxt.eq(nowIdx).children('p').first().css({'margin-top':0}).delay(400).animate({'margin-top':5, opacity:1});
    
            $slideTxt.eq(oldIdx).children('p').eq(1).css({opacity:0});
            $slideTxt.eq(nowIdx).children('p').eq(1).css({'margin-top':20}).delay(800).animate({'margin-top':30, opacity:1}, function(){
                movekey=false;
            });
    
            $slideTxt.eq(oldIdx).children('a').css({opacity:0, 'z-index':500});
            $slideTxt.eq(nowIdx).children('a').delay(800).animate({opacity:1, 'z-index':1000});  

            //페이지네이션
            $pagination.eq(oldIdx).hide();
            $pagination.eq(nowIdx).show();

    };
   
    //다음버튼 클릭
    $btnNext.on('click', function(evt){
        evt.preventDefault();

        clearInterval(intervalClear);

        //여러번 클릭 방지
        if(movekey==false){
            nextMoveFn();
        }
    });


    //이전버튼 클릭
    $btnPrev.on('click', function(evt){
        evt.preventDefault();
        clearInterval(intervalClear);
        
        //여러번 클릭 방지
        if(movekey==false){
           movekey=true;
           oldIdx = nowIdx;

   
           if(nowIdx>0){
               nowIdx--;
           }else{
               nowIdx=2;
           }
   
           console.log(nowIdx);
   
           //왼쪽 이미지 슬라이드 움직이기
           if(nowIdx==2){
               $slideImg.eq(0).css({'z-index':30});
               $slideTxt.eq(0).find('img').css({'z-index':4000});
               $slideImg.eq(2).css({top:-927,'z-index':50}).show().animate({top:0},500,function(){
                   $slideImg.eq(0).hide();
                   $slideImg.eq(0).css({'z-index':'inherit'});
                   $slideImg.eq(2).css({'z-index':'inherit'});
                   $slideTxt.eq(0).find('img').css({'z-index':'inherit'});
               });
           }else{
               $slideImg.eq(oldIdx).css({'z-index':30});
               $slideTxt.eq(nowIdx).find('img').css({'z-index':4000});
               $slideImg.eq(nowIdx).css({top:-927,'z-index':50}).show().animate({top:0},500,function(){
                   $slideImg.eq(oldIdx).hide();
                   $slideImg.eq(oldIdx).css({'z-index':'inherit'});
                   $slideImg.eq(nowIdx).css({'z-index':'inherit'});
                   $slideTxt.eq(nowIdx).find('img').css({'z-index':'inherit'});
               });
   
           }
   
           // 가운데 이미지 바뀌기
           $slideTxt.children('img').eq(oldIdx).fadeOut();
           $slideTxt.children('img').eq(nowIdx).fadeIn();
   
           //오른쪽 글자
           $slideTxt.children('h2').eq(oldIdx).css({opacity:0});
           $slideTxt.children('h2').eq(nowIdx).css({'margin-top':290}).animate({'margin-top':300, opacity:1});
   
           $slideTxt.eq(oldIdx).children('p').first().css({opacity:0});
           $slideTxt.eq(nowIdx).children('p').first().css({'margin-top':0}).delay(400).animate({'margin-top':5, opacity:1});
   
           $slideTxt.eq(oldIdx).children('p').eq(1).css({opacity:0});
           $slideTxt.eq(nowIdx).children('p').eq(1).css({'margin-top':20}).delay(800).animate({'margin-top':30, opacity:1}, function(){
                movekey=false;
           });
   
           $slideTxt.eq(oldIdx).children('a').css({opacity:0, 'z-index':500});
           $slideTxt.eq(nowIdx).children('a').delay(800).animate({opacity:1, 'z-index':1000});


        }
    });

    //슬라이드 자동재생
    $(window).on('load', function(){
        intervalclear = setInterval(function(){
            $('progress').attr({
                value : val++
            });
        }, 90);

        setTimeout(function(){
            clearInterval(intervalClear);
            
            $('progress').attr({
                value : 0
            });
        }, 10000);
        
        intervalKey = setInterval(function(){

            nextMoveFn();
            clearInterval(intervalClear);
            intervalclear = setInterval(function(){
                $('progress').attr({
                    value : val++
                });
            }, 90);
            
        }, 10000);
    });
});


//스크롤 이벤트
$(function(){
    const $header = $('header>div');
    const $topMnu = $header.find('a');
    const $leftSidebar = $('.main>nav');
    const $leftMnu = $leftSidebar.find('li');

    let scrollEvent = false; //한번씩만 적용시키기 위해서
    let count = 0; //얼마만큼내렸는지 세기 위해서
    let nowIdx = 0;


  $('html,body').on('wheel', function(evt){
      //evt.preventDefault(); //브라우저 기능차단. 스크립트와 브라우저 간 휠기능 간섭을 막아줌

      //wheel에서얻을 수 있는 정보 중 whellDelta 값만 변수 m에 담음
      let origin = evt.originalEvent.wheelDelta;

      //섹션의 높이값을 변수에 담음 - 한 영역의 높이값
      let height = $('section').height();

      if(origin>1 && scrollEvent == false && count>0){
          //스크롤 올릴떄
          scrollEvent = true;
          
          //왼쪽 메뉴 표시 바뀌도록
          if(nowIdx<=4){
              console.log(nowIdx);
              nowIdx--;
              $leftMnu.eq(nowIdx).addClass('on').siblings().removeClass('on');
              $leftSidebar.css({opacity:1});

              if(nowIdx==1||nowIdx==3){
                $('.main>nav>ul>li.on>a>span.circle').css({backgroundColor:'#222'});
              }else{
                $('.main>nav>ul>li:nth-child(2)>a>span.circle').css({backgroundColor:'transparent'});
                $('.main>nav>ul>li:nth-child(4)>a>span.circle').css({backgroundColor:'transparent'});
              }
          }
          count--;
          $("html,body").stop().animate({scrollTop:height*count},
            300, function(){scrollEvent = false;});

          if(count==1 || count==3){
            $topMnu.css({color:'#222'});
            $leftMnu.css({color:'#222'});
            $leftMnu.find('span.circle').css({borderColor:'#ccc'});
            $header.css({opacity:1});
          }else{
            $topMnu.css({color:'#fff'});
            $leftMnu.css({color:'#fff'});
            $leftMnu.find('span.circle').css({borderColor:'#fff'});
            $header.css({opacity:1});
          }

      }else if(origin<1 && scrollEvent == false && count<4){
          //스크롤 내릴때
          scrollEvent = true;

          if(nowIdx<=4){
              nowIdx++;
              $leftMnu.eq(nowIdx).addClass('on').siblings().removeClass('on');
              $leftSidebar.css({opacity:1});

              if(nowIdx==1||nowIdx==3){
                $('.main>nav>ul>li.on>a>span.circle').css({backgroundColor:'#222'});
              }else{
                $('.main>nav>ul>li:nth-child(2)>a>span.circle').css({backgroundColor:'transparent'});
                $('.main>nav>ul>li:nth-child(4)>a>span.circle').css({backgroundColor:'transparent'});
              }
              if(nowIdx==4){
                  $leftSidebar.css({opacity:0})
              }
          }
          count++;

          $('html,body').stop().animate({scrollTop:height*count},
            300, function(){scrollEvent = false;});

          if(count==1 || count==3){
            $topMnu.css({color:'#222'});
            $leftMnu.css({color:'#222'});
            $leftMnu.find('span.circle').css({borderColor:'#ccc'});
            $header.css({opacity:1});
          }else{
            $topMnu.css({color:'#fff'});
            $leftMnu.css({color:'#fff'});
            $leftMnu.find('span.circle').css({borderColor:'#fff'});
            $header.css({opacity:1});
          }

      }else if(origin<1 && scrollEvent == false && count ==4){
          //스크롤이 마지막 화면으로 넘어가고 나서
          scrollEvent = true;
          count=0;
          $('html,body').stop().animate({scrollTop:0},
            300, function(){scrollEvent = false;});
          $('.main>nav').css({opacity:0});
      }


      $(window).on('scroll', function(){
        let scrollTop = $(window).scrollTop();          

          if(scrollTop>3100){
            $header.css({opacity:0});
          }else{
            $header.css({opacity:1});
          }

          if(scrollTop==0){
              $leftSidebar.css({opacity:1});
              nowIdx=0;
              $leftMnu.eq(nowIdx).addClass('on').siblings().removeClass('on');
              $('.main>nav>ul>li:nth-child(2)>a>span.circle').css({backgroundColor:'transparent'});
              $('.main>nav>ul>li:nth-child(4)>a>span.circle').css({backgroundColor:'transparent'});
          }
      });

      //로고 클릭시 새로고침 및 상단으로 가기
      $('header>div>h1>a').on('click', function(evt){
          evt.preventDefault();
          $('html,body').stop().animate({scrollTop:0});
          nowIdx=0;
          $('header>div>nav>.gnb>li>div>a').css({color:'#fff'});
      });
  });
});

//두번째 화면 좌우로 이동
$(function(){
    const $nextBtn = $('.menu>a');
    const windowWidth = $(window).width();
    
    $nextBtn.on('click', function(evt){
        evt.preventDefault();
        if($nextBtn.hasClass('prev')){
            $nextBtn.on('click', function(evt){
                $('.menu>div').stop().animate({left:0});
                $nextBtn.removeClass('prev');
            });
        }else{
            $nextBtn.on('click', function(evt){
                // evt.preventDefault();
                $('.menu>div').stop().animate({left:-windowWidth});
                $nextBtn.addClass('prev');
            });
        }
    });
});

//메인메뉴 왼쪽 네비게이션
$(function(){
    const $leftNav = $('.main>nav>ul>li>a>span');
    let nowIdx = 0;
    let height = $('section').height();

    $leftNav.on('click', function(evt){
        evt.preventDefault();
        nowIdx=$leftNav.index(this);
        $('html, body').stop().animate({scrollTop:height*nowIdx});
        $leftNav.eq(nowIdx).parents('li').addClass('on').siblings().removeClass('on');
        if(nowIdx==1||nowIdx==3){
            $('.main>nav>ul>li').eq(nowIdx).find('span.circle').css({backgroundColor:'#222'});
            $leftNav.css({borderColor:'#ccc'});
            $leftNav.eq(nowIdx).parents('li').css({color:'#222'});
            $leftNav.eq(nowIdx).addClass('on').siblings().removeClass('on');
        }else{
            $('.main>nav>ul>li:nth-child(2)>a>span.circle').css({backgroundColor:'transparent'});
            $('.main>nav>ul>li:nth-child(4)>a>span.circle').css({backgroundColor:'transparent'});
        }
        if(nowIdx==1){
            $('.main>nav>ul>li:nth-child(4)>a>span.circle').css({backgroundColor:'transparent'});
        }
        
    });
    

    
});