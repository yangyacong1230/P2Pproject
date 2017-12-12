<%@ Control Language="C#" CodeBehind="HoldLog.ascx.cs" Inherits="WAP2P.Web.PC.Admin.BorrowLoan.Controls.HoldLog" %>
<table class="m-list" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <th width="10%">用户</th>
        <th width="5%">投标Id</th>
        <th width="18%">持有本金</th>
        <th width="17%">已还本金</th>
        <th width="15%">应还利息</th>
        <th width="15%">已收利息</th>
        <th width="20%">状态</th>
    </tr>
    <ruson:Repater runat="server" ID="rptList">
        <ItemTemplate>
            <tr>
                <td><%# ((WAP2P.Web.Admin.AdminPage)Page).GetUserDisplay((long)Eval("UserId"), (string)Eval("UserName")) %></td>
                <td><%# Eval("BidId") %></td>
                <td><%# ((decimal)Eval("ShouldRepayPrincipal")).ToMoneyString() %></td>
                <td><%# ((decimal)Eval("ActuaRepayPrincipal")).ToMoneyString() %></td>
                <td><%# ((decimal)Eval("ShouldRepayInterest")).ToMoneyString() %></td>
                <td><%# ((decimal)Eval("ActuaRepayInterest")).ToMoneyString() %></td>
                <td class="g-fleft"><%# Eval("Period") %></td>
            </tr>
        </ItemTemplate>
        <EmptyTemplate>
            <tr>
                <td colspan="7" class="g-fleft">暂无数据。</td>
            </tr>
        </EmptyTemplate>
    </ruson:Repater>
</table>