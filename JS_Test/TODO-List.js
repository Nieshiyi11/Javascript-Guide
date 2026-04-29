// DOM获取：本质是把HTML元素映射到JS变量，方便后续DOM操作
const input = document.getElementById("input");   // 输入框
const addBtn = document.getElementById("addBtn"); // 添加按钮
const list = document.getElementById("list");     // 任务列表容器


// ==================================== 数据层 ================================================
// 也是整个程序【最重要】的一行！！
let todos = [];  // 存所有任务+单一数据源

// 从localStorage读取
function loadTodos(){
  const data = localStorage.getItem("todos");
  //if-else: 如果字符串存在，就JSON.parse转到数组，如果不存在就用空数组
  if (data){
  todos = JSON.parse(data);
  }else{
  todos = [];
  }
  //或写成：todos = data ? JSON.parse(data) : [];
  //JS三元运算符代替一个if-else语句：条件 ? 成立时执行 : 不成立执行
}

// 每次数据变化，都同步到 localStorage
// 把todos数组 → 转 JSON → 存进去
function saveTodos(){
  localStorage.setItem("todos", JSON.stringify(todos));
}


// ========================================== 渲染 ==========================================
function render(){
  list.innerHTML = "";   // 清空列表（防止重复渲染）
  todos.forEach(function(todo, index){
    const li = document.createElement("li");
    if (todo.done){
        li.classList.add("done");
    }
    li.innerHTML = `
      <span>${todo.text}</span>
      <button class="delete" data-index="${index}">删除</button>
    `;

    list.appendChild(li);
  });
}

// ========================================== 添加 ==========================================
addBtn.addEventListener("click", function(){
  const text = input.value.trim();
  if(!text){
    return;
  }
  todos.push({ text, done: false });
  saveTodos();
  render();
  input.value = "";
});

// ========================================== 点击事件（委托） ====================================
list.addEventListener("click", function(e){
  // 删除
  if(e.target.classList.contains("delete")){
    const index = e.target.dataset.index;
    todos.splice(index, 1);
    saveTodos();
    render();
  }
  // 切换完成状态
  if(e.target.tagName === "SPAN") {
    const li = e.target.closest("li");
    const index = Array.from(list.children).indexOf(li);
    todos[index].done = !todos[index].done;
    saveTodos();
    render();
  }
});

// ========================================== 初始化 ==========================================
loadTodos();
render();