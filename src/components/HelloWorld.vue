<template>
  <div class="main-content">
    <div class="card-content">
      <h2>{{ msg }}</h2>
      <div class="form-list">
        <div><label>表单内容：</label>{{formData}}</div>
        <Form :model="formData" :rules="formDataValidator" :label-width="80">
          <FormItem label="输入组件" prop="cronValue">
            <input-cron type="text" v-model="formData.cronValue1" placeholder="请输入cron表达式(http://www.easysb.cn)"/>
          </FormItem>
          <FormItem label="原始组件(700px)" prop="cronValue">
            <easy-cron style="width: 700px;"  v-model="formData.cronValue2"></easy-cron>
          </FormItem>
          <FormItem label="原始组件(800px)" prop="cronValue">
            <easy-cron style="width: 800px;" v-model="formData.cronValue3"></easy-cron>
          </FormItem>
          <FormItem label="url" prop="url">
            <Input type="text" v-model="formData.url" placeholder="Please input url" />
          </FormItem>
          <FormItem label="qq" prop="qq">
            <Input type="text" v-model="formData.qq" placeholder="Please input qq" />
          </FormItem>
        </Form>
      </div>
      <div class="footer-info">
        <h1>如果觉得有用，请留下你的大名</h1>
        <img src="static/begger.jpg" />
      </div>
    </div>
  </div>
</template>

<script>
import EasyCron from './easy-cron'
import InputCron from './easy-cron/input-cron'
import CronValidator from './easy-cron/validator'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Cron表达式测试页面',
      formData: {
        url: 'http://www.easysb.cn',
        qq: '34538980',
        cronValue1: '',
        cronValue2: '4 1/2 5 7-8 1 ?',
        cronValue3: '1 2-4 3/5 3/12 4,5,8 ? *'
      },
      formDataValidator: {
        cronValue: [
          { validator: CronValidator }
        ]
      }
    }
  },
  components: {
    EasyCron,
    InputCron
  },
  created () {
    // console.info(aaa)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
h1, h2 {
  font-weight: normal;
}
.main-content {
  // background-color: #E0E0E0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.card-content {
  flex-basis: 600px;
}

.form-list {
  margin-top: 20px;
}
</style>
