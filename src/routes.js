import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import Intent from './views/nav1/Intent.vue'
import Slot from './views/nav1/Slot.vue'
import Action from './views/nav1/Action.vue'
import Story from './views/nav1/Story.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '文件配置',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/intent', component: Intent, name: '意图配置' },
            { path: '/slot', component: Slot, name: '词槽配置' },
            { path: '/action', component: Action, name: '行为配置' },
            { path: '/story', component: Story, name: '场景配置' },
            { path: '/table', component: Table, name: 'Table', hidden: true},
            { path: '/form', component: Form, name: 'Form', hidden: true},
            { path: '/user', component: user, name: '列表', hidden: true},
            // { path: '/table', component: Table, name: 'Table'},
            // { path: '/form', component: Form, name: 'Form'},
            // { path: '/user', component: user, name: '列表'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '数据管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;