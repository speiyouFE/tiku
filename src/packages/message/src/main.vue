<template>
  <transition name="sealui-message-fade">
    <div
      class="sealui-message"
      :class="customClass"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer">
      <img class="sealui-message__img" :src="typeImg" alt="" v-if="!iconClass">
      <div class="sealui-message__group" :class="{ 'is-with-icon': iconClass }">
        <p><i class="sealui-message__icon" :class="iconClass" v-if="iconClass"></i>{{ message }}</p>
        <div v-if="showClose" class="sealui-message__closeBtn sealui-icon-close" @click="close"></div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  export default {
    data() {
      return {
        visible: false,
        message: '',
        duration: 3000,
        type: 'info',
        iconClass: '',
        customClass: '',
        onClose: null,
        showClose: false,
        closed: false,
        timer: null
      };
    },

    computed: {
      typeImg() {
        if(this.type == 'danger'){
          this.type = 'error';
        }
        return require(`../assets/${ this.type }.svg`);
      }
    },

    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false;
          this.$el.addEventListener('transitionend', this.destroyElement);
        }
      }
    },

    methods: {
      destroyElement() {
        this.$el.removeEventListener('transitionend', this.destroyElement);
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },

      close() {
        this.closed = true;
        if (typeof this.onClose === 'function') {
          this.onClose(this);
        }
      },

      clearTimer() {
        clearTimeout(this.timer);
      },

      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close();
            }
          }, this.duration);
        }
      }
    },

    mounted() {
      this.startTimer();
    }
  };
</script>
