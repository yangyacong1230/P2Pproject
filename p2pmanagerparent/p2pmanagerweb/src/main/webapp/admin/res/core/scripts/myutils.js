
	/**
	 * 查看用户详细信息
	 */
	function getUserInfo(un){
		//写入内容
		$("#un").val(un);
		$.jPopupEdit("查看会员资料", "../common/userinfo.html");
	}
	/**
	 * 查看用户认证信息
	 * @param un
	 * @returns
	 */
	function getUserStatusInfo(un){
		//写入内容
		$("#un").val(un);
		$.jPopupEdit('会员认证资料查看', 'uservaliddetail.html');
	}
/**
 * 分页获取用户的认证信息
 * @param currentPage
 * @param pageSize
 * @returns
 */
function getUserStatus(currentPage,pageSize){
	$.ajax({
		url:"/usermanager/getUserstatusByPage.action",
		data:"pageSize="+pageSize+"&currentPage="+currentPage,
		dataType:"json",
		success:function(data){
			//console.info(data);
			if(data.code==1){
				//先删除原先的数据,防止页面数据越来越多
				$(".m-list [id^='tr']").remove();
				var users=data.data.data;
				for(var i =0;i<users.length;i++){
					//alert(users[i].username)
					var username=users[i].username;
					var realstatus=users[i].realstatus;
					var phonestatus=users[i].phonestatus;
					var emailstatus=users[i].emailstatus;
					var livestatus=users[i].livestatus;
					var tr='<tr id="tr'+(i+1)+'"><td class="g-fbold g-fleft"><a href="javascript:void(0);" onclick="getUserInfo(\''+username+'\')">'+username+'</a></td><td class="iconfont"><i class="fs22 "></i></td><td class="iconfont"><i class="fs22 "></i></td><td class="iconfont"><i class="fs22 "></i></td><td class="iconfont"><i class="fs22 "></i></td><td class=""><a class="iconfont oper" href="javascript:void(0);" onclick="getUserStatusInfo(\''+username+'\')"> 查看资料</a></td></tr>';
					//将tr转成jquery对象
					var $tr=$(tr);
					var is=$tr.find("i");//找到所有i
					is.each(function(i,e){//遍历i
						if(i==0){
							$(e).addClass(getStatusClass(realstatus));
							
							
						}else if(i==1){
							$(e).addClass(getStatusClass(phonestatus));
							
						}else if(i==2){
							
							$(e).addClass(getStatusClass(emailstatus));
							
						}else if(i==3){
							$(e).addClass(getStatusClass(livestatus));
							
							
						}
						
					})
					//console.info(is);
					$(".m-list .pager").before($tr);
				}
				//设置分页
				$(".pager strong").text(data.data.totalNumber);
				$("#current").text(data.data.currentPage);
				if(data.data.currentPage==data.data.nextPage){//代表是不最后一页,将最后一页设置为可用
					$("#next").removeClass("disabled");
					$("#next").unbind("click");//不然每次都叠加点击事件
					$("#next").click(function(){
						asdas(data.data.nextPage,10);
						
					})
				}else {
					$("#next").unbind("click");
					$("#next").addClass("disabled");
				}
				
				if(data.data.currentPage==data.data.lastPage){//代表是不最第一页,将第一页设置为可用
					$("#last").removeClass("disabled");
					$("#last").unbind("click");//不然每次都叠加点击事件
					$("#last").click(function(){
						asdas(data.data.lastPage,10);
						
					})
				}else{
					$("#last").unbind("click");//移除的目的是防止有人恶意将控件启用后点击,移除后就没法点击,就不知道执行了
					$("#last").addClass("disabled");
					
				}

			}else{
				alert("网络错误,请检查网络");
			}
		}
	
	})
	
	function getStatusClass(status){
		
		if(status==0){//等待提交
			return "fcgery-3";
			
		}if(status==1){//认证中
			return "fcyellow-1";
			
		}if(status==2){//成功
			return "fcjade-1";
			
		}if(status==3){//失败
			
			return "fcred-2";
		}
	}
	
	function asdas(c,p){
		getUserStatus(c,p);
		
	}
	
}