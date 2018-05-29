<script>
  import Emitter from '@/mixins/emitter';

  export default {
    name: 'SealCheckboxGroup',

    componentName: 'SealCheckboxGroup',

    mixins: [Emitter],

    props: {
      value: {}
    },

    watch: {
      value(value) {
        this.dispatch('SealFormItem', 'seal.form.change', [value]);
      }
    }
  };
</script>

<template>
  <div class="sealui-checkbox-group">
    <slot></slot>
  </div>
</template>
