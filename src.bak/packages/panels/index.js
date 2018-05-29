import SealPanels from './src/main';

/* istanbul ignore next */
SealPanels.install = function(Vue) {
  Vue.component(SealPanels.name, SealPanels);
};

export default SealPanels;
