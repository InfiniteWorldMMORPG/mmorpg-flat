import { createApp } from 'vue';
import { createPinia } from 'pinia';

import RootComponent from './RootComponent.vue';
import { router } from './routes';

import './assets/main.css';

const app = createApp(RootComponent);

app.use(createPinia());
app.use(router);

export const mount = () => app.mount('#app');
