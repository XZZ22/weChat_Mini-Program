# weChat_Mini-Program

##day01

###一、基础

######1、是什么？

	是什么？
		一种不需要安装就可以使用的APP，实际上是需要安装的，但是太小了，用户可能感受不到

	上线？
		2017年1月9日0点，万众瞩目的微信第一批小程序正式低调上线。

######2、微信开发工具？

下载地址：
[https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=2018315](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=2018315)

######3、小程序特点？

	（1）没有DOM对象，一切基于组件化

		注意：
			组件化：具有特点功能的代码集合 --- 特定功能：js，html，css

			模块化：将一个大的js文件按照一定的功能拆分成多个小的js文件，每一个小的js文件就是一个模块，由这个多个小的js文件构建的项目，就具有模块化的特性。

	（2）重点学习：
			a.理解事件机制
			b.理解组件化
			c.理解数据绑定
			d.Flex布局
			e.移动端适配方案

###二、重点

1、flex布局

	display:flex
	flex-direction:column

	注意：flex-direction:

		row（默认值）：主轴为水平方向，起点在左端。
		row-reverse：主轴为水平方向，起点在右端。
		column：主轴为垂直方向，起点在上沿。
		column-reverse：主轴为垂直方向，起点在下沿。

学习地址：[http://www.runoob.com/w3cnote/flex-grammar.html](http://www.runoob.com/w3cnote/flex-grammar.html)

2、移动端适配：小程序适配方案

 Iphon6： 1rpx = 1物理像素 = 0.5px

 微信官方提供的换算方式：
	1.以iPhone6的物理像素个数为标准: 750;
	2.1rpx = 目标设备宽度 / 750 * px;
	3.注意此时底层已经做了viewport适配的处理，即实现了理想视口
	
** meta标签详解：**

	<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>

	作用：
	在移动浏览器中，当页面宽度超出设备，浏览器内部虚拟的一个页面容器，将页面容器缩放到设备那么大展示；

	视口的宽度可以通过meta标签设置；

	此属性为移动端页面视口设置；

	width：视口的宽度，width=device-width：宽度是设备的宽度
	initial-scale：初始化缩放，- initial-scale=1.0：不缩放
	user-scalable：是否允许用户自行缩放，取值0或1，yes或no
	minimum-scale：最小缩放
	maximum-scale：最大缩放

	一般设置了不允许缩放，就没必要设置最大最小缩放了。

###三、小程序开发

1、获取用户授权信息

	（1）获取用户信息，加载时候就要获取，所以在onLoad中执行。
	（2）使用wx.getUserInfo获取用户信息
	（3）弹框的获取，用bindgetuserinfo
	（4）弹框出现后，一个是授权，一个是取消，授权和取消的时候，最大的差别是data.detail中是否有rawData属性（当然别的没有的属性也可以）
	（5）如果获取成功了，更新data数据中的值


**index.wxml**

		<view>
		    <image wx:if="{{!isShow}}" src='{{userInfo.avatarUrl}}'></image>
		    <button wx:else class='infoButton' open-type='getUserInfo' bindgetuserinfo='getUserInfo'>点击获取用户信息</button>
		</view>

**pages/index/index.js**

	Page({
	
	  /**
	   * 页面的初始数据
	   */
	  data: {
	    msg:'晴天啊',
	    isShow:true,
	    userInfo:{}
	  },
	  bindParent(){
	    console.log('bindParent')
	  },
	  bindChild(){
	    console.log('bindChild')
	  },
	
	  /**
	   * 生命周期函数--监听页面加载
	   */
	  onLoad: function (options) {
	   this.setData({
	     msg:"彩虹"
	   })
	   this.getInfo()
	  },
	  getUserInfo(data){
	    console.log(data)
	    if (data.detail.rawData){
	      this.setData({
	        isShow:false
	      })
	      this.getInfo()
	    }
	  },
	  getInfo(){
	    wx.getUserInfo({
	      success:(data)=>{
	        this.setData({
	          userInfo: data.userInfo
	        })
	      },
	      fail:()=>{
	        console.log("获取用户信息失败")
	      }
	    })
	  }
	}

2、轮播图实现轮播

组件 swiper

3、template 模板，在任何地方都可以调用

定义：
	`<template name='list-template'> </template>`

使用：

	<template is="list-template" data="{{...item}}"/>

	引入样式：@import "../list-template/list-template.wxss";

	引入模板：<import src="../list-template/list-template.wxml"/>
	
	遍历多个文档节点：
	<block wx:for="{{datas}}" wx:key="{{index}}">
	    <template is="list-template" data="{{...item}}"/>
	</block>

4、详情页的实现
 重点：路由的跳转
（1）通过事件bindtap='toDetail' data-index='{{index}} ，拿到当前的下标

（2）通过传参，利用options拿到detail页面中的index，更新到数据中
	wx.navigateTo({
	      url:'/pages/detail/detail?index='+index 
	    })
（3）保存渲染数据

