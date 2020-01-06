## config   webpack配置文件
##   |
## dist    打包文件
##   |
## dall    缓存文件
##   |
## public  
##   |
## src    源码文件
##   |
##   |---api 请求接口
##   |
##   |---components 组件
##   |
##   |---config 配置文件
##   |
##   |---lib 工具类库
##   |
##   |---store 状态管理
##   |
## App.tsx
##   |
## index.tsx


## 所有文件命名都小写，每个组件相关的文件都放在一个文件加内，然后定义一个index.ts文件统一导出
## 内明明采用类BEM命名法（.module-content-button）尽量用选择器代替预处理器的嵌套语法
## 变量和函数要有注释   关键逻辑出也必须有注释


## npm install


## development
   npm run dll
   npm run dev



## production
   npm run bulid 