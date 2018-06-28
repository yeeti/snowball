require('devtron').install();
import Vue from 'vue';
import App from './views/App';

new Vue({
  el: '#app',
  render(h) {
    return h(App)
  }
});
