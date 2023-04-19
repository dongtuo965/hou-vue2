<template>
  <div class="home">

    <a-card :title="item.titleVal" v-for="(item,index) in allData.arrList"
            style="margin-bottom: 20px">
      <a-button slot="extra" v-if="index>0" @click="delCard(index)">删除</a-button>
      <a-form     ref="allData" :model="allData"   labelAlign="left" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="序列名称"  :prop="'item.' + index + '.titleVal'"
                     :rules="{ required: true, message: '请输入', trigger: 'change'}">
          <a-input v-model.trim="item.titleVal" placeholder="请输入"></a-input>
        </a-form-item>
      </a-form>
      <div style="margin-bottom:20px">
      规则列表
      <a-tooltip >
        <template slot="title">
          该序列里需要核查规则
        </template>
      <a-icon type="question-circle"/>
      </a-tooltip>
      </div>
      <a-table :columns="item.columns" :data-source="item.tableList" :locale="tablenodata" :rowKey='record=>record.id'>
        <span slot="action" slot-scope="text, record">
          <template>
            <a class="caozuo" style="margin-right: 8px" @click="edit(record)">编辑</a>
            <a class="caozuo"  @click="del(record)">删除</a>
          </template>
        </span>
      </a-table>

      <a-button type="dashed" style="width: 100%" @click="rulesDiago=true">
        <a-icon type="plus" /> 新增
      </a-button>

    </a-card>


    <a-card style="margin-top: 20px">
     <h5 @click="addOption">
       <a-icon type="plus-circle" />&nbsp;&nbsp;添加序列
     </h5>

    </a-card>



    <a-modal @cancel="cancel" :okText="'确定'" :cancelText="'取消'" title="新增规则" v-model="rulesDiago" @ok="handleRuleOk"  :centered="true" class="riskTitle">


    </a-modal>




  </div>
</template>

<script>

  export default {
    name: 'HomeView',
    components: {},
    data(){
      return{
        rulesDiago:false,
        tablenodata:{
          emptyText:()=>(
            <div><div><a-icon type="inbox" /></div><div>暂无规则，请新增规则</div></div>
    )
    },
        allData:{
        arrList:[
          {
            titleVal:'第一序列名称(未命名)',
            tableList:[],
            columns:[
              {
                title: '规则名称',
                // dataIndex: 'gmtCreate'
              },
              {
                title: '规则编码',
                // dataIndex: 'gmtCreate'
              },
              {
                title: '操作',
                dataIndex: 'action',
                scopedSlots: { customRender: 'action' }
              }
            ],
          }
        ]
        },
        labelCol: { span: 14 },
        wrapperCol: { span: 12 },
        rules: {
          titleVal: [
            { required: true, message: '请输入', trigger: 'change'},
          ]
        },

      }
    },
    mounted() {


    },
    methods: {
      edit(record){

      },
      submitForm(allData) {
        console.log(allData)
        this.$refs.allData.validate(valid => {
          console.log(valid)
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      showSearch(){

      },
      handleRuleOk(){

      },
      addOption() {
        this.allData.arrList.push({
          title: '第一序列名称(未命名)',
          tableList: [],
          columns: [],
        })
      },

      resetForm(allData) {
        this.$refs.allData.resetFields();
      },
      delCard(index){
        this.allData.arrList.splice(index,1)

      },
      del(record){

      },

    },
  }
</script>
