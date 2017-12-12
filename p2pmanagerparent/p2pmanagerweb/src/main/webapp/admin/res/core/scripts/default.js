//控制高度
function resetHeight() {
    $('#middle').height(document.documentElement.clientHeight - 50);
}
resetHeight();
$(window).resize(resetHeight);

//设置顶部宽度
function resetWidth() {
    var my = $('#my'), notice = $('#notice'), clientW = $(document.body).clientSize().width;
    //notice.width('0');
    $('#nav').removeClass('small');
    my.children('p').show();

    var geLefWidth = function () {
        var wCount = my.width();
        my.siblings().each(function (i, n) {
            wCount += n.offsetWidth;
        });
        return wCount;
    };

    var initW = geLefWidth();
    if (initW > clientW) {
        var ow = my.width();
        my.children('p').hide();
        var nw = my.width();
        if (initW - ow + nw > clientW) {
            $('#nav').addClass('small');
            notice.css('margin-right', nw).width(clientW - geLefWidth() - 10);
        }
    } else {
        notice.css('margin-right', my.width()).width(clientW - initW - 10);
    }
};
resetWidth();
$(window).resize(resetWidth);

//用户快捷操作
$('#my .oper').mouseenter(function () {
    $('.box', this).stop().slideDown('fast');
}).mouseleave(function () {
    $('.box', this).stop().slideUp('fast');
});

//左边菜单控制
$('#left ul').each(function (i, n) {
    if ($('li', n).length == 0) {
        $(n).closest('dd').hide().prev().hide();
    }
});
$('#left').on('click', 'dt', function () {
    $(this).nextUntil('dt').slideToggle('fast');
});
$('#nav a').each(function (i, n) {
    if (i == 0) return;
    n = $(n);
    if ($(n.attr('href')).find('li').length == 0)
        n.hide();
});

//切换(显示/隐藏)左部菜单
var toggleLeftMenu = function (show) {
    var l = $('#left');
    if (show && utils.cookie('ad_hideLeftMenu') != 'true' && !$('#nav a:first').hasClass('on')) {
        if (!l.hasClass('on')) {
            l.addClass('on');
            $('#right').animate({ left: 191 }, 'fast');
        }
    } else {
        if (l.hasClass('on')) {
            l.removeClass('on');
            $('#right').animate({ left: 0 }, 'fast');
        }
    }
};

//显示/隐藏左边菜单
$('#btnLeftToggle').click(function () {
    var hide = utils.cookie('ad_hideLeftMenu');
    if (hide == 'true') {
        utils.cookie('ad_hideLeftMenu', 'false', { path: '/' });
        $(this).text('隐藏侧边栏');
        toggleLeftMenu(true);
    }
    else {
        utils.cookie('ad_hideLeftMenu', 'true', { path: '/' });
        $(this).text('显示侧边栏');
        toggleLeftMenu(false);
    }
});
$('#btnLeftToggle').text((utils.cookie('ad_hideLeftMenu') == 'true' ? '显示' : '隐藏') + '侧边栏');

//顶部及左边选项卡
var mainFrame = $('#main');
$('body').tabs({
    tabSelector: '#nav a',
    swich: function (active) {
        if (active == '#home') {
            toggleLeftMenu(false);
            mainFrame.attr('src', 'home.html');
        }
        else {
            toggleLeftMenu(true);
            var lastLink = utils.cookie('ad_' + active.substring(1));

            if (lastLink) {
                var a = $(active).find('a[href="' + lastLink + '"]');
                var dt = a.closest('dd').prev();
                if (!dt.next().is(':visible'))
                    dt.trigger('click');
                if (mainFrame.attr('src') != lastLink) mainFrame.attr('src', lastLink);
            } else if ($(active).find('dd:visible').length == 0) {
                var dt = $(active).find('dt:first');
                if (!dt.next().is(':visible'))
                    dt.trigger('click');
            }
        }
    }
});
$('#left').on('click', 'a', function () {
    utils.cookie('ad_' + $('#nav a.on').attr('href').substring(1), $(this).attr('href'), { path: '/' });
});

//修改密码
$('#btnModifyPassword').click(function () {
    $.jPopupEdit('修改密码', 'modifypassword.html', 538, 328);
});

//欢迎
var welcome = function () {
    var fn = function () {
        var h = (new Date()).getHours();
        if (h <= 5) return '凌晨好';
        if (h <= 9) return '早上好';
        if (h <= 11) return '上午好';
        if (h <= 13) return '中午好';
        if (h <= 18) return '下午好';
        return '晚上好';
    };
    $('#welcome').text(fn());
};
welcome();
setInterval(welcome, 60 * 1000);

$(document.body).attr('unselectable', 'on')
    .attr('onselectstart', 'return false;')
    .css('-moz-user-select', 'none');
