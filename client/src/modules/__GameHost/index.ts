import { createApp } from 'vue';
import { createPinia } from 'pinia';

import GameApp from './GameApp.vue';
import { router } from './routes';

import './assets/main.css';

const app = createApp(GameApp);

app.use(createPinia());
app.use(router);

export const mount = () => app.mount('#app');
