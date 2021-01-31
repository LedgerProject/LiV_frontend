import { shallowMount } from '@vue/test-utils'
import App from '@/vue/App.vue'

test('App should work', () => {
  const wrapper = shallowMount(App)
  expect(wrapper.text()).toMatch('Welcome to Your Vue.js App')
})
