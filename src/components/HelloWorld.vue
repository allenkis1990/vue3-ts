<template>
  <div class="hello">
    <!--<h1>{{ msg }}</h1>-->
    <button @click="fn">{{ msg }}</button>
  </div>
</template>

<script>
  import {defineComponent,ref,toRef,toRefs} from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type:String,
      default:'HelloWorld'
    },
    age: {
      type:Number,
      default:18
    }
  },
  setup(props,context){
    fn()
    function fn(){
      console.log(props,'props');
      context.emit('propClick','fuck!')
//      let {msg} = props
//      console.log(msg,'msg');
    }

    //解构所有REF
    let data = toRefs(props)
    let {msg,age} = data
    console.log(msg.value,age.value);

    //解构单个REF
    let ag = toRef(props,'age')
    console.log(ag.value);
    return {
      fn
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
