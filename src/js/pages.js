!function(){var o=null,n={elem:null,offset:0},e=function(){$("#sidebar").css({display:"none"}),n.elem=document.elementFromPoint(.6*window.innerWidth,0*window.innerHeight),n.offset=Math.max(document.documentElement.scrollTop,document.body.scrollTop)+0*window.innerHeight-$(n.elem).offset().top,$("#sidebar").css({display:""})},t=function(){if(n.elem){var o=Math.max(document.documentElement.scrollTop,document.body.scrollTop)+0*window.innerHeight-$(n.elem).offset().top;document.body.scrollTop+=n.offset-o,document.documentElement.scrollTop+=n.offset-o}},i=function(){if(!$("html, body").is(":animated")){e(),$("html, body").stop();for(var o=$(".page"),n=0;n<o.length;n++){var t=$(o[n]);if("none"!=t.css("display")){var i=t.attr("page"),a=Math.round(Math.max(document.documentElement.scrollTop,document.body.scrollTop)+window.innerHeight-t.position().top-t.height()),s=Math.round(Math.max(document.documentElement.scrollTop,document.body.scrollTop)-t.position().top);if(a<=window.innerHeight/2+25&&s>-window.innerHeight/2-25){c(i);break}}}}},a=function(){"function"==typeof pages.onresize&&pages.onresize(),t(),i()},c=function(n){o=n,location.hash="#"+n,$(".navbutton.active").removeClass("active"),$(".navbutton[nav="+n+"]").addClass("active"),"function"==typeof pages.onactive&&pages.onactive(n)};$.easing.easeInExp=function(o,n,e,t,i){return 0==n?e:t*Math.pow(2,10*(n/i-1))+e};var s=function(n,e){n=n||location.hash.replace(/^#(.+)$/,"$1")||document.querySelector(".page").page;var t=$("[page="+n+"]");1==t.length&&(n!=o&&c(n),t.position().top!=Math.max(document.documentElement.scrollTop,document.body.scrollTop)&&$("html, body").stop().animate({scrollTop:t.position().top},e||0,"easeInExp"))};window.pages={init:function(){$(function(){$(window).on("mousewheel",function(o){$("html, body").stop()}),$(window).on("scroll",i),$(window).on("resize",a),$(".navbutton").on("click",function(){s($(this).attr("nav"),300)}),$(window).on("hashchange",function(){var o=location.hash.match(/^#(.+)$/);o&&s(o[1],300)});var o=$.fx.off;$.fx.off=!0,a(),e(),$.fx.off=o})},show:s,refpoint_set:e,refpoint_goto:t,resize:a,onresize:void 0,onactive:void 0}}();