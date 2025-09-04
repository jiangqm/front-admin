# Vite React Tailwind 项目

这是一个使用 Vite + React + Tailwind CSS + React Router 构建的现代化前端项目。

## 🚀 特性

- ⚡ **Vite** - 超快的构建工具和开发服务器
- ⚛️ **React 18** - 现代化的用户界面构建库
- 🎨 **Tailwind CSS** - 实用优先的 CSS 框架
- 🧭 **React Router** - 客户端路由管理
- 📝 **TypeScript** - 类型安全的 JavaScript
- 🗂️ **统一路由表管理** - 集中管理所有路由配置

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Layout.tsx      # 主布局组件
│   └── Navigation.tsx  # 导航组件
├── pages/              # 页面组件
│   ├── Home.tsx        # 首页
│   ├── About.tsx       # 关于页面
│   ├── Contact.tsx     # 联系页面
│   └── NotFound.tsx    # 404页面
├── router/             # 路由配置
│   ├── index.tsx       # 路由器导出
│   ├── routes.tsx      # 路由表配置
│   └── types.ts        # 路由类型定义
├── App.tsx             # 根组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 🛠️ 路由表管理

项目采用统一的路由表管理方式：

### 路由配置 (`src/router/routes.tsx`)
- `routes` - 主路由配置数组
- `navigationItems` - 导航菜单配置
- `ROUTES` - 路由路径常量

### 使用方式
```tsx
import { ROUTES, navigationItems } from './router';

// 使用路径常量
<Link to={ROUTES.ABOUT}>关于我们</Link>

// 动态生成导航
{navigationItems.map(item => (
  <NavLink key={item.key} to={item.path}>
    {item.label}
  </NavLink>
))}
```

## 🚦 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📝 添加新路由

1. 在 `src/pages/` 目录下创建新的页面组件
2. 在 `src/router/routes.tsx` 中添加路由配置：
   ```tsx
   // 添加到 routes 数组
   {
     path: 'new-page',
     element: <NewPage />,
   }
   
   // 添加到 navigationItems 数组
   { path: '/new-page', label: '新页面', key: 'new-page' }
   
   // 添加到 ROUTES 常量
   NEW_PAGE: '/new-page',
   ```

## 🎨 样式说明

项目使用 Tailwind CSS 进行样式设计，所有样式都通过 utility classes 实现，确保：
- 一致的设计系统
- 快速的开发体验
- 优化的最终构建大小

## 📱 响应式设计

所有组件都支持响应式设计，使用 Tailwind 的响应式前缀：
- `sm:` - 640px 及以上
- `md:` - 768px 及以上
- `lg:` - 1024px 及以上
- `xl:` - 1280px 及以上