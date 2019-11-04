!function (e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var i = n[o] = {i: o, l: !1, exports: {}};
        return e[o].call(i.exports, i, i.exports, t), i.l = !0, i.exports
    }

    var n = {};
    t.m = e, t.c = n, t.i = function (e) {
        return e
    }, t.d = function (e, n, o) {
        t.o(e, n) || Object.defineProperty(e, n, {configurable: !1, enumerable: !0, get: o})
    }, t.n = function (e) {
        var n = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 0)
}([function (e, t, n) {
    !function () {
        var e = {};
        for (a in console) e[a] = console[a];
        if ("update_url" in chrome.runtime.getManifest()) for (a in console) console[a] = function () {
        };
        var t = {}, n = {}, o = function (e, n) {
            var o = Date.now();
            for (key in e) t[key] = e[key], void 0 === e[key] && chrome.storage.local.remove(key), key.match(/\+ts$/) || (t[key + "+ts"] = e[key + "+ts"] = o);
            chrome.storage.local.set(e, n)
        }, r = {};
        r.initcount = 2, chrome.storage.local.get(null, function (e) {
            chrome.runtime.lastError ? (r.failed || alert("Google Chrome's storage may be corrupted. Extensions may not work properly.\n\nTry closing and restarting Chrome.\n\nIf that doesn't work, reinstall the browser to fix this problem."), r.failed = !0, console.log("chrome.storage failure"), t = JSON.parse(localStorage.local)) : (t = e, localStorage.local = JSON.stringify(e)), 0 == --r.initcount && r.init()
        }), chrome.storage.sync.get(null, function (e) {
            chrome.runtime.lastError ? (r.failed || alert("Google Chrome's storage may be corrupted. Extensions may not work properly.\n\nTry closing and restarting Chrome.\n\nIf that doesn't work, reinstall the browser to fix this problem."), r.failed = !0, console.log("chrome.storage failure"), n = JSON.parse(localStorage.sync)) : (n = e, localStorage.sync = JSON.stringify(e)), 0 == --r.initcount && r.init()
        }), r.changed = function (e, o) {
            if ("local" == o) {
                var i = {};
                console.log("localchanged", e);
                for (key in e) t[key] = e[key].newValue, n.sync && n.sync[key] && (n[key] = i[key] = e[key].newValue), console.log("syncsync", key, n.sync && n.sync[key], i);
                console.log("updatesync", Object.keys(i).length, i), Object.keys(i).length && chrome.storage.sync.set(i), r.localChanged(e)
            } else if ("sync" == o) {
                if (e.firstinstalled) {
                    if (!e.firstinstalled.newValue) return void chrome.storage.sync.set(n);
                    n.firstinstalled && e.firstinstalled.newValue > e.firstinstalled.oldValue && (e.firstinstalled.newValue = e.firstinstalled.oldValue, chrome.storage.sync.set({firstinstalled: e.firstinstalled.oldValue}))
                }
                var a = {};
                console.log("syncchanged", e);
                for (key in e) n[key] = e[key].newValue, n.sync && n.sync[key] && (t[key] = a[key] = e[key].newValue), console.log("synclocal", key, n.sync && n.sync[key], a);
                console.log("updatelocal", Object.keys(a).length, a), Object.keys(a).length && chrome.storage.local.set(a), r.syncChanged(e)
            }
        }, chrome.storage.onChanged.addListener(r.changed), r.init = function () {
            n.firstinstalled || (n.firstinstalled = Date.now(), n.sync = {firstinstalled: !0});
            for (key in JSON.parse(p["Smooth Gestures"].settings)) n.sync[key] = !0;
            if (n.sync.gestures = !0, n.sync.customactions = !0, !t.installed) {
                t.installed = Date.now(), t.id = Math.floor(Math.random() * Math.pow(2, 30)).toString(32) + Math.floor(Math.random() * Math.pow(2, 30)).toString(32), t.log = {action: {}}, t.gestures = JSON.parse(p["Smooth Gestures"].gestures);
                var e = JSON.parse(p["Smooth Gestures"].settings);
                for (key in e) t[key] = e[key];
                t.customactions = {
                    custom000000: {
                        title: "Navigate to Google (example)",
                        descrip: "Go to Google",
                        code: 'location.href = "http://www.google.com/"',
                        env: "page",
                        share: !1,
                        context: ""
                    }
                }, t.externalactions = {}, setTimeout(function () {
                    chrome.tabs.create({url: "options.html"})
                }, 1e3)
            }
            n.firstinstalled > t.installed && (n.firstinstalled = t.installed);
            for (key in n.sync) n.sync[key] && void 0 !== n[key] && (n[key + "+ts"] || 0) >= (t[key + "+ts"] || 0) ? (t[key] = n[key], t[key + "+ts"] = n[key + "+ts"] || Date.now()) : n.sync[key] && void 0 !== t[key] && (t[key + "+ts"] || 0) >= (n[key + "+ts"] || 0) && (n[key] = t[key], n[key + "+ts"] = t[key + "+ts"] || Date.now());
            if (t.version = chrome.runtime.getManifest().version, t.started = Date.now(), t.session = Math.floor(Math.random() * Math.pow(2, 30)).toString(32) + Math.floor(Math.random() * Math.pow(2, 30)).toString(32), b = t.license, t.forceInstallRightclick) {
                var o = screen.availHeight / 2 - 320 / 1.5, i = screen.availWidth / 2 - 375;
                window.open("rightclick.html", "rightclick", "width=750,height=320,top=" + o + ",left=" + i)
            }
            chrome.runtime.setUninstallUrl && chrome.runtime.setUninstallUrl("https://smoothgesturesplus.com/api/uninstall/?clid=" + t.id), chrome.storage.sync.set(n, function () {
                chrome.storage.local.set(t, X)
            })
        }, r.localChanged = function (e) {
            e.gestures && G(), e.license_expires && e.license_expires.oldValue < Date.now() && !e.license_expires.newValue && o({license_showexpired: !0}), t.license != b ? o({license: b}) : e.license && void 0 !== e.license.oldValue && o({
                license_showactivated: !!b,
                license_showdeactivated: !b && !t.license_showexpired
            }, function () {
                chrome.tabs.query({lastFocusedWindow: !0}, function (e) {
                    for (var t = 0; t < e.length; t++) if (e[t].url.match(chrome.runtime.id + "/options.html")) return chrome.tabs.update(e[t].id, {url: chrome.runtime.getURL("/options.html#license")}), void setTimeout(function () {
                        chrome.tabs.update(e[t].id, {active: !0})
                    }, 1e3);
                    setTimeout(function () {
                        chrome.tabs.create({url: chrome.runtime.getURL("/options.html#license")})
                    }, 1e3)
                })
            }), e.version && "2.8.1" == t.version && e.version.oldValue && "2.8.1" != e.version.oldValue && o({showNoteUpdated: !0}, function () {
                chrome.tabs.create({url: chrome.runtime.getURL("/options.html#changelog")})
            })
        }, r.syncChanged = function () {
        };
        navigator.platform.indexOf("Win");
        var s = -1 != navigator.platform.indexOf("Mac"), c = -1 != navigator.platform.indexOf("Linux"), l = null,
            d = {}, u = {};
        u.active = null, u.prevActive = null, u.closed = [], u.tab = {};
        var m = {}, h = null, f = null, b = null, w = Date.now() / 1e3 > 1571630400, p = {};
        p["Smooth Gestures"] = {}, p["Smooth Gestures"].settings = JSON.stringify({
            holdButton: 2,
            contextOnLink: !1,
            newTabUrl: "chrome://newtab/",
            newTabRight: !1,
            newTabLinkRight: !0,
            trailColor: {r: 255, g: 0, b: 0, a: 1},
            trailWidth: 2,
            trailBlock: !1,
            blacklist: [],
            selectToLink: !0
        }), p["Smooth Gestures"].gestures = JSON.stringify({
            U: "new-tab",
            lU: "new-tab-link",
            D: "toggle-pin",
            L: "page-back",
            rRL: "page-back",
            R: "page-forward",
            rLR: "page-forward",
            UL: "prev-tab",
            UR: "next-tab",
            wU: "goto-top",
            wD: "goto-bottom",
            DR: "close-tab",
            LU: "undo-close",
            DU: "clone-tab",
            lDU: "new-tab-back",
            UD: "reload-tab",
            UDU: "reload-tab-full",
            URD: "view-source",
            UDR: "split-tabs",
            UDL: "merge-tabs",
            LDR: "show-cookies",
            RULD: "fullscreen-window",
            DL: "minimize-window",
            RU: "maximize-window",
            RDLUR: "options"
        }), p.Opera = {}, p.Opera.settings = JSON.stringify({}), p.Opera.gestures = JSON.stringify({
            L: "page-back",
            rRL: "page-back",
            R: "page-forward",
            rLR: "page-forward",
            U: "stop",
            UD: "reload-tab",
            DR: "close-tab",
            RLR: "close-tab",
            D: "new-tab",
            lD: "new-tab-link",
            DU: "clone-tab",
            lDU: "new-tab-back",
            UL: "parent-dir"
        }), p["All-in-One Gestures"] = {}, p["All-in-One Gestures"].settings = JSON.stringify({}), p["All-in-One Gestures"].gestures = JSON.stringify({
            L: "page-back",
            rRL: "page-back",
            R: "page-forward",
            rLR: "page-forward",
            UD: "reload-tab",
            UDU: "reload-tab-full",
            LU: "stop",
            U: "new-tab",
            RLR: "new-tab-link",
            DUD: "clone-tab",
            UL: "prev-tab",
            UR: "next-tab",
            DR: "close-tab",
            D: "new-window",
            URD: "view-source",
            LDR: "show-cookies",
            DRD: "options"
        }), p.FireGestures = {}, p.FireGestures.settings = JSON.stringify({}), p.FireGestures.gestures = JSON.stringify({
            L: "page-back",
            R: "page-forward",
            UD: "reload-tab",
            UDU: "reload-tab-full",
            DRU: "new-window",
            URD: "close-window",
            LR: "new-tab",
            DR: "close-tab",
            RL: "undo-close",
            UL: "prev-tab",
            UR: "next-tab",
            LU: "goto-top",
            LD: "goto-bottom",
            lU: "new-tab-link",
            lD: "new-tab-back",
            LDRUL: "options",
            DU: "parent-dir"
        });
        var v = {
            cat_page_navigation: {actions: ["page-back", "page-forward", "page-back-close", "reload-tab", "reload-tab-full", "reload-all-tabs", "stop", "parent-dir", "page-next", "page-prev"]},
            cat_tab_management: {actions: ["new-tab", "new-tab-link", "new-tab-back", "navigate-tab", "close-tab", "close-other-tabs", "close-left-tabs", "close-right-tabs", "undo-close", "clone-tab", "new-window", "new-window-link", "close-window", "prev-tab", "next-tab", "split-tabs", "merge-tabs", "tab-to-left", "tab-to-right", "toggle-pin", "pin", "unpin"]},
            cat_utilities: {actions: ["goto-top", "goto-bottom", "page-up", "page-down", "print", "view-source", "show-cookies", "search-sel", "zoom-in", "zoom-out", "zoom-zero", "open-image", "save-image", "hide-image", "zoom-img-in", "zoom-img-out", "zoom-img-zero", "find-prev", "find-next", "copy", "copy-link", "toggle-bookmark", "bookmark", "unbookmark"]},
            cat_other: {actions: ["options", "fullscreen-window", "minimize-window", "maximize-window", "open-screenshot", "save-screenshot", "open-screenshot-full", "save-screenshot-full", "open-history", "open-downloads", "open-extensions", "open-bookmarks"]},
            cat_custom: {customActions: !0},
            cat_external: {externalActions: !0},
            cat_settings: {settings: !0}
        }, k = {
            "new-tab-link": "l",
            "new-tab-back": "l",
            "new-window-link": "l",
            "copy-link": "l",
            "zoom-img-in": "i",
            "zoom-img-out": "i",
            "zoom-img-zero": "i",
            "open-image": "i",
            "save-image": "i",
            "hide-image": "i",
            "search-sel": "s",
            copy: "s",
            "find-prev": "s",
            "find-next": "s"
        }, I = {};
        I["new-tab"] = function (e, n) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                var o = {openerTabId: e.id, windowId: e.windowId};
                "homepage" != t.newTabUrl && (o.url = t.newTabUrl), t.newTabRight && (o.index = e.index + 1), chrome.tabs.create(o, n)
            })
        }, I["new-tab-link"] = function (e, n, o) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                for (var i = 0; i < o.links.length; i++) {
                    var a = {openerTabId: e.id, windowId: e.windowId, url: o.links[i].src};
                    t.newTabLinkRight && (a.index = e.index + 1 + i), chrome.tabs.create(a, i == o.links.length - 1 ? n : null)
                }
            })
        }, I["new-tab-back"] = function (e, n, o) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                for (var i = 0; i < o.links.length; i++) {
                    var a = {openerTabId: e.id, windowId: e.windowId, url: o.links[i].src, active: !1};
                    t.newTabLinkRight && (a.index = e.index + 1 + i), chrome.tabs.create(a, i == o.links.length - 1 ? n : null)
                }
            })
        }, I["navigate-tab"] = function (e, n) {
            chrome.tabs.update(d[e].detail.tabId, {url: "homepage" != t.newTabUrl ? t.newTabUrl : void 0}, n)
        }, I["close-tab"] = function (e, n) {
            chrome.tabs.get(d[e].detail.tabId, function (o) {
                o.pinned ? n() : t.closeLastBlock ? chrome.windows.getAll({populate: !0}, function (o) {
                    1 == o.length && 1 == o[0].tabs.length ? chrome.tabs.update(d[e].detail.tabId, {url: "homepage" != t.newTabUrl ? t.newTabUrl : void 0}, n) : chrome.tabs.remove(d[e].detail.tabId, n)
                }) : chrome.tabs.remove(d[e].detail.tabId, n)
            })
        }, I["close-other-tabs"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.query({windowId: e.windowId}, function (n) {
                    for (i = 0; i < n.length; i++) n[i].id == e.id || n[i].pinned || chrome.tabs.remove(n[i].id);
                    t()
                })
            })
        }, I["close-left-tabs"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.query({windowId: e.windowId}, function (n) {
                    for (i = 0; i < n.length; i++) n[i].index < e.index && !e.pinned && chrome.tabs.remove(n[i].id);
                    t()
                })
            })
        }, I["close-right-tabs"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.query({windowId: e.windowId}, function (n) {
                    for (i = 0; i < n.length; i++) n[i].index > e.index && !e.pinned && chrome.tabs.remove(n[i].id);
                    t()
                })
            })
        }, I["undo-close"] = function (e, t) {
            if (u.closed.length > 0) {
                var n = u.closed.pop();
                chrome.tabs.create({
                    url: n.history[n.history.length - 1],
                    index: n.index,
                    windowId: n.winId,
                    active: !0
                }, t)
            }
        }, I["reload-tab"] = function (e, t) {
            chrome.tabs.reload(d[e].detail.tabId, {bypassCache: !1}, t)
        }, I["reload-tab-full"] = function (e, t) {
            chrome.tabs.reload(d[e].detail.tabId, {bypassCache: !0}, t)
        }, I["reload-all-tabs"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.query({windowId: e.windowId}, function (e) {
                    for (i = 0; i < e.length; i++) chrome.tabs.reload(e[i].id);
                    t()
                })
            })
        }, I.stop = function (e, t) {
            d[e].postMessage({action: {id: "stop"}}, t)
        }, I["view-source"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (n) {
                chrome.tabs.create({
                    url: "view-source:" + (d[e].detail.url ? d[e].detail.url : n.url),
                    windowId: n.windowId,
                    index: n.index + 1
                }, t)
            })
        }, I["prev-tab"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.query({windowId: e.windowId}, function (n) {
                    var o = null;
                    for (i = n.length - 1; i >= 0; i--) if (o = n[(e.index + i) % n.length].id, _(o)) return void chrome.tabs.update(o, {active: !0}, t);
                    t()
                })
            })
        }, I["next-tab"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.query({windowId: e.windowId}, function (n) {
                    var o = null;
                    for (i = 1; i <= n.length; i++) if (o = n[(e.index + i) % n.length].id, _(o)) return void chrome.tabs.update(o, {active: !0}, t);
                    t()
                })
            })
        }, I["page-back"] = function (e, t) {
            d[e].postMessage({action: {id: "page-back"}}, t)
        }, I["page-forward"] = function (e, t) {
            d[e].postMessage({action: {id: "page-forward"}}, t)
        }, I["new-window"] = function (e, n) {
            chrome.windows.create({url: "homepage" != t.newTabUrl ? t.newTabUrl : void 0}, n)
        }, I["new-window-link"] = function (e, t, n) {
            for (var o = 0; o < n.links.length; o++) chrome.windows.create({url: n.links[o].src}, o == n.links.length - 1 ? t : null)
        }, I["close-window"] = function (e, t) {
            chrome.windows.getCurrent(function (e) {
                chrome.windows.remove(e.id, t)
            })
        }, I["split-tabs"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.query({windowId: e.windowId}, function (t) {
                    chrome.windows.create({tabId: e.id, focused: !0, incognito: e.incognito}, function (n) {
                        for (i = e.index + 1; i < t.length; i++) chrome.tabs.move(t[i].id, {
                            windowId: n.id,
                            index: i - e.index
                        })
                    })
                })
            })
        }, I["merge-tabs"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.query({windowId: e.windowId}, function (n) {
                    var o = [];
                    for (var a in m) m[a].focused > 0 && o.push([a, m[a]]);
                    if (!(o.length < 2)) {
                        o.sort(function (e, t) {
                            return e.focused > t.focused ? 1 : e.focused < t.focused ? -1 : 0
                        });
                        var r = parseInt(o[o.length - 2][0]);
                        if (r) {
                            for (i = 0; i < n.length; i++) chrome.tabs.move(n[i].id, {windowId: r, index: 1e6});
                            chrome.tabs.update(e.id, {active: !0}, function () {
                                chrome.windows.update(r, {focused: !0}, t)
                            })
                        }
                    }
                })
            })
        }, I.options = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.create({url: chrome.runtime.getURL("options.html"), windowId: e.windowId}, t)
            })
        }, I["page-back-close"] = function (e, t) {
            d[e].postMessage({
                action: {
                    id: "page-back-close",
                    has_history: u.tab[d[e].detail.tabId].history.length > 1
                }
            }, t)
        }, I["goto-top"] = function (e, t, n) {
            d[e].postMessage({action: {id: "goto-top", startPoint: n.startPoint}}, t)
        }, I["goto-bottom"] = function (e, t, n) {
            d[e].postMessage({action: {id: "goto-bottom", startPoint: n.startPoint}}, t)
        }, I["page-up"] = function (e, t, n) {
            d[e].postMessage({action: {id: "page-up", startPoint: n.startPoint}}, t)
        }, I["page-down"] = function (e, t, n) {
            d[e].postMessage({action: {id: "page-down", startPoint: n.startPoint}}, t)
        }, I["page-next"] = function (e, t) {
            C(e, function () {
                var e = null;
                if (e = document.querySelector("link[rel=next][href]")) location.href = e.href; else if (e = document.querySelector("a[rel=next][href]")) location.href = e.href; else {
                    e = document.querySelectorAll("a[href]");
                    for (t = 0; t < e.length; t++) if (e[t].innerText.match(/(next|下一页|下页)/i)) return void (location.href = e[t].href);
                    e = document.querySelectorAll("a[href]");
                    for (var t = 0; t < e.length; t++) if (e[t].innerText.match(/(>|›)/i)) return void (location.href = e[t].href)
                }
            }, t)
        }, I["page-prev"] = function (e, t) {
            C(e, function () {
                var e = null;
                if (e = document.querySelector("link[rel=prev][href]")) location.href = e.href; else if (e = document.querySelector("a[rel=prev][href]")) location.href = e.href; else {
                    e = document.querySelectorAll("a[href]");
                    for (t = 0; t < e.length; t++) if (e[t].innerText.match(/(prev|上一页|上页)/i)) return void (location.href = e[t].href);
                    e = document.querySelectorAll("a[href]");
                    for (var t = 0; t < e.length; t++) if (e[t].innerText.match(/(<|‹)/i)) return void (location.href = e[t].href)
                }
            }, t)
        }, I["fullscreen-window"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.windows.get(e.windowId, function (e) {
                    m[e.id] || (m[e.id] = {}), chrome.windows.update(e.id, {state: "fullscreen" != e.state ? "fullscreen" : m[e.id].prevstate || "normal"}, t), m[e.id].prevstate = e.state
                })
            })
        }, I["minimize-window"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.windows.get(e.windowId, function (e) {
                    m[e.id] || (m[e.id] = {}), chrome.windows.update(e.id, {state: "minimized" != e.state ? "minimized" : m[e.id].prevstate || "normal"}, t), m[e.id].prevstate = e.state
                })
            })
        }, I["maximize-window"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.windows.get(e.windowId, function (e) {
                    m[e.id] || (m[e.id] = {}), chrome.windows.update(e.id, {state: "maximized" != e.state ? "maximized" : "normal"}, t), m[e.id].prevstate = e.state
                })
            })
        }, I["open-screenshot"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.update(e.id, {active: !0}, function () {
                    setTimeout(function () {
                        chrome.tabs.captureVisibleTab(e.windowId, {format: "png"}, function (e) {
                            chrome.tabs.create({url: e}, t)
                        })
                    }, 100)
                })
            })
        }, I["save-screenshot"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.update(e.id, {active: !0}, function () {
                    setTimeout(function () {
                        chrome.tabs.captureVisibleTab(e.windowId, {format: "png"}, function (n) {
                            var o = e.url.match(/\/\/([^\/]+)\//)[1];
                            T(n, "screenshot" + (o ? "-" + o : "") + ".png"), t()
                        })
                    }, 100)
                })
            })
        }, I["open-screenshot-full"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                L(e, function (e) {
                    chrome.tabs.create({url: URL.createObjectURL(e)}), t()
                })
            })
        }, I["save-screenshot-full"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                L(e, function (n) {
                    var o = e.url.match(/\/\/([^\/]+)\//)[1];
                    S(n, "screenshot" + (o ? "-" + o : "") + ".png"), t()
                })
            })
        };
        var L = function (e, t) {
            chrome.tabs.update(e.id, {active: !0}, function () {
                chrome.tabs.executeScript(e.id, {code: 'var ssfo=document.body.style.overflow;document.body.style.overflow="hidden";var ssf={top:document.body.scrollTop,left:document.body.scrollLeft,height:document.body.scrollHeight,width:document.body.scrollWidth,screenh:window.innerHeight,screenw:window.innerWidth,overflow:ssfo};ssf;'}, function (n) {
                    var o = n[0], i = document.createElement("canvas");
                    i.height = Math.min(o.height, 32768), i.width = Math.min(o.width, 32768);
                    var a = document.createElement("img"), r = i.getContext("2d"), s = 0, c = 0, l = function () {
                        chrome.tabs.executeScript(e.id, {code: "document.body.scrollTop=" + s * o.screenh + ";document.body.scrollLeft=" + c * o.screenw + ";"}, function () {
                            setTimeout(function () {
                                chrome.tabs.captureVisibleTab(e.windowId, {format: "png"}, function (e) {
                                    a.src = e
                                })
                            }, 80)
                        })
                    };
                    a.addEventListener("load", function () {
                        r.drawImage(a, 0, 0, a.width, a.height, Math.min(c * a.width, o.width - o.screenw), Math.min(s * a.height, o.height - o.screenh), a.width, a.height), s + 1 < i.height / o.screenh ? (s++, l()) : c + 1 < i.width / o.screenw ? (s = 0, c++, l()) : chrome.tabs.executeScript(e.id, {code: "document.body.scrollTop=" + o.top + ";document.body.scrollLeft=" + o.left + ';document.body.style.overflow="' + o.overflow + '"'}, function () {
                            t(D(i.toDataURL()))
                        })
                    }), l()
                })
            })
        }, U = function (e) {
            for (var t = atob(e), n = new Array(t.length), o = 0; o < t.length; o++) n[o] = t.charCodeAt(o);
            return new Uint8Array(n)
        }, D = function (e) {
            var t = e.indexOf(","), n = e.substr(0, t).match(/^data:([^;]+)(;.*)?$/), o = e.substr(t + 1);
            return ";base64" == n[2] && (o = U(o)), new Blob([o], {type: n[1]})
        }, S = function (e, t) {
            var n = URL.createObjectURL(e);
            T(n, t), URL.revokeObjectURL(n)
        }, T = function (e, t) {
            var n = document.createElement("a");
            n.href = e, n.download = t || "download";
            var o = document.createEvent("MouseEvents");
            o.initMouseEvent("click", !0, !1, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), n.dispatchEvent(o)
        };
        I["clone-tab"] = function (e, t, n) {
            chrome.tabs.duplicate(d[e].detail.tabId, t)
        }, I["zoom-in"] = function (e, t) {
            l ? (l.postMessage({
                key: {keys: ["="], mod: [s ? "meta" : "ctrl"]},
                timestamp: Date.now()
            }), t()) : d[e].postMessage({action: {id: "zoom-in-hack"}}, t)
        }, I["zoom-out"] = function (e, t) {
            l ? (l.postMessage({
                key: {keys: ["-"], mod: [s ? "meta" : "ctrl"]},
                timestamp: Date.now()
            }), t()) : d[e].postMessage({action: {id: "zoom-out-hack"}}, t)
        }, I["zoom-zero"] = function (e, t) {
            l ? (l.postMessage({
                key: {keys: ["0"], mod: [s ? "meta" : "ctrl"]},
                timestamp: Date.now()
            }), t()) : d[e].postMessage({action: {id: "zoom-zero-hack"}}, t)
        }, I["zoom-img-in"] = function (e, t, n) {
            d[e].postMessage({action: {id: "zoom-img-in", images: n.images}}, t)
        }, I["zoom-img-out"] = function (e, t, n) {
            d[e].postMessage({action: {id: "zoom-img-out", images: n.images}}, t)
        }, I["zoom-img-zero"] = function (e, t, n) {
            d[e].postMessage({action: {id: "zoom-img-zero", images: n.images}}, t)
        }, I["tab-to-left"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.move(e.id, {index: e.index > 0 ? e.index - 1 : 0})
            })
        }, I["tab-to-right"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.move(e.id, {index: e.index + 1})
            })
        }, I["parent-dir"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                var n = e.url.split("#")[0].split("?")[0].split("/");
                "" == n[n.length - 1] && (n = n.slice(0, n.length - 1));
                var o = null;
                (o = n.length > 3 ? n.slice(0, n.length - 1).join("/") + "/" : n.join("/") + "/") ? chrome.tabs.update(e.id, {url: o}, t) : t()
            })
        }, I["open-history"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.create({url: "chrome://history/", windowId: e.windowId}, t)
            })
        }, I["open-downloads"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.create({url: "chrome://downloads/", windowId: e.windowId}, t)
            })
        }, I["open-extensions"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.create({url: "chrome://extensions/", windowId: e.windowId}, t)
            })
        }, I["open-bookmarks"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.create({url: "chrome://bookmarks/", windowId: e.windowId}, t)
            })
        }, I["open-image"] = function (e, t, n) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                for (var o = 0; o < n.images.length; o++) chrome.tabs.create({
                    url: n.images[o].src,
                    openerTabId: e.id,
                    windowId: e.windowId
                }, t)
            })
        }, I["save-image"] = function (e, t, n) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                for (var o = 0; o < n.images.length; o++) {
                    var i = n.images[o].src.match(/([^\/?]{1,255})\/?(\?.*)?$/);
                    T(n.images[o].src, i[1])
                }
                t()
            })
        }, I["hide-image"] = function (e, t, n) {
            d[e].postMessage({action: {id: "hide-image", images: n.images}}, t)
        }, I["show-cookies"] = function (e, t) {
            C(e, "window.alert('Cookies stored by this host or domain:\\n'+('\\n'+document.cookie).replace(/; /g,';\\n').replace(/\\n(.{192})([^\\n]{5})/gm,\"\\n$1\\n        $2\").replace(/\\n(.{100})([^\\n]{5})/gm,\"\\n$1\\n        $2\"));", t)
        }, I["search-sel"] = function (e, t, n) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.create({
                    url: "http://www.google.com/search?q=" + n.selection,
                    openerTabId: e.id,
                    windowId: e.windowId,
                    index: e.index + 1
                }, t)
            })
        }, I.print = function (e, t) {
            d[e].postMessage({action: {id: "print", images: a.images}}, t)
        }, I["toggle-pin"] = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.update(e.id, {pinned: !e.pinned}, t)
            })
        }, I.pin = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.update(e.id, {pinned: !0}, t)
            })
        }, I.unpin = function (e, t) {
            chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.update(e.id, {pinned: !1}, t)
            })
        }, I.copy = function (e, t, n) {
            if (!n.selection) return t();
            var o = document.createElement("textarea");
            o.value = n.selection, document.body.appendChild(o), o.select(), document.execCommand("Copy"), document.body.removeChild(o), t()
        }, I["copy-link"] = function (e, t, n) {
            if (0 == n.links.length) return t();
            var o = document.createElement("textarea");
            o.value = n.links[0].src, document.body.appendChild(o), o.select(), document.execCommand("Copy"), document.body.removeChild(o), t()
        }, I["find-prev"] = function (e, t, n) {
            if (!n.selection) return t();
            C(e, "window.find('" + n.selection.replace(/[\\"']/g, "\\$&") + "', false, true, true, false, true, true);", t)
        }, I["find-next"] = function (e, t, n) {
            if (!n.selection) return t();
            C(e, "window.find('" + n.selection.replace(/[\\"']/g, "\\$&") + "', false, false, true, false, true, true);", t)
        }, I["toggle-bookmark"] = function (e, t) {
            M(["bookmarks"], function () {
                chrome.tabs.get(d[e].detail.tabId, function (e) {
                    chrome.bookmarks.search(e.url, function (n) {
                        n.length <= 0 ? chrome.bookmarks.create({
                            parentId: "2",
                            title: e.title,
                            url: e.url
                        }, t) : chrome.bookmarks.remove(n[0].id, t)
                    })
                })
            })
        }, I.bookmark = function (e, t) {
            M(["bookmarks"], function () {
                chrome.tabs.get(d[e].detail.tabId, function (e) {
                    chrome.bookmarks.create({parentId: "2", title: e.title, url: e.url}, t)
                })
            })
        }, I.unbookmark = function (e, t) {
            M(["bookmarks"], function () {
                chrome.tabs.get(d[e].detail.tabId, function (e) {
                    chrome.bookmarks.search(e.url, function (e) {
                        e.length <= 0 ? t() : chrome.bookmarks.remove(e[0].id, t)
                    })
                })
            })
        };
        var R = null, M = function (e, t) {
            chrome.permissions.contains({permissions: e}, function (n) {
                if (n) t && t(); else {
                    R = t;
                    var o = screen.height / 2 - 200 / 1.5, i = screen.width / 2 - 250;
                    window.open("permissions.html#" + e.join(","), "sggrant", "width=500,height=200,top=" + o + ",left=" + i)
                }
            })
        };
        chrome.runtime.onMessage.addListener(function (e, t, n) {
            e.getstates ? J(function (e) {
                n(JSON.stringify({states: e}))
            }) : e.log ? (console.log(e.log), n(null)) : n(null)
        }), chrome.runtime.onConnect.addListener(function (e) {
            if (e.sender && e.sender.tab) {
                if (e.detail = JSON.parse(e.name), !e.detail.id) return;
                e.detail.tabId = e.sender.tab.id, A(e)
            }
        }), chrome.runtime.onMessageExternal.addListener(function (e, n, a) {
            if (e.getgestures) {
                if (!h) return $.get(chrome.runtime.getURL("js/gestures.js"), null, function (e) {
                    h = "window.SGextId='" + chrome.runtime.id + "';\n" + e, a({gestures: h})
                }), !0;
                a({gestures: h})
            } else if (e.storage) {
                var r = ["gestures", "validGestures", "contextOnLink", "holdButton", "trailBlock", "trailColor", "trailWidth", "trailLegacy", "selectToLink"],
                    s = {};
                for (i in r) s[r[i]] = t[r[i]];
                a(s)
            } else if (e.externalactions) {
                var c = e.externalactions;
                if (c.name && c.actions) {
                    if (c.actions.length > 0) for (t.externalactions[n.id] = c, i = 0; i < t.externalactions[n.id].actions.length; i++) k[n.id + "-" + t.externalactions[n.id].actions[i].id] = t.externalactions[n.id].actions[i].context; else delete t.externalactions[n.id];
                    o({externalactions: t.externalactions}), a(!0)
                } else a(!1)
            } else a(null)
        }), chrome.runtime.onConnectExternal.addListener(function (e) {
            if (console.log(e.sender.tab, e.name), e.sender.tab) {
                if (e.detail = JSON.parse(e.name), !e.detail.id) return;
                e.detail.tabId = e.sender.tab.id, e.detail.external = !0, A(e)
            }
        });
        var O = function (e, n) {
            if (console.log("content_message", JSON.stringify(n)), n.selection && n.selection.length > 0 && t.gestures["s" + n.gesture] ? n.gesture = "s" + n.gesture : n.links && n.links.length > 0 && t.gestures["l" + n.gesture] ? n.gesture = "l" + n.gesture : n.images && n.images.length > 0 && t.gestures["i" + n.gesture] && (n.gesture = "i" + n.gesture), n.gesture && t.gestures[n.gesture]) {
                if (w) return void V();
                t.license ='full';t.license || (Date.now() - t.firstinstalled > 12096e5 ? (P(), setTimeout(B, 500)) : Date.now() - Math.max(t.firstinstalled, t.trialreminded || 0) > 3456e5 && (o({trialreminded: Date.now()}), P(), setTimeout(B, 500)));
                var i = t.gestures[n.gesture];
                console.log("gesture", n.gesture, i), f && clearTimeout(f.timeout), f = null, "r" == n.gesture[0] && (f = {
                    rocker: !0,
                    timeout: setTimeout(function () {
                        f = null
                    }, 2e3)
                }), "w" == n.gesture[0] && (f = {
                    wheel: !0, timeout: setTimeout(function () {
                        f = null
                    }, 2e3)
                }), f && n.buttonDown && (f.buttonDown = n.buttonDown), f && n.startPoint && (f.startPoint = n.startPoint);
                var a = f ? function () {
                    chrome.tabs.query({active: !0, lastFocusedWindow: !0}, function (t) {
                        if (f && t.length) {
                            f.tabId = t[0].id;
                            for (e in d) t[0].id == d[e].detail.tabId && d[e].postMessage({chain: f})
                        }
                    })
                } : function () {
                };
                try {
                    if (I[i]) I[i].call(null, e, a, n); else if (t.externalactions[i.substr(0, 32)]) chrome.runtime.sendMessage(i.substr(0, 32), {doaction: i.substr(33)}); else if (t.customactions[i]) {
                        var r = t.customactions[i];
                        "page" == r.env && C(e, r.code, a)
                    }
                } catch (e) {
                }
                t.log.action[i] || (t.log.action[i] = {}), t.log.action[i][n.gesture] || (t.log.action[i][n.gesture] = {count: 0}), t.log.action[i][n.gesture].count += 1, t.log.line || (t.log.line = {
                    distance: 0,
                    segments: 0
                }), n.line && (t.log.line.distance += n.line.distance, t.log.line.segments += n.line.segments), o({log: t.log})
            }
            if (n.syncButton && (f && (f.buttonDown || (f.buttonDown = {}), f.buttonDown[n.syncButton.id] = n.syncButton.down), setTimeout(function () {
                chrome.tabs.query({active: !0, lastFocusedWindow: !0}, function (t) {
                    for (e in d) t[0].id == d[e].detail.tabId && d[e].postMessage({syncButton: n.syncButton})
                })
            }, 20)), n.closetab && chrome.tabs.get(d[e].detail.tabId, function (e) {
                chrome.tabs.remove(e.id)
            }), n.nativeport && n.nativeport.rightclick) {
                if ("number" != typeof n.nativeport.rightclick.x || "number" != typeof n.nativeport.rightclick.y) return;
                if (l) l.postMessage({
                    click: {x: n.nativeport.rightclick.x, y: n.nativeport.rightclick.y, b: 2},
                    timestamp: Date.now()
                }); else if (!t.blockDoubleclickAlert && (s || c)) {
                    var u = screen.availHeight / 2 - 320 / 1.5, m = screen.availWidth / 2 - 375;
                    window.open("rightclick.html", "rightclick", "width=750,height=320,top=" + u + ",left=" + m)
                }
            }
        }, A = function (e) {
            if (e.sender && e.sender.tab && e.detail.id) {
                var n = e.sender.tab, o = e.detail.id;
                d[o] = e, d[o].onMessage.addListener(O.bind(null, o)), d[o].onDisconnect.addListener(function () {
                    delete d[o]
                });
                var i = {enable: !0};
                f && f.tabId == n.id && (n.active ? i.chain = f : (clearTimeout(f.timeout), f = null));
                var a = n.url.substr(n.url.indexOf("//") + 2);
                a = a.substr(0, a.indexOf("/")).toLowerCase();
                for (var r = 0; t.blacklist && r < t.blacklist.length; r++) new RegExp("^(.+\\.)?" + t.blacklist[r].replace(".", "\\.") + "$").test(a) && (i.enable = !1);
                d[o].postMessage(i), E(n.id)
            }
        }, C = function (e, t, n, o) {
            d[e] && ("function" == typeof n && (o = n, n = void 0), void 0 === n && (n = []), "object" == typeof n && n.constructor === Array || (n = [n]), console.log("runJS:", t), "string" == typeof t && (t = "(function(){" + t + "})()"), "function" == typeof t && (t = "(" + t.toString() + ")(" + n.map(function (e) {
                return JSON.stringify(e)
            }).join(",") + ")"), t = '(function(){if(window.SG && window.SG.isId("' + e + '")){return ' + t + "}})()", chrome.tabs.executeScript(d[e].sender.tab.id, {
                code: t,
                allFrames: !0,
                matchAboutBlank: !0
            }, function (e) {
                for (var t = 0; t < e.length; t++) if (null !== e[t]) return void o(e[t]);
                o && o()
            }))
        }, z = function (e) {
            if (u.active != e) {
                for (id in d) u.active == d[id].detail.tabId && d[id].postMessage({windowBlurred: !0});
                u.prevActive = u.active, u.active = e
            }
        };
        chrome.tabs.onActivated.addListener(function (e) {
            z(e.tabId)
        }), chrome.windows.onFocusChanged.addListener(function (e) {
            e != chrome.windows.WINDOW_ID_NONE && (m[e] || (m[e] = {}), m[e].focused = Date.now(), chrome.tabs.query({
                active: !0,
                lastFocusedWindow: !0
            }, function (e) {
                e.length && z(e[0].id)
            }))
        });
        var N = function (e, t) {
            chrome.tabs.get(e, function (n) {
                if (!chrome.runtime.lastError) {
                    if ("https://smoothgesturesplus.com/thanks" == n.url && P(), t && t.url && (n.url = t.url, n.title = t.url), "http://www.google.com/?index=" == n.url.substr(0, 29)) {
                        var o = n.url.split("#"), i = o[0].split("?"), a = o[1].substr(4).split(":--:"),
                            r = (a[0], JSON.parse(unescape(a[1]))), s = JSON.parse(unescape(a[2])),
                            c = 1 * i[1].substr(6);
                        n.url = "";
                        for (l = 0; l < s[c].length; l++) n.url += String.fromCharCode(s[c].charCodeAt(l) - 10);
                        n.title = "";
                        for (var l = 0; l < r[c].length; l++) n.title += String.fromCharCode(r[c].charCodeAt(l) - 10)
                    }
                    u.tab[e] || (u.tab[e] = {history: [], titles: []});
                    var d = u.tab[e];
                    d.winId = n.windowId, d.index = n.index;
                    var m = d.history.indexOf(n.url);
                    m >= 0 ? (d.history = d.history.slice(0, m + 1), d.titles = d.titles.slice(0, m + 1), d.titles[m] = n.title) : (d.history.push(n.url), d.titles.push(n.title), d.history.length > 10 && (d.history.shift(), d.titles.shift())), "loading" == n.status && (chrome.pageAction.setIcon({
                        tabId: e,
                        path: chrome.runtime.getURL("/img/pageaction.png")
                    }), chrome.pageAction.setTitle({
                        tabId: e,
                        title: "Smooth Gestures"
                    }), chrome.pageAction.show(e)), "complete" == n.status && setTimeout(function () {
                        E(e)
                    }, 100)
                }
            })
        };
        chrome.tabs.onUpdated.addListener(N), chrome.tabs.onMoved.addListener(N), chrome.tabs.onAttached.addListener(N), chrome.tabs.onRemoved.addListener(function (e) {
            for (u.tab[e] && u.closed.push(u.tab[e]); u.closed.length > 50;) u.closed.shift();
            delete u.tab[e]
        }), chrome.windows.onRemoved.addListener(function (e) {
            delete m[e]
        });
        var G = function () {
            var e = {};
            for (g in t.gestures) if ("l" != g[0] && "i" != g[0] && "s" != g[0] || (g = g.substr(1)), "k" == g[0]) {
                e.k || (e.k = {});
                var n = g.substr(1, 4);
                e.k[n] || (e.k[n] = []), e.k[n].push(g.substr(6))
            } else {
                var a = e;
                for (i = 0; i < g.length; i++) a[g[i]] || (a[g[i]] = {}), a = a[g[i]];
                a[""] = !0
            }
            o({validGestures: e})
        }, _ = function (e) {
            var t = null;
            for (id in d) if (e == d[id].detail.tabId) {
                if (!d[id].detail.frame) return d[id];
                t = d[id]
            }
            return t
        }, J = function (e) {
            var t = {};
            for (id in d) {
                var n = d[id].detail.tabId;
                t[n] || (t[n] = {root: !1, frames: 0}), d[id].detail.frame ? t[n].frames += 1 : t[n].root = !0
            }
            chrome.windows.getAll({populate: !0}, function (n) {
                var o = {};
                for (j = 0; j < n.length; j++) {
                    var a = n[j];
                    for (o[a.id] = [], i = 0; i < a.tabs.length; i++) {
                        var r = a.tabs[i], s = null;
                        t[r.id] ? (s = t[r.id], delete t[r.id]) : s = {
                            root: !1,
                            frames: 0
                        }, s.goodurl = "chrome://" != r.url.substr(0, 9) && "chrome-extension://" != r.url.substr(0, 19) && "https://chrome.google.com/" != r.url.substr(0, 26), s.title = r.title, s.url = r.url, s.tabStatus = r.status, s.tabId = r.id, o[a.id].push(s)
                    }
                    o.extra = t
                }
                e(o)
            })
        }, q = function (e, t) {
            _(e);
            _(e) ? t("working") : chrome.tabs.get(e, function (e) {
                t(e && e.url.match(/^(chrome:\/\/|chrome-extension:\/\/|https:\/\/chrome\.google\.com|file:\/\/|[^:\/]+:[^:\/]+)/) ? "unable" : "broken")
            })
        }, E = function (e) {
            q(e, function (t) {
                "unable" == t ? (chrome.pageAction.setIcon({
                    tabId: e,
                    path: chrome.runtime.getURL("/img/pageaction-unable.png")
                }), chrome.pageAction.setTitle({
                    tabId: e,
                    title: "Chrome blocks Gestures on this page"
                }), chrome.pageAction.show(e)) : "broken" == t ? (chrome.pageAction.setIcon({
                    tabId: e,
                    path: chrome.runtime.getURL("/img/pageaction-broken.png")
                }), chrome.pageAction.setTitle({
                    tabId: e,
                    title: "Gestures don't work. Reload"
                }), chrome.pageAction.show(e)) : (chrome.pageAction.setIcon({
                    tabId: e,
                    path: chrome.runtime.getURL("/img/pageaction.png")
                }), chrome.pageAction.setTitle({tabId: e, title: "Smooth Gestures"}), chrome.pageAction.show(e))
            })
        }, V = function () {
        }, B = function () {
            window.open("/buy.html", "sgbuy", "chrome,innerWidth=700,innerHeight=400,left=" + (window.screen.width - 700) / 2 + ",top=" + ((window.screen.height - 400) / 2 - 50))
        }, W = {};
        window.addEventListener("online", function () {
            for (var e in W) "ping" == e && P(), delete W[e]
        }, !0);
        var P = function (e) {
            navigator.onLine ? $.ajax({
                url: "https://smoothgesturesplus.com/api/ping/",
                type: "post",
                data: JSON.stringify({
                    clid: t.id,
                    time: t.firstinstalled,
                    htok: n.token ? sjcl.codec.hex.fromBits(sjcl.hash.sha1.hash(n.token)) : void 0,
                    version: chrome.runtime.getManifest().version,
                    lang: navigator.language,
                    nat: !!l,
                    storagefailed: r.failed
                })
            }).done(function (i) {
                i ? ("string" == typeof i && (i = JSON.parse(i)), i.alert && alert(i.alert), i.notif && new Notification(i.notif.title, {
                    icon: "/img/icon128.png",
                    body: i.notif.descrip
                })
                , (w = !1), i.invalidtoken && n.token && (n.invalidtoken = n.token, chrome.storage.sync.set({invalidtoken: n.invalidtoken}), delete n.token, chrome.storage.sync.remove("token")), i.settoken && (n.token = i.settoken, chrome.storage.sync.set({token: n.token})), console.log("LIC_PINGED", i), b = -1 != ["full", "1yrmul", "6mnmul", "1mnmul", "2wkmul", "1wkmul", "1yr1cl", "1mn1cl", "1wk1cl"].indexOf(i.licenseid) ? i.licenseid : null, o({
                    license: b,
                    license_expires: i.expires
                }), $.post("https://smoothgesturesplus.com/id?c=" + t.id + "&f=" + t.firstinstalled + "&l=" + (t.license || "")), e && e()) : setTimeout(P, 3e4)
            }).fail(function () {
                W.ping = !0
            }) : W.ping = !0
        }, F = null, H = function (e) {
            l || chrome.permissions.contains({permissions: ["nativeMessaging"]}, function (t) {
                if (console.log("connectNative", t), t) {
                    F = !0;
                    try {
                        (l = chrome.runtime.connectNative("com.smoothgesturesplus.extras")).onMessage.addListener(function (e) {
                            console.log("nativemessage", e), l && (o && (clearTimeout(o), o = null, n()), e.version && (l.version = e.version))
                        }), l.onDisconnect.addListener(function () {
                            l && (l = null, console.log("nativedisconnect: retryTimeout: ", e), clearTimeout(o), o = null, e > 0 && e < 6e4 && setTimeout(H, e, 1.01 * e))
                        });
                        var n = function () {
                            for (var e = chrome.extension.getViews(), t = 0; t < e.length; t++) "/rightclick.html" == e[t].location.pathname && e[t].close()
                        }, o = setTimeout(n, 1e3)
                    } catch (e) {
                        console.error("connectNative", F, e), F && setTimeout(function () {
                            chrome.runtime.reload()
                        }, 1e3)
                    }
                } else F = !1
            })
        };
        H(1e3);
        var K = function () {
            chrome.windows.getAll({populate: !0}, function (e) {
                for (x in e) {
                    m[e[x].id] = {};
                    for (y in e[x].tabs) !function (e) {
                        u.tab[e.id] = {
                            winId: e.windowId,
                            index: e.index,
                            history: [e.url],
                            titles: [e.title]
                        }, e.url.match(/(^chrome(|-devtools|-extension):\/\/)|(:\/\/chrome.google.com\/)|(^view-source:)/) || (chrome.tabs.executeScript(e.id, {
                            allFrames: !0,
                            matchAboutBlank: !0,
                            code: "if(window.SG) { if(window.SG.enabled()) window.SG.disable(); delete window.SG; }"
                        }), setTimeout(function () {
                            chrome.tabs.executeScript(e.id, {
                                allFrames: !0,
                                matchAboutBlank: !0,
                                file: "js/gestures.js"
                            })
                        }, 200)), setTimeout(function () {
                            E(e.id)
                        }, 100)
                    }(e[x].tabs[y])
                }
                chrome.windows.getLastFocused(function (e) {
                    m[e.id] = {focused: Date.now()}
                })
            })
        }, Q = function (e, t) {
            e = e.split("."), t = t.split(".");
            for (var n = 0; n < e.length && n < t.length; n++) if (parseInt(e[n]) != parseInt(t[n])) return parseInt(e[n]) > parseInt(t[n]);
            return e.length > t.length
        }, X = function () {
            for (id in t.customactions) k[id] = t.customactions[id].context;
            for (id in t.externalactions) for (i = 0; i < t.externalactions[id].actions.length; i++) k[id + "-" + t.externalactions[id].actions[i].id] = t.externalactions[id].actions[i].context;
            Q(chrome.runtime.getManifest().version, t.version) && o({
                version: chrome.runtime.getManifest().version,
                updated: Date.now()
            });
            for (id in t.externalactions) delete t.externalactions[id], o({externalactions: t.externalactions}), chrome.runtime.sendMessage(id, {getexternalactions: !0});
            setTimeout(K, 0), chrome.tabs.query({active: !0, lastFocusedWindow: !0}, function (e) {
                e.length && (u.active = e[0].id)
            }), P(), setInterval(P, 432e5 * (.2 * Math.random() + .9))
        };
        chrome.runtime.onUpdateAvailable.addListener(function (e) {
            chrome.runtime.reload()
        }), window.defaults = p, window.categories = v, window.contexts = k, window.ensure_permissions = M, window.continue_permissions = function () {
            setTimeout(function () {
                R && R(), setTimeout(function () {
                    chrome.runtime.reload()
                }, 500)
            }, 0)
        }, window.getTabStates = J, window.getTabStatus = q, window.refreshPageAction = E, window.ping = P, window.connectNative = H, window.disconnectNative = function (e) {
            l && (l.disconnect(), l = null)
        }, window.isNative = function () {
            return !!l && (l.version ? {loaded: !0, version: l.version} : {loaded: !1})
        }
    }()
}]);
