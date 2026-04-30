// DOM获取：本质是把HTML元素映射到JS变量，方便后续DOM操作
const input = document.getElementById("input");   // 输入框存到input这个变量里，以后要获取输入框内容，就可以写：input.value
const addBtn = document.getElementById("addBtn"); // 添加按钮
const list = document.getElementById("list");     // 任务列表容器


// ==================================== 数据层 ================================================
// 也是整个程序【最重要】的一行！！
let todos = [];  // 存所有任务+单一数据源
/*
一开始是空数组[]
添加TODO任务之后就变成：
[
  { text: "学习 DOM", done: false },
  { text: "学习 localStorage", done: true }
]
每个任务都是一个对象：
{
  text: "任务内容",   // text表示任务内容是什么
  done: false        // done表示任务状态
}
*/

// 从localStorage读取
function loadTodos(){
  const data = localStorage.getItem("todos");  // 从浏览器localStorage里读取名字叫"todos"的数据
  //if-else: 如果字符串存在，就JSON.parse转到数组，如果不存在就用空数组
  if (data){
  todos = JSON.parse(data);
  }else{
  todos = [];
  }
  //或写成：todos = data ? JSON.parse(data) : [];
  //JS三元运算符代替一个if-else语句：条件 ? 成立时执行 : 不成立执行
}

// 每次数据变化，都同步到localStorage
// 把todos数组 → 转 JSON → 存进去
function saveTodos(){
  localStorage.setItem("todos", JSON.stringify(todos));
}


// ========================================== 渲染 ==========================================
//【作用】：把todos数据渲染成li元素，插入到页面里
function render(){
  list.innerHTML = "";   // 清空列表（防止重复渲染）
  todos.forEach(function(todo, index){
    const li = document.createElement("li");  // 创建li元素，但此时它还没有出现在页面上，只是在内存里。
    if(todo.done){  //如果完成：加一个CSS类（比如变灰 / 删除线）
        li.classList.add("done");
    }
    li.innerHTML = `
      <span>${todo.text}</span>
      <button class="delete" data-index="${index}">删除</button>
    `;
    /*这几行是在给<li>设置在HTML的内部内容*/
    list.appendChild(li);  // 插入到页面，这下才会成功出现在页面上
  });
}
/*
【渲染内容】：
文本：todo.text
删除按钮
data-index：存当前索引（非常关键！！）
为什么要 data-index？ → 作用是把数组下标存到HTML标签上，到时候好删除对应的TODO项
*/

/*
假设：
todo.text = "学习 DOM"
index = 0
那么在HTML里就有：
<li>
  <span>学习 DOM</span>
  <button class="delete" data-index="0">删除</button>
</li>
*/


// ========================================== 添加 ==========================================
addBtn.addEventListener("click", function(){
  // input.value表示输入框当前的文字
  // .trim()的作用是去掉前后空格，这样做可以防止用户只输入空格
  const text = input.value.trim();   // 获取输入内容 + 去空格
  if(!text){
    return;
  }
  todos.push({text, done: false});  // 把一个新任务{}添加到todos数组里
  saveTodos();  // 存数据
  render();     // 渲染UI 
  input.value = "";  // 清空输入框
});

// ========================================== 点击事件（委托） ====================================
// 不给每个删除按钮、每个span单独绑定事件，而是只给它们共同的父元素list绑定事件，因为点击子元素时，事件会冒泡到父元素list
// 给整个任务列表list绑定点击事件，只要点击list里面的任何东西，都会触发这个函数
list.addEventListener("click", function(events){
  // 删除
  if(events.target.classList.contains("delete")){  // 判断用户点击的元素是否有delete这个类名
    const index = events.target.dataset.index;     // 取出删除按钮上的data-index
    todos.splice(index, 1);                        // 从todos数组里删除指定位置的任务:从index位置开始，删除1个元素
    saveTodos();
    render();
  }
  // 切换完成状态
  // e.target.tagName返回的是大写字母单词，所以要写"SPAN"，不能写"span" 
  if(events.target.tagName === "SPAN"){   // 判断用户点击的是不是<span>标签
    const li = events.target.closest("li"); // 从当前点击的<span>开始，往上找最近的<li> 
    // list.children : 得到list里面所有的子元素，也就是所有<li>
    // 但是list.children不是普通数组，而是一个类似数组的HTMLCollection
    // 所以先写：Array.from(list.children) 把它转换成真正的数组
    // .indexOf(li)：查找当前点击的这个li在数组中的位置
    const index = Array.from(list.children).indexOf(li);   // 找到用户点击的是第几个任务
    todos[index].done = !todos[index].done;
    saveTodos();
    render();
  }
});
/*
比如HTML结构是：
<li>
  <span>学习 DOM</span>
  <button>删除</button>
</li>
用户点击的是<span>
closest("li")会找到外层的<li>
所以li就是当前任务对应的整个列表项
*/

// ========================================== 初始化 ==========================================
loadTodos();
render();