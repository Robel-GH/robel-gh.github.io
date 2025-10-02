<template>
   <v-container fluid>
    <v-row justify="center" class="mb-2" >
        
        <v-col cols="12" md="10" lg="10">
          <v-card class="contact-card pa-4" variant="text" rounded="xl" elevation="10">
            <div class="section-header text-center mb-6">
              <div class="header-decoration">
                <v-icon icon="mdi-email" size="x-large" class="header-icon mb-12"></v-icon>
              </div>
              <v-card-title class="section-title text-h5  font-weight-bold mb-2">          
                Get In Touch
              </v-card-title>
    
              <v-card-subtitle class="section-subtitle text-body-1 opacity-80 mb-0">
                Have a question or want to work together? Drop me a message!
              </v-card-subtitle>
              <div class="title-underline"></div>
            </div>
  
            <v-form
              ref="form"
              v-model="valid"
              @submit.prevent="submitForm"
              class="px-2"
            >
              <v-row>
                <!-- Name Field -->
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.name"
                    :rules="nameRules"
                    label="Full Name"
                    required
                    variant="outlined"
                    prepend-inner-icon="mdi-account"
                    :loading="loading"
                    :disabled="loading"
                    rounded
                  ></v-text-field>
                </v-col>
  
                <!-- Email Field -->
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.email"
                    :rules="emailRules"
                    label="Email"
                    required
                    variant="outlined"
                    prepend-inner-icon="mdi-email"
                    :loading="loading"
                    :disabled="loading"
                    rounded
                  ></v-text-field>
                </v-col>
  
                <!-- Subject Field -->
                <v-col cols="12">
                  <v-text-field
                    v-model="formData.subject"
                    :rules="subjectRules"
                    label="Subject"
                    required
                    variant="outlined"
                    prepend-inner-icon="mdi-text-box-outline"
                    :loading="loading"
                    :disabled="loading"
                    rounded
                  ></v-text-field>
                </v-col>
  
                <!-- Message Field -->
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.message"
                    :rules="messageRules"
                    label="Message"
                    required
                    variant="outlined"
                    prepend-inner-icon="mdi-message-text"
                    :loading="loading"
                    :disabled="loading"
                    rows="4"
                    rounded
                  ></v-textarea>
                </v-col>
  
                <!-- Submit Button -->
                <v-col cols="12" class="text-center">
                  <v-spacer></v-spacer>
                  <v-btn
                    type="submit"
                    :loading="loading"
                    :disabled="!valid || loading"
                    color="primary"
                    size="large"
                    class="px-8"
                    rounded
                  >
                    <v-icon left class="me-2">mdi-send</v-icon>
                    Send Message
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
  
          <!-- Success/Error Snackbar -->
          <v-snackbar
            v-model="snackbar.show"
            :color="snackbar.color"
            :timeout="6000"
            top
          >
            {{ snackbar.text }}
            <template v-slot:actions>
              <v-btn
               rounded
                color="white"
                variant="text"
                @click="snackbar.show = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-col>
      </v-row>
   </v-container>
  
</template>

<script>
import { ref, reactive } from 'vue'
import emailjs from '@emailjs/browser'

export default {
  name: 'ContactForm',
  
  setup() {
    const form = ref(null)
    const valid = ref(false)
    const loading = ref(false)

    const formData = reactive({
      name: '',
      email: '',
      subject: '',
      message: ''
    })

    const snackbar = reactive({
      show: false,
      text: '',
      color: 'success'
    })

    // Validation Rules
    const nameRules = [
      v => !!v || 'Name is required',
      v => v?.length >= 2 || 'Name must be at least 2 characters'
    ]

    const emailRules = [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'Email must be valid'
    ]

    const subjectRules = [
      v => !!v || 'Subject is required',
      v => v?.length >= 3 || 'Subject must be at least 3 characters'
    ]

    const messageRules = [
      v => !!v || 'Message is required',
      v => v?.length >= 10 || 'Message must be at least 10 characters'
    ]

    const submitForm = async () => {
      const { valid } = await form.value.validate()
      
      if (valid) {
        loading.value = true
        
        try {
          const result = await emailjs.send(
            '', //service_id
            '',//template_id
            {
              from_name: formData.name,
              from_email: formData.email,
              subject: formData.subject,
              message: formData.message,
              to_name: 'Robel-GH', 
              reply_to: formData.email,
            },
            ''//
          )

          if (result.status === 200) {
            snackbar.color = 'success'
            snackbar.text = 'Message sent successfully! I will get back to you soon.'
            
            // Reset form
            form.value.reset()
            Object.keys(formData).forEach(key => formData[key] = '')
          }
        } catch (error) {
          console.error('Error sending email:', error)
          snackbar.color = 'error'
          snackbar.text = 'Email web service is temporarily unavailable. Please reach out via Gmail or LinkedIn. Thank you!'
        } finally {
          loading.value = false
          snackbar.show = true
        }
      }
    }

    return {
      form,
      valid,
      loading,
      formData,
      snackbar,
      nameRules,
      emailRules,
      subjectRules,
      messageRules,
      submitForm
    }
  }
}
</script>

<style scoped>
.contact-form {
  /* background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); */
}

.contact-card {
  border-radius: 16px;
  /* background: white; */
  box-shadow: 0 8px 30px rgba(var(--v-theme-primary), 0.15);
  transition: transform 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
}

.v-btn {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Form animation */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* Section Header Styles - Consistent with Awards */
.section-header {
  position: relative;
  margin-bottom: 2rem;
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
  color: rgba(var(--v-theme-on-surface), 0.7);
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

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes expandWidth {
  from { width: 0; }
  to { width: 80px; }
}

/* Mobile responsive adjustments */
@media (max-width: 960px) {
  .contact-card {
    margin: 1rem 0.5rem;
    padding: 1.5rem !important;
  }
}

@media (max-width: 600px) {
  .contact-card {
    margin: 0.5rem 0.25rem;
    padding: 1rem !important;
  }
  
  .v-card-title {
    font-size: 1.5rem !important;
  }
  
  .v-card-subtitle {
    font-size: 0.9rem !important;
    margin-bottom: 1rem !important;
  }
  
  .v-text-field, .v-textarea {
    margin-bottom: 0.5rem;
  }
  
  .v-btn {
    width: 100%;
    padding: 0.75rem 1rem;
  }
}

@media (max-width: 400px) {
  .contact-card {
    margin: 0.25rem;
    padding: 0.75rem !important;
  }
  
  .v-card-title {
    font-size: 1.25rem !important;
  }
  
  .v-card-subtitle {
    font-size: 0.85rem !important;
  }
  
  .v-text-field :deep(.v-field__input),
  .v-textarea :deep(.v-field__input) {
    font-size: 0.9rem;
  }
  
  .v-btn {
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;
  }
}
</style>