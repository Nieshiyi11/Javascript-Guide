//============================================================【高阶函数Higher-Order-Function基础】===================================================================
//Q:什么是HOF？
//A:接收函数作参数或返回函数的函数（高阶函数=把函数当"东西"来传递的函数）


//JS里函数是"一等公民"，函数就是一个值，和数字、字符串一样可以赋值、传参、返回。
//理解了"函数是值"这个前提，高阶函数就很自然了。
//1.JS：函数就是个值
const add = function(a, b) { return a + b; };
//2.赋值给变量 ✅
const myFunc = add;
//3.放进数组 ✅
const arr = [add, function(x) { return x * 2; }];
//4.当参数传 ✅
console.log(myFunc(3, 4));  // 7


//满足以下条件之一的就是高阶函数HOF：
//1.接收一个函数作为参数
//2.返回一个函数作为结果
//for example:
//##1:接收函数作为参数 【注意：传的是函数本身，所以传fn，而不是fn()】
function HOF_A(fn){
    fn();  //在内部调用传进来的函数
}
//##2:返回函数作为结果
function HOF_B() {
    return function(){/*函数内容*/};   //返回一个新函数
}
//##3:两种都有
function HOF_C(fn) {
    return function() {
        fn();
    };
}



//=====================================================【🗒️补充知识 ———— 回调函数】=====================================================
//【回调函数】: 传给高阶函数的那个函数参数 有个专门的名字叫回调函数（callback）
//for example: 这些函数的第二个参数全是回调函数！！
button.addEventListener("click", /*回调函数*/fn);
setTimeout(/*回调函数*/fn,1000);
[1,2,3].map(/*回调函数*/fn);
[1,2,3].filter(/*回调函数*/fn);
[1,2,3].forEach(/*回调函数*/fn);



//=====================================================【reduce】===================================================================
//reduce ———— for循环的缩写用法
//【语法】：数组名.reduce(处理函数,初始值)
//eg：
//先来看看for循环：
function sum1(...numbers) {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
        total = total + numbers[i];
    }
    return total;
}
sum(1, 2, 3, 4);  // 10

//同样的numbers数组，再来看看【reduce】的用法：
//【总览】：numbers.reduce((累积值,当前元素) => 新的累计值，初始值);
return numbers.reduce((acc, n) => acc + n, 0);
//初始值：从0开始
// 第1轮: acc=0,  n=1  → 返回 0+1 = 1   (acc变成1)
// 第2轮: acc=1,  n=2  → 返回 1+2 = 3   (acc变成3)
// 第3轮: acc=3,  n=3  → 返回 3+3 = 6   (acc变成6)
// 第4轮: acc=6,  n=4  → 返回 6+4 = 10  (acc变成10)
// 结束，返回 10
//【总结reduce用法】
//reduce(怎么合并两个值, 起点)
//它从起点开始，每次拿一个数组元素，按程序员自己给的规则合并，最终把整个数组"压缩"成一个值。
//reduce 这个词本身就是"减少/压缩"的意思，把一个数组压缩成一个结果。



//=====================================================【forEach/map/filter】===================================================================
//【总览】: 这三个方法本质上都在做同一件事：遍历数组。
//JS把 "想对arr[i]做点什么操作" 这部分抽出来变成了参数，根据"做什么"的不同，分成了三个方法：
//forEach：遍历，对每个元素做操作（不需要结果）
//map：    遍历，对每个元素做变换，收集所有新值，且返回新数组
//filter： 遍历，对每个元素做判断，留下符合条件的，且返回新数组


//##1.✅✅forEach
//就是for循环的替代写法。【✅遍历数组，对每个元素执行程序员给的函数，并且没有返回值！！】
const scores = [80,55,11,92,300];
scores.forEach(function(score,index){
    console.log("第" + index + "个：" + socre);
});
//Q：这些参数是谁传进来的？
//A: 不是程序员传的，而是forEach内部传的。
//对于上面的scores.forEach。forEach内部长这样：
function forEach(arr, callback){
    for(let i = 0; i < arr.length; i++){
        callback(arr[i], i);
        //       ↑       ↑
        //       它帮程序员传了这2个参数
    }
}
//其中callback函数，就是function(score,index)
//所以程序员定义回调函数时写的function(score, index)，里面的score和index不是人为赋值的，而是forEach在每次循环时自动传参的。

//Tip：
//可以有三个参数：scores.forEach(function(element, index, array)
//分别是：element ———— 当前元素 ; index ———— 当前序号 ; array ———— 整个原始数组


//##2. ✅✅map
//map ———— 变换每个元素，收集新数组。
//遍历数组，对每个元素执行你给的函数，把每次return的值收集起来，组成新数组返回。

//【C语言写法】：
/*
int scores[] = {80, 55, 92, 43, 78};
int curved[5];
for(int i = 0; i < 5; i++){
    curved[i] = scores[i] + 10;    //新值存到新数组
}
//那么有：curved = {90, 65, 102, 53, 88} || scores 没变！！
*/

//【JS的map写法】：
const scores = [80, 55, 11, 92, 300];
const curved = scores.map(function(score){
    return score + 10;      //return 很重要！！
});
//curved = [90, 65, 21, 102, 310]  //⚠️⚠️⚠️组成新数组返回！！
//scores没变！
//map不会修改原数组！！

//map的内部实现be like：
function map(arr, callback){
    const result = [];    //准备新数组
    for(let i = 0; i < arr.length; i++){
        const newValue = callback(arr[i], i, arr); //调用你的函数
        result.push(newValue);   //把返回值收集起来
    }
    return result;  //返回新数组
}
//map一定会有返回值！！若没有return就返回undefined，那么map就收集了i个undefined


//##3. ✅✅filter
//Step1.遍历数组：对每个元素执行程序员给的函数。
//Step2.函数返回true → 保留这个元素 ; 
//Step3.函数返回false → 丢掉。
//Step4.最终返回由所有【保留元素组成的新数组】

//【C语言写法】：
/*
筛选及格的分数(>=60)
int scores[] = {80, 55, 92, 43, 78};
int passed[5];
int count = 0;
for(int i = 0; i < 5; i++){
    if(scores[i] >= 60){   //判断条件
        passed[count] = scores[i]; //满足就留下
        count++;
    }
}
------------------------------------------------
passed = {80, 92, 78}
count = 3
*/

//【JS的filter写法】：
const scores = [80, 55, 92, 43, 78];
const passed = scores.filter(function(score) {
    return score >= 60;     // 返回true→留下,false→丢弃
});
// passed = [80, 92, 78]


//filter的内部实现：
function filter(arr, callback){
    const result = [];
    for(let i = 0; i < arr.length; i++){
        const keep = callback(arr[i], i, arr);  //调用你的函数
        if (keep) {                            //返回值是 true？
            result.push(arr[i]);              //是→留下原始元素
        }                                    //否→什么也不做，丢弃
    }
    return result;
}
//-----filter也不修改原数组-----！！



//=====================================================【总结什么时候用什么】===================================================================
/*
##1.Q：要遍历数组做操作（打印、发请求、修改外部变量）？   【遍历】
    A：forEach
    
##2.Q:我要把数组的每个元素变成另一个东西？    【变换+组合成新数组】
     A：map

##3.Q：我要从数组里挑出符合条件的元素？   【筛选+组合成新数组】
    A：filter

##4 Q：我要把整个数组压缩成一个值（求和、计数、拼接）？  【求值】
    A: reduce
*/