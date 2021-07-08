# Tree Hole Server
《树洞》服务端代码<br>
开发环境：<br>
node v14.16.0<br>
mysql v8.0.25.0

## 接口
接口前缀`/api`<br>
接口文档暂无（相关参考源码注释）

### 官网相关接口
- `/token/upload/image` post 上传图片

- `/token/letter/create` post 创建信笺/回复

- `/letter/list` post 分页获取信笺列表/回复

- `/token/letter/mylist` post 分页获取我的信笺列表/回复

- `/letter/detail/:id` get 获取信笺详情

- `/letter/read/:id` put 更新信笺阅读状态

- `/letterlog/create` post 信笺行为记录创建

- `/letterlog/list` post 分页获取信笺行为记录

- `/cuser/register` post 注册

- `/cuser/login` post 登录

- `/token/cuser/profile/:account` get 获取用户信息

- `/token/cuser/update` post 更新用户信息

- `/cuser/pwd` post 修改密码

## 数据表
- cuser：官网用户表
- letter：信笺数据表，包含发起者和接受者回复数据
- letterlog：信笺操作表，分享和发表态度数据

### 表结构
所有表默认生成createdAt和updatedAt字段
- cuser
| 字段名    | 是否允许为null | 字段类型     | 字段描述               |
| --------- | -------------- | ------------ | ---------------------- |
| id        | false          | int          | 主键                   |
| identity  | false          | int          | 角色身份 0-系统 1-用户 |
| account   | false          | varchar(255) | 账号                   |
| password  | false          | varchar(255) | 密码                   |
| nickname  | true           | varchar(255) | 昵称                   |
| avatar    | true           | varchar(255) | 头像                   |
| sex       | true           | int          | 性别 0-女 1-男 3-保密  |
| birthday  | true           | varchar(255) | 生日                   |
| manifesto | true           | varchar(255) | 签名                   |

- letter
| 字段名   | 是否允许为null | 字段类型      | 字段描述           |
| -------- | -------------- | ------------- | ------------------ |
| id       | true           | int           | 主键               |
| category | true           | int           | 类型 1-树洞        |
| replyId  | true           | int           | 回复信笺id         |
| content  | false          | varchar(1024) | 内容               |
| images   | true           | varchar(1024) | 图片               |
| sender   | false          | int           | 发送者编码         |
| receiver | false          | int           | 接收者编码         |
| read     | true           | tinyint(1)    | 已读 1-已读 0-未读 |

- letterlog
| 字段名   | 是否允许为null | 字段类型 | 字段描述                  |
| -------- | -------------- | -------- | ------------------------- |
| id       | false          | int      | 主键                      |
| letterId | false          | int      | 信笺id                    |
| action   | false          | int      | 行为 0-否定 1-赞同 2-分享 |
| sender   | false          | int      | 发送者编码                |
| receiver | false          | int      | 接收者编码                |

## 项目运行
```
npm install
```

### 开发环境运行
```
npm start
# or nodemon
npm run dev
```

### 线上环境运行
```
npm run prod
```
