<template>
  <ul class="sealui-select-group__wrap">
    <li class="sealui-select-group__title" v-show="visible">{{ label }}</li>
    <li>
      <ul class="sealui-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
  import Emitter from '@/mixins/emitter';

  export default {
    mixins: [Emitter],

    name: 'SealOptionGroup',

    componentName: 'SealOptionGroup',

    props: {
      label: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        visible: true
      };
    },

    watch: {
      disabled(val) {
        this.broadcast('SealOption', 'handleGroupDisabled', val);
      }
    },

    methods: {
      queryChange() {
        this.visible = this.$children &&
          Array.isArray(this.$children) &&
          this.$children.some(option => option.visible === true);
      }
    },

    created() {
      this.$on('queryChange', this.queryChange);
    },

    mounted() {
      if (this.disabled) {
        this.broadcast('SealOption', 'handleGroupDisabled', this.disabled);
      }
    }
  };
</script>
