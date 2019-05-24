<template>
  <div class="main-content">
    <div class="card-content">
      <h2>{{ msg }}</h2>
      <div class="form-list">
        <div><label>表单内容：</label>{{formData}}</div>
        <Form :model="formData" :rules="formDataValidator" :label-width="80">
          <FormItem label="输入组件" prop="cronValue1">
            <input-cron type="text" v-model="formData.cronValue1" :exeStartTime="exeStartTime"
              :hideSecond="true" placeholder="请输入cron表达式(http://www.easysb.cn)" />
          </FormItem>
          <FormItem label="原始组件(700px)" prop="cronValue2">
            <easy-cron style="width: 700px;"  v-model="formData.cronValue2" :exeStartTime="exeStartTime"></easy-cron>
          </FormItem>
          <FormItem label="原始组件(750px)" prop="cronValue3">
            <easy-cron style="width: 750px;"  v-model="formData.cronValue3" :exeStartTime="exeStartTime"
              :hideSecond="true"></easy-cron>
          </FormItem>
          <FormItem label="原始组件(800px)" prop="cronValue4">
            <easy-cron style="width: 800px;" v-model="formData.cronValue4" :disabled="true"
              :hideYear="true" :remote="remote"></easy-cron>
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
        <h1>任何问题和建议，来者不拒： jekkay@qqvips.cn</h1>
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
      exeStartTime: '2015-09-02 12:23:10',
      formData: {
        url: 'http://www.easysb.cn',
        qq: '34538980',
        cronValue1: '',
        cronValue2: '4 1/2 5 7-8 1 ?',
        cronValue3: '1/2 5 7-8 1 ?',
        cronValue4: '1 2-4 3/5 3/12 4,5,8 ? *'
      },
      formDataValidator: {
        cronValue1: [
          { validator: CronValidator }
        ],
        cronValue2: [
          { validator: CronValidator }
        ],
        cronValue3: [
          { validator: CronValidator }
        ],
        cronValue4: [
          { validator: CronValidator }
        ]
      }
    }
  },
  methods: {
    remote (val, time, cb) {
      const msg = `remote called: ${val} ${time}`
      console.info(msg)
      setTimeout(() => {
        // get result for e via http...
        const result = msg
        // ...
        // callback
        cb(result)
      }, 200)
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
