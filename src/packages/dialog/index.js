import SealDialog from './src/main';

/* istanbul ignore next */
SealDialog.install = function(Vue) {
  Vue.component(SealDialog.name, SealDialog);
};

export default SealDialog;
