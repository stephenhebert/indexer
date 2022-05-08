import { createApp } from 'vue'
import App from './App.vue'

import 'uno.css'

import '@unocss/reset/tailwind.css'
import './styles.scss'
import 'uno.css'
import 'virtual:unocss-devtools'

createApp(App)
  .mount('#app')
