# 智慧预约平台 · 用户车辆信息接口

一个可部署到 Vercel 的轻量项目，提供：
- `/` 网页界面，展示用户/车辆信息（给人看）
- `/api/users` JSON 接口，供 FastGPT 的 HTTP 请求节点调用（给程序用）

## 数据接口说明

| 参数 | 说明 | 示例 |
|------|------|------|
| 无参数 | 返回全部用户 | `GET /api/users` |
| `userId` | 按用户ID查询 | `GET /api/users?userId=U001` |
| `phone` | 按手机号查询 | `GET /api/users?phone=13800000001` |
| `name` | 按姓名模糊查询 | `GET /api/users?name=张` |

返回格式：
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "userId": "U001",
      "name": "张三",
      "phone": "13800000001",
      "memberLevel": "金卡会员",
      "vehicles": [...]
    }
  ]
}
```

## 部署到 Vercel（免费，3 分钟）

### 方法一：用 Vercel 网页（推荐，不用装任何东西）

1. 把 `web` 文件夹里的内容上传到 GitHub 仓库（或者直接在 GitHub 网页新建仓库粘贴文件）。
2. 打开 https://vercel.com ，用 GitHub 账号登录。
3. 点 "Add New Project" → 选刚才的仓库 → 点 "Deploy"。
4. 等几十秒，拿到一个网址，形如 `https://your-project.vercel.app`。
5. 测试：浏览器打开 `https://your-project.vercel.app/api/users?userId=U001`，能看到 JSON 就成功。

### 方法二：用 Vercel CLI（命令行）

```bash
cd web
npm i -g vercel
vercel
```
按提示登录、确认即可，最后会给你一个公网网址。

## 拿到网址后，填到 FastGPT

在 FastGPT 工作流里加一个「HTTP 请求节点」：
- 方法：GET
- URL：`https://你的网址/api/users?userId={{用户ID变量}}`

FastGPT 就能读到用户车辆数据了。
