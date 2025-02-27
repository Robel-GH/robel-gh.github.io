<template>
    <v-row justify="center" >
        
      <v-col cols="12" md="8" lg="6">
        <v-card class="contact-card pa-4" variant="text" rounded="xl" elevation="10">
          <v-card-title class="text-center text-h4 font-weight-bold mb-4"  >          
            Get In Touch
          </v-card-title>

          <v-card-subtitle class="text-center mb-6">
            Have a question or want to work together? Drop me a message!
          </v-card-subtitle>

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
          // Replace with your EmailJS service ID, template ID, and public key
          const result = await emailjs.send(
            'service_znhy86q',
            'template_1y6g2hp',
            {
              from_name: formData.name,
              from_email: formData.email,
              subject: formData.subject,
              message: formData.message,
              to_name: 'Robel-GH', // Your name
              reply_to: formData.email,
            },
            '7Bemp3QiG6owHSXic'
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
          snackbar.text = 'Failed to send message. Please try again later.'
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
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
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

@media (max-width: 600px) {
  .contact-card {
    margin: 1rem;
  }
}
</style>