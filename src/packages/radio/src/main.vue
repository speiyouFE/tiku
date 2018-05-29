<template>
  <label class="sealui-radio"
  	:class="[
      type ? 'is-' + type : ''
    ]"
  >
    <span class="sealui-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label,
        'is-focus': focus,
      }"
    >
      <span class="sealui-radio__inner"></span>
      <input
        class="sealui-radio__original"
        :value="label"
        type="radio"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        :name="name"
        :disabled="isDisabled">
    </span>
    <span class="sealui-radio__label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
  import Emitter from '@/mixins/emitter';

  export default {
    name: 'seal-radio',

    mixins: [Emitter],

    componentName: 'seal-radio',

    props: {
      value: {},
      label: {},
      disabled: Boolean,
      name: String,
      type:String,
    },

    data() {
      return {
        focus: false
      };
    },

    computed: {
      isGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== 'SealRadioGroup') {
            parent = parent.$parent;
          } else {
            this._radioGroup = parent;
            return true;
          }
        }
        return false;
      },

      model: {
        get() {
          return this.isGroup ? this._radioGroup.value : this.value;
        },

        set(val) {
          if (this.isGroup) {
            this.dispatch('SealRadioGroup', 'input', [val]);
          } else {
            this.$emit('input', val);
          }
        }
      },

      isDisabled() {
        return this.isGroup
          ? this._radioGroup.disabled || this.disabled
          : this.disabled;
      }
    }
  };
</script>
