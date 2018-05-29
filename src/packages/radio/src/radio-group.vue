<template>
  <div class="sealui-radio-group"
		:class="[
      type ? 'is-' + type : ''
    ]"
  >
    <slot></slot>
  </div>
</template>
<script>
  import Emitter from '@/mixins/emitter';

  export default {
    name: 'SealRadioGroup',

    componentName: 'SealRadioGroup',

    mixins: [Emitter],

    props: {
      value: {},
      size: String,
      fill: String,
      textColor: String,
      disabled: Boolean,
      type:String
    },
    watch: {
      value(value) {
        this.$emit('on-change', value);
        this.dispatch('SealFormItem', 'sealui.form.on-change', [this.value]);
      }
    }
  };
</script>

