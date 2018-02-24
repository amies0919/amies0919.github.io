<template>
  <div id="app">
    <p>{{msg}}</p>
    <pagenation v-bind:current ="2" v-bind:total="40" v-bind:currentChange="whenChange"></pagenation>
    <p>菜单</p>
    <div class="tree-menu">
      <ul>
        <my-tree v-for="menuItem in theModel" v-bind:key="menuItem.id" v-bind:model="menuItem" v-bind:subMenuData="subMenuData"></my-tree>
      </ul>
    </div>
  </div>
</template>

<script>
  const myData = [
    {
      'id': '1',
      'menuName': '基础管理',
      'menuCode': '10'
    },
    {
      'id': '2',
      'menuName': '商品管理',
      'menuCode': ''
    },
    {
      'id': '3',
      'menuName': '订单管理',
      'menuCode': '30',
      'children': [
        {
          'menuName': '订单列表',
          'menuCode': '31'
        },
        {
          'menuName': '退货列表',
          'menuCode': '32',
          'children': []
        }
      ]
    },
    {
      'id': '4',
      'menuName': '商家管理',
      'menuCode': '',
      'children': []
    }
  ];

  const subMenuData = {
    parentId: '1',
    list: [
      {
        'menuName': '用户管理',
        'menuCode': '11'
      },
      {
        'menuName': '角色管理',
        'menuCode': '12',
        'children': [
          {
            'menuName': '管理员',
            'menuCode': '121'
          },
          {
            'menuName': 'CEO',
            'menuCode': '122'
          },
          {
            'menuName': 'CFO',
            'menuCode': '123'
          },
          {
            'menuName': 'COO',
            'menuCode': '124'
          },
          {
            'menuName': '普通人',
            'menuCode': '124'
          }
        ]
      },
      {
        'menuName': '权限管理',
        'menuCode': '13'
      }
    ]
  };
  import Vue from 'vue'
  import pagenation from './components/page/page.vue'
  import myTree from './components/menu/menu.vue'
  export default {
    name: 'app',
    components: {
      myTree,
      pagenation
    },
    data () {
      return {
        msg: '分页组件',
        theModel: myData,
        subMenuData: subMenuData
      }
    },
    methods:{
        whenChange(item){
            console.log(item);
        }
    }
  }
</script>

<style>

</style>
