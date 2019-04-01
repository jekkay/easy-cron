<template>
  <div class="main-content">
    <div style="flex-basis: 100%; border: 1px solid red;">
      <easy-cron style="width: 600px;"></easy-cron>
    </div>
    <div class="card-content">
      <h2>{{ msg }}</h2>
      <div class="form-list">
        <Form :model="formData" :rules="formDataValidator" :label-width="80">
          <FormItem label="cronValue" prop="cronValue">
            <Input type="text" v-model="formData.cronValue" placeholder="Please input" />
          </FormItem>
          <FormItem label="url" prop="url">
            <Input type="text" v-model="formData.url" placeholder="Please input url" />
          </FormItem>
          <FormItem label="qq" prop="qq">
            <Input type="text" v-model="formData.qq" placeholder="Please input qq" />
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import EasyCron from './easy-cron'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Form Field For Easy-Cron Testing',
      formData: {
        url: 'http://www.easysb.cn',
        qq: '34538980',
        cronValue: ''
      },
      formDataValidator: {}
    }
  },
  components: {
    EasyCron
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
h1, h2 {
  font-weight: normal;
}
.main-content {
  background-color: #E0E0E0;
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
