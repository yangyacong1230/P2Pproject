<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
	${hello}<br>
	---------------------我是一条华丽的分割线------------------------<br>
	地址是:${classes.address}<br>
	id是:${classes.id}<br>
	name是:${classes.name}<br>
	---------------------我是一条华丽的分割线,我又来了------------------------<br>
	<table border="1">
		<tr>	
			<th>ID</th>
			<th>NAME</th>
			<th>ADDRESS</th>
		</tr>
		<#list classList as classs>
		<tr>	
			<td>${classs.id}</td>
			<td>${classs.name}</td>
			<td>${classs.address}</td>
		</tr>
		
		</#list>
	
	</table>
	---------------------好吧,我又来了------------------------<br>
	<table border="1">
		<tr>	
			<th>ID</th>
			<th>NAME</th>
			<th>ADDRESS</th>
		</tr>
		<#list classList as classs>
		<#if classs_index%2==0>
			<tr bgcolor="red">	
			
			<#else>
			<tr bgcolor="blue">	
		</#if>
			
				<td>${classs.id}</td>
				<td>${classs.name}</td>
				<td>${classs.address}</td>
			</tr>
		
		</#list>
	
	</table>
	
---------------------好吧,我又来了------------------------<br>
	日期:${date?date}<br>
	日期:${date?time}<br>
	日期:${date?datetime}<br>
	日期:${date?string("yyyy/MM/dd HH:mm:ss")}<br>
	
---------------------这次连旁白都省了------------------------<br>
	我也不知道代表什么意思:${val!"我不是默认值"}<br>
	额.......:<#if val1??>
				val1油脂 ${val1};
				<#else>
				val1没有纸
			</#if>
</body>
</html>