/*==================================================== textContent VS innerHTML ====================================================*/
const title = document.querySelector("h1");
//1.
// textContent：纯文本
// textContent: 如果写了HTML标签进去，它会原样显示，不会被解析
title.textContent = "新标题";
title.textContent = "<strong>新标题加粗</strong>";// 页面上显示: <strong>加粗</strong> 此时标签当成普通文字了！！

//2.
// innerHTML：可以包含HTML标签（注意安全风险）
title.innerHTML = "<strong>新标题加粗</strong>";
// 页面上显示: 新标题加粗（文本真的变粗了，因为浏览器解析了HTML标签）
title.innerHTML = ""; //表示清空元素，一般用于渲染防止重复渲染 + 清空输入框


/*==================================================== textContent VS innerText ====================================================*/
/*
HTML:
<div id="box">
    <p>可见文字</p>
    <p style="display:none">隐藏文字</p>
</div>
*/
const box = document.querySelector("#box");
console.log(box.textContent);  // "可见文字 隐藏文字" ← 全都拿到
console.log(box.innerText);    // "可见文字"         ← 只拿可见的
// textContent不管元素是否隐藏，全部返回
// innerText只返回页面上看得到的文字


/*====================================================== 修改样式 ======================================================*/
const box = document.querySelector(".box");
// 方式1：直接改style属性【行内样式】
box.style.backgroundColor = "red";    // 修改CSS的background-color为红色
box.style.fontSize = "20px";
box.style.border = "2px solid blue";
box.style.marginTop = "10px"; 
box.style.backgroundColor = "";      // 设为空字符串=清除，恢复CSS文件里的样式
// 【CSS属性名转JS的规则】如下：
// 去掉短横线- + 后面的字母大写
// background-color → backgroundColor
// font-size        → fontSize
// border-radius    → borderRadius
// z-index          → zIndex

//操作HTML元素的class（类名）
box.classList.add("active");  // 添加类 【用途】：开启某个状态
box.classList.remove("active"); // 移除类 【用途】：关闭某个状态
box.classList.toggle("active"); // 切换 【用途】：开关效果
//toggle等价于if-else语句
/*
if (box有active){
  删除
}else{
  添加
}
*/

//点击按钮切换状态：
//【在Test.js里有我的小练习 ———— 下拉菜单】
const btn1 = document.querySelector("#btn");
btn1.addEventListener("click", function(){  //点击按钮一次：加active 有效果 ; 再点一次：去除active 效果消失
  box.classList.toggle("active");
});


/*====================================================== 事件Events ======================================================*/
/*
点击 ：click
鼠标移入 ：mouseover
输入 ：input
按键 ：keydown
*/

//1. 【绑定事件】
//给按钮绑定一个“点击事件”
const btn2 = document.querySelector("#btn");
btn2.addEventListener("click", function(){
  console.log("点击了");
});

//2. 【事件对象】
//event是浏览器自动传进来的参数 是浏览器生成的“事件信息对象”
btn.addEventListener("click", function(event){
  console.log(event);
});
//当你点击按钮时，浏览器内部会做：
/*
创建一个对象 = {
  点击位置,
  点击的元素,
  鼠标信息,
  时间,
  ...
}
然后把这个对象传给函数function(event){}

如果console.log(event);可能会看到：
{
  type: "click",
  target: button,
  clientX: 123,
  clientY: 456,
  ...
}
这就是“事件对象”
*/

/*
event有几个重要的属性：
event.target / event.type / 鼠标位置 / ...
事件委托（必须用target）
表单处理
拖拽
游戏输入（键盘/鼠标）
*/