<template>
    <v-container class="about-container" fluid>
        <v-row class="mb-8">
            <v-col cols="12" md="6" class="profile-section">
                <v-slide-x-transition>
                    <!-- <v-card class="profile-card pa-10" elevation="10" rounded="xl" color="primary" variant="outlined"> -->
                         <v-card class="profile-card pa-10" elevation="10" rounded="xl" color="primary" variant="outlined">
                            <v-avatar
                                color="primary"
                                rounded="10"
                                size="300"
                                class="ma-2"
                            >
                                <v-img
                                    src="../../assets/images/profile.jpeg"
                                    height="300"
                                    class="profile-image"
                                    cover
                                    :lazy-src="`https://picsum.photos/10/6?image1`"
                                ></v-img>
                            </v-avatar>
                        <v-divider></v-divider>
                        <v-card-title class="text-h5">Robel Gebrehiwot </v-card-title>
                        <v-card-subtitle class="mb-4">Full Stack Developer | Assistant Lecturer</v-card-subtitle>
                    </v-card>
                    <!-- </v-card> -->
                   
                </v-slide-x-transition>
            </v-col>
            
            <v-col cols="12" md="6" class="bio-section">
                <v-fade-transition>
                    <div class="bio-content">
                        <h2 class="text-h3 mb-6">About Me</h2>
                        <p class="text-body-1 mb-4">
                            {{ bio }}
                        </p>

                        <v-row class="skills-section">
                            <v-col v-for="(skill, index) in skills" :key="index" cols="6" sm="4">
                                <v-scale-transition>
                                    <v-chip
                                        class="ma-2"
                                        color="primary"
                                        :style="{ transitionDelay: `${index * 100}ms` }"
                                    >
                                        {{ skill }}
                                    </v-chip>
                                <v-progress-linear
                                    v-model="valueDeterminate"
                                    color="deep-purple-accent-4"
                                ></v-progress-linear>
                                </v-scale-transition>
                            </v-col>
                        </v-row>
                    </div>
                </v-fade-transition>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="mt-8">
            <v-col cols="12">
                <v-slide-y-transition>
                    <v-timeline side="end">
                        <v-timeline-item
                            v-for="(experience, index) in experiences"
                            :key="index"
                            :dot-color="experience.color"
                            size="small"
                        >
                            <template v-slot:opposite>
                                <div class="text-h6">{{ experience.year }}</div>
                            </template>
                            <v-card class="elevation-2">
                                <v-card-title>{{ experience.title }}</v-card-title>
                                <v-card-text>{{ experience.description }}</v-card-text>
                            </v-card>
                        </v-timeline-item>
                    </v-timeline>
                </v-slide-y-transition>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'

const bio = ref(
    '5+ years of expertise in building modern web applications with Vue.js and Node.js.'+
    ' Proven ability to design intuitive, visually engaging interfaces—including role-based dashboards, dynamic reports, and high-conversion landing pages paired with scalable backend systems.'+
    ' Skilled in developing secure RESTful APIs, JWT authentication, and optimized databases.'+
    ' Proficient in crafting clean, maintainable code using MVC architecture, middleware, and validation. '+
    'Passionate about delivering seamless, end-to-end user experiences.'+
    'I am also an  assistant lecturer at Mekelle Institute of Technology, Mekelle University University, Ethiopia.'+
    'I have a strong background in computer science and software engineering.'
)

const skills = ref([
    'Vue.js',
    'React',
    'Node.js',
    'TypeScript',
    'Python',
    'AWS',
    'Docker',
    'MongoDB',
    'GraphQL'
])
const valueDeterminate=ref(50)
const experiences = ref([
    {
        year: '2023',
        title: 'Senior Developer',
        description: 'Leading development team in creating enterprise applications',
        color: 'primary'
    },
    {
        year: '2021',
        title: 'Full Stack Developer',
        description: 'Developed and maintained multiple web applications',
        color: 'secondary'
    },
    {
        year: '2019',
        title: 'Junior Developer',
        description: 'Started professional journey in web development',
        color: 'info'
    }
])
</script>

<style scoped>
.about-container {
    padding-top: 2rem;
    padding-bottom: 2rem;
}

.profile-section {
    display: flex;
    justify-content: center;
    align-items: start;
}

.profile-card {
    max-width: 400px;
    width: 100%;
}

.profile-image {
    border-radius: 4px 4px 0 0;
}

.bio-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.bio-content {
    padding: 1rem;
}

.skills-section {
    margin-top: 2rem;
}

/* Animation classes */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>