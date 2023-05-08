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
                      <a-popconfirm
                        title="你确定要删除吗?"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="delTableRow(item.tableList,index)"
                      >
            <a class="caozuo">删除</a>
  </a-popconfirm>
          </template>
        </span>
      </a-table>

      <a-button type="dashed" style="width: 100%" @click="rulesDiago=true">
        <a-icon type="plus" /> 新增
      </a-button>
      <a-modal :okText="'确定'" :cancelText="'取消'" title="新增规则" v-model="rulesDiago" @ok="handleRuleOk" :centered="true"
               class="riskTitle">
        <h4>新增规则</h4>
        <a-select
          v-if="item.selectRuleArr"
          allowClear
          label-in-value
          v-model="item.searchValue"
          mode="multiple"
          @change="handleSearchChange($event,item,index)"
          style="width: 100%"
          placeholder="请输入关键字搜索"
          option-label-prop="label"
        >
          <a-select-option    v-for="items in item.selectRuleArr" :key="items.configId" :label="items.ruleName"
                              :value="items.configId">
            {{ items.ruleName }}
          </a-select-option>
        </a-select>

      </a-modal>

    </a-card>


    <a-card style="margin-top: 20px">
     <h5 @click="addOption">
       <a-icon type="plus-circle" />&nbsp;&nbsp;添加序列
     </h5>

    </a-card>






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
      tableListArr: [],
      allData:{
        arrList:[
          {
            titleVal: '',
            tableList: [],
            selectRuleArr: [
                {
                  "configId": "e4c039b4f21311eca430aceea46a257e",
                  "dappId": "zjspolicebankcardverify",
                  "ruleName": "开卡总数",
                  "ruleRiskLevel": "MEDIUM_RISK",
                  "ruleLabel": "开卡总数",
                  "isEnabled": null,
                  "ruleDesc": "通过身份证查询各银行开户数据（开户数量、Ⅰ类、Ⅱ类、对应开卡时间）"
                },
                {
                  "configId": "ee757366f21311eca430aceea46a257e",
                  "dappId": "zjspolicebankcardverify",
                  "ruleName": "银行卡和手机号一致性比对",
                  "ruleRiskLevel": "MEDIUM_RISK",
                  "ruleLabel": "银行卡和手机号一致性比对",
                  "isEnabled": null,
                  "ruleDesc": "通过身份证和手机号查询各银行开户数据"
                },
                {
                  "configId": "f2cbe7c4f21311eca430aceea46a257e",
                  "dappId": "zjspolicebankcardverify",
                  "ruleName": "涉案标签",
                  "ruleRiskLevel": "HIGH_RISK",
                  "ruleLabel": "5454254",
                  "isEnabled": null,
                  "ruleDesc": "通过身份证或手机号查询各银行认定涉案标签和公安前科违法数据标签"
                },
                {
                  "configId": "f6c239faf21311eca430aceea46a257e",
                  "dappId": "zjspolicebankcardverify",
                  "ruleName": "风险数据标签",
                  "ruleRiskLevel": "MEDIUM_RISK",
                  "ruleLabel": "风险数据标签",
                  "isEnabled": null,
                  "ruleDesc": "通过身份证件或手机号查询各银行和公安的风险数据标签"
                },
                {
                  "configId": "fbdb6e3ef21311eca430aceea46a257e",
                  "dappId": "zjspolicebankcardverify",
                  "ruleName": "轨迹异常标签",
                  "ruleRiskLevel": "MEDIUM_RISK",
                  "ruleLabel": "323232",
                  "isEnabled": null,
                  "ruleDesc": "通过身份证查询公安内网的模型标签"
                },
                {
                  "configId": "011021c4f21411eca430aceea46a257e",
                  "dappId": "zjspolicebankcardverify",
                  "ruleName": "高风险地区回流标签",
                  "ruleRiskLevel": "MEDIUM_RISK",
                  "ruleLabel": "4554",
                  "isEnabled": null,
                  "ruleDesc": "通过身份证查询公安内网的模型标签"
                },
                {
                  "configId": "07c9ff9ef21411eca430aceea46a257e",
                  "dappId": "zjspolicebankcardverify",
                  "ruleName": "手机号异常标签",
                  "ruleRiskLevel": "MEDIUM_RISK",
                  "ruleLabel": "545454",
                  "isEnabled": null,
                  "ruleDesc": "通过手机号查询公安内网的模型标签"
                },
                {
                  "configId": "0c074738f21411eca430aceea46a257e",
                  "dappId": "zjspolicebankcardverify",
                  "ruleName": "实有人口标签",
                  "ruleRiskLevel": "MEDIUM_RISK",
                  "ruleLabel": "实有人口标签",
                  "isEnabled": null,
                  "ruleDesc": "通过身份证查询公安内网的模型标签"
                },
                {
                  "configId": "0fb609c8f21411eca430aceea46a257e",
                  "dappId": "zjspolicebankcardverify",
                  "ruleName": "社保标签",
                  "ruleRiskLevel": null,
                  "ruleLabel": "社保标签",
                  "isEnabled": null,
                  "ruleDesc": "通过身份证查询指定联盟成员的模型标签"
                },
                {
                  "configId": "153be0e8f21411eca430aceea46a257e",
                  "dappId": "zjspolicebankcardverify",
                  "ruleName": "税务标签",
                  "ruleRiskLevel": null,
                  "ruleLabel": "税务标签",
                  "isEnabled": null,
                  "ruleDesc": "通过身份证查询指定联盟成员的模型标签"
                },
                {
                  "configId": "19c3414cf21411eca430aceea46a257e",
                  "dappId": "zjspolicebankcardverify",
                  "ruleName": "识别一机多卡标签",
                  "ruleRiskLevel": null,
                  "ruleLabel": "识别一机多卡标签",
                  "isEnabled": null,
                  "ruleDesc": "通过设备信息查询各银行的关联卡情况"
                },
                {
                  "configId": "aac8e90524abc9132b9ae326920d78f1",
                  "dappId": "zjspolicebankcardverify",
                  "ruleName": "既往冻结账户开卡人",
                  "ruleRiskLevel": "HIGH_RISK",
                  "ruleLabel": "存在冻结记录",
                  "isEnabled": null,
                  "ruleDesc": null
                },
                {
                  "configId": "01f956c57a8d6802d42ab6a14b8ff7b2",
                  "dappId": "zjspolicebankcardverify",
                  "ruleName": "缅北回流",
                  "ruleRiskLevel": "HIGH_RISK",
                  "ruleLabel": "涉诈高风险地区人员",
                  "isEnabled": null,
                  "ruleDesc": null
                },
                {
                  "configId": "76241b93f96147571f36394a3c9dc339",
                  "dappId": "zjspolicebankcardverify",
                  "ruleName": "涉诈前科",
                  "ruleRiskLevel": "HIGH_RISK",
                  "ruleLabel": "涉诈前科",
                  "isEnabled": null,
                  "ruleDesc": null
                },
                {
                  "configId": "6544ff381e4a7fe07eecef407ace8a1f",
                  "dappId": "zjspolicebankcardverify",
                  "ruleName": "吸毒等犯罪前科",
                  "ruleRiskLevel": "MEDIUM_RISK",
                  "ruleLabel": "犯罪前科人员",
                  "isEnabled": null,
                  "ruleDesc": null
                },
                {
                  "configId": "f2991526828917349691a8f3f6828c8c",
                  "dappId": "zjspolicebankcardverify",
                  "ruleName": "虚拟号码",
                  "ruleRiskLevel": "MEDIUM_RISK",
                  "ruleLabel": "虚拟手机号",
                  "isEnabled": null,
                  "ruleDesc": null
                },
                {
                  "configId": "0e61d312a884d0a987321a7ae8994211",
                  "dappId": "zjspolicebankcardverify",
                  "ruleName": "风险年龄范围",
                  "ruleRiskLevel": "MEDIUM_RISK",
                  "ruleLabel": "风险年龄范围",
                  "isEnabled": null,
                  "ruleDesc": null
                },
                {
                  "configId": "883efbc1a76a4e2ded49ecd2b4ba2cc8",
                  "dappId": "zjspolicebankcardverify",
                  "ruleName": "特定时间内开卡查询",
                  "ruleRiskLevel": "MEDIUM_RISK",
                  "ruleLabel": "近期频繁申请开卡",
                  "isEnabled": null,
                  "ruleDesc": null
                }
            ],
            tempTableArr: [],
            searchValue: [],
            columns: [
              {
                title: '规则名称',
                dataIndex: 'ruleName'
              },
              {
                title: '规则编码',
                dataIndex: 'configId'
              },
              {
                title: '操作',
                dataIndex: 'action',
                scopedSlots: { customRender: 'action' }
              }
            ]
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
      // 删除新增的表格行
      delTableRow(item, index) {
        item.splice(index, 1)
      },
      handleSearchChange(value,val,index) {
        console.log(value,val,index)
        val.searchValue =value   //把选中的值赋值给临时变量
// // 更换select的字段
        val.searchValue.map((item)=>{
          console.log(item)
          item.configId = item.key
          item.ruleName = item.label

          // item.dappId = val.dappId
          // item.ruleRiskLevel = val.ruleRiskLevel
          // item.ruleLabel = val.ruleLabel
          // item.ruleDesc = val.ruleDesc
        })
        console.log( val.searchValue)
//         })
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
      // 新增规则确定按钮
      handleRuleOk() {
        this.allData.arrList.forEach((item,index) => {
          console.log(item)
          // 排序要传的序列值
          this.sortIdx = index
          // 把空数组赋给列表数组
          // item.tableList =  item.tempTableArr
          item.tableList =  item.searchValue
          console.log( item.searchValue)
          console.log( item.tableList)
          // 给后台传递处理后的数据
          this.tableListArr.push({
            "ruleConfigInfos": item.tableList,
            "sequenceNo": this.sortIdx,
            "sequenceName": item.titleVal
          })
// 如果规则列表有数据，点击确定就可以关弹框
          if (item.tableList.length) {
            this.rulesDiago = false
            // item.tableList=[]
          } else {
            this.$message.error('新增规则不能为空')
          }
        })
      },
      addOption() {
        this.allData.arrList.push(
          {
            titleVal: '',
            tableList: [],
            tempTableArr: [],
            searchValue: [],
            selectRuleArr: [
              {
                "configId": "e4c039b4f21311eca430aceea46a257e",
                "dappId": "zjspolicebankcardverify",
                "ruleName": "开卡总数",
                "ruleRiskLevel": "MEDIUM_RISK",
                "ruleLabel": "开卡总数",
                "isEnabled": null,
                "ruleDesc": "通过身份证查询各银行开户数据（开户数量、Ⅰ类、Ⅱ类、对应开卡时间）"
              },
              {
                "configId": "ee757366f21311eca430aceea46a257e",
                "dappId": "zjspolicebankcardverify",
                "ruleName": "银行卡和手机号一致性比对",
                "ruleRiskLevel": "MEDIUM_RISK",
                "ruleLabel": "银行卡和手机号一致性比对",
                "isEnabled": null,
                "ruleDesc": "通过身份证和手机号查询各银行开户数据"
              },
              {
                "configId": "f2cbe7c4f21311eca430aceea46a257e",
                "dappId": "zjspolicebankcardverify",
                "ruleName": "涉案标签",
                "ruleRiskLevel": "HIGH_RISK",
                "ruleLabel": "5454254",
                "isEnabled": null,
                "ruleDesc": "通过身份证或手机号查询各银行认定涉案标签和公安前科违法数据标签"
              },
              {
                "configId": "f6c239faf21311eca430aceea46a257e",
                "dappId": "zjspolicebankcardverify",
                "ruleName": "风险数据标签",
                "ruleRiskLevel": "MEDIUM_RISK",
                "ruleLabel": "风险数据标签",
                "isEnabled": null,
                "ruleDesc": "通过身份证件或手机号查询各银行和公安的风险数据标签"
              },
              {
                "configId": "fbdb6e3ef21311eca430aceea46a257e",
                "dappId": "zjspolicebankcardverify",
                "ruleName": "轨迹异常标签",
                "ruleRiskLevel": "MEDIUM_RISK",
                "ruleLabel": "323232",
                "isEnabled": null,
                "ruleDesc": "通过身份证查询公安内网的模型标签"
              },
              {
                "configId": "011021c4f21411eca430aceea46a257e",
                "dappId": "zjspolicebankcardverify",
                "ruleName": "高风险地区回流标签",
                "ruleRiskLevel": "MEDIUM_RISK",
                "ruleLabel": "4554",
                "isEnabled": null,
                "ruleDesc": "通过身份证查询公安内网的模型标签"
              },
              {
                "configId": "07c9ff9ef21411eca430aceea46a257e",
                "dappId": "zjspolicebankcardverify",
                "ruleName": "手机号异常标签",
                "ruleRiskLevel": "MEDIUM_RISK",
                "ruleLabel": "545454",
                "isEnabled": null,
                "ruleDesc": "通过手机号查询公安内网的模型标签"
              },
              {
                "configId": "0c074738f21411eca430aceea46a257e",
                "dappId": "zjspolicebankcardverify",
                "ruleName": "实有人口标签",
                "ruleRiskLevel": "MEDIUM_RISK",
                "ruleLabel": "实有人口标签",
                "isEnabled": null,
                "ruleDesc": "通过身份证查询公安内网的模型标签"
              },
              {
                "configId": "0fb609c8f21411eca430aceea46a257e",
                "dappId": "zjspolicebankcardverify",
                "ruleName": "社保标签",
                "ruleRiskLevel": null,
                "ruleLabel": "社保标签",
                "isEnabled": null,
                "ruleDesc": "通过身份证查询指定联盟成员的模型标签"
              },
              {
                "configId": "153be0e8f21411eca430aceea46a257e",
                "dappId": "zjspolicebankcardverify",
                "ruleName": "税务标签",
                "ruleRiskLevel": null,
                "ruleLabel": "税务标签",
                "isEnabled": null,
                "ruleDesc": "通过身份证查询指定联盟成员的模型标签"
              },
              {
                "configId": "19c3414cf21411eca430aceea46a257e",
                "dappId": "zjspolicebankcardverify",
                "ruleName": "识别一机多卡标签",
                "ruleRiskLevel": null,
                "ruleLabel": "识别一机多卡标签",
                "isEnabled": null,
                "ruleDesc": "通过设备信息查询各银行的关联卡情况"
              },
              {
                "configId": "aac8e90524abc9132b9ae326920d78f1",
                "dappId": "zjspolicebankcardverify",
                "ruleName": "既往冻结账户开卡人",
                "ruleRiskLevel": "HIGH_RISK",
                "ruleLabel": "存在冻结记录",
                "isEnabled": null,
                "ruleDesc": null
              },
              {
                "configId": "01f956c57a8d6802d42ab6a14b8ff7b2",
                "dappId": "zjspolicebankcardverify",
                "ruleName": "缅北回流",
                "ruleRiskLevel": "HIGH_RISK",
                "ruleLabel": "涉诈高风险地区人员",
                "isEnabled": null,
                "ruleDesc": null
              },
              {
                "configId": "76241b93f96147571f36394a3c9dc339",
                "dappId": "zjspolicebankcardverify",
                "ruleName": "涉诈前科",
                "ruleRiskLevel": "HIGH_RISK",
                "ruleLabel": "涉诈前科",
                "isEnabled": null,
                "ruleDesc": null
              },
              {
                "configId": "6544ff381e4a7fe07eecef407ace8a1f",
                "dappId": "zjspolicebankcardverify",
                "ruleName": "吸毒等犯罪前科",
                "ruleRiskLevel": "MEDIUM_RISK",
                "ruleLabel": "犯罪前科人员",
                "isEnabled": null,
                "ruleDesc": null
              },
              {
                "configId": "f2991526828917349691a8f3f6828c8c",
                "dappId": "zjspolicebankcardverify",
                "ruleName": "虚拟号码",
                "ruleRiskLevel": "MEDIUM_RISK",
                "ruleLabel": "虚拟手机号",
                "isEnabled": null,
                "ruleDesc": null
              },
              {
                "configId": "0e61d312a884d0a987321a7ae8994211",
                "dappId": "zjspolicebankcardverify",
                "ruleName": "风险年龄范围",
                "ruleRiskLevel": "MEDIUM_RISK",
                "ruleLabel": "风险年龄范围",
                "isEnabled": null,
                "ruleDesc": null
              },
              {
                "configId": "883efbc1a76a4e2ded49ecd2b4ba2cc8",
                "dappId": "zjspolicebankcardverify",
                "ruleName": "特定时间内开卡查询",
                "ruleRiskLevel": "MEDIUM_RISK",
                "ruleLabel": "近期频繁申请开卡",
                "isEnabled": null,
                "ruleDesc": null
              }
            ],


            columns: [
              {
                title: '规则名称',
                dataIndex: 'ruleName'
              },
              {
                title: '规则编码',
                dataIndex: 'configId'
              },
              {
                title: '操作',
                dataIndex: 'action',
                scopedSlots: { customRender: 'action' }
              }
            ]
          }
        )
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
