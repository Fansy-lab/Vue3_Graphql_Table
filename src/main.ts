import { createApp ,provide, h } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'
import apolloClient from './apollo-client/apollo-client.js'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import { ApolloClients } from '@vue/apollo-composable'

const app = createApp({
    setup () {
      provide(ApolloClients, {
        default: apolloClient,
      })
    },
    render: () => h(App),
  })
app.use(createPinia().use(piniaPluginPersistedState)).use(router).mount('#app')



