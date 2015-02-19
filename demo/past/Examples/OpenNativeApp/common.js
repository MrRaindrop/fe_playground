var common = {
    isiphone: 1,
    init: function(isiphone) {
        this.isiphone = isiphone == "1" ? 1 : 0;
        this.head();
        search.init();
        login.init();
    },
    head: function() {
        $("#divheadApp,#divheadYueyu,#divheadBizhi").hover(
        function() {
            var me = $(this).attr("id");
            var objEle;
            switch (me) {
                case "divheadApp":
                    objEle = $("#navmain");
                    break;
                case "divheadYueyu":
                    objEle = $("#navYueyu");
                    break;
                case "divheadBizhi":
                    objEle = $("#navBizhi")
                    break
                default:
                    return;
            }

            objEle.css({
                left: $(this).position().left + 4,
                top: $(this).position().top
            }).addClass("z_index");
        }, function() { }
        );

        $("#navmain,#navYueyu,#navBizhi").hover(
            function() { },
            function() {
                $("#navmain,#navYueyu,#navBizhi").removeClass("z_index").css({ top: -9999 });
            }
        );
    },
    ga_a2: function(appId) {
        var strReferrer = window.document.referrer;
        if (strReferrer == "") {
            return;
        }

        if (!/(http:\/\/([\w.]*)app111\.com\/home\/)/.exec(strReferrer)) {
            return;
        }

        var intIsIphone = 1;
        var intIsFree = 1;
        if (/\d{9}/.test(strReferrer)) {
            var varCompages = strReferrer.match(/\d{9}/g) + "";

            intIsFree = parseInt(varCompages.substring(0, 1)) == 1 ? 1 : 0;
            intIsIphone = parseInt(varCompages.substring(1, 2)) == 0 ? 1 : 0;
        }

        _gaq.push(["a2._trackPageview", "xuni/" + (intIsIphone == 1 ? "iphone" : "ipad") + "/" + (intIsFree == 1 ? "free" : "paid") + "/down/info/" + appId]);
    },
    ga_a3: function(gdsType, gdsName, varSource, gdsAppId, strAppNameSpg64, strAppLogo, varPrice) {
        if (varPrice == "0" && spg.getUserAgent() == 0 && spg.isSpgAuthorized) {
            spg.download(3, encodeURI(strAppNameSpg64), gdsAppId, strAppLogo, '', 0);
            return;
        }
        common.ga(gdsType, gdsName, varSource, gdsAppId);
    },
    ga: function(gdsType, gdsName, varSource, gdsAppId) {
        var gdsCate = "应用下载";
        var gdsAction = "";
        switch (gdsType) {
            case 1: // pc&ios
                gdsAction = "官方下载";
                break;
            case 2: // mac
                gdsAction = "高速下载";
                break;
            case 3: // ios
                gdsAction = "一键安装";
                break;
            case 4:
                gdsAction = "搜苹果";
                break;
            case 5:
                gdsAction = "增强包搜索";
                break;
            default:
                gdsAction = "ERROR";
                break;
        }
        if (gdsAction != "" && gdsAction != "ERROR") {
            _gaq.push(["_trackEvent", gdsCate, gdsAction, decodeURI(gdsName) + "--下载"]);
        }

        if (gdsType == 1) {
            $.ajax({
                url: "/ajax/DownloadStatistics/",
                type: "GET",
                data: { id: gdsAppId, net4: Math.random() },
                success: function(msg) {
                    if (msg != "") {
                        window.location.href = msg;
                        return;
                    }
                    system.init();
                    if (!system.iOS) {
                        its.detect.openItunes(varSource);
                    }
                    else {
                        window.location.href = varSource;
                    }
                }
            });
        }
    }
}

var search = {
    defaultval: "",
    maxnum: 0,
    chosenum: -1,
    mousemove: false,
    serchType: 0,
    defaultText: "请输入关键字",
    init: function() {

        $(".searchbox").children("span").html(search.defaultText);

        switch (search.serchType) {
            case 1:
                {
                    $('.header_search_channl .q').html($("#liArticle").html());
                    break;
                }
            default:
                {
                    $('.header_search_channl .q').html($("#liApp").html());
                    break;
                }
        }

        var channl = $('.header_search_channl');
        channl.hover(function() { }, function() {
            $(this).find('.q').removeClass('on');
            $(this).find('ul').hide();
        });
        channl.find('.q').click(function() {
            $(this).addClass('on');
            channl.find('ul').toggle();
            return false;
        });
        channl.find('li').click(function() {
            channl.find('.q').html($(this).html()).removeClass('on');
            channl.find('ul').toggle();

            var strTypeName = $(this).attr("id").toLowerCase();

            switch (strTypeName) {
                case "liapp":
                    {
                        search.serchType = 0;
                        break;
                    }
                case "liarticle":
                    {
                        search.serchType = 1;
                        break;
                    }
                default:
                    {
                        search.serchType = 0;
                        break;
                    }
            }

            return false;
        });

        if ($.trim($("#txtsearch").val())) {
            $(".searchbox").children("span").hide();
        }
        search.resetXLcontent();
        $("#txtsearch").parents(".searchbox").click(function() {
            $(this).children("span").hide();
            search.defaultval = $("#txtsearch").val();
            search.searchdata();
            $("#txtsearch").focus();
        });
        $("#txtsearch").blur(function() {
            if (!search.mousemove) {
                search.resetXLcontent();
            }
            search.defaultval = $("#txtsearch").val();
            if ($.trim(search.defaultval) == "") {
                $(this).next("span").show();
            }
        });
        $("#txtsearch").keypress(function(event) {
            search.defaultval = $("#txtsearch").val();
            search.searchEnter(event);
        });
        $("#txtsearch").keyup(function(event) {
            search.defaultval = $("#txtsearch").val();
            search.searchXL(event);
        });
        $("#divsearchbtn").click(function() {
            search.defaultval = $("#txtsearch").val();
            search.search();
        });
    },
    searchEnter: function(event) {
        event = event || window.event;
        var varkeycode = event.keyCode || event.which || event.charCode;
        if ((/^13$|^9$/.test(varkeycode))) {
            event.preventDefault && event.preventDefault();
            event.stopPropagation && event.stopPropagation();
            event.cancelBubble = true;
            event.returnValue = false;
        }
        if (varkeycode == 13) {
            search.search();
        }
        return;
    },
    searchXL: function(event) {

        event = event || window.event;
        var varkeycode = event.keyCode || event.which || event.charCode;
        switch (varkeycode) {
            case 27:
                search.resetXLcontent(); //Esc
                return;
            case 38:
                search.keychose("-"); //Up
                return;
            case 40:
                search.keychose("+"); //Down
                return;
            case 13:
            case 37:
            case 39:
                return;
            default:
                search.searchdata();
                return;
        }
    },
    searchdata: function() {

        if (search.serchType > 0) {
            return;
        }

        if ($.trim(search.defaultval) == "") {
            search.resetXLcontent();
            return;
        }
        $.get(
            "/Ajax/GetAppInfoBySearchKey/?k=" + encodeURI(search.defaultval) + "&t=" + Math.random(),
            function(msg) {

                search.chosenum = -1;

                if (msg == "") {
                    $("#tab_list").hide();
                    return;
                }

                var json = eval('(' + msg + ')');

                if (json.length == 0) {
                    search.resetXLcontent();
                    return;
                }
                search.maxnum = json.length;
                search.resetXLcontent();
                for (var i in json) {
                    var appname = json[i].AppName.replace(/'/g, "’").replace(/\"/g, "”");
                    $("#tab_list").children("ul").append("<li id=\"" + json[i].AppID + "\" appname=\"" +
                                                         appname + "\" applogo=\"" + json[i].AppLogo +
                                                         parseInt(10 * Math.random()) + "\"><div class=\"box\">" +
                                                         "<a href=\"javascript:void(0);\">" +
                                                         subString.autoAddEllipsis(appname, 16, false) +
                                                         "</a></div></li>");
                }

                $("#tab_list").css({ left: $(".search").position().left + 59, top: $(".search").position().top + $(".search").outerHeight() - 2 }).show();

                search.lihover();
            }
        );
    },
    search: function() {

        var strValue = $.trim(search.defaultval);

        if (search.serchType == 1) {
            var strGa = "";

            if (strValue == "") {
                $("#formSearch").find("#q").val("");
                strGa = "（空）";
            }
            else {
                $("#formSearch").find("#q").val(strValue);
                strGa = strValue;
            }

            _gaq.push(["_trackEvent", "文章搜索（百度）", strGa, ""]);
            $("#formSearch").submit();
            return;
        }

        if (search.chosenum != -1) {
            $("#tab_list ul li").eq(search.chosenum).click();
            return;
        }

        if (strValue == "") {
            window.location = WebSerchData.defaultAppGotoUrl;
            return;
        }

        $("#txtsearch").val("");
        window.location = WebSitehost + "search?k=" + encodeURI(strValue.replace("&", "$1$"));
    },
    resetXLcontent: function() {
        $("#tab_list").hide();
        $("#tab_list").children("ul").html("");
    },
    lihover: function() {
        $("#tab_list ul li").hover(
            function() {
                search.lichose(this);
                search.mousemove = true;
                search.chosenum = $(this).index();
            },
            function() {
                search.lireset(this);
                search.mousemove = false;
                search.chosenum = -1;
            }
        );
    },
    keychose: function(c) {

        if ($("#tab_list").css("display") == "none") {
            return;
        }

        search.lireset();
        if (c == "+") {
            search.chosenum = search.chosenum == (search.maxnum - 1) ? 0 : (search.chosenum + 1);
        }
        if (c == "-") {
            search.chosenum = search.chosenum <= 0 ? (search.maxnum - 1) : (search.chosenum - 1);
        }
        search.lichose($("#tab_list ul li").eq(search.chosenum));
        $("#txtsearch").val($("#tab_list ul li").eq(search.chosenum).attr("appname"));
    },
    lichose: function(obj) {
        search.lireset();
        if ($(obj).children().is(".boxshow")) {
            $(obj).children(".box").hide();
            $(obj).addClass("on");
            $(obj).children(".boxshow").show();
        }
        else {
            $(obj).append("<div class=\"boxshow\"><div><a href=\"javascript:void(0);\"><img height=\"40\" width=\"40\" src=\"" +
                          $(obj).attr("applogo") + "\" alt=\"\" /></a></div><div><a href=\"javascript:void(0);\">" +
                          subString.autoAddEllipsis($(obj).attr("appname"), 10, false) + "</a></div></div>");
            $(obj).children(".box").hide();
            $(obj).addClass("on");
            $(obj).bind("click", function() {
                search.mousemove = false;
                $("#txtsearch").val("");
                search.resetXLcontent();
                location.href = "/info/" + $(obj).attr("id") + "/";
            });
        }
    },
    lireset: function(obj) {
        $("#tab_list ul li").removeClass("on");
        $("#tab_list ul").find(".boxshow").hide();
        $("#tab_list ul").find(".box").show();
    }
}

var cookie = {
    domain: ";domain=.app111.com",
    addcookiebase: function(key, value, time, domain) {
        var varDate = new Date();
        varDate.setTime(varDate.getTime() + parseInt(time));
        document.cookie = key + "=" + escape(value) + "; expires=" + varDate.toGMTString() + domain + "; path=/; ";
    },
    delcookiebase: function(key, domain) {
        var varDate = new Date();
        varDate.setTime(varDate.getTime() - 1000);
        document.cookie = key + "=; expires=" + varDate.toGMTString() + domain + "; path=/; ";
    },
    addcookie: function(key, value, time) {
        this.addcookiebase(key, value, time, "");
    },
    getcookie: function(key) {
        var varArray = document.cookie.split("; ");
        for (var i = 0; i < varArray.length; i++) {
            var varTemp = varArray[i].split("=");
            if (varTemp[0] == key) {
                return decodeURI(unescape(varTemp[1]));
            }
        }
        return "";
    },
    delcookie: function(key) {
        this.delcookiebase(key, "");
    },
    adddomaincookie: function(key, value) {
        this.addcookiebase(key, value, parseInt(24 * 60 * 60 * 1000), cookie.domain);
    },
    getdomaincookie: function(key) {
        return this.getcookie(key);
    },
    deldomaincookie: function(key) {
        this.delcookiebase(key, cookie.domain);
    },
    loginurl: function(url) {
        var varUrl = Loginhost + "?u=" + url;
        location.href = encodeURI(varUrl);
    },
    regurl: function(url) {
        var varUrl = Loginhost + "reg/?u=" + url;
        location.href = encodeURI(varUrl);
    }
}

var login = {
    username: "",
    userid: "",
    currentpage: "",
    ucenterhost: "http://i.app111.com/",
    init: function() {
        this.username = cookie.getdomaincookie("name");
        this.userid = cookie.getdomaincookie("uid");
        this.currentpage = decodeURI(location.href);
        if ($.trim(this.username) == "") {
            $("#divlogin").html("<p><a href=\"javascript:cookie.loginurl('" + location.href + "');\" rel=\"nofollow\">登录</a><a href=\"javascript:cookie.regurl('" + location.href + "');\" rel=\"nofollow\">注册</a></p>");
        }
        else {
            this.userlogin();
        }
    },
    userlogin: function() {
        $("#divlogin").html("<p class=\"begin\">Hi，" +
                            "<a href=\"" + this.ucenterhost + "\" target=\"_blank\" style=\"margin-left:0px;\" rel=\"nofollow\">" +
                            subString.autoAddEllipsis(this.username, 12, true) + "</a>" +
                            "<a href=\"" + this.ucenterhost + "message/\" target=\"_blank\" id=\"hasmessage\" rel=\"nofollow\">消息</a>" +
                            "<a href=\"javascript:login.exitlogin();\" rel=\"nofollow\">退出</a></p>");

        $.getJSON(
            "" + this.ucenterhost + "ajax/getmessagecount/?t=" + Math.random() + "&jsoncallback=?",
            function(json) {
                if (json.length == 2 && (parseInt(json[0]) + parseInt(json[1])) > 0) {
                    $("#hasmessage").addClass("red");
                }
            }
        );
    },
    exitlogin: function() {
        cookie.deldomaincookie("name");
        cookie.deldomaincookie("uid");
        cookie.deldomaincookie("basic");
        cookie.deldomaincookie("verify");
        cookie.deldomaincookie("aaNF_c6cf_auth");
        location.href = location.href;
    }
}

var subString = {
    thisStr: "",
    thisLen: 10,
    thisFlag: true,
    autoAddEllipsis: function(pStr, pLen, pFlag) {
        this.thisStr = pStr;
        this.thisLen = pLen;
        this.thisFlag = pFlag;
        var _ret = this.cutString();
        var _cutFlag = _ret.cutflag;
        var _cutStringn = _ret.cutstring;
        if ("1" == _cutFlag && this.thisFlag) {
            return _cutStringn + "...";
        } else {
            return _cutStringn;
        }
    },
    cutString: function() {
        var pStr = this.thisStr;
        var pLen = this.thisLen;
        var pFlag = this.thisFlag;
        var _strLen = this.thisStr.length;
        var _tmpCode;
        var _cutString;
        var _cutFlag = "1";
        var _lenCount = 0;
        var _ret = false;
        if (_strLen <= pLen / 2) {
            _cutString = pStr;
            _ret = true;
        }
        if (pFlag) {
            pLen = pLen - 3;
        }
        if (!_ret) {
            for (var i = 0; i < _strLen; i++) {
                if (this.isFull(pStr.charAt(i))) {
                    _lenCount += 2;
                } else {
                    _lenCount += 1;
                }
                if (_lenCount > pLen) {
                    _cutString = pStr.substring(0, i);
                    _ret = true;
                    break;
                } else if (_lenCount == pLen) {
                    _cutString = pStr.substring(0, i + 1);
                    _ret = true;
                    break;
                }
            }
        }
        if (!_ret) {
            _cutString = pStr;
            _ret = true;
        }
        if (_cutString.length == _strLen) {
            _cutFlag = "0";
        }
        return { "cutstring": _cutString, "cutflag": _cutFlag };
    },
    isFull: function(pChar) {
        if ((pChar.charCodeAt(0) > 128)) {
            return true;
        } else {
            return false;
        }
    }
}

var system = {
    init: function(navigator) {
        var platforms = this.platforms,
		ln = platforms.length,
		i, platform;
        navigator = navigator || window.navigator;

        for (i = 0; i < ln; i++) {
            platform = platforms[i];
            this[platform.identity] = platform.regex.test(navigator[platform.property]);
        }
        this.Desktop = this.Mac || this.Windows || (this.Linux && !this.Android);
        this.Tablet = this.iPad;
        this.Phone = !this.Desktop && !this.Tablet;
        this.iOS = this.iPhone || this.iPad || this.iPod;
        this.Standalone = !!window.navigator.standalone;
    },
    platforms: [
    {
        property: 'platform',
        regex: /iPhone/i,
        identity: 'iPhone'
    },
	{
	    property: 'platform',
	    regex: /iPod/i,
	    identity: 'iPod'
	},
	{
	    property: 'userAgent',
	    regex: /iPad/i,
	    identity: 'iPad'
	},
	{
	    property: 'userAgent',
	    regex: /Blackberry/i,
	    identity: 'Blackberry'
	},
	{
	    property: 'userAgent',
	    regex: /Android/i,
	    identity: 'Android'
	},
	{
	    property: 'platform',
	    regex: /Mac/i,
	    identity: 'Mac'
	},
	{
	    property: 'platform',
	    regex: /Win/i,
	    identity: 'Windows'
	},
	{
	    property: 'platform',
	    regex: /Linux/i,
	    identity: 'Linux'
	},
	{
	    property: 'userAgent',
	    regex: /msie/i,
	    identity: 'IE'
	},
	{
	    property: 'userAgent',
	    regex: /gecko/i,
	    identity: 'MOZ'
	},
	{
	    property: 'userAgent',
	    regex: /Chrome/i,
	    identity: 'Chrome'
	},
	{
	    property: 'userAgent',
	    regex: /MSIE 9.0/i,
	    identity: 'IE9'
	},
	{
	    property: 'userAgent',
	    regex: /360SE/i,
	    identity: 'SE360'
	},
	{
	    property: 'userAgent',
	    regex: /360EE/i,
	    identity: 'EE360'
	},
	{
	    property: 'userAgent',
	    regex: /Maxthon/i,
	    identity: 'Maxthon'
	},
	{
	    property: 'userAgent',
	    regex: /Firefox/i,
	    identity: 'Firefox'
	},
	{
	    property: 'userAgent',
	    regex: /MSIE 6.0/i,
	    identity: 'IE6'
	}
]
};

//手势操作
var fnslide = function(a) {
    a.prototype.touchwipe = function(c) {
        var b = {
            min_move_x: 20,
            min_move_y: 20,
            wipeLeft: function() { },
            wipeRight: function() { },
            wipeUp: function() { },
            wipeDown: function() { },
            wipe: function() { },
            wipehold: function() { },
            preventDefaultEvents: true
        };
        if (c) {
            a.extend(b, c)
        } this.each(function() {
            var h;
            var g;
            var j = false;
            var i = false;
            var e;
            function m() {
                this.removeEventListener("touchmove", d);
                h = null;
                j = false;
                clearTimeout(e)
            } function d(q) {
                if (b.preventDefaultEvents) {
                    q.preventDefault()
                } if (j) {
                    var n = q.touches[0].pageX;
                    var r = q.touches[0].pageY;
                    var p = h - n;
                    var o = g - r;
                    if (Math.abs(p) >= b.min_move_x) {
                        q.preventDefault();
                        m();
                        if (p > 0) {
                            b.wipeLeft()
                        } else {
                            b.wipeRight()
                        }
                    }
                    else {
                        if (Math.abs(o) >= b.min_move_y) {
                            m();
                            if (o > 0) {
                                b.wipeUp()
                            } else {
                                b.wipeDown()
                            }
                        }
                    }
                }
            } function k() {
                clearTimeout(e);
                if (!i && j) {
                    b.wipe()
                } i = false
            } function l() {
                i = true;
                b.wipehold()
            } function f(n) {
                if (n.touches.length == 1) {
                    h = n.touches[0].pageX;
                    g = n.touches[0].pageY;
                    j = true;
                    this.addEventListener("touchmove", d, false);
                    e = setTimeout(l, 750)
                }
            } if ("ontouchstart" in document.documentElement) {
                this.addEventListener("touchstart", f, false);
                this.addEventListener("touchend", k, false)
            }
        });
        return this
    };
    a.extend(a.prototype.touchwipe, 1)
}

/*搜苹果pc*/
var spg = {
    appName: "",
    gdsAppName: "",
    gdsType: 0,
    appId: 0,
    appLogo: "",
    ipaPath: "",
    extendType: "",
    isRetry: false,
    spgDownloadType: 0,
    intSpgAuthorized: 0,
    isSpgAuthorized: false,
    jailBreakButtonText: "一键安装",
    getUserAgent: function() {
        system.init();
        if (system.Mac) {
            return 2
        }
        if (system.iOS) {
            return 1;
        }
        return 0;
    },
    downloadPanleHide: function() {
        $("#divSpgPanle").hide();
        $("#div_spg_bg").hide();
    },
    init: function() {
        if (spg.getUserAgent() != 0) {
            return;
        }

        if (spg.intSpgAuthorized == 1) {
            spg.isSpgAuthorized = true;
            spg.jailBreakButtonText = "下载越狱版";
        }

        $(document).ready(function() {
            var strPanleHtml = "<div id=\"div_spg_bg\"></div><div id=\"divSpgPanle\" class=\"pc_box\"></div>";
            strPanleHtml += "<iframe id=\"iframeSpg\" frameborder=\"0\" scrolling=\"no\" allowtransparency=\"true\" width=\"1px\" height=\"1px\" style=\"display:none;\"></iframe>";

            $("body").append(strPanleHtml);
            $("#div_spg_bg").css("opacity", 0.3);
            $("#div_spg_bg").click(spg.downloadPanleHide);
        });
    },
    addCookie: function() {
        cookie.addcookiebase("spg", "true", (1000 * 60 * 60 * 24 * 30), cookie.domain);
    },
    getCookie: function(cookieKey) {
        return cookie.getdomaincookie(cookieKey)
    },
    googleDownloadStatistics: function() {
        switch (spg.gdsType) {
            case 1:
            case 3:
                //用户点击“一键安装”（应用最终页图标下按钮、应用截图展示区下方按钮、首页、排行榜页面的下载按钮）
                _gaq.push(['_trackEvent', "应用下载", "PC一键安装-" + spg.gaDownloadTypeName(), spg.gdsAppName + "--下载"]);

                //                if (spg.gdsType == 3) {
                //                    common.ga_a2(spg.appId);
                //                }

                break;
            case 2:
                //用户点击应用最终页下方“更多此类应用”的瀑布展示区的“一键安装”按钮
                _gaq.push(['_trackEvent', "最终页瀑布下载", "PC一键安装-" + spg.gaDownloadTypeName(), spg.gdsAppName + "--下载"]);
                break;
            default:
                break;
        }
    },
    toClient: function() {
        $.ajax({
            url: "/Ajax/GetSpgToBase64/",
            type: "GET",
            data: {
                AppId: spg.appId,
                AppName: spg.appName,
                AppLogo: spg.appLogo,
                IpaPath: spg.ipaPath,
                extendType: spg.extendType,
                SpgDownloadType: spg.spgDownloadType
            },
            success: function(msg) {
                $("#iframeSpg").attr("src", "soupingguo://" + msg);
                if (!spg.isRetry) {
                    spg.googleDownloadStatistics();
                }
            }
        });
    },
    getGdsAppName: function() {
        return spg.appName.replace(/#”#/g, "”").replace(/#’#/g, "’").replace(/#·#/g, "&");
    },
    getPageUrl: function() {
        return location.href;
    },
    downloadSpg: function() {
        _gaq.push(['_trackEvent', "您安装搜苹果了吗？-" + spg.gaDownloadTypeName(), "下载搜苹果", spg.getPageUrl()]);
    },
    downloadExtend: function(gdsType, strAppName, intAppId, strAppLogo, ipaPath, extendType) {
        this.extendType = extendType;
        this.download(gdsType, strAppName, intAppId, strAppLogo, ipaPath);
    },
    download: function(gdsType, strAppName, intAppId, strAppLogo, ipaPath, spgDownloadType) {

        $.ajax({
            url: "/ajax/DownloadStatistics/",
            type: "GET",
            data: {
                id: intAppId,
                net4: Math.random()
            },
            success: function(msg) {
                if (msg != "") {
                    window.location.href = msg;
                    return;
                }

                spg.appName = decodeURI(strAppName).replace(/&/g, "#·#");
                spg.gdsAppName = spg.getGdsAppName();
                spg.gdsType = gdsType;
                spg.appId = intAppId;
                spg.appLogo = strAppLogo;
                spg.ipaPath = ipaPath;
                spg.isRetry = false;
                spg.spgDownloadType = spgDownloadType;

                if (spg.getCookie("spg") == "true") {
                    spg.toClient();
                    return;
                }
                var strAppNameSubstring = subString.autoAddEllipsis(spg.gdsAppName, 22, true);
                var strPanleHtml = "        <div class=\"pc_box_main\">  \r\n";
                strPanleHtml += "            <div class=\"pc_box_title\">  \r\n";
                strPanleHtml += "                <span class=\"left\">安装" + strAppNameSubstring + "</span><a href=\"javascript:void(0);\" onclick=\"spg.downloadPanleHide();\" class=\"close\" title=\"关闭\">关闭</a></div>  \r\n";
                strPanleHtml += "            <div class=\"pc_box_content\">  \r\n";
                strPanleHtml += "                <span class=\"logo\"><img src=\"" + strAppLogo.replace("/40x40/", "/160x160/") + "\" alt=\"\" /></span><div class=\"summary\">  \r\n";
                strPanleHtml += "                    搜苹果可以帮您安装<span class=\"name\">" + strAppNameSubstring + "</span>，如果您已安装搜苹果，请选择“我已安装”</div>  \r\n";
                strPanleHtml += "            </div>  \r\n";
                strPanleHtml += "            <div class=\"pc_box_btn\">  \r\n";
                strPanleHtml += "                <a onclick=\"spg.downloadSpg();\" href=\"http://www.soupingguo.com/home/downloadsoupingguopc/1/\" target=\"_blank\" title=\"\" class=\"btn_01\"></a><a href=\"javascript:void(0);\" onclick=\"spg.installed();return false;\" class=\"btn_02\"></a>  \r\n";
                strPanleHtml += "            </div>  \r\n";
                strPanleHtml += "        </div>  \r\n";

                $("#div_spg_bg").css("height", $(document).height() + "px");
                $("#divSpgPanle").html(strPanleHtml);
                $("#divSpgPanle").show();
                $("#div_spg_bg").show();
                _gaq.push(['_trackEvent', "您安装搜苹果了吗？-" + spg.gaDownloadTypeName(), "浮窗弹出", spg.getPageUrl()]);
            }
        });
    },
    retry: function() {
        spg.isRetry = true;
        spg.toClient();
        _gaq.push(['_trackEvent', "您安装搜苹果了吗？-" + spg.gaDownloadTypeName(), "我已安装 - 重试打开搜苹果", spg.getPageUrl()]);
    },
    installed: function() {
        spg.addCookie();
        var strAppNameSubstring = subString.autoAddEllipsis(spg.gdsAppName, 22, true);
        var strPanleHtml = "<div class=\"pc_box_main\"><div class=\"pc_box_title\">";
        strPanleHtml += "<span class=\"left\">安装" + strAppNameSubstring + "</span><a href=\"javascript:spg.downloadPanleHide();\" class=\"close\" title=\"关闭\">关闭</a></div>";
        strPanleHtml += "<div class=\"pc_box_content\"><img src=\"/images/spg/img_02.png\" /><em class=\"pc_imgbox\"><img src=\"" + spg.appLogo + "\" width=\"40\" height=\"40\" />";
        strPanleHtml += "</em><div class=\"link\">如果搜苹果没有打开，请重试<a href=\"javascript:void(0);\" onclick=\"spg.retry();return false;\" class=\"app\">安装" + strAppNameSubstring + "</a>";
        strPanleHtml += "</div></div><div class=\"pc_box_btn01\"><span class=\"link\">未安装搜苹果（PC版），请";
        strPanleHtml += "<a onclick=\"spg.downloadSpg();\" href=\"http://www.soupingguo.com/home/downloadsoupingguopc/1/\" target=\"_blank\" title=\"\">点击下载</a></span>";
        strPanleHtml += "<a href=\"javascript:spg.downloadPanleHide();\" class=\"btn\" title=\"完成\">完　成</a></div></div>";
        $("#divSpgPanle").html(strPanleHtml);
        spg.isRetry = false;
        spg.toClient();
        _gaq.push(['_trackEvent', "您安装搜苹果了吗？-" + spg.gaDownloadTypeName(), "我已安装", spg.getPageUrl()]);
    },
    bgHeightReset: function() {
        $("#div_spg_bg").css("height", $(document).height() + "px");
    },
    gaDownloadTypeName: function() {

        if (spg.spgDownloadType == 0) {
            return "正版";
        }
        else {
            return "越狱";
        }
    }
}

//打开登录提示
function OpenLoginTip() {
    InitLoginTip();
    $("#IsLoginCheck").show();
}
//初始化登录提示
function InitLoginTip() {
    //宽
    var maxWidth = $(document).width();
    //高
    var maxHeight = $(document).height();
    $("#bg").css({ "width": maxWidth + "px", "height": maxHeight + "px" });

    var cWidth = $("#IsLoginCheck").width() / 2;
    var windowH = $(window).height() / 2 - 90;
    $("#IsLoginCheck").css("left", (document.documentElement.scrollWidth / 2) - cWidth + "px");
    $("#IsLoginCheck").css("top", windowH + $(window).scrollTop());
    $("#bg").css({ "opacity": "0.7" }).show();

    $(window).scroll(function() {

        $("#IsLoginCheck").css("top", windowH + $(window).scrollTop());
    });
}
//关闭登录弹出tip
function closeLoginCk() {
    $("#IsLoginCheck").hide();
    $("#bg").hide();
}

//确定登录弹出
function okLoginCk() {
    $("#bg,#IsLoginCheck").hide();
    cookie.loginurl(currentURL());
}
//当前url
function currentURL() {
    var url = document.URL;
    //最终页跳转到点评页
    if (url.indexOf("/info/") > 0 || url.indexOf("/dongtai/") > 0) {
        var fh = cookie.getcookie("repb");
        var aid;
        if (url.indexOf("/info/") > 0) {
            aid = url.substr(url.indexOf("/info/") + 6, 9);
        }
        else {
            aid = url.substr(url.indexOf("/info/") + 9, 9);
        }
        if (fh == "1") {
            fh = "1";
        }
        else {
            fh = "0";
        }
        url = WebSitehost + aid + "/reviews/" + fh + "-1";
    }
    return url;
}

//意见反馈
var feedback = {
    //默认意见反馈提示内容
    defaultContent: "输入您遇到的问题，我们将尽快解决...",
    //默认信息提示内容
    defaultMsg: "E-mail/QQ请必填一项",
    //意见反馈提示内容字符数
    totalCount: 120,
    init: function() {
        $("#lblFeedbackTotalCount").html(feedback.totalCount / 2);
        $("#problem_return_box_bg").css({ "opacity": 0.5 });
        //反馈内容
        $("#txtAreaContent").focus(function() {
            var content = $(this).val();
            if (content == feedback.defaultContent) {
                $(this).val("").css("color", "#000");
                $("#emColor").removeClass("red").addClass("blue");
            }
        }).blur(function() {
            var content = $(this).val();
            if ($.trim(content) == "") {
                $(this).css("color", "#c8c8c8").val(feedback.defaultContent);
                $("#emColor").removeClass("blue").addClass("red").html("0");
            }
        }).keyup(function() {
            feedback.getCurrentNum();
        }).focus(function() {
            feedback.getCurrentNum();
        });

        //用户信息
        $("#txtEmail").focus(function() {
            var content = $(this).val();
            if (content == feedback.defaultMsg) {
                $(this).val("").css("color", "#000");
            }
        }).blur(function() {
            var content = $(this).val();
            if ($.trim(content) == "") {
                $(this).css("color", "#c8c8c8").val(feedback.defaultMsg);
            }
        });

        $("#p_r_close").click(feedback.hide);
        $("#linkFeedbackSubmit").click(feedback.submit);
    },
    getCurrentNum: function() {
        var strContent = $("#txtAreaContent").val();
        if (strContent == feedback.defaultContent) {
            return;
        }

        var replaceContent = strContent.replace(/[^x00-xff]/g, "aa");
        if (replaceContent.length > feedback.totalCount) {
            $("#emColor").html(feedback.totalCount / 2);
            var cutContent = subString.autoAddEllipsis(strContent, feedback.totalCount, false);
            $("#txtAreaContent").val(cutContent);
        }
        else {
            var intCount = parseInt(replaceContent.length / 2) + (replaceContent.length % 2);
            $("#emColor").html(intCount);
        }
    },
    show: function() {
        $("#problem_return_box").show();
    },
    hide: function() {
        $("#problem_return_box").hide();
    },
    submit: function() {
        //反馈内容
        var feedbackContent = subString.autoAddEllipsis($("#txtAreaContent").val(), feedback.totalCount, false);
        //用户Email
        var feedbackEmail = subString.autoAddEllipsis($("#txtEmail").val(), 40, false);
        //用户QQ
        var feedbackQQ = $("#txtQQ").val();

        if ($.trim(feedbackContent) == "" || feedbackContent == feedback.defaultContent) {
            $("#txtAreaContent").focus();
            return;
        }

        if (($.trim(feedbackEmail) == "" || feedbackEmail == feedback.defaultMsg) && $.trim(feedbackQQ) == "") {
            $("#txtEmail").focus();
            return;
        }

        $("#linkFeedbackSubmit").unbind();

        $.post("/ajax/addfeedback", {
            Email: escape(feedbackEmail),
            QQ: escape(feedbackQQ),
            Content: escape(feedbackContent)
        }, function(msg) {
            if (msg) {
                feedback.hide();
                feedback.success();
                $("#txtAreaContent").css("color", "#c8c8c8").val(feedback.defaultContent);
                $("#txtEmail").css("color", "#c8c8c8").val(feedback.defaultMsg);
                $("#txtQQ").val("");
            }

            $("#linkFeedbackSubmit").click(feedback.submit);
        });
    },
    //意见反馈成功
    success: function() {
        $(".problem_succes").fadeIn(600).delay(800).fadeOut(600);
    },
    transition: function() {
        if ($("#problem_return_box").is(":hidden")) {
            feedback.show();
        } else {
            feedback.hide();
        }
    }
}

//初始化iPad M3U8视频
function InitIpadm3u8LinkByVideoId(vid) {
    $.get("/HomePage/GetAppM3U8VideoByVideoId", { vid: vid, net4: Math.random() }, function(msg) {
        if (msg != '') {
            var json = eval('(' + msg + ')');
            var video = $('<video src="' + json.m3u8 + '" width="500" height="406" controls="controls" poster="' + json.imgurl + '"></video>');
            $("embed").replaceWith(video);
        }
    })
}