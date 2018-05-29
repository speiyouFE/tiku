<template>
	<transition name="modal-fade">
  	 <div class="sealui-modal__wrapper" v-show="visible" @click.self="handleWrapperClick">
  	 	<div class="sealui-modal" :class="customClass">
  	 		<!--header-->
  	 		<div class="sealui-modal__header" v-if="title !== undefined">
          <div class="sealui-modal__title">{{ title }}</div>
          <i class="sealui-modal__close sealui-icon-close" @click="handleAction('cancel')" v-if="showClose"></i>
        </div>
        <!--body-->
        <div class="sealui-modal__content" v-if="message !== ''">
          <div class="sealui-modal__status" :class="[ typeClass ]"></div>
          <div class="sealui-modal__message" :style="{ 'margin-left': typeClass ? '50px' : '0' }"><p v-html="message"></p></div>
          <div class="sealui-modal__input" v-show="showInput">
						<seal-input v-model="inputValue" :placeholder="inputPlaceholder" ref="input"></seal-input>
            <div class="sealui-modal__errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
        </div>
        <!--footer-->
        <div class="sealui-modal__btns">
          <seal-button
          	type="dark"
          	:plain="true"
            :loading="cancelButtonLoading"
            :class="[ cancelButtonClasses ]"
            v-show="showCancelButton"
            @click.native="handleAction('cancel')">
            {{ cancelButtonText }}
          </seal-button>
          <seal-button
            :loading="confirmButtonLoading"
            ref="confirm"
            :class="[ confirmButtonClasses ]"
            v-show="showConfirmButton"
            @click.native="handleAction('confirm')">
            {{ confirmButtonText }}
          </seal-button>
        </div>

  	 	</div>
  	 </div>
  </transition>
</template>

<script>
import Popup from '@/utils/popup';
import SealButton from '@/packages/button';
import { addClass, removeClass } from '@/utils/dom';
let typeMap = {
  success: 'circle-check-fill',
  info: 'information',
  warning: 'circle-warning-fill',
  error: 'circle-close-fill'
};
export default {
  name: 'SealModal',
  mixins: [Popup],
  props: {
    modal: {
      default: true
    },
    lockScroll: {
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      default: true
    },
    closeOnPressEscape: {
      default: true
    }
  },
  components: {
    SealButton
  },
  computed: {
    typeClass() {
      return this.type && typeMap[this.type] ? `sealui-icon-${ typeMap[this.type] }` : '';
    },

    confirmButtonClasses() {
      return `is-primary ${ this.confirmButtonClass }`;
    },
    cancelButtonClasses() {
      return `${ this.cancelButtonClass }`;
    }
  },

  methods: {
    getSafeClose() {
      const currentId = this.uid;
      return () => {
        this.$nextTick(() => {
          if (currentId === this.uid) this.doClose();
        });
      };
    },
    doClose() {
      if (!this.visible) return;
      this.visible = false;
      this._closing = true;

      this.onClose && this.onClose();

      if (this.lockScroll) {
        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow;
            document.body.style.paddingRight = this.bodyPaddingRight;
          }
          this.bodyOverflow = null;
          this.bodyPaddingRight = null;
        }, 200);
      }
      this.opened = false;

      if (!this.transition) {
        this.doAfterClose();
      }
      if (this.action) this.callback(this.action, this);
    },

    handleWrapperClick() {
      if (this.closeOnClickModal) {
        this.action = '';
        this.doClose();
      }
    },

    handleAction(action) {
      if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
        return;
      }
      this.action = action;
      if (typeof this.beforeClose === 'function') {
        this.close = this.getSafeClose();
        this.beforeClose(action, this, this.close);
      } else {
        this.doClose();
      }
    },

    validate() {
      if (this.$type === 'prompt') {
        var inputPattern = this.inputPattern;
        if (inputPattern && !inputPattern.test(this.inputValue || '')) {
          this.editorErrorMessage = this.inputErrorMessage || '';
          addClass(this.$refs.input.$el.querySelector('input'), 'invalid');
          return false;
        }
        var inputValidator = this.inputValidator;
        if (typeof inputValidator === 'function') {
          var validateResult = inputValidator(this.inputValue);
          if (validateResult === false) {
            this.editorErrorMessage = this.inputErrorMessage || '';
            addClass(this.$refs.input.$el.querySelector('input'), 'invalid');
            return false;
          }
          if (typeof validateResult === 'string') {
            this.editorErrorMessage = validateResult;
            return false;
          }
        }
      }
      this.editorErrorMessage = '';
      removeClass(this.$refs.input.$el.querySelector('input'), 'invalid');
      return true;
    }
  },
  watch: {
    inputValue: {
      immediate: true,
      handler(val) {
        this.$nextTick(_ => {
          if (this.$type === 'prompt' && val !== null) {
            this.validate();
          }
        });
      }
    },

    visible(val) {
      if (val) this.uid++;
      if (this.$type === 'alert' || this.$type === 'confirm') {
        this.$nextTick(() => {
          this.$refs.confirm.$el.focus();
        });
      }
      if (this.$type !== 'prompt') return;
      if (val) {
        setTimeout(() => {
          if (this.$refs.input && this.$refs.input.$el) {
            this.$refs.input.$el.querySelector('input').focus();
          }
        }, 500);
      } else {
        this.editorErrorMessage = '';
        removeClass(this.$refs.input.$el.querySelector('input'), 'invalid');
      }
    }
  },
  data() {
    return {
      uid: 1,
      title: undefined,
      message: '',
      type: '',
      customClass: '',
      showInput: false,
      inputValue: null,
      inputPlaceholder: '',
      inputPattern: null,
      inputValidator: null,
      inputErrorMessage: '',
      showConfirmButton: true,
      showCancelButton: false,
      action: '',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonClass: '',
      confirmButtonDisabled: false,
      cancelButtonClass: '',
      editorErrorMessage: null,
      callback: null
    };
  }
};
</script>
