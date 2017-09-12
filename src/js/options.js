!function () {
    "update_url" in chrome.runtime.getManifest() && (console.log = console.error = function () {
    });
    var e = {}, t = function (t) {
        for (key in t) e[key] = t[key];
        chrome.storage.local.set(t)
    };
    chrome.storage.local.get(null, function (t) {
        e = t, chrome.storage.onChanged.addListener(n), r()
    });
    var n = function (t, n) {
        if ("local" == n) {
            for (key in t) e[key] = t[key].newValue;
            (t.license || t.license_expires || t.license_showactivated || t.license_showexpired || t.license_showdeactivated) && w()
        }
    }, s = function (e, t) {
        return chrome.i18n.getMessage(e.replace(/-/g, "_"), t)
    };
    chrome.runtime.getBackgroundPage(function (e) {
        e.ping()
    }), $(function () {
        for (var e, t = $("body").html(), n = 0; e = t.match(/__MSG_([a-zA-Z0-9_\-@]+)(\{\{([^|}]+(\|\|[^|}]+)*)\}\})?__/);) {
            console.log(e);
            var a = [e[1], e[3] ? e[3].split("||") : void 0];
            if (t = t.replace(new RegExp("__MSG_" + e[1] + "(\\{\\{([^|}]+(\\|\\|[^|}]+)*)\\}\\})?__"), s.apply(null, a)), ++n > 500) break
        }
        $("body").html(t)
    });
    var a = function () {
        e.showNoteUpdated ? ($("#note_updated p:first-child").html(s("options_note_updated", ["<span class=sgtitle>" + s("name") + "<span class=sgplus> plus</span></span>", chrome.runtime.getManifest().version])), t({showNoteUpdated: !1})) : $("#note_updated").css({display: "none"});
        var n = 336 - Math.ceil((Date.now() - e.firstinstalled) / 1e3 / 60 / 60);
        e.license = 'full';
        e.license && $("#trialperiod").css({display: "none"}), $("#expirein").append($("<span>").css({
            "background-color": 0 > n ? "rgba(255,0,0,.2)" : 120 > n ? "rgba(255,255,0,.2)" : "rgba(0,255,0,.2)",
            "font-weight": "bold"
        }).text("Your trial period " + (0 > n ? "has expired" : "will expire in " + (n >= 24 ? Math.round(n / 24) + " days" : n > 0 ? n + " hours" : "less than an hour")))), (e.hideNoteRemindRate || -1 == ["full", "1yrmul"].indexOf(e.license)) && $(".note_remindrate").css({display: "none"}), $(".note_remindrate .close").click(function () {
            $(".note_remindrate").css({display: "none"}), t({hideNoteRemindRate: !0})
        }), e.hideNotePrint && $("#note_print").css({display: "none"}), $("#note_print .close").click(function () {
            $("#note_print").css({display: "none"}), t({hideNotePrint: !0})
        }), $("#note_print .button").click(function () {
            window.print()
        }), $(".page[page=about] .content").append($("<div>").attr("class", "footer").html("You have gestured approximately " + (254e-6 * (e.log.line ? e.log.line.distance : 0)).toFixed(2) + " meters.<br><br>Special Thanks to:<br>Ivano Caruso, Matthew Barnes, Cobra Cable"))
    }, o = function () {
        for (var e = $(".pagesection[pagesection=actions]"), t = ["page_navigation", "tab_management", "utilities", "other", "custom"], n = 0; n < t.length; n++) {
            $("#navactions").append($("<div class=navbutton>").attr("nav", t[n]).text(s("cat_" + t[n])));
            var a = $("<div class=page>").attr("page", t[n]);
            a.append($("<div class=pagetitle>").text(s("cat_" + t[n]))), a.append("<div class=content><div class='actiongroup enabled'></div><div class=actiongrouptitle></div><div class='actiongroup disabled'></div></div>"), a.append("<div class=clear>"), $(".actiongrouptitle", a).text(s("options_moreactions")), a.insertAfter(e), e = a
        }
        $(".page[page=custom] .pagetitle").append($("<div id=addaction class='button gray'>").html("<span>+</span> " + s("options_button_addcustomaction")).on("click", u)), h()
    }, i = function () {
        _(), $("#newtab_url.setting select, #newtab_url.setting .button").on("change click", function () {
            var e = $("#newtab_url.setting select").val();
            "custom" == e && (e = $("#newtab_url.setting input[type=text]").val()), !e.match(/:/) && e.match(/\./) && (e = "http://" + e), e.match(/:/) || "homepage" == e || (e = "http://www.google.com/"), t({newTabUrl: e}), _()
        }), $("#newtab_right.setting select").on("change", function () {
            t({newTabRight: 1 == $(this).val()})
        }), $("#newtab_linkright.setting select").on("change", function () {
            t({newTabLinkRight: 1 == $(this).val()})
        }), $("#trail_draw.setting select").on("change", function () {
            t({trailBlock: 1 != $(this).val()}), _()
        });
        var n = null;
        $("#trail_color_r input[type=range], #trail_color_g input[type=range], #trail_color_b input[type=range], #trail_color_a input[type=range]").on("change", function () {
            clearTimeout(n), n = setTimeout(function () {
                t({
                    trailColor: {
                        r: 1 * $("#trail_color_r input").val(),
                        g: 1 * $("#trail_color_g input").val(),
                        b: 1 * $("#trail_color_b input").val(),
                        a: 1 * $("#trail_color_a input").val()
                    }
                }), setTimeout(function () {
                    _(), b()
                }, 100)
            }, 100)
        });
        var a = null;
        $("#trail_width input[type=range]").on("change", function () {
            clearTimeout(a), a = setTimeout(function () {
                t({trailWidth: 1 * $("#trail_width input").val()}), _()
            }, 100)
        }), $("#trail_style select").on("change", function () {
            t({trailLegacy: "legacy" == $(this).val()})
        }), $("#force_context.setting select").on("change", function () {
            t({contextOnLink: 1 == $(this).val()})
        }), $("#closelastblock.setting select").on("change", function () {
            t({closeLastBlock: 1 == $(this).val()})
        }), $("#selecttolink.setting select").on("change", function () {
            t({selectToLink: 1 == $(this).val()})
        }), $("#blacklist.setting .button").on("click", function () {
            for (var e = $("#blacklist.setting textarea").val().split(/[\n,]/), n = 0; n < e.length; n++) e[n] = e[n].trim();
            t({blacklist: e}), _()
        }), $("#blacklist.setting textarea").on("keydown click", function () {
            $("#blacklist.setting .button").css({visibility: "visible"})
        }), $("#hold_button.setting select").on("change", function () {
            t({holdButton: $(this).val()})
        }), $("#reset.setting .button").on("click", function () {
            confirm(s("setting_warning_reset")) && chrome.runtime.getBackgroundPage(function (e) {
                t({gestures: JSON.parse(e.defaults["Smooth Gestures"].gestures)}), b(), _()
            })
        });
        var o = ["gestures", "customactions", "blacklist", "contextOnLink", "holdButton", "newTabLinkRight", "newTabRight", "newTabUrl", "selectToLink", "trailBlock", "trailColor", "trailWidth", "trailLegacy"];
        $("#exportbutton.button").on("click", function () {
            var t = {version: chrome.runtime.getManifest().version, sgplus: {}};
            for (label in e) -1 != o.indexOf(label) && (t.sgplus[label] = e[label]);
            t = btoa(JSON.stringify(t));
            var n = new Blob([t], {type: "text/plain;charset=utf-8"}), s = URL.createObjectURL(n),
                a = document.createElement("a");
            a.href = s, a.download = "Smooth Gestures Plus Settings.txt";
            var i = document.createEvent("MouseEvents");
            i.initMouseEvent("click", !0, !1, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), a.dispatchEvent(i), URL.revokeObjectURL(s)
        }), $("#importbutton.button input[type=file]").on("change", function () {
            if (!(this.files.length <= 0)) {
                var n = new FileReader;
                n.onload = function () {
                    $("#importbutton.button input[type=file]").val("");
                    var s = function (n) {
                        var s = function (e) {
                            var t = document.createElement("div");
                            return t.innerHTML = e.replace(/</g, "[leftangle]"), t.childNodes[0].nodeValue.replace(/\[leftangle\]/g, "<")
                        };
                        try {
                            n = n.substring(n.indexOf("{"), n.lastIndexOf("}") + 1), n = s(n);
                            var a = JSON.parse(n);
                            if ("Smooth Gestures Settings" != a.title) return !1;
                            a.gestures && (e.gestures = a.gestures);
                            for (var i in a.settings) -1 != o.indexOf(i) && (e[i] = a.settings[i]);
                            return t(e), alert("Import Successful"), !0
                        } catch (l) {
                        }
                        return !1
                    }, a = n.result, i = null;
                    try {
                        i = JSON.parse(atob(a))
                    } catch (l) {
                        s(a) || alert("Import Failed")
                    }
                    if (i) {
                        for (label in i.sgplus) -1 != o.indexOf(label) && (e[label] = i.sgplus[label]);
                        t(e), alert("Import Successful")
                    }
                    b(), _()
                }, n.readAsText(this.files[0])
            }
        })
    }, l = function () {
        c();
        {
            var e = -1 != navigator.platform.indexOf("Win"), n = -1 != navigator.platform.indexOf("Mac"),
                s = -1 != navigator.platform.indexOf("CrOS");
            -1 != navigator.platform.indexOf("Linux")
        }
        (e || s) && ($(".navbutton[nav=extras]").css({display: "none"}), $(".page[page=extras]").css({display: "none"})), $("#extras.setting select").on("change", function () {
            t({blockDoubleclickAlert: 0 == $(this).val()})
        }), $("#installplugin,#updateplugin").click(function () {
            t({blockDoubleclickAlert: !1}), chrome.permissions.request({permissions: ["nativeMessaging"]}, function (e) {
                if (e) {
                    chrome.runtime.getBackgroundPage(function (e) {
                        e.connectNative(1e3)
                    });
                    var t = document.createElement("a");
                    n ? (t.setAttribute("href", "/nat/SmoothGesturesPlusExtras-0.7.dmg"), t.setAttribute("download", "SmoothGesturesPlusExtras-0.7.dmg")) : (t.setAttribute("href", "/nat/smoothgesturesplus-extras-0.6.tar.gz"), t.setAttribute("download", "smoothgesturesplus-extras-0.6.tar.gz")), t.click()
                }
            })
        })
    }, c = function () {
        $("#extras.setting select").val(e.blockDoubleclickAlert ? 0 : 1);
        var t = -1 != navigator.platform.indexOf("Mac") ? "0.7" : "0.6";
        chrome.runtime.getBackgroundPage(function (e) {
            var n = e.isNative();
            console.log("native", n), $("#note_extras_installed").css({display: n && (!n.loaded || n.version >= t) ? "block" : "none"}), $("#note_extras_update").css({display: n && n.loaded && n.version < t ? "block" : "none"}), $("#note_extras_notinstalled").css({display: n ? "none" : "block"})
        })
    }, r = function () {
        $(function () {
            var t = location.hash.replace(/^#(.+)$/, "$1") || e.lastpage || "config";
            $.fx.off = !0, pages.init(), $(".close .addgesture .upgradebutton").attr("tabindex", 0), $(".upgradebutton").html((e.license ? "Buy" : "Activate") + " <span class=sgtitle>Smooth Gestures <span class=sgplus>plus<span class=arrow></span></span></span></span>").click(function () {
                chrome.tabs.create({
                    url: "https://smoothgesturesplus.com/id/?clid=" + e.id + "&fi=" + e.firstinstalled + "&n=/pay/",
                    active: !0
                })
            }).mouseenter(function () {
                $(".sgplus", this).stop().animate({left: ".4em"}, 100)
            }).mouseleave(function () {
                $(".sgplus", this).stop().animate({left: "0"}, 200)
            }), g.init(), $(".addgesture").html("<span>+</span> " + s("options_button_startaddgesture")).click(g.open.bind(null, null)), a(), o(), i(), l(), k(), $("#currentversion").html(s("options_note_updated", ["<span class=sgtitle>" + s("name") + "<span class=sgplus> plus</span></span>", chrome.runtime.getManifest().version])), pages.show(t), setTimeout(function () {
                pages.show(t)
            }, 100), setTimeout(function () {
                pages.show(t)
            }, 500), setTimeout(function () {
                pages.show(t), $.fx.off = !1
            }, 900)
        })
    }, u = function () {
        var n = {};
        n.title = "Navigate to Page", n.descrip = "Go to Google", n.code = 'location.href = "http://www.google.com";', n.env = "page", n.share = !0, n.context = "";
        var s = "custom" + Math.floor(Math.random() * Math.pow(2, 30)).toString(32);
        e.customactions[s] = n, t({customactions: e.customactions}), h(), setTimeout(p.bind(null, s), 500)
    }, d = function (n) {
        if (confirm("Delete this custom action?")) {
            delete e.customactions[n], t({customactions: e.customactions});
            for (var s in e.gestures) e.gestures[s] == n && m(s);
            chrome.runtime.getBackgroundPage(function (e) {
                delete e.contexts[n]
            }), h()
        }
    }, p = function (n) {
        var s = e.customactions[n], a = $(".action[action=" + n + "]");
        $("#customedit").remove(), $(".page[page=custom] .action").css({display: ""}), a.css({display: "none"}), a.after($("<div id=customedit>").append($("<div class='button gray customsave' tabindex=0>").text("save").on("click", function () {
            s.title = $(".customtitle").val(), s.descrip = $(".customdescrip").val(), s.code = $(".customcode").val(), s.context = $(".customcontext").val(), e.customactions[n] = s, t({customactions: e.customactions}), $("#customedit").remove(), $(".page[page=custom] .action").css({display: ""}), h()
        })).append($("<div class='button gray customcancel' tabindex=0>").text("cancel").on("click", function () {
            $("#customedit").remove(), $(".page[page=custom] .action").css({display: ""})
        })).append($("<input type=text class=customtitle placeholder=Title>").val(s.title)).append($("<input type=text class=customdescrip placeholder=Description>").val(s.descrip)).append($("<textarea class=customcode placeholder='Javascript Code'>").text(s.code)))
    }, g = {};
    g.action = null, g.gesture = null, g.init = function () {
        $("#drawingcanvas .close").on("click", g.close), $("#tryagain").on("click", function () {
            $("#nowwhat").css({display: "none"}), $("#canvasdescrip").css({display: "table"}), setTimeout(function () {
                window.SG.callback = g.gesturecallback
            }, 0)
        }), $("#doaddgesture").on("click", g.choose), $("#chooseaction").on("change", function () {
            g.action = $("#chooseaction").val(), g.choose()
        }), chrome.runtime.getBackgroundPage(function (t) {
            for (var n in t.categories) if (t.categories[n].actions) {
                $("#chooseaction").append($("<option>").text(s(n)).prop("disabled", !0));
                for (var a = 0; a < t.categories[n].actions.length; a++) $("#chooseaction").append($("<option>").text("- " + s("action_" + t.categories[n].actions[a])).val(t.categories[n].actions[a]))
            } else if (t.categories[n].customActions) {
                $("#chooseaction").append($("<option>").text("Custom Actions").prop("disabled", !0));
                for (var o in e.customactions) $("#chooseaction").append($("<option>").text("- " + e.customactions[o].title).val(o))
            }
        })
    }, g.close = function () {
        g.action = null, g.gesture = null, window.SG.callback = null, $("#drawingcanvas").css({display: "none"}), window.removeEventListener("mousewheel", g.blockevent, !1), document.removeEventListener("keydown", g.blockevent, !0)
    }, g.choose = function () {
        g.action && g.gesture && (e.gestures[g.gesture] && m(g.gesture), e.gestures[g.gesture] = g.action, t({gestures: e.gestures}), g.close(), b())
    }, g.gesturecallback = function (t) {
        chrome.runtime.getBackgroundPage(function (n) {
            n.contexts[g.action] && (t = n.contexts[g.action] + t), window.SG.callback = null, g.gesture = t;
            var a = null;
            e.gestures[t] ? (a = s("options_button_overwrite"), $("#gestureoverwrite").css({display: "block"}).text(s("options_addgesture_overwrite", s("action_" + e.gestures[t]) || (e.customactions[e.gestures[t]] ? e.customactions[e.gestures[t]].title : "")))) : (a = s("options_button_addgesture"), $("#gestureoverwrite").css({display: "none"}));
            var a = s(e.gestures[t] ? "options_button_overwrite" : "options_button_addgesture");
            g.action ? ($("#doaddgesture").css({display: "block"}).text(a), $("#chooseaction").css({display: "none"})) : ($("#doaddgesture").css({display: "none"}), $("#chooseaction").css({display: "block"}), $("#chooseaction option:nth-child(1)").prop("disabled", !0).text(a)), $("#canvasdescrip").css({display: "none"}), $("#nowwhat").css({display: "block"});
            var o = Math.min(.8 * window.innerWidth / 2, .8 * window.innerHeight / 2);
            $("#gesturedisplay").empty().append(drawGesture(t, o, o))
        })
    }, g.blockevent = function (e) {
        e.preventDefault()
    }, g.open = function (t) {
        window.SG && !window.SG.callback && (g.action = t, g.gesture = null, window.addEventListener("mousewheel", g.blockevent, !1), document.addEventListener("keydown", g.blockevent, !0),

            $("#canvastitle").text(
                s("options_addgesture_title", s("action_" + t) || (e.customactions[t] ? e.customactions[t].title : ""))

            ),

            $("#canvasdescrip li:nth-child(1)").text(s("options_addgesture_instruct_2", s("options_mousebutton_" + e.holdButton))), $("#canvasdescrip li:nth-child(2)").text(s("options_addgesture_instruct_3", s("options_mousebutton_" + e.holdButton))), $("#drawingcanvas").css({display: "block"}), $("#canvasdescrip").css({display: "table"}), $("#nowwhat").css({display: "none"}), window.SG.callback = g.gesturecallback)
    };
    var m = function (n) {
        $(".gesture[gesture=" + n.replace(/\:/g, "\\:").replace(/\+/g, "\\+") + "]").remove(), delete e.gestures[n], t({gestures: e.gestures}), b()
    }, v = [{
        id: "page_navigation",
        actions: ["page-back", "page-forward", "page-back-close", "reload-tab", "reload-tab-full", "reload-all-tabs", "stop", "parent-dir", "page-next", "page-prev"]
    }, {
        id: "tab_management",
        actions: ["new-tab", "new-tab-link", "new-tab-back", "navigate-tab", "close-tab", "close-other-tabs", "close-left-tabs", "close-right-tabs", "undo-close", "clone-tab", "new-window", "new-window-link", "close-window", "prev-tab", "next-tab", "split-tabs", "merge-tabs", "tab-to-left", "tab-to-right", "toggle-pin", "pin", "unpin"]
    }, {
        id: "utilities",
        actions: ["goto-top", "goto-bottom", "page-up", "page-down", "print", "parent-dir", "view-source", "show-cookies", "search-sel", "zoom-in", "zoom-out", "zoom-zero", "open-image", "save-image", "hide-image", "zoom-img-in", "zoom-img-out", "zoom-img-zero", "find-prev", "find-next", "copy", "copy-link", "toggle-bookmark", "bookmark", "unbookmark"]
    }, {
        id: "other",
        actions: ["options", "fullscreen-window", "minimize-window", "maximize-window", "open-screenshot", "save-screenshot", "open-screenshot-full", "save-screenshot-full", "open-history", "open-downloads", "open-extensions", "open-bookmarks"]
    }], h = function () {
        chrome.runtime.getBackgroundPage(function (t) {
            for (var n = 0; n < v.length; n++) {
                var a = $(".page[page=" + v[n].id + "]");
                $(".action", a).remove();
                for (var o = 0; o < v[n].actions.length; o++) {
                    var i = v[n].actions[o], l = t.contexts[i];
                    $(".actiongroup.disabled", a).append($("<div class=action>").attr("action", i).attr("sectionindex", o).append("<div class=gestures>").append($("<div class='button gray addactiongesture' tabindex=0>+</div>").on("click", g.open.bind(null, i))).append(l ? $("<img class=context>").attr("src", "/img/icon-" + ("l" == l ? "link" : "i" == l ? "image" : "s" == l ? "selection" : "") + ".png") : null).append($("<div class=headtitle>").text(s("action_" + i))).append($("<p class=sub>").text(s("descrip_" + i))).append("<div class=clear>"))
                }
            }
            var a = $(".page[page=custom]");
            $(".action", a).remove();
            var n = 0;
            for (var i in e.customactions) {
                var c = e.customactions[i], l = t.contexts[i];
                $(".actiongroup.disabled", a).append($("<div class=action>").attr("action", i).attr("sectionindex", n).append($("<div class='button gray delcustomaction' tabindex=0>&times;</div>").on("click", d.bind(null, i))).append($("<div class='button gray editcustomaction' tabindex=0>edit</div>").on("click", p.bind(null, i))).append("<div class=gestures>").append($("<div class='button gray addactiongesture' tabindex=0>+</div>").on("click", g.open.bind(null, i))).append(l ? $("<img class=context>").attr("src", "/img/icon-" + ("l" == l ? "link" : "i" == l ? "image" : "s" == l ? "selection" : "") + ".png") : null).append($("<div class=headtitle>").text(c.title)).append($("<p class=sub>").text(c.descrip)).append("<div class=clear>")), n++
            }
            b()
        })
    }, b = function () {
        $(".action .gesture").remove();
        for (gesture in e.gestures) f(gesture)
    }, f = function (t) {
        var n = $(".action[action=" + e.gestures[t] + "]");
        if ($(".gestures", n).append($("<div class=gesture>").attr("gesture", t).append($("<div class='button gray removegesture' tabindex=0>&times;</div>").on("click", m.bind(null, t))).append(drawGesture(t, 100, 100))), n.parent().hasClass("disabled")) {
            var s = $(".actiongroup.enabled", n.parent().parent()), a = $(".action", s);
            if (0 == a.length) s.append(n); else {
                var o = null;
                a.each(function (e, t) {
                    $(t).attr("sectionindex") < n.attr("sectionindex") && (!o || $(t).attr("sectionindex") > o.attr("sectionindex")) && (o = $(t))
                }), o ? n.insertAfter(o) : s.prepend(n)
            }
        }
    }, _ = function () {
        $("#newtab_url.setting select").val(e.newTabUrl), $("#newtab_url.setting select").val() != e.newTabUrl ? ($("#newtab_url.setting select").val("custom"), $("#newtab_url.setting input[type=text]").val(e.newTabUrl), $("#newtab_url.setting input[type=text], #newtab_url.setting .button").css({display: ""})) : $("#newtab_url.setting input[type=text], #newtab_url.setting .button").css({display: "none"}), $("#newtab_right.setting select").val(e.newTabRight ? 1 : 0), $("#newtab_linkright.setting select").val(e.newTabLinkRight ? 1 : 0), $("#trail_draw.setting select").val(e.trailBlock ? 0 : 1), $("#trail_properties").css({display: e.trailBlock ? "none" : "block"}), $("#trail_color_r input[type=range]").val(e.trailColor.r), $("#trail_color_g input[type=range]").val(e.trailColor.g), $("#trail_color_b input[type=range]").val(e.trailColor.b), $("#trail_color_a input[type=range]").val(e.trailColor.a), $("#trail_width input[type=range]").val(e.trailWidth), $("#trail_color_r").css({"background-image": "linear-gradient(to right, rgba(0," + e.trailColor.g + "," + e.trailColor.b + "," + e.trailColor.a + "), rgba(255," + e.trailColor.g + "," + e.trailColor.b + "," + e.trailColor.a + "))"}), $("#trail_color_g").css({"background-image": "linear-gradient(to right, rgba(" + e.trailColor.r + ",0," + e.trailColor.b + "," + e.trailColor.a + "), rgba(" + e.trailColor.r + ",255," + e.trailColor.b + "," + e.trailColor.a + "))"}), $("#trail_color_b").css({"background-image": "linear-gradient(to right, rgba(" + e.trailColor.r + "," + e.trailColor.g + ",0," + e.trailColor.a + "), rgba(" + e.trailColor.r + "," + e.trailColor.g + ",255," + e.trailColor.a + "))"}), $("#trail_color_a").css({"background-image": "linear-gradient(to right, rgba(" + e.trailColor.r + "," + e.trailColor.g + "," + e.trailColor.b + ",0), rgba(" + e.trailColor.r + "," + e.trailColor.g + "," + e.trailColor.b + ",255))"}), $("#trail_example").empty().append(drawGesture("URU", 100, 100, e.trailWidth)), $("#trail_style select").val(e.trailLegacy ? "legacy" : "default"), $("#force_context.setting select").val(e.contextOnLink ? 1 : 0), $("#closelastblock.setting select").val(e.closeLastBlock ? 1 : 0), $("#selecttolink.setting select").val(e.selectToLink ? 1 : 0), $("#blacklist.setting textarea").val(e.blacklist.join("\n")), $("#hold_button.setting select").val(e.holdButton)
    }, k = function () {
        $("#keybutton").on("click", function () {
            $("#keybutton").css({display: "none"}), $("#key").css({display: "table"})
        }), $("#setkey .start").on("click", function () {
            $("#setkey input, #setkey .submit").css({display: "block"}), $("#setkey .start").css({display: "none"})
        }), $("#setkey .submit").on("click", function () {
            var e = $("#setkey input").val().toLowerCase().trim();
            e.length < 10 || chrome.storage.sync.set({token: e}, function () {
                chrome.runtime.getBackgroundPage(function (e) {
                    e.ping(), $("#setkey input, #setkey .submit").css({display: ""}), $("#setkey .start").css({display: ""})
                })
            })
        }), w()
    }, w = function () {
        if ($(".upgradebutton").html((e.license ? "Buy" : "Activate") + " <span class=sgtitle>Smooth Gestures <span class=sgplus>plus<span class=arrow></span></span></span></span>"), e.license_showactivated && $("#note_activated").css({display: "block"}), e.license_showexpired && $("#note_expired").css({display: "block"}), e.license_showdeactivated && $("#note_deactivated").css({display: "block"}), setTimeout(function () {
                t({license_showactivated: !1, license_showexpired: !1, license_showdeactivated: !1})
            }, 1e3), e.license = 'full', "full" == e.license ? ($("#note_licensestatus .title").html("You have the full license!"), $("#note_licensestatus").addClass("green").removeClass("yellow"), $("#noplus").css({display: "none"})) : "1yrmul" == e.license ? ($("#note_licensestatus .title").html("You have the 1 year license"), $("#note_licensestatus").addClass("green").removeClass("yellow")) : "6mnmul" == e.license ? ($("#note_licensestatus .title").html("You have the 6 month license"), $("#note_licensestatus").addClass("green").removeClass("yellow")) : "1mnmul" == e.license ? ($("#note_licensestatus .title").html("You have the 1 month license"), $("#note_licensestatus").addClass("green").removeClass("yellow")) : "2wkmul" == e.license ? ($("#note_licensestatus .title").html("You have the 2 week license"), $("#note_licensestatus").addClass("green").removeClass("yellow")) : "1wkmul" == e.license ? ($("#note_licensestatus .title").html("You have the 1 week license"), $("#note_licensestatus").addClass("green").removeClass("yellow")) : "1yr1cl" == e.license ? ($("#note_licensestatus .title").html("You have the 1 year / 1 install license"), $("#note_licensestatus").addClass("green").removeClass("yellow")) : "1mn1cl" == e.license ? ($("#note_licensestatus .title").html("You have the 1 month / 1 install license"), $("#note_licensestatus").addClass("green").removeClass("yellow")) : "1wk1cl" == e.license ? ($("#note_licensestatus .title").html("You have the 1 week / 1 install license"), $("#note_licensestatus").addClass("green").removeClass("yellow")) : e.license ? ($("#note_licensestatus .title").html("You have an unknown license"), $("#note_licensestatus").addClass("yellow").removeClass("green"), $("#nolicense").css({display: "block"})) : ($("#note_licensestatus .title").html("You do not have an active license"), $("#note_licensestatus").addClass("yellow").removeClass("green")), e.license_expires) {
            var n = (e.license_expires - Date.now()) / 1e3 / 60 / 60;
            $("#note_licensestatus .descrip").html("This license expires in " + (n > 24 ? Math.round(n / 24) + " days" : Math.round(2 * n) / 2 + " hours"))
        } else $("#note_licensestatus .descrip").html('<span class="sgtitle">Smooth Gestures <span class="sgplus">plus</span></span> enables quick and easy control of your web browser through mouse gestures.');
        $("#showkey").css({display: e.license ? "" : "none"}), $("#keybutton").css({display: ""}), $("#key").css({display: ""}), chrome.storage.sync.get(null, function (t) {
            $("#key").html("Save this key: <span class=key>" + (t.token || "no license key") + "</span>").css({display: "none"});
            var n = !e.license && t.token ? t.token : t.invalidtoken != t.token ? t.invalidtoken : null;
            $("#setkey p").html(n ? "This key is invalid: <span class=key>" + n + "</span>" : "")
        }), $("#clid").text("id: " + e.id + "z" + e.firstinstalled.toString(32))
    }
}();