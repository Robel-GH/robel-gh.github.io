<template>
    <v-container class="about-container" fluid>
        <v-row class="mb-4" justify="center">
            <!-- Hero Section -->
            <v-col cols="12" md="5" mb="6" class="title-section mt-16" justify="center">
                <v-card 
                    class="title-card pa-8 mt-md-16 pt-16" 
                    min-height="400" 
                    elevation="0"
                    rounded="xl"
                    variant="text"
                    
                >
                    <div class="text-center">
                        <div class="hero-content">
                            <h1 class="greeting-text text-h3 font-weight-bold mb-4">
                                <!-- {{ currentTimeGreeting }} -->
                                Hello, I'm Robel!
                            </h1>
                            <div class="typing-container">
                                <span class="typing">{{ typingText }}</span>
                                <span class="cursor">|</span>
                            </div>

                           <v-btn
                                class="mt-6"
                                color="info"
                                elevation="10"
                                rounded
                                size="x-large"
                                variant="outlined"
                                href="https://www.upwork.com/freelancers/~013621e670994629ad"
                                target="_blank">Hire Me</v-btn>
                             <v-btn
                                class="mt-6 ml-2"
                                color="info"
                                elevation="10"
                                rounded
                                prepend-icon="mdi-download"
                                size="x-large"
                                variant="outlined"
                               @click="downloadCV"
                                target="_blank">Resume</v-btn>
                        </div>
                    </div>
                </v-card>
            </v-col>

            <!-- Profile Section -->
            <v-col cols="12" md="6" class="content-section">
                <v-card 
                    class="content-card" 
                    elevation="3" 
                    rounded="xl" 
                    :style="{ background: 'linear-gradient(135deg, var(--v-primary-base), var(--v-secondary-base))' }"
                >
                    <v-row class="ml-4 mt-4">
                        <!-- Profile Image -->
                        <v-col cols="12" md="12" class="profile-section d-flex align-center justify-center">
                            <div class="profile-wrapper">
                                <v-avatar
                                    size="200"
                                    class="profile-avatar elevation-10"
                                >
                                    <v-img
                                        src="../../assets/images/profile.jpg"
                                        class="profile-image"
                                        cover
                                        
                                    >
                                        <template v-slot:placeholder>
                                            <v-row
                                                class="fill-height ma-0"
                                                align="center"
                                                justify="center"
                                            >
                                                <v-progress-circular
                                                    indeterminate
                                                    color="primary"
                                                ></v-progress-circular>
                                            </v-row>
                                        </template>
                                    </v-img>
                                </v-avatar>
                                <div class="social-links mt-4 ml-6">
                                    <v-btn
                                        v-for="(social, index) in socialLinks"
                                        :key="index"
                                        :icon="social.icon"
                                        variant="text"
                                        size="small"
                                        class="mx-1"
                                        :href="social.link"
                                        target="_blank"
                                    ></v-btn>
                                </div>
                            </div>
                        </v-col>

                        <!-- Bio Section -->
                        <v-col cols="12" md="12" class="bio-section pa-6">
                            <v-fade-transition>
                                <div class="bio-content">
                                    <h2 class="text-h4 mb-6 font-weight-bold ">About Me</h2>
                                    <div class="bio-text  text-body-1">
                                        <v-expand-transition>
                                            <div>
                                                <p v-for="(paragraph, index) in bioParagraphs" 
                                                   :key="index" 
                                                   class="mb-0"
                                                >
                                                    {{ paragraph }}
                                                </p>
                                            </div>
                                        </v-expand-transition>
                                    </div>
                                    
                                   
                                </div>
                            </v-fade-transition>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed , onMounted} from 'vue'
import 'animate.css'

const formattedDateTime = ref('2025-03-01 06:42:36')
const userLogin = ref('Robel-GH')

const currentTimeGreeting = computed(() => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning!"
    if (hour < 18) return "Good Afternoon!"
    return "Good Evening!"
})

const bioParagraphs = [
    'Fullstack Developer with 5+ years of expertise in building modern web applications with Vue.js, React, Node.js, and Django.'+
    'Proven ability to design intuitive, visually engaging interfaces including role-based dashboards, dynamic reports, and high-conversion landing pages paired with scalable backend systems.'+
    'Skilled in developing secure RESTful APIs, JWT authentication, and optimized databases.'+
    'Assistant lecturer at Mekelle Institute of Technology, Mekelle University, Tigray, with a strong background in computer science and software engineering.'
]

const skills = [
    'Vue.js',
    'Node.js',
    'Express.js',
    'MongoDB',
    'MySQL',
    'Firebase',
    'Docker',
    'Git',
    'Linux',
    'REST APIs',
    'TypeScript',
    'AWS'
]

const socialLinks = [
    { icon: 'mdi-github', link: 'https://github.com/Robel-GH' },
    { icon: 'mdi-linkedin', link: 'https://linkedin.com/in/robel-gh' },
    { icon: 'mdi-email', link: 'mailto:robelgh103@gmail.com' }
]


const typingText = ref('')
const texts = ['Fullstack Developer', 'Vue.js,React,Node.js and Django Specialist', 'ML/DL Enthusiast']
let textIndex = 0
let charIndex = 0
let isDeleting = false

const typeEffect = () => {
    if (!isDeleting && charIndex < texts[textIndex].length) {
        typingText.value += texts[textIndex][charIndex]
        charIndex++
    } else if (isDeleting && charIndex > 0) {
        typingText.value = typingText.value.slice(0, -1)
        charIndex--
    }

    if (!isDeleting && charIndex === texts[textIndex].length) {
        setTimeout(() => (isDeleting = true), 2000) // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % texts.length // Move to next text
    }

    setTimeout(typeEffect, isDeleting ? 100 : 150) // Typing and deleting speed
}

onMounted(() => {
    typeEffect()
})


const downloadCV = () => {
  const pdfUrl = '/resume/resume.pdf'; 
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.setAttribute('download', 'robel-gh-resume.pdf'); 
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style scoped>
.about-container {
    background: var(--v-background-base);
    min-height: 100vh;
}

.title-card {
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
}

.title-card:hover {
    transform: translateY(-5px);
}

.greeting-text {
    background: linear-gradient(45deg, #FF6B6B, #187c75);
    -webkit-background-clip: text;
    color: transparent;
    animation: fadeIn 1s ease-in;
}

.typing-container {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: var(--v-primary-lighten-1);
}

.cursor {
    font-size: 1.2rem;
    color: var(--v-primary-lighten-1);
    animation: cursor-blink 0.8s steps(2) infinite;
}

@keyframes cursor-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

.profile-avatar {
    border: 4px solid rgba(255, 255, 255, 0.2);
    transition: transform 0.3s ease;
}

.profile-avatar:hover {
    transform: scale(1.05);
}

.social-links {
    opacity: 0.8;
    transition: opacity 0.3s ease;
}

.social-links:hover {
    opacity: 1;
}

.bio-content {
    animation: fadeIn 1s ease-in;
}

.bio-text {
    line-height: 1.8;
    opacity: 0.9;
}

.skills-section {
    animation: slideUp 0.5s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes cursor-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

@keyframes typing {
    from { width: 0; }
    to { width: 100%; }
}

@keyframes typing-infinite {
    0%, 50% { width: 100%; }
    60%, 70% { width: 0; }
    80%, 100% { width: 100%; }
}

.datetime-display {
    animation: fadeIn 1s ease-in;
}

/* Responsive Design */
@media (max-width: 960px) {
    .profile-section {
        order: -1;
    }
    
    .title-card {
        margin-top: 2rem !important;
    }
    
    .content-card {
        margin: 1rem !important;
    }
}

@media (max-width: 600px) {
    .greeting-text {
        font-size: 2rem !important;
    }
    
    .typing::after {
        font-size: 1rem;
    }
    
    .profile-avatar {
        size: 150px !important;
    }
}
</style>