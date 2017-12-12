<%@ Control Language="C#" CodeBehind="BidLog.ascx.cs" Inherits="WAP2P.Web.PC.Admin.BorrowLoan.Controls.BidLog" %>
<table class="m-list" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <th width="10%">编号</th>
        <th width="25%">投标用户</th>
        <th width="25%">投标金额</th>
        <th width="20%">投标方式</th>
        <th width="20%">投标时间</th>    
    </tr>
    <ruson:Repater runat="server" ID="rptList" ItemType="WAP2P.BorrowLoan.Bid">
        <ItemTemplate>
            <tr>
                <td><%# Item.Id %></td>
                <td><%# ((WAP2P.Web.Admin.AdminPage)Page).GetUserDisplay(Item.UserId, Item.UserName) %></td>
                <td><%# Item.Amount.ToMoneyString() %>元<%# Item.RewardMoney > 0 ? string.Format("(红包{0})", Item.RewardMoney.ToMoneyString()) : string.Empty %></td>
                <td><%# Item.AutoBidId.HasValue ? string.Format("自动({0})", Item.AutoBidIndex) : "手动" %></td>
                <td><%# Item.CreateAt.ToDateTimeString() %></td>
            </tr>
        </ItemTemplate>
        <EmptyTemplate>
            <tr>
                <td colspan="5" class="g-fleft">暂无数据。</td>
            </tr>
        </EmptyTemplate>
    </ruson:Repater>
</table>