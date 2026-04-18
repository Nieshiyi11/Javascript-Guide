//=================================================================【闭包 完全指南】===================================================================
//要理解闭包，先回忆C语言里函数调用时内存发生了什么：
/*
int makeValue(){
    int x = 42;      //x存在栈帧上
    return x;       //返回x的值(拷贝)
}                  //函数结束,栈帧销毁,x毁灭

int main(){
    int result = makeValue();  //result = 42（拷贝出来的值）
    //x已经不存在了，没人能访问它
}
*/
//【C语言】：函数执行完 → 栈帧销毁 → 局部变量全部死亡
//【JS】：然而，JS却打破了这个规则...
//【规则的使用前提🚀】：只有外层变量还被某个活着的内部函数引用时，才不会被回收！！
//*************************************************************************************************************************************************
//闭包=函数+它能访问的外层变量
//Claude's:
//When an internal function references a variable of an external function,
//even if the external function has been executed, 
//the variable does not die and is kept in memory for the inner function to continue to use.
function outer(){
    let count = 0;       //局部变量
    function inner(){   //【内部函数引用了count】
        count++;
        console.log(count);
    }
    return inner;    //【把内部函数返回出去】
}
const fn = outer();  //outer执行完了,按C的逻辑，count应该死了，下次开始count又应该是0了，这对吗？？？
fn();  // 1  count 还活着！!
fn();  // 2  而且还记得上次的值！!
fn();  // 3
//注意这里调用的是 fn(); 哦~~~
//【很重要！！】
//那么，这也许需要和C语言在main函数里多次调用同一个函数相区分了！！
/*
【C语言】：
#include <stdio.h>
void counter(){
    int count = 0;    // 每次调用都重新创建，从0开始
    count++;
    printf("%d\n", count);
}
int main(){
    counter();  // 1
    counter();  // 1   ← 又是1！
    counter();  // 1   ← 还是1！
}
Step1：每次调用counter(),都创建一个新的栈帧,count从0开始;
Step2:函数结束,栈帧销毁,count销毁了不存在了;
Step3:下次调用,又是一个全新的count = 0,函数根本不记得上次发生了什么。
 */
//【JS闭包】：函数记住了上次的值！！



//=================================================================【其他情况】===================================================================
//##1.没有内部函数引用，正常回收
function outer(){
    let count = 0;       //局部变量
    let name = "hello";  //局部变量
    console.log(count, name); //没有返回任何函数，没有闭包
}
outer();
// 执行完毕 → count 和 name 没人用了 → 垃圾回收 → 内存释放


//##2.内部函数只引用了部分变量，只保留被引用的
function outer(){
    let count = 0;                    // 被inner引用了
    let bigData = new Array(100000);  // 没有被inner引用
    return function inner(){
        count++;                       // 只用了count
        console.log(count);
    };
}
const fn1 = outer();
// count：被inner引用→保留 ✅
// bigData：没人引用→可以回收 ✅



//=================================================================【作用域链】===================================================================
//JS的规则：向外逐层查找（作用域链）
//JS允许【函数嵌套】，并且有一条规则：当前作用域找不到的变量，就往外层作用域找，一层层往外找，直到全局。
const global = "全局变量";
function outer() {
    const outerVar = "outer的变量";
    function middle() {
        const middleVar = "middle的变量";
        function inner() {
            const innerVar = "inner的变量";
            //inner找变量的过程be like:
            console.log(innerVar);   //✅ 自己的作用域里有，直接用
            console.log(middleVar);  //✅ 自己没有 → 往外找 → middle里找到了
            console.log(outerVar);   //✅ 自己没有 → middle没有 → outer里找到了
            console.log(global);     //✅ 自己没有 → middle没有 → outer没有 → 全局找到了
        }
        inner();
    }
    middle();
}
outer();
//【⚠️WARNING!!】本规则是单向的，里面能看外面，外面看不到里面。