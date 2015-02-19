var appinfo = {
    appid: 0,
    isios: false,
    btnstyle: "",
    gaclick: "",
    downloadindex: 0,
    m3u8: "",
    videoimg: "",
    init: function(id) {
        spg.init();
        this.appid = id;
        this.leftli();
        screenshot.init(this.isios);
        window.onscroll = appinfo.scroll;
    },
    scroll: function() {
        if (($(document).scrollTop() <= 200) && ($("#scroll_top").css("display") != "none")) {
            $("#scroll_top").fadeOut(200);
        }
    },
    jsondata: function(appid) {
        system.init();
        this.isios = system.iOS;
        var warningT;
        var screenshotT;

        $.ajax({
            url: "/appinfo/ajaxappjsoninfo/",
            type: "GET",
            dataType: "json",
            data: { id: appid, ua: spg.getUserAgent(), net4: Math.random() },
            success: function(json) {

                // 高速下载|无限金币|一键安装|资源搜索
                if (json.DlButton != "") {
                    $("#divdownloadbtn").append(json.DlButton.replace("[JailBreakButtonText]", spg.jailBreakButtonText));
                }

                //一键安装
                if (json.DlLink != "") {
                    $("#downloadipa").append(json.DlLink.replace("[JailBreakButtonText]", spg.jailBreakButtonText));
                }

                if (!appinfo.isios) {
                    appinfo.downloadbtnhover();
                }
                else {
                    appinfo.m3u8 = json.M3U8;
                    appinfo.videoimg = json.VideoImg;
                    screenshotT = setInterval(
                        function() {
                            if (screenshot.loadover) {
                                clearInterval(screenshotT);
                                if ($("#divvideohere").length > 0) {
                                    screenshot.replacem3u8();
                                }
                            }
                        },
                        200
                    );
                }
                warningT = setInterval(
                    function() {
                        if ($("#divwarning").length > 0) {
                            clearInterval(warningT);
                            appinfo.warning(json);
                        }
                    },
                    200
                );
            }
        });
    },
    warning: function(json) {
        var vartitle = "";
        var vardec = "";
        if (json.Charge == "1" || json.Ad == "1" || json.Demo == "1" || json.Phonebook == "1") {
            if (json.Demo == "1") {
                vartitle += appinfo.getwarning("1").title;
                vardec += "<p>" + appinfo.getwarning("1").dec + "</p>";
            }
            if (json.Phonebook == "1") {
                vartitle += $.trim(vartitle) != "" ? "/" : "";
                vartitle += appinfo.getwarning("2").title;
                vardec += "<p>" + appinfo.getwarning("2").dec + "</p>";
            }
            if (json.Charge == "1") {
                vartitle += $.trim(vartitle) != "" ? "/" : "";
                vartitle += appinfo.getwarning("3").title;
                vardec += "<p>" + appinfo.getwarning("3").dec + "</p>";
            }
            if (json.Ad == "1") {
                vartitle += $.trim(vartitle) != "" ? "/" : "";
                vartitle += appinfo.getwarning("4").title;
                vardec += "<p>" + appinfo.getwarning("4").dec + "</p>";
            }
        }
        if ($.trim(vartitle) == "") {
            $("#divwarning").append("<em class=\"icon\"></em><span>此应用通过苹果园安全认证</span>").removeClass("tip_megs").addClass("tip_megs1");
            return;
        }
        $("#divwarning").append("<em class=\"icon\"></em><span>" + vartitle + "</span>");
        if (json.Ad == "1") {
            $("#divwarning").append("<a href=\"http://www.app111.com/doc/100008555_1.html\" target=\"_blank\" title=\"\">如何去广告</a>");
        }
        $("#divwarning").append("<div class=\"mes_box\" id=\"divwarningbox\">" + vardec + "</div>");
        if (!system.iOS) {
            $("#divwarning span").hover(
                function() {
                    $("#divwarningbox").show();
                },
                function() {
                    $("#divwarningbox").hide();
                }
            );
        }
    },
    getdownloaddecbytype: function(type) {
        switch (type) {
            case "1":
                return { title: "官方下载", dec: "通过iTunes软件到苹果官方下载正版应用" };
            case "2":
                return { title: "高速下载", dec: "越狱用户下载应用到电脑本地的最佳方式" };
            case "3":
                return { title: spg.jailBreakButtonText, dec: "下载安装一键完成，仅限越狱设备" };
            case "4":
                return { title: "资源搜索", dec: "通过第三方工具精准找到您想下载的应用" };
            case "5":
                return { title: "下载正版", dec: "通过第三方工具下载安装正版应用" };
            default:
                return { title: "官方下载", dec: "通过iTunes软件到苹果官方下载正版应用" };
        }
    },
    downloadbtnhover: function() {
        $("#divdownloadbtn a").hover(
            function() {
                if ($(this).hasClass("btn_07")) {
                    return;
                }
                appinfo.downloadindex = $(this).index("#divdownloadbtn a");
                if ($("#divdownloaddec_" + appinfo.downloadindex).html() == null) {
                    var vardec = appinfo.getdownloaddecbytype($(this).attr("downloadtype"));
                    $("#divleft").append("<div class=\"donwload_mes\" id=\"divdownloaddec_" + appinfo.downloadindex + "\"><span>" + vardec.title + "：</span>" + vardec.dec + "</div>");
                }
                $("#divdownloaddec_" + appinfo.downloadindex).css({ top: $(this).position().top - 5, left: $(this).position().left + 180 }).show();
            },
            function() {
                $(".donwload_mes").hide();
            }
        );
    },
    btndisabled: function() {
        $(".donwload_mes").hide();
        var obj = $("#divdownloadbtn a:first");
        if (obj.hasClass("btn_07")) {
            obj.attr("href", "javascript:void(0);");
            return;
        }
        appinfo.gaclick = obj.attr("href");
        appinfo.btnstyle = obj.attr("class");
        obj.removeClass().addClass("btn_07");
        var t;
        t = setInterval(function() {
            obj.removeClass().addClass(appinfo.btnstyle);
            obj.attr("href", appinfo.gaclick);
            clearInterval(t);
        }, 10000);
    },
    details: function(obj) {
        var height = $("#divdetails").outerHeight();
        if ($(obj).hasClass("icon_on")) {
            //            $("#divdetailsout").animate({ height: "-=" + height }, 200, function() {
            //                $("#divdetails").hide();
            //            });
            $("#divdetails").slideUp(200);
            $(obj).removeClass("icon_on");
        }
        else {
            $("#divdetails").slideDown(200);
            $(obj).addClass("icon_on");
            //$("#divdetailsout").animate({ height: "+=" + height }, 200);
        }
    },
    leftli: function() {
        $("#divleftlist ul:first li:last").addClass("last");
        $("#divleftlist ul:last li:last").addClass("last");
        $("#divleftnew ul li:last").addClass("last");
        $(".divleftli li").hover(
            function() {
                $(this).addClass("on");
            },
            function() {
                $(this).removeClass("on");
            }
        );
    },
    cateclick: function(isfree) {
        if (isfree == 1) {
            $("#divleftul li:first").addClass("on");
            $("#divleftul li:last").removeClass("on");
            $("#divleftlist ul:first").show();
            $("#divleftlist ul:last").hide();
        }
        else {
            $("#divleftul li:last").addClass("on");
            $("#divleftul li:first").removeClass("on");
            $("#divleftlist ul:last").show();
            $("#divleftlist ul:first").hide();
        }
    },
    erweiclick: function() {
        $("#erwei").css({ top: $("#clickerwei").position().top - 10, left: $("#clickerwei").position().left + 101 }).toggle();
    },
    getwarning: function(type) {
        switch (type) {
            case "1":
                return { title: "试玩版本", dec: "试玩版本：仅开放部分功能，游戏应用关卡可能不全" };
            case "2":
                return { title: "泄露隐私", dec: "隐私泄露：此应用可能读取电话簿等，造成隐私泄露" };
            case "3":
                return { title: "有收费项", dec: "有收费项：内含购买道具等收费项目，付款时需谨慎" };
            case "4":
                return { title: "内置广告", dec: "内置广告：有弹出、广告条等，对使用存在一定干扰" };
            default:
                return { title: "", dec: "" };
        }
    },
    decopen: function() {
        if ($("#btndec").hasClass("icon_down_on")) {
            $("#divdec").animate({ height: "-=" + $(".appsummary").outerHeight() }, 200);
            $("#btndec").removeClass('icon_down_on');
        }
        else {
            $("#btndec").addClass('icon_down_on');
            $("#divdec").animate({ height: "+=" + $(".appsummary").outerHeight() }, 200);
        }
    },
    articleinit: function() {
        $("#ularticle li").hover(
            function() {
                $(this).find(".play").css({ opacity: "1" });
            },
            function() {
                $(this).find(".play").css({ opacity: "0.8" });
            }
        );
    },
    history: function(i) {
        $("#historydiv .history_con2").hide();
        $("#historydiv .history_con2").eq(i).show();
        $("#historyul a").attr("class", "");
        $("#historyul a").eq(i).attr("class", "here1");
    },
    appDocumentGA: function(id, appName, type) {

        var varTitle = "";
        switch (type) {
            case 1:
                {
                    varTitle = "点击帖子标题：" + $("#linkAppDocument" + id).attr("title");
                    break;
                }
            case 2:
                {
                    varTitle = "点击下载按钮：" + $("#linkAppDocument" + id).attr("title");
                    break;
                }
            default:
                {
                    varTitle = "点击更多玩家存档";
                }
        }

        _gaq.push(["_trackEvent", "最终页存档分享区", appName, varTitle]);
    }
}
/*--------------------图片 2012-11-15 沈建乐-----------------------*/
var screenshot = {
    isios: false,
    isvideo: false,
    loadover: false,
    videoisshowphone: 1,
    imgwidth: 480,
    videowidth: 684,
    videoheight: 405,
    showimgheight: 0,
    smallimgwidth: 116,
    isiphone: function(type) {
        return type == "1" ? "phone" : "pad";
    },
    switching: function(type, index) {
        var ostype = this.isiphone(type);
        $("#divsmall" + ostype).find("a").removeClass("on");
        $("#divsmall" + ostype).find(".icon").hide();
        $("#divsmall" + ostype).find("a").eq(index).addClass("on");
        if (!this.isvideo) {
            $("#divsmall" + ostype).find("a").eq(index).find("em").show();
        }
        $("#ul" + ostype).animate({ marginLeft: (0 - screenshot.imgwidth * index) }, 100);
    },
    smallpicinit: function(type) {
        var ostype = this.isiphone(type);
        $("#divsmall" + ostype).find("a").bind("click", function() {
            screenshot.showimgheight = $("#ul" + ostype).height();
            if (screenshot.isios) {
                screenshot.switching(type, $(this).index());
            }
            if (screenshot.isvideo) {
                screenshot.animate(0);
                screenshot.isvideo = false;
                $(this).find("em").show();
            }
        });
    },
    hover: function(type) {
        var ostype = this.isiphone(type);
        var videot;
        $("#divsmall" + ostype).find("a").hover(
            function() {
                var index = $(this).index();
                videot = setTimeout(function() { screenshot.switching(type, index); }, 40);
            },
            function() {
                clearTimeout(videot);
                if (screenshot.isvideo) {
                    $("#divsmall" + ostype).find("a").removeClass();
                }
            }
        );
    },
    index: function(type, chose) {
        var ostype = this.isiphone(type);
        var idx = $("#divsmall" + ostype).find(".on").index();
        var max = $("#divsmall" + ostype).find("a").length;
        if (chose == "l") {
            idx = (idx == 0 ? (max - 1) : (idx - 1));
        }
        else {
            idx = (idx == (max - 1) ? 0 : (idx + 1));
        }
        return idx;
    },
    lr: function(type, chose) {
        var idx = this.index(type, chose);
        this.switching(type, idx);
    },
    ios: function(type) {
        var ostype = this.isiphone(type);
        var varthis = $("#ul" + ostype);
        if (varthis.html() == null) {
            return;
        }
        fnslide(jQuery);
        $(varthis).touchwipe({
            min_move_x: 20,
            min_move_y: 20,
            wipeLeft: function() { screenshot.lr(type, "r"); }, //手势向左,看下一张
            wipeRight: function() { screenshot.lr(type, "l"); }, //手势向右,看上一张
            preventDefaultEvents: false
        });
    },
    mousemove: function(type) {
        var ostype = this.isiphone(type);
        var varthis = $("#ul" + ostype);
        if (varthis.html() == null) {
            return;
        }
        varthis.find("li").click(function(e) {
            var positionX = e.originalEvent.layerX || e.originalEvent.x || 0;
            var positionRX = positionX - $(this).index() * 480;
            if (system.IE && !system.IE9) {
                positionRX = positionX;
            }
            if (Number(positionRX) < $(this).width() / 2) {
                var idx = screenshot.index(type, "l");
                varthis.find("li").eq(idx).children("a").removeClass().addClass("imgpre");
                screenshot.lr(type, "l");
            }
            if (Number(positionRX) > $(this).width() / 2) {
                var idx = screenshot.index(type, "r");
                varthis.find("li").eq(idx).children("a").removeClass().addClass("imgnext");
                screenshot.lr(type, "r");
            }
        });
        varthis.find("li").mousemove(function(e) {
            var positionX = e.originalEvent.layerX || e.originalEvent.x || 0;
            var positionRX = positionX - $(this).index() * 480;
            if (system.IE && !system.IE9) {
                positionRX = positionX;
            }
            if (Number(positionRX) < $(this).width() / 2) {
                if (!$(this).children("a").hasClass("imgpre")) {
                    $(this).children("a").removeClass().addClass("imgpre");
                }
            }
            if (Number(positionRX) > $(this).width() / 2) {
                if (!$(this).children("a").hasClass("imgnext")) {
                    $(this).children("a").removeClass().addClass("imgnext");
                }
            }
        });
        varthis.find("li").mouseout(function() { $(this).children("a").removeClass(); });
    },
    init: function(isios) {
        this.loadover = true;
        this.isios = isios;
        this.showimgheight = $("#photo ul:first").height();
        this.smallpicinit(1);
        this.smallpicinit(0);
        if (!this.isios) {
            this.hover(1);
            this.hover(0);
            this.mousemove(1);
            this.mousemove(0);
        }
        else {
            this.ios(1);
            this.ios(0);
            $("#divvideohere").hide();
            $("#divbig").css({ "margin-left": "0px" });
        }
        $("#spansmallvideo").hover(
            function() {
                $(this).find(".play").addClass("play_on");
            },
            function() {
                if (!screenshot.isvideo) {
                    $(this).find(".play").removeClass("play_on");
                }
            }
        );
    },
    animate: function(isvideo) {
        if (isvideo == 1) {
            $("#spansmallvideo").find("a").addClass("on")
            $("#spansmallvideo").find(".play").addClass("play_on");
            $("#spansmallvideo").find(".icon").show();
            var ostype = this.isiphone(this.videoisshowphone);
            $("#divsmall" + ostype).find("a").removeClass();
            $("#divsmall" + ostype).find(".icon").hide();
            if (this.isios) {
                $("#divvideohere").show();
                $("#divbig").css({ "height": screenshot.videoheight + "px" });
                return;
            }
            $("#divbig").animate({ height: screenshot.videoheight, marginLeft: 0 }, 200);
        }
        else {
            $("#spansmallvideo").find("a").removeClass();
            $("#spansmallvideo").find(".play").removeClass("play_on");
            $("#spansmallvideo").find(".icon").hide();
            if (this.isios) {
                $("#divvideohere").hide();
                $("#divbig").css({ "height": (screenshot.showimgheight + 45) + "px" });
                return;
            }
            $("#divbig").animate({ height: (screenshot.showimgheight + 45), marginLeft: 0 - screenshot.videowidth }, 200);
        }
    },
    video: function(appname) {
        if ($("#photo_title").find("span").hasClass("target1_on")) {
            this.videoisshowphone = 1;
        }
        if ($("#photo_title").find("span").hasClass("target2_on")) {
            this.videoisshowphone = 0;
        }
        _gaq.push(["_trackEvent", '最终页内容浏览', '查看视频', decodeURI(appname)]);
        this.animate(1);
        this.isvideo = true;
    },
    divsmallwidth: function(type) {
        var ostype = this.isiphone(type);
        var max = $("#divsmall" + ostype).find("a").length;
        if ($("#spansmallvideo").html() != null) {
            max = max + 1;
        }
        $("#divsmall").css({ "width": (this.smallimgwidth * max) + "px" });
    },
    show: function(type) {
        var ostype = this.isiphone(type);
        $("#photo_title").find("span").removeClass("target1_on").removeClass("target2_on");
        if (type == 1) {
            $("#photo_title span:first").addClass("target1_on");
        }
        else {
            $("#photo_title span:last").addClass("target2_on");
        }
        $("#divpicturehere").find(".img").hide();
        $(".picture_btn").hide();
        $("#divscreen" + ostype).show();
        $("#divsmall" + ostype).show();
        $("#divbig").css({ "height": ($("#ul" + ostype).height() + 45) + "px" });
        this.divsmallwidth(type);
    },
    replacem3u8: function() {
        if ($("#divvideohere").html() == null) {
            return;
        }
        $("#divvideohere").find("embed ").remove();
        $("#divvideohere").prepend("<video width=\"500\" height=\"375\" poster=\"" + appinfo.videoimg + "\" controls=\"controls\" src=\"" + appinfo.m3u8 + "\" tabindex=\"0\"></video>");
    }
}
/*--------------------评论 2012-06-12 沈建乐-----------------------*/
var comment = {
    appId: 0,
    userId: cookie.getdomaincookie("uid"),
    userName: cookie.getdomaincookie("name"),
    verification: cookie.getcookie("usefuluseless"),
    commentCount: 0,
    pagingContent: "",
    useful: function(id) {
        this.effect(id, ".icon_02");
    },
    useless: function(id) {
        this.effect(id, ".icon_03");
    },
    divPosition: function(obj) {
        var clientW = $(window).width() / 2;
        var clientH = $(window).scrollTop();
        var windowH = $(window).height() / 2;
        var divW = $(obj).width() / 2;
        var divH = $(obj).height() / 2;
        $(obj).css({
            left: (clientW - divW) + "px",
            top: (windowH - divH + clientH) + "px"
        });
    },
    openYetCkTip: function() {
        this.divPosition($("#ckyet"));
        $(window).scroll(function() { comment.divPosition($("#ckyet")); });
        $(window).resize(function() { comment.divPosition($("#ckyet")); });
        $("#ckyet").show();
    },
    effect: function(id, style) {
        if (this.verification.indexOf(id + "-" + this.userId) != -1) {
            comment.openYetCkTip();
            return;
        }
        if ($.trim(this.verification) == "") {
            cookie.addcookie("usefuluseless", id + "-" + this.userId + ",", (1000 * 60 * 60));
        } else {
            cookie.delcookie("usefuluseless");
            cookie.addcookie("usefuluseless", this.verification + id + "-" + this.userId + ",", (1000 * 60 * 60));
        }
        $("#divRecommend" + id).find(style).find("i").animate(
                { top: -10, opacity: "show" },
                500,
                function() {
                    var varRecommendEm = $("#divRecommend" + id).find(style).find("em");
                    var varThisCount = varRecommendEm.html().replace('(', '').replace(')', '');
                    varRecommendEm.html("(" + (parseInt(varThisCount) + 1) + ")");
                    comment.calculateUseful(id, style);
                    $(this).animate(
                        { top: -16, opacity: "hide" },
                        500,
                        function() {
                            $(this).removeAttr("style");
                        });
                });
        this.verification = cookie.getcookie("usefuluseless");
        var varAjax = style == ".icon_03" ? "/ajax/nouse/" : "/ajax/support/";
        $.ajax({
            url: varAjax,
            type: "GET",
            data: {
                CommentId: id,
                AppId: comment.appId,
                net4: Math.random()
            }
        });
    },
    calculateUseful: function(id, style) {
        var varUseFul = "";
        if ($.trim($("#spanUseful" + id).html()) != "") {
            var varGroup = $("#spanUseful" + id).find("i").html().split('/');
            if (style == ".icon_02") {
                varUseFul = (parseInt(varGroup[0]) + 1) + "/" + (parseInt(varGroup[1]) + 1);
            }
            else {
                varUseFul = varGroup[0] + "/" + (parseInt(varGroup[1]) + 1);
            }
            $("#spanUseful" + id).find("i").html(varUseFul);
        } else {
            if (style == ".icon_02") {
                varUseFul = "1/1";
            }
            else {
                varUseFul = "0/1";
            }
            $("#spanUseful" + id).html("<i>" + varUseFul + "</i> 有用");
        }
    },
    reply: function(id) {
        $("#divReply" + id).toggle();
        $("#liLook" + id).find("textarea").click(function() {
            $("#liLook" + id).toggle();
            $("#liWrite" + id).toggle();
            $("#liWrite" + id).find("textarea").focus();
            comment.replyKeyPress(id);
        });
    },
    liReplyCancle: function(id) {
        $("#txtReply" + id).val("");
        $("#liLook" + id).find("textarea").unbind("click");
        $("#liLook" + id).toggle();
        $("#liWrite" + id).toggle();
        $("#divReply" + id).toggle();
    },
    replyKeyPress: function(id) {
        $("#btnReply" + id).unbind("click");
        var varContent = $("#txtReply" + id).val();
        var varCount = parseInt(comment.getWritingNum(varContent));
        var varZhCnCount = parseInt(varCount / 2);
        var varRemainder = parseFloat(varCount % 2);
        varZhCnCount = varRemainder > 0 ? varZhCnCount + 1 : varZhCnCount;
        $("#spanReplyCount" + id).html(varZhCnCount);
        if (varCount > 0) {
            $("#btnReply" + id).removeClass().addClass("btn_return_on");
            $("#btnReply" + id).bind("click", function() {
                comment.replyComment(id);
            })
        } else {
            $("#btnReply" + id).removeClass().addClass("btn_return");
        }
        if (varCount > 2000) {
            $("#txtReply" + id).val(comment.getContentWord(varContent, 2000));
        }
    },
    bgreset: function() {
        var clientW = $(document).width() > 1000 ? $(window).width() : 1000;
        var clientH = $(document).height();
        $("#bg").css({
            "width": clientW + "px",
            "height": clientH + "px"
        });
        $("#bg").css({ "opacity": "0.7" });
    },
    openLoginTip: function() {
        this.bgreset();
        this.divPosition($("#IsLoginCheck"));
        $(window).scroll(function() {
            comment.bgreset();
            comment.divPosition($("#IsLoginCheck"));
        });
        $(window).resize(function() {
            comment.bgreset();
            comment.divPosition($("#IsLoginCheck"));
        });
        $("#IsLoginCheck").show();
        $("#bg").show();
    },
    replyComment: function(id) {
        var varContent = $("#txtReply" + id).val();
        if (this.userId == "" || this.userName == "") {
            cookie.addcookie("replymsg", (id + "|" + varContent), (1000 * 60 * 60), "");
            comment.openLoginTip();
            return;
        }
        $("#btnReply" + id).unbind("click");
        $("#btnReply" + id).removeClass().addClass("btn_return");
        $.ajax({
            url: "/ajax/addreplynew/",
            type: "POST",
            data: {
                CommentId: id,
                AppId: comment.appId,
                ReplyContent: varContent,
                userid: comment.userId,
                username: comment.userName,
                net4: Math.random()
            },
            success: function(msg) {
                comment.liReplyCancle(id);
                comment.reply(id);
                $("#ulReply" + id).prepend(msg);
                var varThisCount = $("#emReplyCount" + id).html().replace('(', '').replace(')', '');
                $("#emReplyCount" + id).html("(" + (parseInt(varThisCount) + 1) + ")");
            }
        });
    },
    getWritingNum: function(content) {
        var varLen = content.length;
        var varCount = 0;
        for (var varI = 0; varI < varLen; varI++) {
            if ((content.charCodeAt(varI) > 47 && content.charCodeAt(varI) < 58) ||
                (content.charCodeAt(varI) > 63 && content.charCodeAt(varI) < 91) ||
                (content.charCodeAt(varI) > 96 && content.charCodeAt(varI) < 123)) {
                varCount++;
            }
            if (content.charCodeAt(varI) > 126 || content.charCodeAt(varI) < 27) {
                varCount = varCount + 2;
            }
        }
        return varCount;
    },
    getContentWord: function(str, max) {
        var varLen = str.length;
        var varCount = 0;
        var varNew = "";
        for (var varI = 0; varI < varLen; varI++) {
            if ((str.charCodeAt(varI) > 47 && str.charCodeAt(varI) < 58) ||
                (str.charCodeAt(varI) > 63 && str.charCodeAt(varI) < 91) ||
                (str.charCodeAt(varI) > 96 && str.charCodeAt(varI) < 123)) {
                varCount++;
            }
            if (str.charCodeAt(varI) > 126 || str.charCodeAt(varI) < 27) {
                varCount = varCount + 2;
            }
            if (varCount > max) {
                varNew = str.substring(0, varI);
                return varNew;
            }
        }
        return str;
    },
    close: function() {
        $("#divchosento").hide();
    },
    replyInit: function() {
        if (this.userId == "" || this.userName == "") {
            return;
        }
        var varReplyMsg = cookie.getcookie("replymsg");
        if (varReplyMsg != "" && varReplyMsg != null) {
            var varCommentId = varReplyMsg.substring(0, parseInt(varReplyMsg.indexOf('|')));
            var varContent = varReplyMsg.substring(parseInt(varReplyMsg.indexOf('|') + 1));
            comment.reply(varCommentId);
            $("#txtReply" + varCommentId).val(varContent);
            $("#liLook" + varCommentId).toggle();
            $("#liWrite" + varCommentId).toggle();
            $("#liWrite" + varCommentId).find("textarea").focus();
            comment.replyKeyPress(varCommentId);
        }
        this.clearCookie();
    },
    clearCookie: function() {
        cookie.delcookie("replymsg");
        cookie.delcookie("repb");
    },
    load: function(type, size, isshowpaging, isextra) {
        cookie.addcookie("repb", type, (1000 * 60 * 60));
        $("#appComment").load("/ascx/commentandreplyforajax/" + comment.appId + "-" + isshowpaging + "-" + type + "-" + size + "-1-" + isextra + "/?v=" + Math.random());
    },
    closeAll: function() {
        $("#IsLoginCheck").hide();
        $("#upUseridImg").hide();
        $("#ckyet").hide();
        $("#bg").hide();
    },
    closeUseridImg: function() {
        this.closeAll();
        $("#bg").hide();
        if (this.userId != null && $.trim(this.userId) != "") {
            var varRandom = Math.random();
            $("img[name=cui" + this.userId + "]").attr("src", "http://ucenter.app111.com/avatar.php?uid=" + this.userId + "&size=small&random=" + varRandom);
        }
    },
    currentURL: function() {
        var fh = cookie.getcookie("repb");
        fh = fh == "1" ? "1" : "0";
        var url = WebSitehost + this.appId + "/reviews/" + fh + "-1";
        return url;
    },
    okLoginCk: function() {
        this.closeAll();
        cookie.loginurl(comment.currentURL());
    },
    init: function(type, size, isshowpaging, isextra) {

        if (typeof (isextra) == "undefined") {
            isextra = 0;
        }

        this.clearCookie();
        this.load(type, size, isshowpaging, isextra);
    },
    updateUserImg: function(curuserid, obj) {
        $.post("/ajax/UpUseridImg", { Userid: curuserid }, function(msg) {
            if (msg != '') {
                $("#upImgBackstr").html(msg);
                comment.divPosition($("#upUseridImg"));
                comment.bgreset();
                $(window).scroll(function() { comment.divPosition($("#upUseridImg")); comment.bgreset(); });
                $(window).resize(function() { comment.divPosition($("#upUseridImg")); comment.bgreset(); });
                $("#upUseridImg").show();
                $("#bg").show();
            }
        });
    }
}
/*--------------------最终页瀑布流--------------------*/
var varContainer;
var appInfoCascade = {
    choseAppId: 0,
    userAgent: 0,
    appCate: 24,
    isFree: 0,
    appId: 0,
    showCount: 1,
    scrollCount: 1,
    maxCount: 6,
    pageSize: 32,
    randomNum: 0,
    rec: 3,
    isLoad: false,
    initLoad: function() {
        var divH = $("#divzhuan").offset().top;
        var winH = $(window).height();
        var pageH = winH + $(document).scrollTop();
        if (divH <= pageH) {
            this.isLoad = true;
            this.scrollCount++;
            this.getData();
        }
    },
    init: function(appId, appCate, isFree, recommentClient) {
        appInfoCascade.userAgent = spg.getUserAgent();
        varContainer.masonry({ itemSelector: '.item', columnWidth: 0, isFitWidth: false });
        appInfoCascade.appCate = appCate;
        appInfoCascade.isFree = isFree;
        appInfoCascade.appId = appId;
        appInfoCascade.randomNum = Math.floor(Math.random() * appInfoCascade.maxCount * 32 + 1); //parseInt(Math.random() * 100) % 12;
        appInfoCascade.rec = recommentClient;
        $(".mousedown_btn_box").find("a").attr("href", "/all/" + (appInfoCascade.rec == 2 ? "2" : "1") + (appInfoCascade.isFree == 1 ? "-1" : "-2") + "-0-0-0-" + appInfoCascade.appCate + "-1-1/");
        $(window).bind("scroll", function() { appInfoCascade.addData(); });
        this.initLoad();
    },
    smallLogo: function() {
        $(".list_box_top_menu").hover(function() {
            $(this).find(".smalllogo").css({ "opacity": 1 });
        }, function() {
            $(this).find(".smalllogo").css({ "opacity": 0.7 });
        });
    },
    masterPicMaskPC: function() {
        $(".list_box_top_img").hover(function() {
            $(this).find(".price").hide();
            $(this).find(".list_box_top_title_bg").show();
            $(this).find(".list_box_top_title").show();
        }, function() {
            $(this).find(".price").show();
            $(this).find(".list_box_top_title_bg").hide();
            $(this).find(".list_box_top_title").hide();
        });
    },
    masterPicMaskIOS: function(appid) {
        $("#divIos" + appid).find(".price").toggle();
        $("#divIos" + appid).find(".list_box_top_title_bg").toggle();
        $("#divIos" + appid).find(".list_box_top_title").toggle();
        $("#divIos" + appid).find(".img_box").find("a").removeAttr("onclick");
        $("#divIos" + appid).find(".img_box").find("a").unbind("click");
        if (appid != appInfoCascade.choseAppId) {
            $("#divIos" + appInfoCascade.choseAppId).find(".img_box").find("a").attr("target", "_self").attr("href", "javascript:appInfoCascade.masterPicMaskIOS('" + appInfoCascade.choseAppId + "')");
            $("#divIos" + appInfoCascade.choseAppId).find(".img_box").find("a").bind("click", function() { appInfoCascade.hideMasterPicMaskIOS(); });
        }
        $("#divIos" + appid).find(".img_box").find("a").attr("target", "_blank").attr("href", "/info/" + appid + "/");
        appInfoCascade.choseAppId = appid;
    },
    hideMasterPicMaskIOS: function() {

        $(".price:hidden").show();
        $(".list_box_top_title_bg:visible").hide();
        $(".list_box_top_title:visible").hide();
    },
    addData: function() {
        //更新遮照高度
        spg.bgHeightReset();
        if (appInfoCascade.scrollTop() <= 200) {
            if ($("#scroll_top").css("display") != "none") {
                $("#scroll_top").fadeOut(200);
            }
        }
        else {
            $("#scroll_top").fadeIn(200);
        }
        if (appInfoCascade.showCount > appInfoCascade.maxCount) {
            $(".mousedown_img").hide();
            $(".mousedown_btn").show();
            return;
        }

        var docH = $(document).height();
        if ($(document).scrollTop() + $(window).height() > docH - docH * 0.3) {
            this.isLoad = true;
            if (appInfoCascade.showCount == appInfoCascade.scrollCount) {
                appInfoCascade.scrollCount++;
                appInfoCascade.getData();
                return;
            }
            appInfoCascade.scrollCount++;
        }
        if (appInfoCascade.showCount == 1 && (!this.isLoad)) {
            appInfoCascade.initLoad();
        }
    },
    scrollTop: function() {
        var varScrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            varScrollTop = document.documentElement.scrollTop;
        }
        else if (document.body) {
            varScrollTop = document.body.scrollTop;
        }
        return varScrollTop;
    },
    getData: function() {
        $.ajax({
            url: "/ajax/getappinfocascadedata/",
            type: "GET",
            data: {
                c: appInfoCascade.appCate,
                f: appInfoCascade.isFree,
                v: appInfoCascade.randomNum,
                l: appInfoCascade.showCount,
                m: appInfoCascade.maxCount,
                s: appInfoCascade.pageSize,
                rec: appInfoCascade.rec,
                AppId: appInfoCascade.appId
            },
            success: function(msg) {
                var varJsonData = eval('(' + msg + ')');

                if (appInfoCascade.pageSize * appInfoCascade.showCount >= parseInt(varJsonData.Count)) {
                    appInfoCascade.showCount = appInfoCascade.maxCount;
                }

                appInfoCascade.formatHtml(varJsonData.Data);
                appInfoCascade.scrollCount = appInfoCascade.showCount;
            },
            error: function() {
                appInfoCascade.scrollCount = appInfoCascade.showCount;
            }
        });
    },
    formatHtml: function(msg) {
        var intLen = msg.length;
        var intStart = intLen > appInfoCascade.pageSize ? intLen - appInfoCascade.pageSize : 0;
        for (var i = intStart; i < intLen; i++) {
            var intChoces = Math.abs(intLen - 1 - intStart) + 1;
            var pos = Math.floor(Math.random() * intChoces + intStart);
            var temp = msg[i];
            msg[i] = msg[pos];
            msg[pos] = temp;
        }
        for (var i in msg) {
            var varAppName = msg[i].Name.replace("\"", "”").replace("'", "’");
            var varClass = "";
            var varTarget = "";
            var varHref = "javascript:void(0);";
            var varOnClick = "";
            var varText = "";

            var strAppLogo = msg[i].Logo;
            var strAppNameSpg64 = msg[i].Name.replace(/'/g, "#’#").replace(/\"/g, "#”#");
            var varSource = msg[i].Source;
            var varPrice = msg[i].Price;

            var varDownload = "";
            if (varSource != "") {
                if (varPrice == "免费" && appInfoCascade.userAgent == 0 && spg.isSpgAuthorized) {
                    varDownload = "<a href=\"javascript:void(0);\" target=\"_self\" title=\"\" class=\"" + (msg[i].ReC == 3 ? "btn_02" : "btn_01") + "\" onclick=\"spg.download(1, encodeURI('" + strAppNameSpg64 + "')," + msg[i].Id + ",'" + strAppLogo + "',0);return false;\" >下载正版</a>";
                }
                else {
                    var varBtnText = "";
                    if (varPrice == "免费") {
                        varBtnText = "官方下载";
                    }
                    else {
                        varBtnText = varPrice + "购买";
                    }

                    varDownload = "<a href=\"" + (appInfoCascade.userAgent == 1 ? "javascript:appInfoCascade.googleDownloadStatistics(2,encodeURI('" + varAppName + "'),'" + varSource + "'," + msg[i].Id + ");" : "javascript:appInfoCascade.webOpenItunes('" + varSource + "','" + msg[i].Id + "','" + varAppName + "');") + "\" checkios=\"\" target=\"_self\" title=\"\" class=\"" + (msg[i].Rec == 3 ? "btn_02" : "btn_01") + "\">" + varBtnText + "</a>";
                }
            }

            if (msg[i].Dlt == 0) {
                varClass = "btn_07";
                varText = "暂无资源";
            }
            if (msg[i].Dlt == 1) {
                switch (appInfoCascade.userAgent) {
                    case 1:
                        {
                            varClass = "btn_05";
                            varHref = "itms-services://?action=download-manifest&url=http://www.app111.com/onlinesetupappid/create-" + msg[i].Id + ".plist";
                            varOnClick = " onclick=\"appInfoCascade.googleDownloadStatistics(4, encodeURI('" + varAppName + "'),''," + msg[i].Id + ");\" ";
                            varText = "一键安装";
                            break;
                        }
                    case 2:
                        {
                            varClass = "btn_03";
                            varTarget = " target=\"_self\" ";
                            varHref = "/homepage/amassdownload/" + msg[i].Id + "/?tid=4";
                            varOnClick = " onclick=\"appInfoCascade.googleDownloadStatistics(3, encodeURI('" + varAppName + "'),''," + msg[i].Id + ");\" ";
                            varText = "高速下载";
                            break;
                        }
                    default:
                        {
                            varClass = "btn_03";
                            varOnClick = " onclick=\"spg.download(2, encodeURI('" + strAppNameSpg64 + "')," + msg[i].Id + ",'" + strAppLogo + "','',1);return false;\" ";
                            varText = spg.jailBreakButtonText;
                            break;
                        }
                }
            }
            if (msg[i].Dlt == 2) {
                varClass = "btn_04";
                varTarget = " target=\"_blank\" ";
                varHref = "http://www.soupingguo.com/app/" + msg[i].Id + "/";
                varOnClick = " onclick=\"appInfoCascade.googleDownloadStatistics(6, encodeURI('" + varAppName + "'),''," + msg[i].Id + ");\" ";
                varText = "资源搜索";
            }

            var varHtml = "<li class=\"item\"><div class=\"list_box\"><div class=\"list_box_top\"><div class=\"list_box_top_img\" id=\"divIos" + msg[i].Id + "\"><div class=\"img_box\" id=\"Edit_" + msg[i].Id + "\"><a target=\"" + (appInfoCascade.userAgent == 1 ? "_self" : "_blank") + "\" href=\"" + (appInfoCascade.userAgent == 1 ? "javascript:appInfoCascade.masterPicMaskIOS('" + msg[i].Id + "');" : "/info/" + msg[i].Id + "/") + "\" " + (appInfoCascade.userAgent == 1 ? "onclick=\"appInfoCascade.hideMasterPicMaskIOS();\"" : "") + " title=\"\" name=\"Editor\"><img src=\"" + msg[i].Pic + "\" height=\"" + msg[i].PicH + "\" width=\"208\" alt=\"\" /></a></div><div class=\"mask\"></div><div class=\"price\">" + msg[i].Price + "</div><div class=\"list_box_top_title_bg\"></div><div class=\"list_box_top_title\">" + varDownload + " <a class=\"" + varClass + "\" href=\"" + varHref + "\"" + varOnClick + varTarget + "dlt=\"\">" + varText + "</a></div></div><h2><a href=\"/info/" + msg[i].Id + "/\" target=\"_blank\" title=\"\">" + subString.autoAddEllipsis(msg[i].Name, 24, true) + "</a></h2><div class=\"list_box_top_summary\"><p>" + msg[i].Dec + "</p><p class=\"price\"><em class=\"date\">" + msg[i].Time + "</em><span>" + msg[i].DlCount + "喜欢 </span></p></div><div class=\"list_box_top_menu\"><p class=\"first_p\"><span><a href=\"/info/" + msg[i].Id + "/\" target=\"_blank\" title=\"\">" + subString.autoAddEllipsis(msg[i].Name, 28, true) + "</a></span></p><p><span><a href=\"/all/" + (msg[i].Rec == 2 ? "2" : "1") + (appInfoCascade.isFree == 1 ? "-1" : "-2") + "-0-0-0-" + msg[i].CId + "-1-1/\" target=\"_blank\" title=\"\">" + msg[i].CName + "</a></span>|<span>" + msg[i].Size + "</span>|<span class=\"star\">" + msg[i].Score + "分</span></p><em class=\"img_logo\"><a target=\"_blank\" href=\"/info/" + msg[i].Id + "/\" title=\"\"><img src=\"" + msg[i].Logo + "\" style=\"opacity: 0.7;\" alt=\"\" class=\"smalllogo\" /></a></em><a target=\"_blank\" href=\"/info/" + msg[i].Id + "/\"> </a></div></div></div></li>";
            varContainer.append(varHtml);
        }
        appInfoCascade.showCount++;
        varContainer.masonry("reload");
        if (appInfoCascade.userAgent != 1) {
            appInfoCascade.smallLogo();
            appInfoCascade.masterPicMaskPC();
            $('.list_box_top_title_bg').css({ 'opacity': 0.5 });
            $(".list_box_top_menu").find(".smalllogo").css({ "opacity": 0.7 });
        }
    },
    googleDownloadStatistics: function(gdsType, gdsName, varSource, gdsAppId) {
        var gdsCate = "最终页瀑布下载";
        var gdsAction = "";
        switch (gdsType) {
            case 1:
                gdsAction = "官方下载";
                break;
            case 2:
                gdsAction = "官方下载";
                break;
            case 3:
                gdsAction = "高速下载";
                break;
            case 4:
                gdsAction = "设备上一键安装";
                break;
            case 5:
                gdsAction = "网盘下载";
                break;
            case 6:
                gdsAction = "搜苹果";
                break;
            case 7:
                gdsAction = "短信下载";
                break;
            default:
                gdsAction = "ERROR";
                break;
        }
        if (gdsAction != "" && gdsAction != "ERROR") {
            _gaq.push(["_trackEvent", gdsCate, gdsAction, decodeURI(gdsName) + "--下载"]);
        }
        if ((gdsType == 1 || gdsType == 2)) {
            $.ajax({
                url: "/ajax/DownloadStatistics/",
                type: "GET",
                data: { id: gdsAppId, net4: Math.random() },
                success: function(msg) {
                    if (msg != "") {
                        window.location.href = msg;
                        return;
                    }
                    if (gdsType == 1 && $.trim(varSource) != "") {
                        return its.detect.openItunes(varSource);
                    }
                    if (gdsType == 2 && $.trim(varSource) != "") {
                        window.location.href = varSource;
                    }
                }
            });
        }
    },
    webOpenItunes: function(u, id, varAppName) {
        appInfoCascade.googleDownloadStatistics(1, encodeURI(varAppName), u, id);
    }
}