/*
获取用户列表数据
 */
function getAllUserByPage(currentPage,pageSize,formid) {
    var data=null;
    if ($("#"+formid)) {
        data = $("#" + formid).serialize() + "&currentPage=" + currentPage + "&pageSize=" + pageSize;
    }else{
        data="currentPage=" + currentPage + "&pageSize=" + pageSize;
    }
    $.ajax({
        url:"/member/getAllMember.action",
        data:data,
        dataType:"json",
        success:function (data) {
            if (data) {
                var tabletr="";
                for (var i =0;i<(data.rows).length;i++) {
                    var currentdata=(data.rows)[i];
                    tabletr+= '<tr id="tr"+'+(i+1)+'>' +
                    '                    <td><input type="checkbox" class="del" data-id="1"></td>' +
                    '                    <td>'+(i+1)+'</td>' +
                    '                    <td class="g-fbold g-fleft"><a href="javascript:void(0);"' +
                    '                                                   onclick="$.jPopupEdit(\'查看会员资料\', \'../common/userinfo.html?Id=1\');">'+currentdata.username+'</a>' +
                    '                    </td>' +
                    '                    <td class="">我要投资</td>' +
                    '                    <td>正常客户</td>' +
                    '                    <td>普通投资人</td>' +
                    '                    <td>'+currentdata.phonenumber+'</td>' +
                    '                    <td class="g-fleft">'+currentdata.email+'</td>' +
                    '                    <td class="g-fleft">昵称</td>' +
                    '                    <td><i class="iconfont fs22 fcjade-1"></i></td>' +
                    '                    <td>' +
                    '                        <a class="iconfont oper edit" href="javascript:void(0);"' +
                    '                           onclick="$.jPopupEdit(\'编辑会员账号\', \'userdetail.html?ID=1\');">编辑</a>' +
                    '                        <a class="iconfont del" href="userdetail.html?ID=1&amp;action=del">删除</a>' +
                    '                    </td>' +
                    '                </tr>';

                }
                //将数据添加到 table 中
                $("#userlisttableth").after(tabletr);
            }



        }

    })
}
$(function () {
    getAllUserByPage(1,30,"userlistformid");
})
