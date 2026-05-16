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
                                <span class="typing">
                                    <h1 class="hero-heading font-weight-bold mb-4">{{ typingText }}</h1>
                                </span>
                                <span class="cursor">|</span>
                            </div>

                            <v-btn
                                class="mt-6"
                                color="secondary"
                                elevation="10"
                                rounded
                                size="x-large"
                                variant="outlined"
                                href="https://www.upwork.com/freelancers/~013621e670994629ad"
                                target="_blank"
                            >
                                Hire Me
                            </v-btn>

                            <v-btn
                                class="mt-6 ml-2"
                                color="secondary"
                                elevation="10"
                                rounded
                                prepend-icon="mdi-download"
                                size="x-large"
                                variant="outlined"
                                @click="downloadCV"
                            >
                                Resume
                            </v-btn>
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

                                <div class="social-links">
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
        <v-row justify="center">
            <v-col cols="12" md="10" class="bio-section mb-2">
                <v-fade-transition>
                    <div class="bio-content rounded-xl">
                        <h4 class="section-title text-h5 font-weight-bold mb-4">About Me</h4>
                        <div class="bio-text text-body-1">
                            <v-expand-transition>
                                <div>
                                    <p
                                        v-for="(paragraph, index) in bioParagraphs"
                                        :key="index"
                                        class="bio-description mb-4"
                                        :style="{ textAlign: 'justify', textJustify: 'inter-word' }"
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

        <!-- Awards Section -->
        <v-row justify="center" class="mt-8">
            <v-col cols="12" md="11" class="awards-section">
                <v-fade-transition>
                    <div class="awards-content">
                        <!-- Section Header -->
                        <div class="section-header text-center mb-8">
                            <div class="header-decoration">
                                <v-icon icon="mdi-trophy-award" size="x-large" class="header-icon"></v-icon>
                            </div>
                            <h2 class="section-award-title mb-2">
                                Awards & Scholarships
                            </h2>
                            <div class="title-underline"></div>
                        </div>

                        <!-- Awards Grid -->
                        <div class="awards-grid">
                            <div 
                                v-for="(award, index) in awards" 
                                :key="award.title"
                                class="award-item"
                                :style="{ animationDelay: `${index * 0.2}s` }"
                            >
                                <div class="award-card-wrapper">
                                    <div 
                                        class="award-card"
                                        :class="`award-card-${(index % 4) + 1}`"
                                    >
                                        <div class="card-pattern"></div>

                                        <div class="floating-elements">
                                            <div class="float-circle circle-1"></div>
                                            <div class="float-circle circle-2"></div>
                                            <div class="float-circle circle-3"></div>
                                        </div>

                                        <div class="card-content">
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

                                            <h3 class="award-title font-weight-bold mb-2">
                                                {{ award.title }}
                                            </h3>

                                            <div
                                                v-if="award.badges?.length"
                                                class="winner-chip-list mb-3"
                                            >
                                                <v-chip
                                                    v-for="badge in award.badges"
                                                    :key="badge"
                                                    class="winner-chip"
                                                    size="small"
                                                    variant="flat"
                                                    prepend-icon="mdi-check-decagram"
                                                >
                                                    {{ badge }}
                                                </v-chip>
                                            </div>

                                            <p class="award-description text-body-2 mb-3">
                                                {{ award.description }}
                                            </p>

                                            <div class="card-accent"></div>
                                        </div>

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
import { ref, computed, onMounted } from 'vue'
import 'animate.css'

const formattedDateTime = ref('2025-03-01 06:42:36')
const userLogin = ref('Robel-GH')

const currentTimeGreeting = computed(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning!'
    if (hour < 18) return 'Good Afternoon!'
    return 'Good Evening!'
})

const bioParagraphs = [
    `I'm a research trainee. My work sits across generative AI, medical imaging, and trustworthy ML. Right now, I'm focused on controlled counterfactual editing of chest X-rays using diffusion models. I work with real images from MIMIC-CXR and study how thoracic findings can be added, removed, or modified without disturbing patient anatomy, the acquisition style of the image, or other structure that isn't disease-related.`,

    `I'm doing this work at York University as part of my MSc in AI and Computer Science at the University of Calabria. The point isn't just to generate realistic X-rays. It's to create clinically meaningful counterfactual pairs: two images where one pathology changes and the rest stays as fixed as possible. That opens up evaluation work the field cannot currently do well: testing classifiers on specific diseases, checking robustness under perturbation, investigating shortcut learning, and building explanations that actually explain.`,

    `I also build evidence-grounded LLM systems on the side. One is a fully local clinical RAG assistant that uses hybrid retrieval, an agentic critique step, and answer verification against retrieved evidence before returning responses. The other is a set of CrewAI-based multi-agent pipelines for applied decision workflows. What ties these projects together is that I care about whether the systems actually work: whether they are reliable, interpretable, and able to hold up when something is at stake.`
]

const skills = [
    'Vue.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Firebase',
    'Docker', 'Git', 'Linux', 'REST APIs', 'TypeScript', 'AWS'
]

const socialLinks = [
    { icon: 'mdi-github',   link: 'https://github.com/Robel-GH' },
    { icon: 'mdi-linkedin', link: 'https://linkedin.com/in/robel-gh' },
    { icon: 'mdi-email',    link: 'mailto:robelghb@gmail.com' }
]

const awards = [
    {
        title: 'Erasmus+ International Mobility Scholarships (MOST)',
        year: '2× Winner',
        badges: ['2025/2026 Winner', '2026/2027 Winner'],
        description: 'Awarded twice for international academic mobility, academic excellence, and cross-cultural exchange in higher education.',
        icon: 'mdi-school'
    },
    {
        title: 'Erasmus+ Traineeship Scholarships (G.R.E.A.T.)',
        year: '2× Winner',
        badges: ['2024/2025 Winner', '2025/2026 Winner'],
        description: 'Awarded twice for international traineeship, research exposure, and professional skill development.',
        icon: 'mdi-briefcase'
    },
    {
        title: 'Unical Admission - Masters Degree Extra EU with Scholarship',
        year: '2024/2025',
        description: 'Merit-based scholarship for international students pursuing a Masters degree in Computer Science and Artificial Intelligence.',
        icon: 'mdi-trophy'
    },
    {
        title: 'Undergraduate Excellence Scholarship',
        year: '2014',
        description: 'Academic excellence scholarship awarded by Mekelle Institute of Technology for outstanding undergraduate performance.',
        icon: 'mdi-medal'
    }
]

const typingText = ref('')
const texts = [
    'Hello, I\'m Robel Gebrehiwot ',
    'Research Trainee in Generative Models',
    'MSc. Candidate in AI & CS',
    'Senior Software Engineer'
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
        setTimeout(() => (isDeleting = true), 2000)
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % texts.length
    }

    setTimeout(typeEffect, isDeleting ? 100 : 150)
}

onMounted(() => {
    typeEffect()
})

const downloadCV = () => {
    const pdfUrl = '/resume/robel-resume.pdf'
    const link = document.createElement('a')
    link.href = pdfUrl
    link.setAttribute('download', 'robel-gh-resume.pdf')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
</script>

<style scoped>
/* ─── Hero / Typing ────────────────────────────────────────────────────────── */
.about-container {
    background: rgb(var(--v-theme-background));
    min-height: 100vh;
}

.title-card {
    border: 0 solid rgba(255, 255, 255, 0.1);
    transition: transform 0.4s ease;
}
.title-card:hover {
    transform: translateY(-6px);
}

.hero-heading {
    font-family: 'Jost', sans-serif;
    font-size: clamp(1.8rem, 4.5vw, 3.4rem) !important;
    letter-spacing: 0.02em !important;
    line-height: 1.2 !important;
    font-weight: 600 !important;
}

.typing-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(45deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: fadeIn 1s ease-in;
}

.cursor {
    font-size: 2rem;
    color: rgb(var(--v-theme-primary));
    animation: cursor-blink 0.8s steps(2) infinite;
    -webkit-text-fill-color: rgb(var(--v-theme-primary));
    margin-left: 2px;
}

@keyframes cursor-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
}

/* ─── Profile Card ──────────────────────────────────────────────────────────── */
.profile-avatar {
    border: 4px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.profile-avatar:hover {
    transform: scale(1.06);
}

.social-links {
    opacity: 0.85;
    transition: opacity 0.3s ease;
}
.social-links:hover {
    opacity: 1;
}

/* ─── Bio ────────────────────────────────────────────────────────────────────── */
.bio-content {
    animation: fadeIn 1s ease-in;
}

.bio-content .section-title {
    font-family: 'Jost', sans-serif;
    font-size: clamp(1.5rem, 2.5vw, 2rem) !important;
    font-weight: 600 !important;
    letter-spacing: 0.05em !important;
    background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 50%, rgb(var(--v-theme-info)) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
}

.bio-text {
    line-height: 1.8;
    opacity: 0.9;
    font-family: 'Jost', sans-serif;
}
.bio-description {
    color: rgba(var(--v-theme-on-surface), 0.9);
    line-height: 1.7;
    font-size: 1.05rem;
    text-shadow: 0 1px 2px rgba(var(--v-theme-on-surface), 0.1);
    font-family: 'Jost', sans-serif;
}

/* ─── Awards Section Header ─────────────────────────────────────────────────── */
.section-header .section-award-title {
    font-family: 'Jost', sans-serif;
    font-size: clamp(1.5rem, 2.5vw, 2rem) !important;
    font-weight: 600 !important;
    letter-spacing: 0.05em !important;
    background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 50%, rgb(var(--v-theme-info)) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    position: relative;
    display: inline-block;
}

/* ─── Award Cards ────────────────────────────────────────────────────────────── */
.awards-section {
    animation: slideUp 0.8s ease-out;
    position: relative;
}
.awards-content {
    animation: fadeIn 1.2s ease-in;
}

.awards-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
    max-width: 980px;
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
    height: 250px;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                box-shadow 0.45s ease;
    transform-style: preserve-3d;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.12);
}

.award-card-1 {
    background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgba(var(--v-theme-primary), 0.75) 100%);
}
.award-card-2 {
    background: linear-gradient(135deg, rgb(var(--v-theme-secondary)) 0%, rgba(var(--v-theme-secondary), 0.75) 100%);
}
.award-card-3 {
    background: linear-gradient(135deg, rgb(var(--v-theme-info)) 0%, rgba(var(--v-theme-info), 0.75) 100%);
}
.award-card-4 {
    background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%);
}

.card-pattern {
    position: absolute;
    inset: 0;
    opacity: 0.1;
    background-image: 
        radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 2px, transparent 2px),
        radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 2px, transparent 2px);
    background-size: 30px 30px;
}

.floating-elements {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
}
.float-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    animation: ci-float 6s ease-in-out infinite;
}
.circle-1 { width: 60px; height: 60px; top: 10%;  right: 10%; animation-delay: 0s; }
.circle-2 { width: 34px; height: 34px; bottom: 20%; left: 15%; animation-delay: 2s; }
.circle-3 { width: 30px; height: 30px; top: 60%;  right: 20%; animation-delay: 4s; }

.card-content {
    position: relative;
    z-index: 2;
    padding: 1.15rem;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
}

.icon-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease;
    flex: 0 0 auto;
}
.award-icon { color: white; z-index: 2; position: relative; }
.icon-glow {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 40px; height: 40px;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
    border-radius: 50%;
    animation: ci-pulse 2.5s ease-in-out infinite;
}

.year-badge {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 0.3rem 0.7rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    max-width: 145px;
    text-align: center;
}
.year-text {
    color: white;
    font-weight: 600;
    font-size: 0.8rem;
    font-family: 'Jost', sans-serif;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    line-height: 1.25;
}

.award-title {
    font-family: 'Jost', sans-serif;
    font-size: 1.02rem !important;
    font-weight: 600 !important;
    color: white;
    line-height: 1.3;
    text-shadow: 0 2px 6px rgba(0,0,0,0.3);
    flex-grow: 1;
}
.award-description {
    color: rgba(255, 255, 255, 0.88);
    line-height: 1.42;
    font-family: 'Jost', sans-serif;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.winner-chip-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    align-items: flex-start;
}

.winner-chip {
    align-self: flex-start;
    background: rgba(255, 255, 255, 0.18) !important;
    color: white !important;
    border: 1px solid rgba(255, 255, 255, 0.32);
    backdrop-filter: blur(10px);
    font-family: 'Jost', sans-serif;
    font-weight: 700;
    letter-spacing: 0.01em;
}

.card-accent {
    height: 3px;
    background: linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,0.15));
    border-radius: 2px;
    margin-top: auto;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s ease;
}
.card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
}
.shine-effect {
    position: absolute;
    top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.12), transparent);
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
    transition: transform 0.65s ease;
}

/* Hover */
.award-card:hover {
    transform: translateY(-10px) rotateX(4deg);
    box-shadow: 0 28px 56px rgba(0,0,0,0.35);
}
.award-card:hover .card-overlay  { opacity: 1; }
.award-card:hover .shine-effect  { transform: translateX(100%) translateY(100%) rotate(45deg); }
.award-card:hover .card-accent   { transform: scaleX(1); }
.award-card:hover .icon-wrapper  { transform: scale(1.1); }

/* ─── Animations ──────────────────────────────────────────────────────────────── */
@keyframes fadeIn    { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
@keyframes slideInUp { from { opacity:0; transform:translateY(50px); } to { opacity:1; transform:translateY(0); } }
@keyframes ci-pulse {
    0%, 100% { opacity: 0.5; transform: translate(-50%,-50%) scale(1); }
    50%       { opacity: 1;   transform: translate(-50%,-50%) scale(1.12); }
}

/* ─── Responsive ──────────────────────────────────────────────────────────────── */
@media (max-width: 960px) {
    .profile-section    { order: -1; }
    .title-section      { margin-left: 0 !important; }
    .title-card         { margin-top: 1rem !important; }
    .content-card       { margin: 1rem !important; }
    .about-container    { padding: 1rem !important; }
    .awards-grid        { grid-template-columns: 1fr; gap: 1.5rem; }
    .award-card         { height: 245px; }
}

@media (max-width: 600px) {
    .about-container    { padding: 0.5rem !important; }
    .hero-heading       { font-size: 1.6rem !important; }
    .typing-container   { font-size: 1rem !important; }
    .bio-section        { padding: 0 1rem; }
    .title-card         { padding: 1rem !important; margin-top: 0.5rem !important; }
    .awards-grid        { grid-template-columns: 1fr; gap: 1rem; }
    .award-card         { height: 230px; }
    .card-content       { padding: 1rem; }
    .year-badge         { max-width: 130px; }
    .year-text          { font-size: 0.74rem; }
}

@media (max-width: 400px) {
    .about-container    { padding: 0.25rem !important; }
    .hero-heading       { font-size: 1.35rem !important; }
    .title-card         { padding: 0.75rem !important; }
    .bio-section        { padding: 0 0.5rem; }
    .award-card         { height: 220px; }
    .card-content       { padding: 0.75rem; }
    .icon-wrapper       { width: 44px; height: 44px; }
    .award-title        { font-size: 1rem !important; }
    .award-description  { font-size: 0.82rem !important; }
    .year-badge         { max-width: 115px; padding: 0.25rem 0.5rem; }
    .year-text          { font-size: 0.7rem; }
}
</style>
