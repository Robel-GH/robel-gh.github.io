// Which project the case-study dialog shows, and whether its video should start playing.
import { reactive } from 'vue'
import { projects } from '@/data/projects'

const state = reactive({ open: false, project: null, autoplay: false })

export function useProjectDialog () {
  function openProject (id, autoplay = false) {
    const project = projects.find((p) => p.id === id)
    if (!project) return
    state.project = project
    state.autoplay = autoplay
    state.open = true
  }

  function close () {
    state.open = false
  }

  return { state, openProject, close }
}
