var langs={am:"Amharic",ar:"Arabic",bg:"Bulgarian",bn:"Bengali",ca:"Catalan",cs:"Czech",da:"Danish",de:"German",el:"Modern Greek",en:"English",en_GB:"English: British",es:"Spanish",et:"Estonian",fi:"Finnish",fr:"French",gu:"Gujarati",he:"Hebrew",hi:"Hindi",hr:"Croatian",hu:"Hungarian",id:"Indonesian",it:"Italian",ja:"Japanese",kn:"Kannada",ko:"Korean",lt:"Lithuanian",lv:"Latvian",ml:"Malayalam",mr:"Marathi",nb:"Norwegian",nl:"Dutch",or:"Oriya",pl:"Polish",pt:"Portuguese",pt_BR:"Portuguese: Brazil",ro:"Romanian",ru:"Russian",sk:"Slovak",sl:"Slovenian",sr:"Serbian",sv:"Swedish",sw:"Swahili",ta:"Tamil",te:"Telugu",th:"Thai",tr:"Turkish",uk:"Ukrainian",vi:"Vietnamese",zh:"Chinese",zh_TW:"Chinese: Traditional"},accept=[];chrome.i18n.getAcceptLanguages(function(e){for(-1!=e.indexOf(window.navigator.language.replace("-","_"))&&e.splice(e.indexOf(window.navigator.language.replace("-","_")),1),e.unshift(window.navigator.language.replace("-","_")),i=0;i<e.length;i++)langs[e[i]]||(e.splice(i,1),i--);accept=e,language=accept[0],$("body").append($("<div>").attr("id","instruct").append($("<p>").text("Choose the language to translate to from the dropdown box. Type translations for some or all phrases, then click Submit.")).append($("<p>").text("The gray words are a description of the phrase. The bold phrases are the English to be translated. Type the translation in the textbox.")).append($("<p>").text("It is not neccessary to fill out all of the empty boxes, only the ones that need to be translated. You can edit any already existing translations to make changes.")));var t=$("<optgroup>").attr("label","Detected Languages"),a=$("<optgroup>").attr("label","Other Languages");for(i=0;i<accept.length;i++)t.append($("<option>").val(accept[i]).text(langs[accept[i]]));for(l in langs)-1==accept.indexOf(l)&&a.append($("<option>").val(l).text(langs[l]));$("body").append($("<div>").attr("id","languages").append($("<div>").text("Translate to: ").append($("<select>").append(t).append(a).change(function(){language=$(this).val(),loadpage()})))),$("body").append($("<div>").attr("id","generatediv").append($("<input>").attr("type","button").val("Submit >").click(function(){var e=new Date,t=e.getUTCFullYear().toString()+(e.getUTCMonth()+1<10?"0":"")+(e.getUTCMonth()+1).toString()+(e.getUTCDate()<10?"0":"")+e.getUTCDate().toString(),a={};for(id in src){var i=$("#edit-"+id).val(),r=res[id]?res[id].message:null;if(i&&""!=i&&i!=r){var n=JSON.parse(JSON.stringify(src[id]));n.message=i,n.update=t,a[id]=n}}return"{}"==JSON.stringify(a)?void alert("No changes submitted."):($("#generatediv input").val("Uploading..."),void $.ajax({url:"http://fujan.name/smoothgestures/translate.php",type:"post",data:{key:"smooth",lang:language,tran:JSON.stringify(a)},success:function(e){$("#generatediv input").val("Submit >"),"success"==e?setTimeout(function(){alert("Translation Sent. Thanks!\n\nFeel free to email smoothgestures@fujan.name to notify the developer that you have submitted a translation.")},0):setTimeout(function(){alert("Error Sending Translation")},0)},error:function(){$("#generatediv input").val("Submit >"),setTimeout(function(){alert("Error Sending Translation")},0)}}))}))),$.get(chrome.runtime.getURL("_locales/en/messages.json"),null,function(e){src=JSON.parse(e),loadpage()})});var src=null,res=null,language="zh",words=null,tree=null;document.title="Smooth Gestures: Translate",$("body").append($('<h1 id="translatetitle"><img src="/img/icon48.png"/> Smooth Gestures: Translate</h1>'));var loadpage=function(){$.get(chrome.runtime.getURL("_locales/"+language+"/messages.json"),null,function(e){res=e&&""!=e?JSON.parse(e):{},formpage()})},formpage=function(){var e=JSON.parse(JSON.stringify(res));words=[];for(id in src)"_"!=id&&words.push({id:id,src:src[id],res:e[id]&&e[id].update&&e[id].update>src[id].update?e[id]:void 0}),delete e[id];for(id in e)words.push({id:id,src:void 0,res:e[id]});for(tree={empty:[],complete:[],old:[]},i=0;i<words.length;i++)words[i].res?words[i].src?tree.complete.push(words[i]):tree.old.push(words[i]):tree.empty.push(words[i]);for(s in tree){var t={};for(i=0;i<tree[s].length;i++){var a=tree[s][i].src?tree[s][i].src.category:tree[s][i].res.category;t[a]||(t[a]=[]),t[a].push(tree[s][i])}tree[s]=t}buildpage()},buildpage=function(){var e={};for(c in tree.empty)for(e[c]=$("<div>").attr("class","translatetable").append($("<div>").attr("class","tabletitle").text(c)),i=0;i<tree.empty[c].length;i++)e[c].append(buildword(tree.empty[c][i]));for(c in tree.complete){var t=$("<div>");for(i=0;i<tree.complete[c].length;i++)t.append(buildword(tree.complete[c][i]));e[c]||(e[c]=$("<div>").attr("class","translatetable").append($("<div>").attr("class","tabletitle").text(c))),e[c].append(completedwords(t))}$("#translateroot").remove();var a=$("<div>").attr("id","translateroot"),r=[];for(c in e)r.push(c);for(r.sort(),i=0;i<r.length;i++)a.append(e[r[i]]);$("body").append(a)},completedwords=function(e){var t=Math.random().toString().substr(2);return $("<div>").attr("class","rowgroup").append($("<div>").attr("class","grouptitle").text("Phrases with translations ("+$(".wordrow",e).size()+")").append($("<a>").attr("href","#").text("show").click(function(){return"hide"==$(this).text()?($(this).text("show"),$("#"+t+"group").animate({height:"hide",opacity:0},200)):($(this).text("hide"),$("#"+t+"group").animate({height:"show",opacity:1},200)),!1}))).append(e.attr("id",t+"group").attr("class","grouprows").css({display:"none"}))},buildword=function(e){return e.src?$("<div>").attr("class","wordrow").append($("<div>").attr("class","descrip").text(e.src.description+" ").append($("<span>").text("[ "+e.id+" ]"))).append($("<div>").attr("class","message").html(e.src.message.replace(/\n/g,"<br>\n"))).append($("<textarea>").attr("id","edit-"+e.id).text(e.res?e.res.message:res[e.id]?res[e.id].message:"")):"<div>"+e.id};