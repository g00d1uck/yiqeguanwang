﻿// JavaScript Document
// JavaScript Document
var Hongru={}; 
function H$(id){return document.getElementById(id)} 
function H$$(c,p){return p.getElementsByTagName(c)} 
Hongru.fader = function(){ 
function init(anthor,options){this.anchor=anthor; this.init(options);} 
	init.prototype = { 
	init:function(options){  
	var wp = H$(options.id), 
	ul = H$$('ul',wp)[0],  
	li = this.li = H$$('li',ul); 
	this.a = options.auto?options.auto:2; 
	this.index = options.position?options.position:0;  
	this.curC = options.curNavClass?options.curNavClass:'fader-cur-nav'; 
	this.l = li.length; 
	this.cur = this.z = 0; //当前显示的图片序号&&z-index变量 
	nav_wp = document.createElement('div'); //先建一个div作为控制器父标签，你也可以用<ul>或<ol>来做，语义可能会更好，这里我就不改了 
	nav_wp.style.cssText = 'position:absolute; margin-left:-450px;bottom:8px; width:1000px; left:50%; height:6px;'; //为它设置样式 
	/* ==加入淡入淡出功能 ==*/ 
	for(var i=0;i<this.l;i++){ 
	this.li[i].o = 100; //为每一个图片都设置一个透明度变化量 
	this.li[i].style.opacity = this.li[i].o/100; //非IE用opacity即可 
	this.li[i].style.filter = 'alpha(opacity='+this.li[i].o+')'; //IE用滤镜 
	/* == 绘制控制器 == */ 
	var nav = document.createElement('a'); //这里我就直接用a标签来做控制器，考虑语义的话你也可以用li 
	nav.className = options.navClass?options.navClass:'fader-nav'; //控制器class，默认为'fader-nav' 
	nav.onclick = new Function(this.anchor+'.pos('+i+')'); //绑定onclick事件，直接调用之前写好的pos()函数 
	nav_wp.appendChild(nav); 
	} 
	wp.appendChild(nav_wp); //控制器append到页面 
	this.pos(this.index); //变换函数 
	}, 
auto:function(){ 
this.li.a = setInterval(new Function(this.anchor+'.move(1)'),this.a*1000); 
}, 
move:function(i){//参数i有两种选择，1和-1,1代表运行到下一张，-1代表运行到上一张 
var n = this.cur+i; 
var m = i==1?n==this.l?0:n:n<0?this.l-1:n; //下一张或上一张的序号（注意三元选择符的运用） 
this.pos(m); //变换到上一张或下一张 
}, 
pos:function(i){ 
clearInterval(this.li.a); //清除自动变换计时器 
clearInterval(this.li[i].f); //清除淡入淡出效果计时器 
this.z++; 
this.li[i].style.zIndex = this.z; //每次让下一张图片z-index加一 
nav_wp.style.zIndex = this.z+1; 
this.cur = i; //绑定当前显示图片的正确序号 
this.li.a = false; //做一个标记，下面要用到，表示清除计时器已经完成 
//this.auto(); //自动运行 
if(this.li[i].o>=100){ //在图片淡入之前先把图片透明度置为透明 
this.li[i].o = 0; 
this.li[i].style.opacity = 0; 
this.li[i].style.filter = 'alpha(opacity=0)'; 
} 
for(var x=0;x<this.l;x++){ 
nav_wp.getElementsByTagName('a')[x].className = x==i?this.curC:'fader-nav'; //绑定当前控制器样式 
} 
this.li[i].f = setInterval(new Function(this.anchor+'.fade('+i+')'),20); 
}, 
fade:function(i){ 
if(this.li[i].o>=100){ 
clearInterval(this.li[i].f); //如果透明度变化完毕，清除计时器 
if(!this.li.a){ //确保所有计时器都清除掉之后再开始自动运行。要不然会导致有控制器时点击过快的话，计时器没来得及清除就开始下一次变化，功能就乱了 
this.auto(); 
} 
} 
else{ 
this.li[i].o+=5; 
this.li[i].style.opacity = this.li[i].o/100; 
this.li[i].style.filter = 'alpha(opacity='+this.li[i].o+')'; 
} 
} 
} 
return {init:init} 
}();