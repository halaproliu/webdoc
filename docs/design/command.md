# JavaScript设计模式-命令模式

命令模式是最简单和优雅的模式之一，命令模式中的命令是指执行某些特定操作的指令。
命令模式最常见的使用场景是不知道命令的发送者是谁，也不知道命令的接受者是谁。此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接收者消除彼此之间的耦合。

下面使用命令模式实现了菜单的刷新，新增和删除：
```html
<button id="button1" class="btn">refresh</button>
<button id="button2" class="btn">add</button>
<button id="button3" class="btn">del</button>
```
```css
.btn {
  background: linear-gradient(skyblue, white 450px, yellowgreen 0);
  padding: 10px;
  width: 90px;
  border-radius: 5px;
  color: #fff;
  border: 1px solid #fff;
  outline: 0;
  cursor: pointer;
}
```
```js
var setCommand = function (button, command) {
  return button.onclick = function () {
    return command.execute()
  }
}

var menuBar = {
  refresh: function () {
    console.log('刷新菜单')
  }
}

var subMenu = {
  add: function () {
    console.log('新增菜单')
  },
  del: function () {
    console.log('删除菜单')
  }
}

var RefreshMenubarCommand = function (reciever) {
  this.reciever = reciever
}

RefreshMenubarCommand.prototype.execute = function () {
  this.reciever.refresh()
}

var AddSubMenuCommand = function (reciever) {
  this.reciever = reciever
}

AddSubMenuCommand.prototype.execute = function () {
  this.reciever.add()
}

var DelSubMenuCommand = function (reciever) {
  this.reciever = reciever
}

DelSubMenuCommand.prototype.execute = function () {
  this.reciever.del()
}

var init = function () {
  var btn1 = document.getElementById('button1')
  var btn2 = document.getElementById('button2')
  var btn3 = document.getElementById('button3')
  var refreshMenubarCommand = new RefreshMenubarCommand(menuBar)
  var addSubMenuCommand = new AddSubMenuCommand(subMenu)
  var delSubMenuCommand = new DelSubMenuCommand(subMenu)
  setCommand(btn1, refreshMenubarCommand)
  setCommand(btn2, addSubMenuCommand)
  setCommand(btn3, delSubMenuCommand)
}

window.onload = function () {
  init()
}
```
#### 宏命令
宏命令可以实现多个命令的一次性执行，遵循开放-封闭原则。即使在后续需要添加执行命令时，直接定义一个新的执行命令即可。
```js
var copyClipboardCommand = {
  execute() {
    console.log('复制剪贴板')
  }
}

var openBrowserCommand = {
  execute() {
    console.log('打开浏览器，并跳转剪贴板地址')
  }
}

var MacroCommand = function () {
  return {
    commandList: [],
    add (command) {
      this.commandList.push(command)
    },
    execute () {
      this.commandList.forEach(command => {
        command.execute()
      })
    }
  }
}

var macroCommand = new MacroCommand()
macroCommand.add(copyClipboardCommand)
macroCommand.add(openBrowserCommand)
macroCommand.execute()
```
