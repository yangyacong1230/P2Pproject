package com.qianfeng.p2p.content.test;

import java.io.File;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;

import freemarker.template.Configuration;
import freemarker.template.Template;

public class TestFreemarker {

	@Test
	public void test1() throws Exception {
		Configuration configuration =new Configuration(Configuration.getVersion());//创建配置对象
		configuration.setDirectoryForTemplateLoading(new File("D:\\eclipseWorkspace\\javaee1708\\p2pcontentparent\\p2pcontentweb\\src\\test\\java\\com\\qianfeng\\p2p\\content\\test"));//设置模板文所在的目录
		configuration.setDefaultEncoding("UTF-8");
		Template template = configuration.getTemplate("hellomoto.ftl");//设置加载哪个具体的模板,因为模板比较多
		Map<String, Object> map=new HashMap<>();//创建数据源
		map.put("hello", "我不是小黄人");
		Classes classes=new Classes();
		classes.setId(11);
		classes.setAddress("中国山东省北京市海淀区");
		classes.setName("关爱老年人身体健康班");
		map.put("classes", classes);
		List<Classes> list=new ArrayList<>();
		list.add(new Classes(1, "haiyan", "西三旗桥洞"));
		list.add(new Classes(2, "tingting", "鼓楼大街"));
		list.add(new Classes(3, "第一", "东四十条南10公里河边"));
		map.put("classList", list);
		map.put("date", new Date());
		map.put("val", "其实我是空的");
		map.put("val1", "我喂自己袋盐");
		FileWriter fileWriter=new FileWriter(new File("D:\\nginx-1.8.0\\html\\1.html"));//创建目标文件
		template.process(map, fileWriter);
		fileWriter.close();
	}
}
