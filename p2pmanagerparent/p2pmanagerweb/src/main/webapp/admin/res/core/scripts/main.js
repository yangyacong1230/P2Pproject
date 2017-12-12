/// <reference path="jquery.js" />
//config
var config = {
    dialogModal: true,
    serviceQQ: 2630538943,
    serviceQQUrl: "http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=2630538943"
};

//免费限制
function freeLimit(tip, func, operate) {
    $.jError(tip, '提示信息', 240, function () {
        
    });
}

//改变m-list的宽度
function changeListWidth() {
    var my = $('.m-list'),
        myParent = my.parents('.m-content'),
        searchWidth = $('.m-criteria').outerWidth(),
        windowWidth = $(window).outerWidth(),
        myWidth = my.outerWidth() + 20,
        temp = searchWidth >= myWidth ? searchWidth : myWidth,
        returnWidth = temp >= windowWidth ? temp : windowWidth-20;
    my.parents('dd').width(returnWidth);
}
$(window).resize(function () {
   changeListWidth();
});

//禁用jQuery缓存
$.ajaxSetup({
    cache: false
});

//弹出层
(function ($) {
    //弹出编辑框
    $.jPopupEdit = function (title, url, width, height) {
        
        var w = width || 0.9;
        var h = height || 0.9;

        $(document.body).dialog({
            title: title,
            modal: config.dialogModal,
            width: w,
            height: h,
            url: url,
            zIndex: 1000
        });
    };
    $.jPopupEdit.close = function (refresh) {
        $(document.body).dialog('destroy');
        if (refresh) {
            //刷新列表
            var pages = $('table.m-list .pages');
            if (pages.length) {
                var a = pages.next();
                pages.append(a);    //将a放入pages内，以响应点击事件
                a.trigger('click');
            } else {
                $('form.m-search').trigger('submit');
            }
        }
    };

    var popupDialog = function (html, title, width, btns) {
        var el = $('<div style="padding-bottom:70px;">' + html + '<div class="dialog-btns"></div></div>');

        var btnsDom = el.find('.dialog-btns');
        $.each(btns, function (i, n) {
            var btn = $('<input type="button" class="btn-base" value="' + n.text + '" />');
            if (n.cls) btn.addClass(n.cls);
            btn.click(function () {
                n.click(el);
            });
            btnsDom.append(btn);
        });

        $(document.body).dialog({
            title: title,
            modal: config.dialogModal,
            width: width || 380,
            height: 'auto',
            el: el,
            zIndex: 1000
        });
    };

    var popupTip = function (message, title, width, icon, btns) {
        popupDialog('<table style="margin:20px;"><tr><th valign="middle" style="padding-right:10px;"><span class="dialog-icon ' + icon + '"></span></th><td valign="middle">' + message + '</td></tr></table>', title, width, btns);
    };

    //弹出Html对话框
    $.jPopupHtml = function(html, title, width, height, okFn, cancelFn) {
        popupDialog(html, title, width,
            [{
                text: '&#xe69b; 确定',
                click: function (el) {
                    if (okFn) okFn(el);
                    $(document.body).dialog('destroy');
                },
                cls: 'c-priority iconfont'
            }, {
                text: '&#xe696; 取消',
                click: function (el) {
                    if (cancelFn) cancelFn(el);
                    $(document.body).dialog('destroy');
                },
                cls: 'c-normal iconfont'
            }]);
    }

    //确认框
    $.jConfirm = function (message, okFn, cancelFn, title, width) {

        popupTip(message, title || '确认提示', width, 'info',
            [{
                text: '&#xe69b; 确定',
                click: function () {
                    if (okFn) okFn();
                    $(document.body).dialog('destroy');
                },
                cls: 'c-priority iconfont'
            }, {
                text: '&#xe696; 取消',
                click: function () {
                    if (cancelFn) cancelFn();
                    $(document.body).dialog('destroy');
                },
                cls: 'c-normal iconfont'
            }]
        );
    };

    //通知框
    $.jNotice = function (message, title, width) {

        popupTip(message, title || '通知', width, 'info',
            [{
                text: '&#xe69b; 确定',
                click: function () {
                    $(document.body).dialog('destroy');
                },
                cls: 'c-priority iconfont'
            }]
        );
    };

    //错误框
    $.jError = function (message, title, width, fn) {
        popupTip(message, title || '错误', width, 'error',
            [{
                text: '&#xe62a; 确定',
                click: function () {
                    if (fn) fn();
                    $(document.body).dialog('destroy');
                },
                cls: 'c-priority iconfont'
            }], fn ? false : true
        );
    };

    //成功框
    $.jSuccess = function (message, fn, title, width ) {
        popupTip(message, title || '成功', width, 'success',
            [{
                text: '&#xe69b; 确定',
                click: function () {
                    if (fn) fn();
                    $(document.body).dialog('destroy');
                },
                cls: 'c-priority iconfont'
            }]
        );
    };

})(jQuery);

//初始化ui相关
var initUi = {
    date: function (el) {
        $('.ui-date', el || document.body).each(function (i, n) {
            n = $(n), mindate = n.attr('data-mindate'), maxdate = n.attr('data-maxdate');
            var ops = {};
            if (mindate)
                ops.minDate = mindate.charAt(0) == '#' ? mindate : new Date(mindate)
            if (maxdate)
                ops.maxDate = maxdate.charAt(0) == '#' ? maxdate : new Date(maxdate)

            if (n.is('.ui-datetime'))
                ops.format = 'yyyy-MM-dd HH:mm:ss';
            else if (n.is('.ui-dateh'))
                ops.format = 'yyyy-MM-dd HH:00:00';

            n.calendar(ops);
        });
    }
};

$(function () {
    //初始化常用控件
    //$(':submit,:button').button();
    //$('select').selectmenu();
    //$('.ui-radio').buttonset();
    //$('.ui-checkbox').buttonset();
    $('.ui-editor').css('width', '98%').each(function (i, n) { n = $(n); UE.getEditor(n.attr('id') ? n.attr('id') : n[0]); });
    $.inputlimit('.ui-int', '[0-9]');
    $.inputlimit('.ui-float', '[0-9\.-]');
    $.inputlimit('.ui-interest', '[0-9\.]');
    $.inputlimit('.ui-date', '[0-9-:\\s]');

    $('.js-slider').each(function (i, n) {
        n = $(n), isFloat = n.attr('data-slider-step').indexOf('.') != -1;
        var parseFn = function (str) {
            str = str.replace(/,/g, '');
            return isFloat ? parseFloat(str) : parseInt(str);
        };
        n.slider({
            min: parseFn(n.attr('data-slider-min')),
            max:parseFn(n.attr('data-slider-max')),
            setp:parseFn(n.attr('data-slider-step')),
            starter:parseFn(n.val())
        });
    });
    
    $(document.body).on('focus', '.ui-float', function () {
        var me = $(this);
        setTimeout(function () {
            var val = me.val();
            if (val) {
                me.val(val.indexOf(',') == -1 ? val : val.replace(/,/ig, ''));
            }
        }, 1);
    });

    $(document.body).on('blur', '.ui-float', function () {
        var me = $(this);       
            setTimeout(function () {
                var val = me.val();
                if (val) {
                    me.val(finance.toMoneyString(val));
                }
            }, 1);
    });

    initUi.date();
    //自动计算
    var autoCulation = function (obj) {
        var me = $(obj),
            val = parseFloat(me.val()),
            ret = me.next(".js-autoculation");
        if (ret.html().indexOf("%") != -1) {
            val = isNaN(val) ? "%" : "% 提示：每 100 元约产生费用 <i> " + finance.roundx(val, 2) + " </i> 元费用。"
        } else if (ret.html().indexOf("‰") != -1) {
            val = isNaN(val) ? "‰" : "‰ 提示：每 100 元约产生费用 <i> " + finance.roundx(100 * (val / 1000), 2) + " </i> 元费用。"
        } else {
            val = isNaN(val) ? "‱" : "‱ 提示：每 100 元约产生费用 <i> " + finance.roundx(100 * (val / 10000), 2) + " </i> 元费用。"
        }
        me.next().html(val);
    }
    $('.js-autoculation').prev('input[type=text]').bind('keyup blur', function () {
            autoCulation(this);
    })

    //搜索
    $('#btnSwithMoreFilter').click(function () {
        var me = $(this), trs = me.closest('form').find('tr.g-hide'), inlineSubmit = me.closest('form').find('.js-inlinesubmit');
        var txt = me.text();
        if (txt.indexOf('显示更多筛选条件')>0) {
            trs.show();
            inlineSubmit.hide();
            me.html('<span>&#xe622; 隐藏更多筛选条件</span>');
        }
        else {
            trs.hide();
            inlineSubmit.show();
            me.html('<span>&#xe661; 显示更多筛选条件</span>');
        }
    });
    //list各行换色
    var tableAlt = function (html) {
        html = $(html);
        html.not('.pager').not('.js-sum').filter(':odd').addClass('list-alt');
        return html;
    }

    //自动刷新通知
    var autoLoadTimer = null, winIsBlur = false;
    var setAutoLoad = function () {        
        autoLoadTimer = setInterval(function () {
            if ($('.ui-dialog').length) return; //有弹出框
            $('form.m-search').trigger('submit');
        }, 10 * 1000);  //10s一次
    };
    $('.js-autoload .js-refresh').click(function () {
        if (this.checked) {
            var tip = $(this).attr('data-freemes') || '本功能仅供正式版使用。';
            var func = $(this).attr('data-function');
            var operate = $(this).attr('data-operate');

            freeLimit(tip, func, operate);
        }
        
    });
    $(window).blur(function () {
        winIsBlur = true;
    }).focus(function () {
        winIsBlur = false;
    });

    //改变焦点单元格
    var tdAlt = function () {
        var td = $('table.m-list td'),
            changetd = function (_this,bol) {
                var me = _this,
                    index = me.parents().find(me).index();
                if (bol) {
                    me.addClass('list-cellalt');
                    $('table.m-list tr').not('.pager').not('.js-sum').each(function () {
                        $(this).find('th').eq(index).addClass('list-titlealt');
                        $(this).find('td').eq(index).addClass('list-columnalt');
                    })
                } else {
                    me.removeClass('list-cellalt');
                    $('table.m-list tr').not('.pager').not('.js-sum').each(function () {
                        $(this).find('th').eq(index).removeClass('list-titlealt');
                        $(this).find('td').eq(index).removeClass('list-columnalt');
                    })
                }
            }
        td.slice(0, td.length - 1).on('mouseenter', function () {
            changetd($(this),true);           
        }).on('mouseleave', function () {
            changetd($(this));
        })
    }

    //检查排序值
    var changOrder = function () {
        var orderBtn = $('.m-content .m-oper .saveOrder');
        if (orderBtn.length < 1) {
            $('.m-list').find('.order').each(function () {
                var me = $(this);
                me.parent().html(me.val());
            })
        }
    }

    //处理分页
    var changePage = function () {
        var me = $(this);
        utils.cookie('ad_pagesize', me.val(), { path: '/' });
        var pages = me.closest('.pages');
        var a = pages.next();
        pages.append(a);    //将a放入pages内，以响应点击事件
        a.attr('href', utils.urlParam(a.attr('href'), 'Page','1'));
        a.trigger('click');
    };

    $('form.m-search').submit(function () {
        var f = $(this), content = $('.m-content .m-list'), firsttr = content.find('tr:first'), tdcount = firsttr.find('th').length;

        $.ajax({
            url: f.attr('action') || location.href,
            type: f.attr('method') || 'get',
            data: f.serialize(),
            cache: false,            
            beforeSend: function () {
                window.form.disable(f);
                firsttr.nextAll().remove();
                firsttr.after('<tr><td colspan="' + tdcount + '" class="g-fleft">数据加载中...</td></tr>');
            },
            success: function (res) {
                firsttr.nextAll().remove();
                firsttr.after(tableAlt(res));
                tdAlt();
                //检查是否需要替换掉排序值
                changOrder();
                content.find('.pages select').change(changePage);
                changeListWidth();
                content.find('script.js-run').each(function (i, n) {
                    eval(n.innerHTML);
                });

                //刷新内容提醒
                if (winIsBlur) {
                    var autoload = $('.js-autoload .js-refresh');
                    if (autoload.length && autoload[0].checked) {
                        autoload.closest('.js-autoload').find('input[data-autoload-char]').each(function (i, n) {
                            if (n.checked) {
                                n = $(n);
                                var c = n.attr('data-autoload-char');
                                if (res.indexOf(c) != -1) {
                                    clearInterval(autoLoadTimer);
                                    alert(n.attr('data-autoload-alert') || '有新的通知');
                                    setAutoLoad();
                                    winIsBlur = false;
                                    return false;
                                }
                            }
                        });
                    }
                }
            },
            complete: function () {
                window.form.enable(f);
            },
            error: function (res) {
                firsttr.nextAll().remove();
                firsttr.after('<tr><td colspan="' + tdcount + '" class="g-fleft">远程服务器错误，请稍候再试！</td></tr>');
            }
        });

        return false;
    }).on('reset', function () {
        //重置时重新加载数据
        var me = $(this);
        setTimeout(function () {
            me.trigger('submit');
        }, 10);
    });//.trigger('submit');   //第一次进来加载

    //分页处理
    $('table.m-list').on('click', '.pages a', function () {
        var firsttr = $(this).closest('table').find('tr:first');
        $.ajax({
            url: $(this).attr('href'),
            cache: false,
            success: function (res) {
                var nextall = firsttr.nextAll();
                firsttr.after(tableAlt(res));
                nextall.remove();
                ui.scroll(firsttr);
                changeListWidth();
                $('.m-content .m-list .pages select').change(changePage);
                $('.m-content .m-list script.js-run').each(function (i, n) {
                    eval(n.innerHTML);
                });
                tdAlt();
                //检查是否需要替换掉排序值
                changOrder();
            },
            error: function (res) {
                $.jError('远程服务器错误，请稍候再试！');
            }
        });
        return false;
    });

    //全选,反选,新建,批量删除,排序
    var operInputs = $('.m-content .m-oper input');
    operInputs.filter('.selall').click(function () {
        $(".m-content table.m-list").find(':checkbox.del').each(function (i, n) {
            n.checked = true;
        });
    });
    operInputs.filter('.selreverse').click(function () {
        $(".m-content table.m-list").find(':checkbox.del').each(function (i, n) {
            n.checked = !n.checked;
        });
    });    
    operInputs.filter('.delsel').click(function () {
        var tip = $(this).attr('data-freemes') || '本功能仅供正式版使用。';
        var func = $(this).attr('data-function');
        var operate = $(this).attr('data-operate');

        freeLimit(tip, func, operate);
    });

    //导出Excel
    operInputs.filter('.excel').click(function () {
        var tip = $(this).attr('data-freemes') || '本功能仅供正式版使用。';
        var func = $(this).attr('data-function');
        var operate = $(this).attr('data-operate');

        freeLimit(tip, func, operate);
    });

    //排序
    operInputs.filter('.saveOrder').click(function () {
        var tip = $(this).attr('data-freemes') || '本功能仅供正式版使用。';
        var func = $(this).attr('data-function');
        var operate = $(this).attr('data-operate');

        freeLimit(tip, func, operate);
    });

    //其它操作项
    operInputs.filter('[data-action]').click(function () {
        var idValues = [], action = $(this).attr('data-action');

        var tip = $(this).attr('data-freemes') || '本功能仅供正式版使用。';
        var func = $(this).attr('data-function');
        var operate = $(this).attr('data-operate');

        freeLimit(tip, func, operate);
    });

    //删除
    $(".m-content .m-list").on('click', 'a.del', function () {
        var me = $(this), tb = me.closest('table.m-list');
        var tip = me.attr('data-deltip') || '确认删除？';
        $.jConfirm(tip, function () {
            var action = me.attr("href");
            var id = utils.urlParam(action, 'ID');
            $.ajax({
                url: action,
                dataType: 'json',
                cache: false,
                success: function (res) {
                    if (res.Success) {
                        $('#tr' + id).remove();
                        var pages = tb.find('.pages');
                        var pageCount = pages.find('.remind strong');
                        if (parseInt(pageCount.text()) > 0)
                            pageCount.text(parseInt(pageCount.text()) - 1);

                        //删除到没有时，跳回第一页
                        if ($('.m-content table.m-list').find('tr').length <= 2) {
                            var a = pages.next();
                            pages.append(a);    //将a放入pages内，以响应点击事件
                            a.attr('href', utils.urlParam(a.attr('href'), 'Page', '1'));
                            a.trigger('click');
                        }
                    }
                    else
                        $.jError(res.Message);
                }
            });
        });

        return false;
    });

    window.form.fixPlaceholder();

    //编辑提交
    $('form.auto').submit(function () {
        var me = $(this);

        //错误提示框体
        if (window.form.valid(this, function (msg, n) {            
            n = $(n);
            if (n.is(':checkbox') || n.is(':radio')) {  //修正多checkbox及radio
                if (n.parent().is('label')) {            
                    var ctr = null;
                    if (n.is(':checkbox'))
                        ctr = n.closest('.ui-checkbox');
                    else
                        ctr = n.closest('.ui-radio');                    
                    if (ctr && ctr.length) {                        
                        ctr.find('input:not(:last)').blur(function () {                
                            ctr.find('input:last').trigger('blur');
                        });
                    }

                    n = n.parent();
                }
            }
            var em = n.next('b');
            if (em.length == 0) {
                em = $('<b></b>');
                n.after(em);
            }
            em.html(msg);
        })) {
            var beforeSubmit = me.attr('beforeSubmit');
            if (beforeSubmit)
                eval(beforeSubmit);

            window.form.ajax(this, 'json', function (r) {
                if (r.Success) {
                    var onsuccess = me.attr('onsuccess');
                    if (onsuccess)
                        me.tips('success', r.Message == '' ? '操作成功' : r.Message, function () { eval(onsuccess); });
                    else
                        me.tips('success', r.Message == '' ? '操作成功' : r.Message);
                }
                else
                    me.tips('error', r.Message);
            });
        }
        return false;
    }).on('blur', ':input[data-vtype]', function () {
        var n = $(this);
        if (n.is(':checkbox') || n.is(':radio')) {
            if (n.parent().is('label'))
                n = n.parent();
        }
        n.next('b').remove();
    });

    $(':input').filter('[data-vtype]').each(function (i, n) {
        n = $(n);
        if (n.attr('data-vmust') != 'false' && n.parents('td').prev().find('i').length==0) {
            n.parents('td').prev('th').prepend('<i class="iconfont fcred-3"> &#xe6af;</i>');
        }
        
    })       

});