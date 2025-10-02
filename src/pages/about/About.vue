<template>
    <v-container class="about-container" fluid>
        <v-row class="mb-2" align="stretch">
            <!-- Hero Section -->
            <v-col cols="12" md="6" class="title-section mt-2 ml-md-16 d-flex">
                <v-card 
                    class="title-card pa-4 mt-md-16 pt-8" 
                    min-height="200" 
                    elevation="0"
                    rounded="xl"
                    variant="text"
                    
                >
                    <div class="text-center w-100">
                        <div class="hero-content">
                           
                            <div class="typing-container">
                                <span class="typing"><h1 class="text-h4 font-weight-bold mb-4">{{ typingText }}</h1></span>
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
            <v-col cols="12" md="4" class="mt-16 mt-md-8 content-section d-flex">
                <v-card 
                    class="content-card d-flex flex-column w-100" 
                    elevation="0" 
                    rounded="xl" 
                    :style="{ background: 'linear-gradient(135deg, var(--v-primary-base), var(--v-secondary-base))' }"
                >
                    <v-row class="ma-0 pa-2" align="center" justify="center">
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
                                <div class="social-links ">
                                    <v-btn
                                        v-for="(social, index) in socialLinks"
                                        :key="index"
                                        :icon="social.icon"
                                        variant="text"
                                        size="x-large"
                                        
                                        :href="social.link"
                                        target="_blank"
                                    ></v-btn>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <!-- Centered Bio Row -->
        <v-row justify="center" >
            <v-col cols="12" md="10" class="bio-section  mb-2">
                <v-fade-transition>
                    <div class="bio-content rounded-xl">
                        <h4 class="section-title  text-h5 font-weight-bold mb-4">About Me</h4>
                        <div class="bio-text text-body-1">
                            <v-expand-transition>
                                <div>
                                    <p class="bio-description" :style="{ textAlign: 'justify', textJustify: 'inter-word' }">
                                        {{ bioParagraphs }}
                                    </p>
                                </div>
                            </v-expand-transition>
                        </div>
                    </div>
                </v-fade-transition>
            </v-col>
            
        </v-row>

        <!-- Awards Section -->
        <v-row justify="center" class="mt-8">
            <v-col cols="12" md="11" class="awards-section">
                <v-fade-transition>
                    <div class="awards-content">
                        <!-- Section Header with Animation -->
                        <div class="section-header text-center mb-8">
                            <div class="header-decoration">
                                <v-icon icon="mdi-trophy-award" size="x-large" class="header-icon"></v-icon>
                            </div>
                            <h2 class="section-title text-h5 ml-2 font-weight-bold mb-2">
                                Awards & Scholarships
                            </h2>
                          
                            <div class="title-underline"></div>
                        </div>

                        <!-- Awards Grid -->
                        <div class="awards-grid">
                            <div 
                                v-for="(award, index) in awards" 
                                :key="index"
                                class="award-item"
                                :style="{ animationDelay: `${index * 0.2}s` }"
                            >
                                <div class="award-card-wrapper">
                                    <div 
                                        class="award-card"
                                        :class="`award-card-${index + 1}`"
                                    >
                                        <!-- Background Pattern -->
                                        <div class="card-pattern"></div>
                                        
                                        <!-- Floating Elements -->
                                        <div class="floating-elements">
                                            <div class="float-circle circle-1"></div>
                                            <div class="float-circle circle-2"></div>
                                            <div class="float-circle circle-3"></div>
                                        </div>

                                        <!-- Card Content -->
                                        <div class="card-content">
                                            <!-- Header with Icon and Year -->
                                            <div class="card-header">
                                                <div class="icon-wrapper">
                                                    <v-icon 
                                                        :icon="award.icon" 
                                                        size="x-large"
                                                        class="award-icon"
                                                    ></v-icon>
                                                    <div class="icon-glow"></div>
                                                </div>
                                                <div class="year-badge">
                                                    <span class="year-text">{{ award.year }}</span>
                                                </div>
                                            </div>

                                            <!-- Title -->
                                            <h3 class="award-title text-h6 font-weight-bold mb-3">
                                                {{ award.title }}
                                            </h3>

                                            <!-- Description -->
                                            <p class="award-description text-body-2 mb-4">
                                                {{ award.description }}
                                            </p>

                                            <!-- Bottom Accent -->
                                            <div class="card-accent"></div>
                                        </div>

                                        <!-- Hover Effects -->
                                        <div class="card-overlay"></div>
                                        <div class="shine-effect"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-fade-transition>
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

const bioParagraphs = 
  `I’m a Master’s student in Artificial Intelligence and Computer Science with a strong foundation in deep learning, intelligent systems, and software engineering. I build end-to-end AI products and scalable web applications.
   Skilled at architecting role-based dashboards, dynamic reporting systems,
  and high-conversion landing pages, as well as developing multi-agent AI workflows with CrewAI and 
  implementing deep-learning models using TensorFlow, PyTorch, and scikit-learn.
   Passionate about collaborating on open-source projects, optimizing cross-platform performance, and 
   driving innovation at the intersection of web development and artificial intelligence.`



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

const awards = [
    {
        title: 'Erasmus+ International Mobility Scholarships (MOST)',
        year: '2025/2026',
        description: 'International mobility scholarship for academic excellence and cross-cultural exchange in higher education.',
        icon: 'mdi-school'
    },
    {
        title: 'Erasmus+ Traineeship Scholarships (G.R.E.A.T.)',
        year: '2024/2025',
        description: 'Professional traineeship scholarship supporting international work experience and skill development.',
        icon: 'mdi-briefcase'
    },
    {
        title: 'Unical Admission - Masters Degree Extra EU with Scholarship',
        year: '2024/2025',
        description: 'Merit-based scholarship for international students pursuing Masters degree in Computer Science and AI.',
        icon: 'mdi-trophy'
    },
    {
        title: 'Undergraduate Excellence Scholarship',
        year: '2014',
        description: 'Academic excellence scholarship awarded by Mekelle Institute of Technology for outstanding performance.',
        icon: 'mdi-medal'
    }
]


const typingText = ref('')
const texts = ['Hello, I\'m Robel Gebrehiwot ',  'Master\'s Student in Artificial Intelligence and Computer Science',
                    'Fullstack Developer | Vue.js | Node.js | MongoDB | MySQL | Firebase | Docker | Git | Linux | REST APIs | TypeScript | AWS'
]
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
  const pdfUrl = '/resume/robel-resume.pdf'; 
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
    background: rgb(var(--v-theme-background));
    min-height: 100vh;
}

.title-card {
    border: 0px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
}

.title-card:hover {
    transform: translateY(-5px);
}

/* .greeting-text {
    background: linear-gradient(45deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: fadeIn 1s ease-in;
} */

.typing-container {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: var(--v-primary-lighten-1);
    background: linear-gradient(45deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: fadeIn 1s ease-in;
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

.bio-description {
    color: rgba(var(--v-theme-on-surface), 0.9);
    line-height: 1.6;
    font-size: 1rem;
    text-shadow: 0 1px 2px rgba(var(--v-theme-on-surface), 0.1);
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

/* Awards Section Styles */
.awards-section {
    animation: slideUp 0.8s ease-out;
    position: relative;
}

.awards-content {
    animation: fadeIn 1.2s ease-in;
}

/* Section Header */
.section-header {
    position: relative;
    margin-bottom: 4rem;
}

.header-decoration {
    position: relative;
    display: inline-block;
    margin-bottom: 1rem;
}

.header-icon {
    color: rgb(var(--v-theme-primary));
    filter: drop-shadow(0 0 20px rgba(var(--v-theme-primary), 0.5));
    animation: float 3s ease-in-out infinite;
}

.section-title {
    background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 50%, rgb(var(--v-theme-info)) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    position: relative;
    display: inline-block;
}

.section-subtitle {
    color: rgba(255, 255, 255, 0.7);
    font-style: italic;
}

.title-underline {
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
    margin: 1rem auto;
    border-radius: 2px;
    animation: expandWidth 1s ease-out 0.5s both;
}

/* Awards Grid */
.awards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.award-item {
    animation: slideInUp 0.8s ease-out both;
}

.award-card-wrapper {
    perspective: 1000px;
    height: 100%;
}

.award-card {
    position: relative;
    height: 280px;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-style: preserve-3d;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Individual Card Gradients using Primary Theme */
.award-card-1 {
    background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgba(var(--v-theme-primary), 0.8) 100%);
}

.award-card-2 {
    background: linear-gradient(135deg, rgb(var(--v-theme-secondary)) 0%, rgba(var(--v-theme-secondary), 0.8) 100%);
}

.award-card-3 {
    background: linear-gradient(135deg, rgb(var(--v-theme-info)) 0%, rgba(var(--v-theme-info), 0.8) 100%);
}

.award-card-4 {
    background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%);
}

/* Background Pattern */
.card-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
    background-image: 
        radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 2px, transparent 2px),
        radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 2px, transparent 2px);
    background-size: 30px 30px;
}

/* Floating Elements */
.floating-elements {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    overflow: hidden;
}

.float-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    animation: float 6s ease-in-out infinite;
}

.circle-1 {
    width: 60px;
    height: 60px;
    top: 10%;
    right: 10%;
    animation-delay: 0s;
}

.circle-2 {
    width: 40px;
    height: 40px;
    bottom: 20%;
    left: 15%;
    animation-delay: 2s;
}

.circle-3 {
    width: 30px;
    height: 30px;
    top: 60%;
    right: 20%;
    animation-delay: 4s;
}

/* Card Content */
.card-content {
    position: relative;
    z-index: 2;
    padding: 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.icon-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
}

.award-icon {
    color: white;
    z-index: 2;
    position: relative;
}

.icon-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    background: radial-gradient(circle, rgba(var(--v-theme-primary), 0.4) 0%, transparent 70%);
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
}

.year-badge {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 0.5rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.year-text {
    color: white;
    font-weight: 600;
    font-size: 0.85rem;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.award-title {
    color: white;
    line-height: 1.3;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    flex-grow: 1;
}

.award-description {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.5;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.card-accent {
    height: 4px;
    background: linear-gradient(90deg, rgba(var(--v-theme-primary), 0.8), rgba(var(--v-theme-primary), 0.2));
    border-radius: 2px;
    margin-top: auto;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
}

/* Hover Effects */
.card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(var(--v-theme-primary), 0.1) 0%, rgba(var(--v-theme-secondary), 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.shine-effect {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(var(--v-theme-primary), 0.15), transparent);
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
    transition: transform 0.6s ease;
}

/* Hover States */
.award-card:hover {
    transform: translateY(-10px) rotateX(5deg);
    box-shadow: 0 25px 50px rgba(0,0,0,0.3);
}

.award-card:hover .card-overlay {
    opacity: 1;
}

.award-card:hover .shine-effect {
    transform: translateX(100%) translateY(100%) rotate(45deg);
}

.award-card:hover .card-accent {
    transform: scaleX(1);
}

.award-card:hover .icon-wrapper {
    transform: scale(1.1);
}

/* Animations */
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

@keyframes pulse {
    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes expandWidth {
    from { width: 0; }
    to { width: 80px; }
}

/* Responsive Design */
@media (max-width: 960px) {
    .profile-section {
        order: -1;
    }
    
    .title-section {
        margin-left: 0 !important;
    }
    
    .title-card {
        margin-top: 1rem !important;
    }
    
    .content-card {
        margin: 1rem !important;
    }

    .about-container {
        padding: 1rem !important;
    }

    /* Awards responsive */
    .awards-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .award-card {
        height: 260px;
    }
    
    .section-header {
        margin-bottom: 2rem;
    }
}

@media (max-width: 600px) {
    .about-container {
        padding: 0.5rem !important;
    }

    .greeting-text {
        font-size: 1.5rem !important;
    }
    
    .typing-container {
        font-size: 1rem !important;
    }
    
    .typing-container h1 {
        font-size: 1.5rem !important;
    }
    
    .profile-avatar {
        size: 120px !important;
    }

    .bio-section {
        padding: 0 1rem;
    }

    .title-card {
        padding: 1rem !important;
        margin-top: 0.5rem !important;
    }

    /* Awards mobile */
    .awards-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .award-card {
        height: 220px;
    }
    
    .card-content {
        padding: 1rem;
    }
    
    .section-title {
        font-size: 1.5rem !important;
    }
    
    .icon-wrapper {
        width: 45px;
        height: 45px;
    }
    
    .award-card:hover {
        transform: translateY(-3px) rotateX(1deg);
    }

    .award-title {
        font-size: 1rem !important;
        line-height: 1.2;
    }

    .award-description {
        font-size: 0.85rem !important;
    }
}

/* Extra small devices */
@media (max-width: 400px) {
    .about-container {
        padding: 0.25rem !important;
    }

    .typing-container h1 {
        font-size: 1.25rem !important;
    }

    .profile-avatar {
        size: 100px !important;
    }

    .title-card {
        padding: 0.75rem !important;
    }

    .bio-section {
        padding: 0 0.5rem;
    }

    .section-title {
        font-size: 1.25rem !important;
    }

    .award-card {
        height: 200px;
    }

    .card-content {
        padding: 0.75rem;
    }

    .icon-wrapper {
        width: 40px;
        height: 40px;
    }

    .award-title {
        font-size: 0.9rem !important;
    }

    .award-description {
        font-size: 0.8rem !important;
    }

    .year-badge {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
    }
}
</style>