<template>
  <el-cascader :options="options" :props="props" v-model="myValue"></el-cascader>
</template>

<script>
  export default {
    props: {
      value: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      const that = this;
      return {
        options: [],
        props: {
          value: 'areaId',
          label: 'areaName',
          children: 'children',
          lazy: true,
          lazyLoad(node, resolve) {
            const {data} = node;
            that.$ajaxPost('/support/getAreaList', data ? {areaPid: data.areaId} : {areaLevel: '2'}).then(({data}) => {
              if (data.code === 200) {
                const options = data.content.dataList.reduce((res, item) => {
                  if (!res.some(val => val.areaId === item.areaId)) {
                    item.leaf = item.areaLevel === '4';
                    res.push(item)
                  }
                  return res;
                }, []);
                resolve(options);
              }
            })
          }
        },
      }
    },
    computed: {
      myValue: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      }
    }
  }
</script>

<style lang="scss">
.el-cascader {
  width: 100%;
}
</style>
