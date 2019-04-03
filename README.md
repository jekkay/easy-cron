# easy-cron

#### 介绍
<p>Cron表达式看则简单，但是实际上如果手写的话，非常容易出错的，而且很难及时发现，而easy-cron就是为此应运而生的。</p>

<p>easy-cron是基于Vue.js和iview实现crontab表达式的UI组件，支持多种特性，可以方便、快捷直观地定义cron表达式，并支持给定开始时间后的执行时间点，方便排除错误。</p>
本工程包括测试代码，和vue原始文件。

![image](https://gitee.com/toktok/easy-cron/blob/master/docs/pic-1.jpg)
![image](https://gitee.com/toktok/easy-cron/blob/master/docs/pic-2.jpg)
![image](https://gitee.com/toktok/easy-cron/blob/master/docs/pic-3.jpg)


#### 软件特性

<p>支持特性：</p>

* 纯js代码实现，可以方便和其他<code>iview&vue.js</code>项目无缝接入。
* v-model双向数据绑定
* 多种crontab表达式，可以支持到参数年
* cron表达式校验器validator
* 提供easy-cron原始界面组件，方便开发者自己封账
* 默认提供input-cron输入组件，开发者可以直接使用，内置validator校验
* 纯js模拟cron表达式的执行触发时间点列表
* 可以指定开始之后，观察cron表达式触发执行时间点

<p>依赖组件列表：</p>

* [iview-3.3.3](https://www.iviewui.com)
* [vue.js-2.5.2](https://cn.vuejs.org/)
* [cron-parser-2.10.0](https://www.npmjs.com/package/cron-parser)


#### 安装教程

1. Demo编译运行

<p>如果要运行demo，可以直接运行命令即可: <code>npm run dev</code>，当然也看直接在线查看。</p>

* [http://www.easysb.cn/open/easy-cron/index.html](http://www.easysb.cn/open/easy-cron/index.html)


2. 集成到项目中
<p>可以将<code>src/componets/easy-cron</code>中的代码直接复制到工程中，就可以直接导入使用。</p>

3. 发布

<p>待完善</p>

#### 使用说明

1. 快速使用input-cron输入cron表达式组件

<p>直接参考代码如下</p>
<code><pre>import InputCron from './easy-cron/input-cron'
...
<FormItem label="输入组件" prop="cronValue">
  <input-cron type="text" v-model="formData.cronValue1"
    placeholder="请输入cron表达式(http://www.easysb.cn)"/>
</FormItem>
</pre></code>

2. 直接使用easy-cron元组件

<p>直接参考代码如下</p>
<code><pre>import EasyCron from './easy-cron'
...
<FormItem label="原始组件(700px)" prop="cronValue">
  <easy-cron style="width: 700px;"
    v-model="formData.cronValue2"></easy-cron>
</FormItem>
// 可以调整元组件大小
<FormItem label="原始组件(800px)" prop="cronValue">
  <easy-cron style="width: 800px;"
    v-model="formData.cronValue3"></easy-cron>
</FormItem>
</pre></code>

3. 使用cron表达式校验器

<p>直接参考代码如下</p>
<code><pre>
<FormItem label="原始组件(800px)" prop="cronValue">
  <easy-cron style="width: 800px;"
    v-model="formData.cronValue3"></easy-cron>
</FormItem>
....
import CronValidator from './easy-cron/validator'
...
data () {
  return {
    msg: 'Cron表达式测试页面',
    formData: {
      ....
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
</pre></code>
 

#### 参与贡献

1. Fork 本仓库


#### 参考项目


<p>本组件实现参考以下多位大佬：</p>

* [远望の无限](https://gitee.com/ywwxhz/CronExpGenerator)
* [ldy](https://gitee.com/lindeyi/vue-cron)

