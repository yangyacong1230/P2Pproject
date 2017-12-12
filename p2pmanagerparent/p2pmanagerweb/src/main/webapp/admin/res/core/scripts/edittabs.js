$('.edittabs dt').on('click', 'a', function () {
    var me = $(this), span = me.closest('label').find('span:first');
    var label = me.closest('label'), lables = label.closest('dt').find('label'), index = lables.index(label), dl = label.closest('dl');
    var next = lables.length > index + 2 ? index + 1 : index - 1;

    if (me.is('.edit')) {   //编辑

        $.jPopupHtml('<div style="padding:20px 30px;"><input type="text" value="' + span.text() + '" class="w300" /></div>', '修改', 380, 'auto', function (el) {
            span.text(el.find('input').val());
        });

    } else if (me.is('.remove')) {  //删除

        $.jConfirm('删除后不可恢复，您确定吗？', function () {
            label.remove();
            var dds = dl.find('dd');
            dds.get(index).remove();

            if (label.is('.on') && next >= 0) {
                $(lables.get(next)).addClass('on');
                $(dds.get(next)).addClass('on');
            }
        });
    } else if (me.is('.moveleft')) {    //左移

        var label = $(this).closest('label'), index = label.closest('dt').find('label').index(label), dl = label.closest('dl');
        if (index > 1) {
            label.prev().before(label);
            var dd = $(dl.find('dd').get(index));
            dd.prev().before(dd);
        }

    } else if (me.is('.moveright')) {   //右移

        var label = $(this).closest('label'), labels = label.closest('dt').find('label'), index = labels.index(label), dl = label.closest('dl');
        if (index != 0 && index + 2 < labels.length) {
            label.next().after(label);
            var dd = $(dl.find('dd').get(index));
            dd.next().after(dd);
        }

    }

    return false;

}).on('click', 'label', function () {
    
    var me = $(this);

    if (me.is('.add')) {
        var template = me.attr('data-template');    //dd html的模板

        if (template) {

            $.jPopupHtml('<div style="padding:20px 30px;"><input type="text" value="" class="w300" /></div>', '新增', 380, 'auto', function (el) {
                var val = $.trim(el.find('input').val());
                if (val) {
                    var newLable = $('<label><a href="javascript:void(0)" class="iconfont edit">&#xe642;</a><a href="javascript:void(0)" class="iconfont moveleft">&#xe675;</a><span>' + val + '</span><a href="javascript:void(0)" class="iconfont moveright">&#xe676;</a><a href="javascript:void(0)" class="iconfont remove">&#xe634;</a></label>');
                    me.before(newLable)
                    me.closest('dl').append('<dd>' + document.getElementById(template).innerHTML + '</dd>');
                    newLable.trigger('click');
                }
            });
        }

    } else {
        var labels = me.closest('dt').find('label');
        var dds = me.closest('dl').find('dd');
        var index = labels.index(this);

        labels.filter('.on').removeClass('on');
        dds.filter('.on').removeClass('on');
        me.addClass('on');
        $(dds.get(index)).addClass('on');
        return false;
    }

});