!function(){"update_url"in chrome.runtime.getManifest()&&(console.log=console.error=function(){});var n={};chrome.storage.local.get(null,function(e){n=e,s()});var e=function(e,o){if("local"==o)for(key in e)n[key]=e[key].newValue};chrome.storage.onChanged.addListener(e);var o=location.hash.substr(1).split(",");""==o[0]&&window.close(),chrome.permissions.contains({permissions:o},function(n){n&&window.close()});var s=function(){$(function(){$("body").append($("<h2><img src='/img/icon32.png'> <span class=sgtitle>Smooth Gestures <span class=sgplus>plus</span></span></h2>")).append($("<p>").html("New permissions are needed")),$("body").append($("<div id=continue class=button>").text("Continue").click(function(){chrome.permissions.request({permissions:o},function(n){n&&chrome.runtime.getBackgroundPage(function(n){n.continue_permissions(),window.close()})})}))})}}();