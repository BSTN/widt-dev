import { acceptHMRUpdate, defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    started: false
  })
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
