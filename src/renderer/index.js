require('devtron').install();
import Vue from 'vue';
import App from './views/App';

new Vue({
  el: '#app',
  created: function () {
    let body = document.body
    body.style.height = window.visualViewport.height + 'px';
    body.style.margin = 0;
  },
  render(h) {
    return h(App)
  }
});
