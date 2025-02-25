<template>
  <v-container fluid>
     <h1 class="ml-4">Projects</h1>
     <v-card class="ma-4" variant="text" elevation="10" rounded="xl" v-for="project in Projects" :key="project.title">
      <v-card-title><strong>{{ project.title }}</strong></v-card-title>
      <v-card-text class="ma-4">
        <v-row >
            <v-col cols="12" md="4" class="d-flex flex-column">
                <iframe
                    class="flex-grow-1"
                    width="100%"
                    height="100%"
                    :src="project.videoUrl"
                    title="YouTube Video"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </v-col>
            <v-col cols="12"  md="8">
             <v-card variant="text" class="pa-4" dark>
                <v-card-title>Description</v-card-title>
                <v-divider></v-divider>
                <v-card-text>{{ project.description }}</v-card-text>
                
                <v-card-actions>
                    
                    <v-btn rounded color="info" variant="tonal">
                        {{project.role}}
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn :href="project.githubLink" target="_blank" icon>
                    <v-icon>mdi-github</v-icon>
                    </v-btn>
                </v-card-actions>
             </v-card>
            </v-col>
        </v-row>
        
      </v-card-text>

    
    </v-card>
        
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const Projects = ref([
    {
        title: "Unical Phonebook and Messaging App",
        description: "A centralized platform for managing university contacts, featuring real-time messaging to enhance communication among faculty, staff, and students. It includes role-based access, searchable profiles, and privacy controls within a user-friendly, mobile-responsive interface. Built with Vue.js, Vuetify, Pinia, stomp, and Spring Boot, it streamlines collaboration and connectivity.",
        videoUrl: "https://www.youtube.com/embed/JBIdZ6LuLWM", 
        githubLink: "https://github.com/your-repo-link", 
        role:"Frontend Developer"
    },
     {
       title: "Sales Management System",
       description: "A robust application to optimize sales tracking, streamline client management, and enhance inventory control, resulting in improved operational efficiency. Indigent Management System | Full-stack Developer Developed a system to effectively manage resources and track data for indigent support programs, with a focus on accessibility and ease of use.",
       videoUrl: "https://youtube.com/embed/ccpMfbHWkHI", 
       githubLink: "https://github.com/your-repo-link", 
       role:"Full Stack Developer"
    },
    
]);
 
 
</script>
