//=========================================================【定义函数的3种常见方式】========================================================
//##1.Function Declaration
function add(a,b){
    return a+b;
}
//Claude's:
//Analogy C Ordinary Function Definition.The BIGGEST featrue is hoisting:
//You CAN call it BEFORE the Declaration because the JS engine will "lift" the declaration to the top of the scope.


//##2.Function Expression
const add1=function(a,b){
    return a+b;
};
//Claude's:
//Assign an anonymous function(匿名函数) to a variable. Here the function is a "value" - a concept that is not found in C. 
// Functions in C cannot assign values to variables, but functions in JS are first-class citizens.
// And can be passed around like numbers and strings.
// HOWEVER: Without promotion, it must be defined before being called.


//##3.Arrow Function【省去function，只留下参数】
//01-way
const add2 = (a,b) => a+b;  //注意：箭头函数单表达式没有花括号{}时，就不能写 return ！！
const add3 = (a,b) => {return a+b;};
//02-way
const add4 = (a,b) => {
    let result = a + b;
    return result;
};


//=========================================================【函数的参数机制】==================================================================
//##1.Default Parameter（默认参数）
function greet(name="World"){
    return `Hello ${name}!`;
}
greet();  //"Hello,World!"
greet("Eleven");  //"Hello,Eleven!"


//##2.Rest Parameter (剩余参数)
//【总览】：使用 ... 语法，可以将不定数量的实参收集到一个真正的数组中。
//eg1：
function sum(...numbers){
    console.log(numbers);
}
sum(1, 2, 3);   //numbers = [1, 2, 3]
sum(10, 20);   //numbers = [10, 20]
sum(5);       //numbers = [5]
sum();       //numbers = []
//综上：不管你传几个参数，numbers都是一个【数组】。
//和C语言对比一下：
//C里必须提前决定参数个数，比如：int sum(int a, int b, int c)
//JS的 ... 让程序员压根不用管能传几个参数，它全部收进一个数组里，然后自己处理。非常安全^_^

//eg2:
function sum1(...numbers){
    let total = 0;     //JS里变量只有const（常变量）、let（最常用）、var（很少用，除非声明全局变量）三种类型！！
    for (let i = 0; i < numbers.length; i++) {
        total = total + numbers[i];
    }
    return total;
}
sum(1, 2, 3, 4);  // 10

//【重要】...rest可以和普通参数混合使用，但是，...rest必须放在【最后】！！
//eg:班级点名系统
//greeting 拿走第1个参数，比如是"同学们好")
//...names 把剩下的全部收进数组，比如是[]
function introduce(greeting, ...names){
    console.log(greeting);
    console.log("今天到场 " + names.length + " 人：");
    for (let i = 0; i < names.length; i++) {
        console.log("  " + (i + 1) + ". " + names[i]);
    }
    console.log("---");
}
//##调用1：传4个参数
//greeting = "同学们好", names = ["Eleven", "十一", "Nieshiyi"]
introduce("同学们好", "Eleven", "十一", "Nieshiyi");
//##调用2：传2个参数
//greeting = "欢迎", names = ["Eleven"]
introduce("欢迎", "Eleven");
//##调用3：只传1个参数
//greeting = "你好", names = []，空数组，没有剩余的了。
introduce("你好");


//=================================================================【返回值】===========================================================================
//JS函数永远有返回值。
//如果没写return,则会返回 undefined。这和C的return不同。
//C的void函数真的不返回值，但JS只是返回undefined
//【JS函数可以返回任何东西: 数字/字符串/对象(Object)/数组/甚至另一个函数】
//【EXP】在前面的【函数定义方式】知识点里，直到函数可以用“函数表达式定义”，JS 里函数也是一种"值"，所以函数可以返回函数！！
function multiplier(factor){
    return function(number){  //这就是在返回另一个函数！！
        return number * factor;  //【新函数里用到了外层的参数factor】
    };
}
const double = multiplier(2);
double(5); // 10
/*multiplier(2)执行以下步骤：
    factor = 2
    返回了一个函数：function(number){ return number * 2; }
  所以double现在等于：
    function(number){ return number * 2; }
  double(5), 5传给number,return 5*2
*/


//函数本身 vs 函数的返回值
//add vs add()
function add(a, b){
    return a + b;
}
console.log(add);      //打印函数本身：function add(a,b) { return a+b; }
console.log(add(1,2)); //打印函数的返回值：3
//【Really IMPROTANT!!】:
//【add】(不加括号)：函数本身（不执行），得到一个函数对象
const num1=function(a,b){ return a*b};
//【add()】(加了括号): 执行函数拿取结果，得到函数的返回值
const num2=num1(1,2)  // 2



//=================================================================【闭包】===========================================================================
//闭包=函数+它能访问的外层变量
//闭包完全指南详见：Javascript/Function-Closure.js