# Tree Hole H5
《树洞》官网代码<br>
开发环境：<br>
vue v3.0.5<br>
vite v2.3.8<br>
vant v3.1.0<br>
less v4.1.1<br>
typescript v4.3.4<br>
node v14.16.0

## 目录结构
- apis：axios二次封装及接口文件
- assets：资源文件
- components：公共组件
- router：路由
- store：vuex文件
- views：视图组件

### axios封装
axios响应拦截：<br>
服务器返回code为200或headers为ms-excel时直接返回数据；否则，返回错误Promise，统一进行错误封装和提示，通常不需要处理<br>
如需根据服务器返回的数据处理逻辑，可根据下面的数据结构进行判断：
```javascript
{
  status: 200,  // http状态码
  statusText: 'ok',  // http状态描述
  code: 416,  // 服务器状态码
  message: '缺少必要参数',  // 服务器状态信息
  data: null  // 服务器数据
}
```
如有其它的正常数据被拦击时，在响应拦截器中增加相关逻辑即可

## 项目运行
```
npm install
node node_modules/esbuild/install
```

### 开发环境运行
```
npm run dev
```

### 打包预览运行
```
npm run serve
```

### 打包编译
```
npm run build
```
