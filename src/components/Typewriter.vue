<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'

type Props = {
  text: string | string[]
  typingSpeed?: number
  backspaceSpeed?: number
  pause?: number
  loop?: boolean
  showCursor?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  typingSpeed: 50,
  backspaceSpeed: 30,
  pause: 1200,
  loop: false,
  showCursor: true,
})

const emit = defineEmits<{ (e: 'done'): void }>()

const texts = computed(() => Array.isArray(props.text) ? props.text : [props.text])
const display = ref('')
let idx = 0
let char = 0
let deleting = false
let timer: number | null = null
const complete = ref(false)

function clearTimer() { if (timer) { window.clearTimeout(timer); timer = null } }

function start() {
  clearTimer()
  display.value = ''
  idx = 0
  char = 0
  deleting = false
  complete.value = false
  tick()
}

function tick() {
  const current = texts.value[idx] || ''
  if (!deleting) {
    if (char < current.length) {
      display.value = current.slice(0, char + 1)
      char++
      timer = window.setTimeout(tick, props.typingSpeed)
    } else if (props.loop && texts.value.length > 1) {
      timer = window.setTimeout(() => { deleting = true; tick() }, props.pause)
    } else {
      // finished typing and not looping -> stop cursor blinking
      complete.value = true
      emit('done')
    }
  } else {
    if (char > 0) {
      display.value = current.slice(0, char - 1)
      char--
      timer = window.setTimeout(tick, props.backspaceSpeed)
    } else {
      deleting = false
      idx = (idx + 1) % texts.value.length
      timer = window.setTimeout(tick, props.typingSpeed)
    }
  }
}

onMounted(start)
watch(texts, start)
</script>

<template>
  <span class="typewriter">
    <span>{{ display }}</span>
    <span v-if="props.showCursor && !complete" class="cursor">|</span>
  </span>
</template>

<style scoped>
.typewriter { white-space: pre-wrap }
.cursor { margin-left: 2px; animation: blink 1s step-end infinite; opacity: 0.7 }
@keyframes blink { 50% { opacity: 0 } }
</style>