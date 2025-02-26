<template>
    <v-container class="about-container" fluid>
        <v-row class="mb-8" justify="center">
            <v-col cols="11" md="6" class="profile-section">
                <v-slide-x-transition>
                    <v-card class="profile-card pa-10" elevation="10" rounded="xl" color="primary" variant="outlined">
                        <v-avatar
                            color="primary"
                            rounded="10"
                            size="300"
                            class="ma-2 animate__animated animate__fadeIn"
                        >
                            <v-img
                                src="../../assets/images/profile.jpeg"
                                height="300"
                                class="profile-image"
                                cover
                                :lazy-src="`https://picsum.photos/10/6?image1`"
                            ></v-img>
                        </v-avatar>
                        <v-divider class="my-4"></v-divider>
                        <v-card-title class="text-h5 animate__animated animate__fadeInUp">
                            Robel Gebrehiwot
                        </v-card-title>
                        <v-card-subtitle class="mb-4 animate__animated animate__fadeInUp" style="animation-delay: 0.2s">
                            Full Stack Developer | Assistant Lecturer
                        </v-card-subtitle>
                        <!-- <v-card-text class="social-links animate__animated animate__fadeInUp" style="animation-delay: 0.3s">
                            <v-btn
                                v-for="(link, index) in socialLinks"
                                :key="index"
                                :href="link.url"
                                target="_blank"
                                icon
                                class="mx-2"
                                :color="link.color"
                            >
                                <v-icon>{{ link.icon }}</v-icon>
                            </v-btn>
                        </v-card-text> -->
                    </v-card>
                </v-slide-x-transition>
            </v-col>
            
            <v-col cols="12" md="6" class="bio-section">
                <v-fade-transition>
                    <div class="bio-content">
                        <h2 class="text-h3 mb-6 animate__animated animate__fadeInDown">About Me</h2>
                        <p class="text-body-1 mb-6 animate__animated animate__fadeIn" style="animation-delay: 0.3s">
                            {{ bio }}
                        </p>

                        <!-- <h3 class="text-h5 mb-4 animate__animated animate__fadeIn" style="animation-delay: 0.4s">
                            Technical Skills
                        </h3> -->
                        <!-- <v-row class="skills-section" dense>
                            <v-col v-for="(skill, index) in skills" 
                                  :key="index" 
                                  cols="12"
                                  class="animate__animated animate__fadeInUp"
                                  :style="{ animationDelay: `${0.5 + index * 0.1}s` }"
                            >
                                <div class="d-flex justify-space-between align-center mb-1">
                                    <span class="text-subtitle-1 font-weight-medium">{{ skill.name }}</span>
                                    <span class="text-caption">{{ skill.level }}%</span>
                                </div>
                                <v-progress-linear
                                    v-model="skill.level"
                                    :color="skill.color"
                                    height="10"
                                    rounded
                                    class="skill-progress"
                                >
                                    <template v-slot:default="{ value }">
                                        <div class="skill-progress-overlay"></div>
                                    </template>
                                </v-progress-linear>
                            </v-col>
                        </v-row> -->
                    </div>
                </v-fade-transition>
            </v-col>
        </v-row>
        <v-divider></v-divider>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import 'animate.css'

const bio = ref(
    '5+ years of expertise in building modern web applications with Vue.js and Node.js.'+
    ' Proven ability to design intuitive, visually engaging interfaces—including role-based dashboards, dynamic reports, and high-conversion landing pages paired with scalable backend systems.'+
    ' Skilled in developing secure RESTful APIs, JWT authentication, and optimized databases.'+
    ' Proficient in crafting clean, maintainable code using MVC architecture, middleware, and validation. '+
    'Passionate about delivering seamless, end-to-end user experiences.'+
    'I am also an assistant lecturer at Mekelle Institute of Technology, Mekelle University, Ethiopia.'+
    'I have a strong background in computer science and software engineering.'
)

const skills = ref([
    { name: 'Vue.js', level: 95, color: 'success' },
    { name: 'React', level: 85, color: 'info' },
    { name: 'Node.js', level: 90, color: 'primary' },
    { name: 'TypeScript', level: 88, color: 'deep-purple' },
    { name: 'Python', level: 85, color: 'warning' },
    { name: 'AWS', level: 80, color: 'orange' },
    { name: 'Docker', level: 82, color: 'blue' },
    { name: 'MongoDB', level: 87, color: 'green' },
    { name: 'GraphQL', level: 83, color: 'pink' }
])

const socialLinks = ref([
    { icon: 'mdi-github', url: 'https://github.com/Robel-GH', color: 'grey-darken-3' },
    { icon: 'mdi-linkedin', url: 'https://linkedin.com/in/your-profile', color: 'blue' },
    { icon: 'mdi-twitter', url: 'https://twitter.com/your-handle', color: 'light-blue' },
    { icon: 'mdi-email', url: 'mailto:your.email@example.com', color: 'red' }
])

onMounted(() => {
    // Animate skills progressively
    skills.value.forEach((skill, index) => {
        const initialLevel = skill.level
        skill.level = 0
        setTimeout(() => {
            skill.level = initialLevel
        }, 1000 + (index * 200))
    })
})
</script>

<style scoped>
.about-container {
    padding-top: 2rem;
    padding-bottom: 2rem;
    /* background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); */
}

.profile-section {
    display: flex;
    justify-content: center;
    align-items: start;
}

.profile-card {
    max-width: 400px;
    width: 100%;
    transition: transform 0.3s ease;
}

.profile-card:hover {
    transform: translateY(-5px);
}

.profile-image {
    border-radius: 4px;
    transition: transform 0.3s ease;
}

.profile-image:hover {
    transform: scale(1.05);
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

.skill-progress {
    position: relative;
    overflow: hidden;
}

.skill-progress-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        90deg,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,0.3) 50%,
        rgba(255,255,255,0) 100%
    );
    animation: shimmer 2s infinite;
}

@keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.social-links .v-btn {
    transition: transform 0.3s ease;
}

.social-links .v-btn:hover {
    transform: translateY(-3px);
}

/* Animate.css custom durations */
.animate__animated {
    animation-duration: 1s;
}

/* Responsive Design */
@media (max-width: 960px) {
    .profile-card {
        margin-bottom: 2rem;
    }

    .bio-content {
        padding: 1rem 0;
    }
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