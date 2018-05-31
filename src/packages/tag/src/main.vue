<template>
  <transition :name="closeTransition ? '' : 'sealui-zoom-in-center'">
    <span
      class="sealui-tag"
      :class="[theme ? 'is-' + theme : '',type ? 'is-' + type : '']"
      :style="{backgroundColor: color}">
      <span :class="dotClasses" v-if="showDot"></span>
      <span class="sealui-tag__text" v-if="closable" @click="handleClick"><slot></slot></span>
      <span v-else><slot></slot></span>
      <i class="sealui-tag__close sealui-icon-close"
        v-if="closable"
        @click="handleClose"></i>
    </span>
  </transition>
</template>
<script>
  export default {
    name: 'SealTag',
    props: {
      text: String,
      closable: Boolean,
      theme: String,
      type: String,
      closeTransition: Boolean,
      color: String
    },
    computed: {
      dotClasses () {
        return `dot-inner`;
      },
      showDot () {
        return !!this.type && this.type === 'dot';
      }
    },
    methods: {
      handleClose(event) {
        this.$emit('close', event);
      },
      handleClick(event){
        this.$emit('click', event);
      }
    }
  };
</script>
