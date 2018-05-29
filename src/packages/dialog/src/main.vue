<template>
	<transition name="dialog-fade">
		<div class="sealui-dialog__wrapper" v-show="visible" @click.self="handleWrapperClick">
		  <div class="sealui-dialog"
		  :class="[
		  	size ? 'is-' + size : '',
		  	{
        'is-center': center,
        'is-fullscreen': fullscreen,
		  	}, customClass]"
		  ref="dialog"
		  :style="style"
		  >
		  	<div class="sealui-dialog__hd">
          <slot name="title">
            <span class="sealui-dialog__title" v-if="title">{{ title }}</span>
          </slot>
          <button
            type="button"
            class="sealui-dialog__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleClose">
            <i class="sealui-dialog__close sealui-icon-close"></i>
          </button>
        </div>
				<div class="sealui-dialog__bd" v-if="rendered"><slot></slot></div>
				<div class="sealui-dialog__ft" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
		  </div>
		</div>
	</transition>
</template>

<script>
import Popup from '@/utils/popup';
//import Migrating from 'sealui-pc/src/mixins/migrating';
import emitter from '@/mixins/emitter';
export default {
  name: 'SealDialog',
  mixins: [Popup, emitter],
  props: {
    title: {
      type: String,
      default: ''
    },

    modal: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: false
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: true
    },

    closeOnPressEscape: {
      type: Boolean,
      default: true
    },

    showClose: {
      type: Boolean,
      default: true
    },

    width: String,

    fullscreen: Boolean,

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '15%'
    },
    beforeClose: Function,
    center: {
      type: Boolean,
      default: false
    },
    size:String,
  },

  data() {
    return {
      closed: false
    };
  },
  watch: {
    visible(val) {
      this.$emit('update:visible', val);
      if (val) {
        this.closed = false;
        this.$emit('on-open');
        this.$el.addEventListener('scroll', this.updatePopper);
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0;
        });
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      } else {
        this.$el.removeEventListener('scroll', this.updatePopper);
        if (!this.closed) this.$emit('on-close');
      }
    }
  },
  computed: {
    style() {
      let style = {};
      if (this.width) {
        style.width = this.width;
      }
      if (!this.fullscreen) {
        style.marginTop = this.top;
      }
      return style;
    }
  },
  methods: {
    handleWrapperClick() {
      if (!this.closeOnClickModal) return;
      this.handleClose();
    },
    handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false);
        this.$emit('visible-change', false);
        this.$emit('on-close');
        this.closed = true;
      }
    },
    updatePopper() {
      this.broadcast('SealSelectDropdown', 'updatePopper');
      this.broadcast('SealDropdownMenu', 'updatePopper');
    }
  },
  mounted() {
    if (this.visible) {
      this.rendered = true;
      this.open();
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    }
  }
};
</script>
