import Vue from 'vue';
import Loading from './loading.vue';
import { addClass, removeClass, getStyle } from '@/utils/dom';
import { PopupManager } from '@/utils/popup';
import afterLeave from '@/utils/after-leave';
const Mask = Vue.extend(Loading);

const loadingDirective = {};
loadingDirective.install = Vue => {
  if (Vue.prototype.$isServer) return;
  const toggleLoading = (el, binding) => {
    if (binding.value) {
      Vue.nextTick(() => {
        if (binding.modifiers.fullscreen) {
          el.originalPosition = getStyle(document.body, 'position');
          el.originalOverflow = getStyle(document.body, 'overflow');
          el.maskStyle.zIndex = PopupManager.nextZIndex();

          addClass(el.mask, 'is-fullscreen');
          insertDom(document.body, el, binding);
        } else {
          removeClass(el.mask, 'is-fullscreen');

          if (binding.modifiers.body) {
            el.originalPosition = getStyle(document.body, 'position');

            ['top', 'left'].forEach(property => {
              const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
              el.maskStyle[property] = el.getBoundingClientRect()[property] +
                document.body[scroll] +
                document.documentElement[scroll] -
                parseInt(getStyle(document.body, `margin-${ property }`), 10) +
                'px';
            });
            ['height', 'width'].forEach(property => {
              el.maskStyle[property] = el.getBoundingClientRect()[property] + 'px';
            });

            insertDom(document.body, el, binding);
          } else {
            el.originalPosition = getStyle(el, 'position');
            insertDom(el, el, binding);
          }
        }
      });
    } else {
      afterLeave(el.instance, _ => {
        el.domVisible = false;
        const target = binding.modifiers.fullscreen || binding.modifiers.body
          ? document.body
          : el;
        removeClass(target, 'sealui-loading-parent--relative');
        removeClass(target, 'sealui-loading-parent--hidden');
        el.instance.hiding = false;
      }, 300, true);
      el.instance.visible = false;
      el.instance.hiding = true;
    }
  };
  const insertDom = (parent, el, binding) => {
    if (!el.domVisible && getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility') !== 'hidden') {
      Object.keys(el.maskStyle).forEach(property => {
        el.mask.style[property] = el.maskStyle[property];
      });

      if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
        parent.style.position = 'relative';
        //addClass(parent, 'sealui-loading-parent--relative');
      }
      if (binding.modifiers.fullscreen && binding.modifiers.lock) {
        //addClass(parent, 'sealui-loading-parent--hidden');
        parent.style.overflow = 'hidden';
      }
      el.domVisible = true;

      parent.appendChild(el.mask);
      Vue.nextTick(() => {
        if (el.instance.hiding) {
          el.instance.$emit('after-leave');
        } else {
          el.instance.visible = true;
        }
      });
      el.domInserted = true;
    }
  };

  Vue.directive('loading', {
    bind: function(el, binding, vnode) {
      const text       = el.getAttribute('text')
      const color      = el.getAttribute('color')
      const icon       = el.getAttribute('icon')
      const img        = el.getAttribute('img')
      const fullscreen = el.getAttribute('fullscreen') || true
      const background = el.getAttribute('background')
      const type       = el.getAttribute('type') || 'spinner'
      const size       = el.getAttribute('size') || '44'
      const customClass = el.getAttribute('custom-class');
      const vm = vnode.context;

      const mask = new Mask({
        el: document.createElement('div'),
        data: {
          text: vm && vm[text] || text,
          color: vm && vm[color] || color,
          type: vm && vm[type] || type,
          icon: vm && vm[icon] || icon,
          img: vm && vm[img] || img,
          size: vm && vm[size] || size,
          background: vm && vm[background] || background,
          customClass: vm && vm[customClass] || customClass,
          fullscreen: vm && vm[fullscreen] || fullscreen,
        }
      });
      el.instance = mask;
      el.mask = mask.$el;
      el.maskStyle = {};
      binding.modifiers.fullscreen = fullscreen
      binding.value && toggleLoading(el, binding);
    },

    update: function(el, binding) {
      el.instance.setText(el.getAttribute('text'));
      el.instance.setColor(el.getAttribute('color'));
      el.instance.setIcon(el.getAttribute('icon'));
      el.instance.setImg(el.getAttribute('img'));
      el.instance.setType(el.getAttribute('type') ? el.getAttribute('type') : 'spinner');
      el.instance.setSize(el.getAttribute('size') ? el.getAttribute('size') : '44');
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },

    unbind: function(el, binding) {
      if (el.domInserted) {
        if (binding.modifiers.fullscreen || binding.modifiers.body) {
          document.body.removeChild(el.mask);
        } else {
          el.mask &&
          el.mask.parentNode &&
          el.mask.parentNode.removeChild(el.mask);
        }
      } 
    }
  });
};

export default loadingDirective;