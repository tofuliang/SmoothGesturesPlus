!function(){var o=function(){$(function(){$(window).on("mousewheel",function(){$("html, body").stop()}),$(window).on("scroll",c),$(window).on("resize",s),$(".navbutton").on("click",function(){d($(this).attr("nav"),300)}),$(window).on("hashchange",function(){var o=location.hash.match(/^#(.+)$/);o&&d(o[1],300)});var o=$.fx.off;$.fx.off=!0,s(),i(),$.fx.off=o})},n=null,e={elem:null,offset:0},t=0,i=function(){$("#sidebar").css({display:"none"}),e.elem=document.elementFromPoint(.6*window.innerWidth,window.innerHeight*t),e.offset=Math.max(document.documentElement.scrollTop,document.body.scrollTop)+window.innerHeight*t-$(e.elem).offset().top,$("#sidebar").css({display:""})},a=function(){if(e.elem){var o=Math.max(document.documentElement.scrollTop,document.body.scrollTop)+window.innerHeight*t-$(e.elem).offset().top;document.body.scrollTop+=e.offset-o,document.documentElement.scrollTop+=e.offset-o}},c=function(){if(!$("html, body").is(":animated")){i(),$("html, body").stop();for(var o=$(".page"),n=0;n<o.length;n++){var e=$(o[n]);if("none"!=e.css("display")){var t=e.attr("page"),a=Math.round(Math.max(document.documentElement.scrollTop,document.body.scrollTop)+window.innerHeight-e.position().top-e.height()),c=Math.round(Math.max(document.documentElement.scrollTop,document.body.scrollTop)-e.position().top);if(a<=window.innerHeight/2+25&&c>-window.innerHeight/2-25){l(t);break}}}}},s=function(){"function"==typeof pages.onresize&&pages.onresize(),a(),c()},l=function(o){n=o,location.hash="#"+o,$(".navbutton.active").removeClass("active"),$(".navbutton[nav="+o+"]").addClass("active"),"function"==typeof pages.onactive&&pages.onactive(o)};$.easing.easeInExp=function(o,n,e,t,i){return 0==n?e:t*Math.pow(2,10*(n/i-1))+e};var d=function(o,e){o=o||location.hash.replace(/^#(.+)$/,"$1")||document.querySelector(".page").page;var t=$("[page="+o+"]");1==t.length&&(o!=n&&l(o),t.position().top!=Math.max(document.documentElement.scrollTop,document.body.scrollTop)&&$("html, body").stop().animate({scrollTop:t.position().top},e||0,"easeInExp"))};window.pages={init:o,show:d,refpoint_set:i,refpoint_goto:a,resize:s,onresize:void 0,onactive:void 0}}();