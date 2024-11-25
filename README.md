# qiankun-module-federation 

<h3>基于（乾坤+模块联邦）搭建的前端微服务框架</h3><br>

```
  packages/
  │
  ├── main-app/ [主应用] (remotes module-federation)
  │
  ├── micro-app-a/ [子应用] (remotes module-federation) [exposes]
  │
  ├── micro-app-b/ [子应用] (remotes module-federation)
  │
  └── module-federation/ [模块联邦exposes应用]
```
### Reference Relationship

![这是图片](/flow.png)
## Project setup
```
pnpm install
```

### Compiles and hot-reloads for development
```
pnpm run serve || npm run serve
```

### Compiles and minifies for production
```
pnpm run build || npm run build
```
### Lints and fixes files
```
pnpm run lint || npm run lint
```
### version

```
"@vue/cli": "5.0.8",
"qiankun": "2.10.16",
"webpack": "5.95.0"
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
