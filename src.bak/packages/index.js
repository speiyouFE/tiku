import Checkbox from './checkbox/index.js';
import CheckboxGroup from './checkbox-group/index.js';
import Scrollbar from './scrollbar/index.js';
import Select from './select/index.js';
import Option from './option/index.js';
import Loading from './loading/index.js';
import Tag from './tag/index.js';
import Radio from './radio/index.js';
import RadioGroup from './radio-group/index.js';
import RadioButton from './radio-button/index.js';
import Button from './button/index.js';
import ButtonGroup from './button-group/index.js';
import Pagination from './pagination/index.js';

//import Panels from './panels/index.js';

const components = [
  CheckboxGroup,
  Checkbox,
  Scrollbar,
  Select,
  Option,
  Tag,
  Radio,
  RadioGroup,
  RadioButton,
  Button,
  ButtonGroup,
  Pagination,
  //Panels
]
const install = function(Vue, opts = {}) {
  if (install.installed) return;

  components.map(component => {
    Vue.component(component.name, component);
  });

  Vue.use(Loading.directive);

  Vue.prototype.$loading = Loading.service;
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default {
  version: '3.1.5',
  install,
  CheckboxGroup,
  Checkbox,
  Scrollbar,
  Select,
  Option,
  Tag,
  Radio,
  RadioGroup,
  RadioButton,
  Button,
  ButtonGroup,
  Pagination,
  //Panels
};
