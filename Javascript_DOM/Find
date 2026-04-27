// 1. 通过 ID（返回单个元素）
const title = document.getElementById("main-title");  // 只能按ID找

// 2. 通过类名（返回集合）
const items = document.getElementsByClassName("item");  // 只能按类名找

// 3. 通过标签名（返回集合）
const paragraphs = document.getElementsByTagName("p");  // 只能按标签名找

// 4. CSS选择器 - 第一个匹配的（最常用！）
const box = document.querySelector(".box");
const firstP = document.querySelector("div.box > p");

// 5.  CSS选择器 - 所有匹配的（最常用！）
const allP = document.querySelectorAll(".box p");

// 和 CSS 写法完全一样
document.querySelector("#nav");              // ID选择器
document.querySelector(".card:first-child"); // 伪类
document.querySelector("ul > li.active");    // 子代+类 （找到ul的直接子元素中，类名为active的li，>表示不找孙子）
document.querySelectorAll("input[type='text']"); // 属性选择器

// 有>：只找直接子元素
document.querySelector("ul > li.active");// 只找到第1个"直接子元素"（只返回【第一个】匹配的）
// 没有 >：找所有后代（子、孙、曾孙...）
document.querySelector("ul li.active"); // 找到第1个匹配的，可能是直接子元素，也可能是更深层的
// > 就是"亲儿子"，不写就是"所有后代"。和在CSS里用的规则完全一样。



//Q：如果有多个亲儿子，那就是所有亲儿子都找吗？还是只要第一个亲儿子？
//A：分两种写法情况：
//1. querySelector：只找第一个
document.querySelector("ul > li.active");
//2. querySelectorAll：找所有
document.querySelectorAll("ul > li.active");
/*Eg:HTML文件be like:
<ul>
    <li class="active">苹果</li>
    <li class="active">香蕉</li>
    <li>橘子</li>
    <li class="active">西瓜</li>
</ul>
*/
//1. querySelector → 只返回第一个匹配的
const first = document.querySelector("ul > li.active");
console.log(first.textContent);  // "苹果"
//2. querySelectorAll → 返回所有匹配的
const all = document.querySelectorAll("ul > li.active");
console.log(all.length);  // 3
console.log(all[0].textContent);  // "苹果"
console.log(all[1].textContent);  // "香蕉"
console.log(all[2].textContent);  // "西瓜"



/*
【假设有这样一个HTML文件】：
<div class="card">
    <h3 class="title">第一张卡</h3>
    <p>内容</p>
</div>
<div class="card">
    <h3 class="title">第二张卡</h3>
    <p>内容</p>
</div>
【如果想要找到第二章卡片里的标题】
*/
//【法一】：做不到一步找到，需要好几步：
const cards = document.getElementsByClassName("card");  // 先找所有card
const secondCard = cards[1];                            // 取第二个
const titles = secondCard.getElementsByClassName("title"); // 再找里面的title
const target = titles[0];                               // 取第一个
//【法二】用querySelector一行搞定：
//querySelector和querySelectorAll支持完整的CSS选择器语法
const target = document.querySelector(".card:nth-child(2) .title");


//querySelectorAll返回的NodeList和数组很像，但不是数组!!它有forEach，但没有map和filter
// querySelectorAll：返回所有匹配的（NodeList集合）
const all = document.querySelectorAll("p");
console.log(all);        // NodeList[p, p]
console.log(all.length); // 2
console.log(all[0]);     // <p>段落1</p>
console.log(all[1]);     // <p>段落2</p>
// NodeList可以用forEach遍历
all.forEach(function(p){
    console.log(p.textContent);
});
//【复习forEach以及函数基础】
// 只用一次 → 匿名函数
// function(p)确实没有赋值给变量，也没有名字。但它被传给了forEach的参数，forEach内部接住了它。
all.forEach(function(p){
    console.log(p.textContent);
});
// 要在多个地方复用 → 有名字的函数
function printText(p){
    console.log(p.textContent);
}
all.forEach(printText);
otherList.forEach(printText);   // 别的地方也能用


//如果想用数组方法就：
const arr = Array.from(document.querySelectorAll("p"));
//或者：
const arr = [...document.querySelectorAll("p")];
//现在可以用map和filter了！！