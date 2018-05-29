const defaults = {
  title: undefined,
  message: '',
  type: '',
  showInput: false,
  showClose: true,
  modalFade: true,
  lockScroll: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  inputValue: null,
  inputPlaceholder: '',
  inputPattern: null,
  inputValidator: null,
  inputErrorMessage: '',
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonPosition: 'right',
  confirmButtonHighlight: false,
  cancelButtonHighlight: false,
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  confirmButtonClass: '',
  cancelButtonClass: '',
  customClass: '',
  beforeClose: null
};

import Vue from 'vue';
import modalVue from './main.vue';
import merge from '@/utils/merge';
import { isVNode } from '@/utils/vdom';
const ModalConstructor = Vue.extend(modalVue);

let currentMsg, instance;
let msgQueue = [];

const defaultCallback = action => {
  if (currentMsg) {
    let callback = currentMsg.callback;
    if (typeof callback === 'function') {
      if (instance.showInput) {
        callback(instance.inputValue, action);
      } else {
        callback(action);
      }
    }
    if (currentMsg.resolve) {
      let $type = currentMsg.options.$type;
      if ($type === 'confirm' || $type === 'prompt') {
        if (action === 'confirm') {
          if (instance.showInput) {
            currentMsg.resolve({ value: instance.inputValue, action });
          } else {
            currentMsg.resolve(action);
          }
        } else if (action === 'cancel' && currentMsg.reject) {
          currentMsg.reject(action);
        }
      } else {
        currentMsg.resolve(action);
      }
    }
  }
};

const initInstance = () => {
  instance = new ModalConstructor({
    el: document.createElement('div')
  });

  instance.callback = defaultCallback;
};

const showNextMsg = () => {
  if (!instance) {
    initInstance();
  }
  instance.action = '';

  if (!instance.visible || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();

      let options = currentMsg.options;
      for (let prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback;
      }

      let oldCb = instance.callback;
      instance.callback = action => {
        oldCb(action);
        showNextMsg();
      };
      if (isVNode(instance.message)) {
        instance.$slots.default = [instance.message];
        instance.message = null;
      } else {
        delete instance.$slots.default;
      }
      ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape'].forEach(prop => {
        if (instance[prop] === undefined) {
          instance[prop] = true;
        }
      });
      document.body.appendChild(instance.$el);

      Vue.nextTick(() => {
        instance.visible = true;
      });
    }
  }
};

const Modal = function(options, callback) {
  if (Vue.prototype.$isServer) return;
  if (typeof options === 'string') {
    options = {
      message: options
    };
    if (arguments[1]) {
      options.title = arguments[1];
    }
    if (arguments[2]) {
      options.type = arguments[2];
    }
  } else if (options.callback && !callback) {
    callback = options.callback;
  }

  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => { // eslint-disable-line
      msgQueue.push({
        options: merge({}, defaults, Modal.defaults, options),
        callback: callback,
        resolve: resolve,
        reject: reject
      });

      showNextMsg();
    });
  } else {
    msgQueue.push({
      options: merge({}, defaults, Modal.defaults, options),
      callback: callback
    });

    showNextMsg();
  }
};

Modal.setDefaults = defaults => {
  Modal.defaults = defaults;
};

Modal.alert = (message, title, options) => {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return Modal(merge({
    title: title,
    message: message,
    $type: 'alert',
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, options));
};

Modal.confirm = (message, title, options) => {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return Modal(merge({
    title: title,
    message: message,
    $type: 'confirm',
    showCancelButton: true
  }, options));
};

Modal.prompt = (message, title, options) => {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return Modal(merge({
    title: title,
    message: message,
    showCancelButton: true,
    showInput: true,
    $type: 'prompt'
  }, options));
};

Modal.close = () => {
  instance.visible = false;
  msgQueue = [];
  currentMsg = null;
};

export default Modal;
export { Modal };
