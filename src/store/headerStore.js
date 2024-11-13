import { defineStore } from "pinia";

export const useHeaderStore = defineStore('header', {
    state: () => {
        return {
            activeProject: '',
            projects: [],
        }
    },
    actions: {
        setActiveProject(id) {
            this.activeProject = id;
        },
        setProjects(projects) {
            this.projects = projects;
        }
    }
});