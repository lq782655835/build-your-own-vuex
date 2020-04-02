<template>
  <div id="app">
    主页数量count为: {{count}}<br>
  </div>
</template>

<script>

export default {
  name: 'app',
  created() {
    console.log('打印出this.$store.getters.getStatePlusOne的结果',this.$store.getters.getStatePlusOne);
  },
  mounted() {
    console.log(this.$store)
    setTimeout(() => {
      this.$store.commit('incrementFive');
      console.log('store state自增5后的结果', this.$store.state.count);
    }, 2000);
    setTimeout(() => {
      this.$store.dispatch('countPlusSix');
      console.log('store dispatch自增6后的结果', this.$store.state.count);
    }, 3000);
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  }
}
</script>

