# ics-admin
自己根据公司融合指挥系统项目做的小demo，有部分功能会在demo里展示。

## 一、demo说明：
1、在项目开发的时候，由于是自己一个人负责业务系统的前端工作，所以自己为了更有效率的工作。
> 项目使用了vue+vue-cli+webpack+element-ui进行框架和组件的开发，数据请求使用了axios。

2、由于是自己独立开发前端工作，所以没有是eslint来规范代码（我个人觉得我的代码规范还是可以的，最起码不会出现a,b,c这种变量）。由于不需要做很多的数据存储，所以没有使用vuex。
> 项目使用的外部插件有：element-ui，axios，vuedraggable，sass，echarts，font-awesome。

3、页面显示的数据是我自己mock的，数据文件是：data.json；具体配置是在build/webpack.dev.conf.js文件中。
> PS：如果想了解vuex的使用可以看看我的另一个“vue-requests”的demo，里面有用到vuex来发送请求修改存储数据的栗子。

## 二、demo功能点说明：
1、登录（输入框的格式和长度校验）；
2、组织结构的树形展示；
3、table列表展示；
4、echarts系统信息展示；
5、地图组件（点选和搜索地址）。

## 三、声明致谢：
感谢公司的平台，自己能在技术上得到锻炼，也顺便实现了自己的价值and make money。
同样也感谢自己在技术成长之路上帮助过我的人们，谢谢你们。
如果这个demo帮到了你，请给我点个星星star，谢谢咯~
