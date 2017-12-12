<%@ Control Language="C#" CodeBehind="BorrowInfo.ascx.cs" Inherits="WAP2P.Web.PC.Admin.BorrowLoan.Controls.BorrowInfo" %>
<table class="m-info" cellpadding="0" cellspacing="0" width="100%"> 
    <tr>
        <th colspan="4" class="info-listhead">借款基础信息</th>
    </tr>
    <tr>
        <th rowspan="5" width="15%">封面图片</th>
        <td rowspan="5" width="35%"><img src="<% =Borrow.GetCover() %>" alt="" /></td>
    </tr> 
    <tr>
        <th width="15%">借款标题</th>
        <td width="35%" style="color:<% =Borrow.Color %>">
            <% =Eidt ? string.Format(@"<input type=""text"" name=""name"" value=""{0}"" class=""w250"" />", Borrow.Name.HtmlEncode()) : Borrow.Name.HtmlEncode() %>
        </td>
    </tr> 
    <tr>
        <th>借款类型</th>
        <td><% =borrowType.Name %></td>
    </tr>
    <tr>
        <th>借款用户名称</th>
        <td>
            <% =Borrow.UserName %> <input type="button" class="btn-base c-normal iconfont ml10" value="&#xe655; 查看资料" id="btnViewUser" onclick="$.jPopupEdit('查看会员资料', '../common/userinfo.html?Id=<% =Borrow.UserId %>    ');" />
        </td>
    </tr>
    <tr>
       <th>借款用途</th>
       <td><% =Borrow.UseTo.HtmlEncode() %></td>
    </tr>    
    <tr>
        <th>借款金额</th>
        <td>
            <% =Borrow.LoanAmount.ToMoneyString() %>元            
        </td>
        <th>借款期限</th>
        <td>
            <% =Borrow.LoanDate %><% =Borrow.LoanDateUnit.GetDescription() %>            
        </td>
    </tr>        
    <tr>
        <th>借款利率</th>
        <td>
            <% =(WAP2P.Sys.FinanceHelper.DayRateTo(Borrow.LoanInterest.First().DayRate, BorrowType.LoanTimeUnit.Year, Borrow.InterestType, Borrow.CreateAt.Year) * 100).RoundX().ToInterestString() %> % （默认年化率）
            <asp:Repeater runat="server" ID="rptAreaInterest" ItemType="WAP2P.BorrowLoan.Borrow.LoanInterestInfo">
                <ItemTemplate>
                    <div class="pt5">投标金额 >= <%# Item.Amount.ToMoneyString() %> 元时，执行年化率 <%# (WAP2P.Sys.FinanceHelper.DayRateTo(Item.DayRate, BorrowType.LoanTimeUnit.Year, Borrow.InterestType, Borrow.CreateAt.Year) * 100).RoundX().ToInterestString() %>% </div>                    
                </ItemTemplate>
            </asp:Repeater>            
        </td>
        <th>还款方式</th>
        <td><% =RepaymentString %><% =Borrow.BidFullAutoRepay ? "，满标自动还款" : string.Empty %></td>
    </tr>
     <tr>
        <th>逾期利率</th>
        <td><% =string.Format("{0}天内为{1}‱，超过{0}天为{1}‱", Borrow.OverdueInDay, (Borrow.OverdueInRate * 10000).ToInterestString(), (Borrow.OverdueOutRate * 10000).ToInterestString()) %></td>
        <th>还款来源</th>
        <td><% =Borrow.RepaySrc %></td>
    </tr>
    <tr>
        <th>借款管理费</th>
        <td><% =Borrow.LoanFee > 0 ? "收取" : "不收" %></td>
        <th>状态</th>
        <td><% =Borrow.Status.GetDescription() %></td>
    </tr>    
    <tr>
        <th>抵押物</th>
        <td><% =string.IsNullOrEmpty(Borrow.MortgageName) ? "无" : Borrow.MortgageName %></td>                
        <th>提前还款</th>
        <td><% =Borrow.AdvanceRepay.GetDescription() %><% =Borrow.AdvanceRepay != BorrowType.AdvanceRepayEnum.NoSupport ? string.Format("<br/>还款日{0}天内属正常还款，非正常还款扣除违约金{1}%。", Borrow.AdvanceRepayOutDay, (Borrow.AdvanceRepayOutRate * 100).ToInterestString()) : string.Empty %></td>
    </tr>
    <tr>
        <th colspan="4" class="info-listhead">投资相关信息</th>
    </tr>
    <tr>
        <th>算息开始日</th>
        <td><% =Borrow.InterestStartType.GetDescription() %></td>
        <th>投标结束时间</th>
        <td>
            <% = Borrow.BidEndAt.ToDateString("未指定或长期有效") %>            
        </td>        
    </tr>
    <tr>
        <th>投标</th>
        <td>
            <% =Borrow.CanAutoBid ? string.Format("允许智能投标(最大占{0}元)", Borrow.AutoBidAmount.ToMoneyString()) : "不允许智能投标" %>
            <% =Borrow.UseRedPackage ? " ，允许使用红包" : "，不允许使用红包" %>
        </td>
        <th>投资限额</th>
        <td>
            单次至少投资金额 <% =Borrow.BidMinAmount.ToMoneyString() %> 元，最多可以投资金额 <% =Borrow.BidMaxAmount == null ? "不限制" : Borrow.BidMaxAmount.ToMoneyString() + " 元" %>
        </td>       
    </tr>
    <tr>
        <th>投资奖励</th>
        <td>
            <% =Borrow.BidRewardType.GetDescription() %>            
            <% =Borrow.BidRewardType == WAP2P.BorrowLoan.Borrow.BidReward.BidAmountRatio ? string.Format("：{0} %", Borrow.BidRewardRatio.ToInterestString()) : string.Empty %>
        </td>
        <th>续投奖励率</th>
        <td><% =(Borrow.RefillCastRate * 100).ToInterestString() %> %</td>
    </tr>
    <tr>
        <th>投标立即到账</th>
        <td><% =Borrow.BidPushAccount ? "是" : "否" %></td>
        <th>利息管理费</th>
        <td><% =Borrow.NeedInterestFee ? "收取" : "不收" %></td>
    </tr>
    <tr>
        <th>定向密码</th>
        <td><% =string.IsNullOrWhiteSpace(Borrow.PasswordCode) ? "无" : "有" %></td>
        <th>信息公开情况</th>
        <td>
            <% =((Borrow.OpenMyInfo ? "基本资料，" : string.Empty) + 
                (Borrow.OpenMyBorrowInfo ? "借款资料，" : string.Empty) +
                (Borrow.OpenMyBid ? "投资记录，" : string.Empty) +
                (Borrow.OpenMyBorrow ? "借款记录，" : string.Empty) + 
                (Borrow.OpenMyQuota ? "额度状况，" : string.Empty) +
                (Borrow.OpenMyAccount ? "资金账户，" : string.Empty)).TrimEnd('，') %>
        </td>
    </tr> 
    <tr>
        <th>保障方式</th>
        <td><% =Borrow.WebSafeType.GetDescription() %></td>
        <th>担保公司</th>
        <td><% =Borrow.VouchCompanyId.HasValue ? Borrow.VouchCompanyName : "无" %></td>        
    </tr>           
    <tr runat="server" id="mortgage" visible="false">
        <th>用于该借款的抵押物</th>
        <td colspan="3">
            <% =mortgageInfo.Name %>，总额度：<% =mortgageInfo.Quota %>，可用额度：<% =ConfigService.GetConfig<WAP2P.BorrowLoan.IBorrowQuota>().GetMortgageQuota(WAP2P.Member.User.LoadOrNew(Borrow.UserId), mortgageInfo) %>。
        </td>
    </tr>
    <asp:Repeater runat="server" ID="rptBorrowUserFilters">
        <ItemTemplate>
            <tr>
                <th><%# Eval("Item2") %></th>
                <td colspan="3"><%# ConfigService.GetConfig<WAP2P.BorrowLoan.IBorrowUserFilter>((string)Eval("Item1")).DiaplayHtml(Borrow.UserFilterInterfaces == null ? null : (Borrow.UserFilterInterfaces.FirstOrDefault(item => item.Id == (string)Eval("Item1")) ?? new ExtensionSetting()).Setting) %></td>
            </tr>
        </ItemTemplate>
    </asp:Repeater>
    <ruson:Space runat="server" id="reserve" visible="false">
        <tr>
            <th>预约编号</th>
            <td><% =Borrow.ReserveId %></td>
            <th>预约结束时间</th>
            <td><% =Borrow.ReserveBidEndAt.ToDateTimeString() %></td>
        </tr>
    </ruson:Space>    
    <tr>
        <th>补充说明</th>
        <td colspan="3"><% =Borrow.Detail %></td>
    </tr>
    <ruson:Space runat="server" id="moneyInfo" visible="false">
        <tr>
            <th colspan="4" class="info-listhead">资金信息</th>
        </tr>
        <tr>
            <th>冻结保证金</th><td><% =Borrow.Bond.ToMoneyString() %> 元</td>
            <th>应还利息总额</th><td><% = WAP2P.BorrowLoan.Repay.FindByBorrow(Borrow.Id).Sum(item => (decimal?)item.ShouldRepayInterest).ToMoneyString("0.00") %> 元</td>
        </tr>
        <tr>
            <th>已还本金</th><td><% =Borrow.RepayPrincipalCount.ToMoneyString() %> 元</td>
            <th>已还利息总额</th><td><% =Borrow.RepayInterestCount.ToMoneyString() %> 元</td>
        </tr>
        <tr>
            <th>应还费用</th><td><% =WAP2P.BorrowLoan.Repay.FindByBorrow(Borrow.Id).Sum(item => (decimal?)item.ShouldRepayFee).ToMoneyString("0.00") %> 元</td>
            <th>已还费用</th><td><% =WAP2P.BorrowLoan.Repay.FindByBorrow(Borrow.Id).Sum(item => (decimal?)item.ActuaRepayFee).ToMoneyString("0.00") %> 元</td>
        </tr>
        <tr>
            <th>已投金额</th><td><% =Borrow.BidAmountCount.ToMoneyString() %> 元</td>
            <th>投标人数</th><td><% =Borrow.BidUserCount %> 人</td>
        </tr>
    </ruson:Space>
    <tr>
        <th colspan="4" class="info-listhead">操作信息</th>
    </tr>
    <tr>
        <th>添加时间</th><td><% =Borrow.CreateAt.ToDateTimeString() %><% =Borrow.AgentAdminId.HasValue ? string.Format("，由操作员{0}代发。", Borrow.AgentAdminName) : string.Empty %></td>
        <th>结束时间</th><td><% =Borrow.EndAt.ToDateTimeString() %></td>
    </tr>
    <tr>        
        <th>初审信息</th><td><% =Borrow.PublishVerifyAdminId.HasValue ? string.Format("操作员{0}于{1}审核。", Borrow.PublishVerifyAdminName, Borrow.PublishVerifyAt.ToDateTimeString()) : string.Empty %><% =string.IsNullOrWhiteSpace(Borrow.PublishVerifyRemark) ? string.Empty : string.Format("<br/>审核备注：{0}<br/>", Borrow.PublishVerifyRemark.BrEncode()) %></td>
        <th>满标审核</th><td><% =Borrow.FullVerifyAdminId.HasValue ? string.Format("操作员{0}于{1}审核。", Borrow.FullVerifyAdminName, Borrow.FullVerifyAt.ToDateTimeString()) : string.Empty %><% =string.IsNullOrWhiteSpace(Borrow.FullVerifyRemark) ? string.Empty : string.Format("<br/>审核备注：{0}<br/>", Borrow.FullVerifyRemark.BrEncode()) %></td>
    </tr>
    <tr>
        <th>归属业务</th><td><% =userAdminMapping == null ? string.Empty : WAP2P.Sys.Admin.LoadOrNew(userAdminMapping.SaleId).Name %></td>
        <th>归属客服</th><td><% =userAdminMapping == null ? string.Empty : WAP2P.Sys.Admin.LoadOrNew(userAdminMapping.ServiceId).Name %></td>
    </tr>
</table>
