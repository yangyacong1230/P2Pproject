/// <reference path="jquery.js" />
//权限编辑
$('table.m-permission').on('click', ':checkbox', function () {

    var me = $(this), cked = this.checked;
    if (me.is('.module')) {
        me.closest('tr').nextUntil('tr.split').find(':checkbox').each(function (i, n) {
            if (!$(n).is(':disabled'))
                n.checked = cked;
            changeCheckbox(n, cked);
        });
    } else if (me.is('.fun')) {
        me.closest('dl').find(':checkbox').each(function (i, n) {
            if (!$(n).is(':disabled'))
                n.checked = cked;
            changeCheckbox(n, cked);
        });
    }
    changeCheckbox(this, cked);
});

function changeCheckbox(n,bol) {
    if (bol) {
        $(n).parent().addClass('fcred-3');
    } else {
        $(n).parent().removeClass('fcred-3');
    }
}
//初始化
function initPermissionParentStatus() {
    $('table.m-permission :checkbox.fun').each(function (i, n) {
        var ctr = $(n).closest('dt').next();
        if (ctr.find(':checked').length && (ctr.find(':checked').length == ctr.find(':checkbox').length))
            n.checked = true;
        //else
        //    n.checked = false;
    });
    $('table.m-permission :checkbox.module').each(function (i, n) {
        var ctr = $(n).closest('tr').nextUntil('tr.split');
        if (ctr.find(':checked.fun').length && (ctr.find(':checked.fun').length == ctr.find(':checkbox.fun').length))
            n.checked = true;
        else
            n.checked = false;
    });
    $('table.m-permission :checkbox').each(function (i, n) {
        changeCheckbox(n, n.checked);
    })
}