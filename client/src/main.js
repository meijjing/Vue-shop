import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import mixins from './mixins';
import store from './store';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';


const app = createApp(App).use(router);
app.use(router);
app.mixin(mixins);
app.use(store);
app.use(VueSweetalert2);
app.mount('#app');

// window.Kakao.init("8100a941d0c2302cedd41b5760d800f1");

