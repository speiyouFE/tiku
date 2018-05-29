import SealModal from './src/main';

/* istanbul ignore next */
SealModal.install = function(Vue) {
  Vue.component(SealModal.name, SealModal);
};

export default SealModal;
