<template>
  <v-container class="skills-container py-4" fluid>
    <v-row justify="center">
      <v-col cols="12" md="11">
        <!-- Section Header -->
        <div class="section-header text-center mb-8">
          <div class="header-decoration">
            <v-icon icon="mdi-brain" size="x-large" class="header-icon"></v-icon>
          </div>

          <h2 class="section-skills-title text-h5 ml-2 font-weight-bold mb-2 animate__animated animate__fadeIn">
            Technical Skills & Expertise
          </h2>

          <div class="title-underline"></div>
        </div>

        <v-card class="skills-card animate__animated animate__fadeInUp" variant="text" rounded="xl">
          <!-- Mobile Layout -->
          <div v-if="mobile" class="mobile-layout">
            <v-tabs
              v-model="activeTab"
              direction="horizontal"
              show-arrows
              slider-color="secondary"
              density="comfortable"
              class="mobile-tabs"
            >
              <v-tab
                v-for="category in skillCategories"
                :key="category.id"
                :value="category.id"
                class="text-caption mobile-tab"
              >
                <v-icon :icon="category.icon" size="small" class="me-1"></v-icon>
                <span class="mobile-tab-text">{{ category.name }}</span>
              </v-tab>
            </v-tabs>

            <v-window v-model="activeTab" class="pa-4">
              <v-window-item
                v-for="category in skillCategories"
                :key="category.id"
                :value="category.id"
              >
                <div class="category-intro mb-4">
                  <div class="d-flex align-center justify-space-between flex-wrap ga-2 mb-2">
                    <h3 class="category-title mb-0">
                      <v-icon :icon="category.icon" :color="category.color" size="small" class="me-1"></v-icon>
                      {{ category.name }}
                    </h3>
                    <v-chip :color="category.color" size="small" variant="tonal">
                      {{ category.groups.length }} Categories
                    </v-chip>
                  </div>
                </div>

                <!-- Mobile inner tabs: horizontal, same behavior as outer mobile tabs -->
                <v-tabs
                  v-model="category.activeGroup"
                  direction="horizontal"
                  show-arrows
                  slider-color="secondary"
                  density="comfortable"
                  class="mobile-tabs inner-mobile-tabs mb-4"
                >
                  <v-tab
                    v-for="group in category.groups"
                    :key="group.id"
                    :value="group.id"
                    class="text-caption mobile-tab inner-mobile-tab"
                  >
                    <v-icon :icon="group.icon" size="small" class="me-1"></v-icon>
                    <span class="mobile-tab-text">{{ group.name }}</span>
                  </v-tab>
                </v-tabs>

                <v-window v-model="category.activeGroup">
                  <v-window-item
                    v-for="group in category.groups"
                    :key="group.id"
                    :value="group.id"
                  >
                    <section class="skill-group animate__animated animate__fadeIn">
                      <div class="group-heading mb-4">
                        <v-icon :icon="group.icon" :color="category.color" size="large" class="me-2"></v-icon>
                        <h3>{{ group.name }}</h3>
                      </div>

                      <div :class="['item-card-stack', getCardGridClass(group.items.length)]">
                        <v-hover
                          v-for="item in group.items"
                          :key="item.id"
                          v-slot="{ isHovering, props }"
                        >
                          <v-card
                            v-bind="props"
                            :elevation="isHovering ? 10 : 2"
                            :class="{ 'on-hover': isHovering }"
                            class="technology-card"
                          >
                            <v-card-item>
                              <v-card-title class="technology-card-title">
                                {{ item.name }}
                              </v-card-title>

                              <v-card-text>
                                <div class="d-flex justify-space-between align-center mb-1">
                                  <span class="technology-name">Proficiency</span>
                                  <span class="technology-level">{{ item.level }}%</span>
                                </div>

                                <v-progress-linear
                                  :model-value="item.level"
                                  :color="category.color"
                                  height="8"
                                  rounded
                                  class="technology-progress mb-4"
                                >
                                  <template v-slot:default>
                                    <div class="skill-progress-overlay"></div>
                                  </template>
                                </v-progress-linear>

                                <div v-if="item.technologies?.length" class="mb-4">
                                  <div class="panel-label mb-2">Related technologies</div>
                                  <div class="chip-list">
                                    <v-chip
                                      v-for="tech in item.technologies"
                                      :key="tech"
                                      :color="category.color"
                                      size="small"
                                      variant="outlined"
                                      class="text-caption"
                                    >
                                      {{ tech }}
                                    </v-chip>
                                  </div>
                                </div>

                                <div v-if="item.projects?.length">
                                  <div class="panel-label mb-2">Projects</div>
                                  <div class="chip-list">
                                    <v-chip
                                      v-for="project in item.projects"
                                      :key="project"
                                      :color="category.color"
                                      size="small"
                                      variant="tonal"
                                      class="text-caption project-chip"
                                    >
                                      {{ project }}
                                    </v-chip>
                                  </div>
                                </div>
                              </v-card-text>
                            </v-card-item>
                          </v-card>
                        </v-hover>
                      </div>
                    </section>
                  </v-window-item>
                </v-window>
              </v-window-item>
            </v-window>
          </div>

          <!-- Desktop Layout -->
          <v-row v-else no-gutters>
            <!-- Desktop main tabs: collapsed icon-only rail -->
            <v-col
              cols="auto"
              :class="['desktop-main-tabs-col pr-md-4', { 'desktop-main-tabs-col--expanded': !mainTabsCollapsed }]"
            >
              <div :class="['tab-rail-shell', { 'tab-rail-shell--expanded': !mainTabsCollapsed }]">
                <v-btn
                  icon
                  variant="text"
                  size="small"
                  class="rail-toggle"
                  :aria-label="mainTabsCollapsed ? 'Expand main tabs' : 'Collapse main tabs'"
                  @click="mainTabsCollapsed = !mainTabsCollapsed"
                >
                  <v-icon :icon="mainTabsCollapsed ? 'mdi-chevron-right' : 'mdi-chevron-left'"></v-icon>
                  <v-tooltip activator="parent" location="end">
                    {{ mainTabsCollapsed ? 'Expand tabs' : 'Collapse tabs' }}
                  </v-tooltip>
                </v-btn>

                <v-tabs
                  v-model="activeTab"
                  direction="vertical"
                  show-arrows
                  slider-color="secondary"
                  density="comfortable"
                  :class="['icon-only-tabs main-icon-tabs', { 'tabs-expanded': !mainTabsCollapsed }]"
                >
                  <v-tab
                    v-for="category in skillCategories"
                    :key="category.id"
                    :value="category.id"
                    :class="['icon-only-tab', { 'icon-only-tab--expanded': !mainTabsCollapsed }]"
                    :aria-label="category.name"
                  >
                    <v-icon :icon="category.icon" size="large"></v-icon>
                    <span v-if="!mainTabsCollapsed" class="tab-expanded-label">{{ category.name }}</span>
                    <v-tooltip v-if="mainTabsCollapsed" activator="parent" location="end">
                      {{ category.name }}
                    </v-tooltip>
                  </v-tab>
                </v-tabs>
              </div>
            </v-col>

            <v-col>
              <v-window v-model="activeTab" class="pa-6">
                <v-window-item
                  v-for="category in skillCategories"
                  :key="category.id"
                  :value="category.id"
                >
                  <div class="category-intro mb-6">
                    <div class="d-flex align-center justify-space-between flex-wrap ga-2 mb-2">
                      <h3 class="category-title mb-0">
                        <v-icon :icon="category.icon" :color="category.color" size="small" class="me-1"></v-icon>
                        {{ category.name }}
                      </h3>
                      <v-chip :color="category.color" size="small" variant="tonal">
                        {{ category.groups.length }} Categories
                      </v-chip>
                    </div>
                  </div>

                  <div :class="['inner-layout', { 'inner-layout--expanded': !innerTabsCollapsed }]">
                    <!-- Desktop inner tabs: collapsed icon-only rail -->
                    <div :class="['inner-tabs-shell', { 'inner-tabs-shell--expanded': !innerTabsCollapsed }]">
                      <v-btn
                        icon
                        variant="text"
                        size="small"
                        class="rail-toggle"
                        :aria-label="innerTabsCollapsed ? 'Expand inner tabs' : 'Collapse inner tabs'"
                        @click="innerTabsCollapsed = !innerTabsCollapsed"
                      >
                        <v-icon :icon="innerTabsCollapsed ? 'mdi-chevron-right' : 'mdi-chevron-left'"></v-icon>
                        <v-tooltip activator="parent" location="end">
                          {{ innerTabsCollapsed ? 'Expand groups' : 'Collapse groups' }}
                        </v-tooltip>
                      </v-btn>

                      <v-tabs
                        v-model="category.activeGroup"
                        direction="vertical"
                        show-arrows
                        slider-color="secondary"
                        density="comfortable"
                        :class="['icon-only-tabs inner-icon-tabs', { 'tabs-expanded': !innerTabsCollapsed }]"
                      >
                        <v-tab
                          v-for="group in category.groups"
                          :key="group.id"
                          :value="group.id"
                          :class="['icon-only-tab inner-icon-tab', { 'icon-only-tab--expanded': !innerTabsCollapsed }]"
                          :aria-label="group.name"
                        >
                          <v-icon :icon="group.icon" size="large"></v-icon>
                          <span v-if="!innerTabsCollapsed" class="tab-expanded-label">{{ group.name }}</span>
                          <v-tooltip v-if="innerTabsCollapsed" activator="parent" location="end">
                            {{ group.name }}
                          </v-tooltip>
                        </v-tab>
                      </v-tabs>
                    </div>

                    <div class="inner-content-shell">
                      <v-window v-model="category.activeGroup">
                        <v-window-item
                          v-for="group in category.groups"
                          :key="group.id"
                          :value="group.id"
                        >
                          <section class="skill-group animate__animated animate__fadeIn">
                            <div class="group-heading mb-4">
                              <v-icon :icon="group.icon" :color="category.color" size="large" class="me-2"></v-icon>
                              <h3>{{ group.name }}</h3>
                            </div>

                            <div :class="['item-card-stack', getCardGridClass(group.items.length)]">
                              <v-hover
                                v-for="item in group.items"
                                :key="item.id"
                                v-slot="{ isHovering, props }"
                              >
                                <v-card
                                  v-bind="props"
                                  :elevation="isHovering ? 10 : 2"
                                  :class="{ 'on-hover': isHovering }"
                                  class="technology-card"
                                >
                                  <v-card-item>
                                    <v-card-title class="technology-card-title">
                                      {{ item.name }}
                                    </v-card-title>

                                    <v-card-text>
                                      <div class="d-flex justify-space-between align-center mb-1">
                                        <span class="technology-name">Proficiency</span>
                                        <span class="technology-level">{{ item.level }}%</span>
                                      </div>

                                      <v-progress-linear
                                        :model-value="item.level"
                                        :color="category.color"
                                        height="8"
                                        rounded
                                        class="technology-progress mb-4"
                                      >
                                        <template v-slot:default>
                                          <div class="skill-progress-overlay"></div>
                                        </template>
                                      </v-progress-linear>

                                      <div v-if="item.technologies?.length" class="mb-4">
                                        <div class="panel-label mb-2">Related technologies</div>
                                        <div class="chip-list">
                                          <v-chip
                                            v-for="tech in item.technologies"
                                            :key="tech"
                                            :color="category.color"
                                            size="small"
                                            variant="outlined"
                                            class="text-caption"
                                          >
                                            {{ tech }}
                                          </v-chip>
                                        </div>
                                      </div>

                                      <div v-if="item.projects?.length">
                                        <div class="panel-label mb-2">Projects</div>
                                        <div class="chip-list">
                                          <v-chip
                                            v-for="project in item.projects"
                                            :key="project"
                                            :color="category.color"
                                            size="small"
                                            variant="tonal"
                                            class="text-caption project-chip"
                                          >
                                            {{ project }}
                                          </v-chip>
                                        </div>
                                      </div>
                                    </v-card-text>
                                  </v-card-item>
                                </v-card>
                              </v-hover>
                            </div>
                          </section>
                        </v-window-item>
                      </v-window>
                    </div>
                  </div>
                </v-window-item>
              </v-window>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import 'animate.css'

const { mobile } = useDisplay()
const activeTab = ref('ai-ml')
const mainTabsCollapsed = ref(true)
const innerTabsCollapsed = ref(true)

const getCardGridClass = (count) => {
  if (count % 3 === 0) return 'item-card-stack--three'
  if (count % 2 === 0) return 'item-card-stack--two'
  return 'item-card-stack--three'
}

const skillCategories = ref([
  {
    id: 'ai-ml',
    name: 'AI/ML',
    icon: 'mdi-brain',
    color: 'secondary',
    activeGroup: 'generative-ai',
    groups: [
      {
        id: 'generative-ai',
        name: 'Generative AI',
        icon: 'mdi-chart-scatter-plot',
        items: [
          {
            id: 'diffusion-models',
            name: 'Diffusion Models',
            level: 88,
            technologies: ['Latent Diffusion', 'DDPM', 'Stable Diffusion', 'ControlNet', 'Hugging Face Diffusers'],
            projects: ['Generative Medical Imaging Research', 'Chest X-ray Editing Thesis Direction']
          },
          {
            id: 'medical-generation',
            name: 'Medical Image Generation',
            level: 87,
            technologies: ['MIMIC-CXR', 'Medical Image Editing', 'GANs', 'VAEs', 'Anatomy-Preserving Editing'],
            projects: ['Chest X-ray Editing Thesis Direction']
          }
        ]
      },
      {
        id: 'rag-llms',
        name: 'RAG & LLMs',
        icon: 'mdi-file-document',
        items: [
          {
            id: 'clinical-rag',
            name: 'Clinical RAG',
            level: 90,
            technologies: ['RAG', 'Hybrid Search', 'PDF Parsing', 'Citation Grounding', 'Answer Verification'],
            projects: ['Clinical RAG Medical Assistant', 'LLM-LAB Course Project']
          },
          {
            id: 'local-llms',
            name: 'Local LLMs',
            level: 88,
            technologies: ['LLMs', 'Ollama', 'Agentic Workflow', 'Prompt Engineering', 'Medical Web Fallback'],
            projects: ['Clinical RAG Medical Assistant']
          },
          {
            id: 'retrieval',
            name: 'Retrieval',
            level: 87,
            technologies: ['BM25', 'Dense Retrieval', 'Embeddings', 'Vector Stores', 'Semantic Search'],
            projects: ['Clinical RAG Medical Assistant', 'Neo4j Hybrid Paper Search']
          }
        ]
      },
      {
        id: 'medical-ai',
        name: 'Deep Learning & Medical AI',
        icon: 'mdi-medical-bag',
        items: [
          {
            id: 'deep-learning',
            name: 'Deep Learning',
            level: 90,
            technologies: ['PyTorch', 'TorchVision', 'CNNs', 'Transfer Learning', 'scikit-learn'],
            projects: ['Automatic Medical Report Generator']
          },
          {
            id: 'vision-language',
            name: 'Vision-Language AI',
            level: 86,
            technologies: ['Transformers', 'Computer Vision', 'NLP', 'Medical Report Generation'],
            projects: ['Automatic Medical Report Generator']
          }
        ]
      },
      {
        id: 'planning-agents',
        name: 'AI Planning & Agents',
        icon: 'mdi-robot',
        items: [
          {
            id: 'planning',
            name: 'AI Planning',
            level: 86,
            technologies: ['PDDL', 'Automated Planning', 'Planning Visualization', 'Domain Modeling'],
            projects: ['Dynamic PDDL Visualizer']
          },
          {
            id: 'search-agents',
            name: 'Search Agents',
            level: 85,
            technologies: ['Search Algorithms', 'Rule-Based AI', 'Agent Design', 'Puzzle Solving'],
            projects: ['Keke AI Competition']
          }
        ]
      },
      {
        id: 'gpu-computing',
        name: 'GPU Computing',
        icon: 'mdi-chip',
        items: [
          {
            id: 'cuda',
            name: 'CUDA',
            level: 85,
            technologies: ['GPU Kernels', 'Parallel Computing', 'NVIDIA GPUs', 'Memory Optimization'],
            projects: ['GPU Computing Coursework']
          }
        ]
      }
    ]
  },
  {
    id: 'programming-language',
    name: 'Programming Language',
    icon: 'mdi-code-tags',
    color: 'purple',
    activeGroup: 'languages',
    groups: [
      {
        id: 'languages',
        name: 'Languages',
        icon: 'mdi-console',
        items: [
          {
            id: 'python',
            name: 'Python',
            level: 92,
            technologies: ['Data Science Scripting', 'AI Prototyping', 'Backend Services', 'Automation'],
            projects: ['Clinical RAG Medical Assistant', 'Spark Lab Assignment', 'Earthquake Data Warehouse']
          },
          {
            id: 'javascript',
            name: 'JavaScript',
            level: 95,
            technologies: ['Frontend Logic', 'API Integration', 'Interactive UI', 'Single Page Applications'],
            projects: ['Sales Management System', 'Unical Phonebook and Messaging App']
          },
          {
            id: 'typescript',
            name: 'TypeScript',
            level: 88,
            technologies: ['Typed Frontend Development', 'Component Safety', 'State Management'],
            projects: ['Dynamic PDDL Visualizer']
          },
          {
            id: 'java',
            name: 'Java',
            level: 85,
            technologies: ['Backend Development', 'Custom Procedures', 'Object-Oriented Programming'],
            projects: ['Neo4j Custom Procedure', 'Spring Boot Integration']
          },
          {
            id: 'cpp',
            name: 'C/C++',
            level: 85,
            technologies: ['Systems Programming', 'GPU-Oriented Programming', 'Performance-Aware Code'],
            projects: ['CUDA Coursework']
          },
          {
            id: 'sql',
            name: 'SQL',
            level: 92,
            technologies: ['Analytical Queries', 'Warehouse Queries', 'Relational Modeling'],
            projects: ['Earthquake Data Warehousing & Visualization', 'Spark SQL Lab']
          },
          {
            id: 'bash',
            name: 'Bash/Shell',
            level: 80,
            technologies: ['Experiment Automation', 'Docker Scripts', 'Environment Setup'],
            projects: ['Memcached vs Riak KV Benchmark', 'Spark Docker Lab']
          }
        ]
      }
    ]
  },
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    icon: 'mdi-code-braces',
    color: 'info',
    activeGroup: 'frontend',
    groups: [
      {
        id: 'frontend',
        name: 'Frontend',
        icon: 'mdi-monitor-dashboard',
        items: [
          {
            id: 'vue',
            name: 'Vue.js',
            level: 99,
            technologies: ['Vuetify', 'Pinia', 'Vuex', 'Vue Router', 'Composition API', 'Options API'],
            projects: ['Rent-Autobus','Unical Phonebook and Messaging App',  'Portfolio','Sales Management System', 'Indigent Management System']
          },
          {
            id: 'react',
            name: 'React',
            level: 99,
            technologies: ['Three.js', 'Tailwind CSS', 'Zustand', 'Reusable Components', 'Interactive Visualization'],
            projects: ['Dynamic PDDL Visualizer']
          }
        ]
      },
      {
        id: 'backend',
        name: 'Backend',
        icon: 'mdi-server',
        items: [
          {
            id: 'node',
            name: 'Node.js',
            level: 90,
            technologies: ['Express.js', 'REST APIs', 'JWT', 'Middleware', 'CRUD Services'],
            projects: ['Sales Management System']
          },
          {
            id: 'python-backend',
            name: 'Python Backend',
            level: 88,
            technologies: ['Flask', 'FastAPI', 'Django', 'Model Serving', 'API Integration'],
            projects: ['Clinical RAG Medical Assistant', 'Keke AI Competition']
          },
          {
            id: 'java-backend',
            name: 'Java Backend',
            level: 82,
            technologies: ['Spring Boot', 'STOMP', 'WebSockets', 'Role-Based Access'],
            projects: ['Unical Phonebook and Messaging App']
          },
          {
            id: 'app-data',
            name: 'Application Data',
            level: 86,
            technologies: ['MongoDB', 'Firebase', 'Schema Design', 'Document Data Modeling'],
            projects: ['Sales Management System', 'University Messaging App']
          }
        ]
      }
    ]
  },
  {
    id: 'data-engineering',
    name: 'Data Engineering',
    icon: 'mdi-database-cog',
    color: 'primary',
    activeGroup: 'warehouse-bi',
    groups: [
      {
        id: 'warehouse-bi',
        name: 'Data Warehouse & BI',
        icon: 'mdi-chart-bar',
        items: [
          {
            id: 'postgresql',
            name: 'PostgreSQL',
            level: 86,
            technologies: ['Data Warehousing', 'Star Schema', 'Fact Tables', 'Dimension Tables', 'Warehouse Queries'],
            projects: ['Earthquake Data Warehousing & Visualization']
          },
          {
            id: 'etl',
            name: 'ETL',
            level: 86,
            technologies: ['Pandas', 'USGS API', 'Data Cleaning', 'Data Transformation', 'Data Quality'],
            projects: ['Earthquake ETL Pipeline']
          },
          {
            id: 'tableau',
            name: 'Tableau',
            level: 85,
            technologies: ['Dashboards', 'BI Reporting', 'Maps', 'KPI Visualization', 'Seismic Trend Analysis'],
            projects: ['Earthquake Visualization Dashboard']
          }
        ]
      },
      {
        id: 'big-data',
        name: 'Big Data Processing',
        icon: 'mdi-flash',
        items: [
          {
            id: 'spark',
            name: 'Apache Spark',
            level: 85,
            technologies: ['PySpark', 'Spark SQL', 'DataFrame API', 'RDD', 'Parquet', 'Distributed Processing'],
            projects: ['Spark & Spark Streaming Lab']
          },
          {
            id: 'structured-streaming',
            name: 'Structured Streaming',
            level: 85,
            technologies: ['Watermarking', 'Windowing', 'foreachBatch', 'Multi-Sink Output', 'Stream-Stream Join'],
            projects: ['Sensor Streaming Pipeline']
          },
          {
            id: 'spark-nlp',
            name: 'Spark NLP',
            level: 85,
            technologies: ['Sentiment Classification', 'Tweet Classification', 'DataFrame Benchmarking'],
            projects: ['Spark NLP Extension']
          }
        ]
      },
      {
        id: 'graph-search',
        name: 'Graph Database & Search',
        icon: 'mdi-graph-outline',
        items: [
          {
            id: 'neo4j',
            name: 'Neo4j',
            level: 87,
            technologies: ['Cypher', 'Labeled Property Graph', 'Citation Network Modeling', 'Graph Schema'],
            projects: ['Hybrid Semantic & Graph-Aware Paper Search']
          },
          {
            id: 'neo4j-gds',
            name: 'Neo4j GDS',
            level: 85,
            technologies: ['PageRank', 'Graph Projection', 'In-Memory Graph', 'Centrality Analysis'],
            projects: ['Neo4j Hybrid Paper Search']
          },
          {
            id: 'vector-search',
            name: 'Vector Search',
            level: 87,
            technologies: ['Vector Index', 'Cosine Similarity', 'ANN Search', 'all-MiniLM-L6-v2', 'Custom Procedures'],
            projects: ['Hybrid Semantic & Graph-Aware Paper Search']
          }
        ]
      },
      {
        id: 'distributed-nosql',
        name: 'Distributed NoSQL & Caching',
        icon: 'mdi-server-network',
        items: [
          {
            id: 'memcached',
            name: 'Memcached',
            level: 88,
            technologies: ['pymemcache', 'Consistent Hashing', 'TTL', 'Read-Heavy Workloads', 'Cache Hit Rate'],
            projects: ['Memcached vs Riak KV Benchmark']
          },
          {
            id: 'riak',
            name: 'Riak KV',
            level: 88,
            technologies: ['Quorums', 'Vector Clocks', 'Hinted Handoff', 'Read Repair', 'Eventual Consistency'],
            projects: ['Riak KV Fault Tolerance Experiment']
          },
          {
            id: 'benchmarking',
            name: 'Benchmarking',
            level: 87,
            technologies: ['Docker Compose', 'Performance Benchmarking', 'Concurrency Testing', 'p95/p99 Latency', 'Matplotlib'],
            projects: ['Memcached vs Riak KV for Read-Heavy Product Service']
          }
        ]
      }
    ]
  }
])
</script>

<style scoped>
/* ─── Section Header ───────────────────────────────────────────────────────── */
.section-skills-title {
  font-family: 'Jost', sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 2rem) !important;
  font-weight: 600 !important;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 50%, rgb(var(--v-theme-info)) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
}

.section-subtitle {
  max-width: 820px;
  color: rgba(var(--v-theme-on-surface), 0.72);
  font-family: 'Jost', sans-serif;
  font-size: clamp(0.9rem, 1.6vw, 1rem);
  line-height: 1.6;
}

.header-decoration {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  margin-bottom: 0.75rem;
  background: rgba(var(--v-theme-primary), 0.08);
}

.header-icon {
  color: rgb(var(--v-theme-primary));
}

.title-underline {
  width: 72px;
  height: 3px;
  border-radius: 999px;
  margin: 1rem auto 0;
  background: linear-gradient(90deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
}

/* ─── Skills Card Shell ─────────────────────────────────────────────────────── */
.skills-card {
  border-radius: 18px;
  overflow: hidden;
}

.category-intro {
  padding: 1rem;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 16px;
  background: rgba(var(--v-theme-surface), 0.42);
}

.category-title {
  font-family: 'Jost', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.01em;
}

/* ─── Desktop Icon-Only Tabs ────────────────────────────────────────────────── */
.desktop-main-tabs-col {
  width: 72px;
  flex: 0 0 72px;
  max-width: 72px;
  transition: width 0.25s ease, flex-basis 0.25s ease, max-width 0.25s ease;
}

.desktop-main-tabs-col--expanded {
  width: 230px;
  flex-basis: 230px;
  max-width: 230px;
}

.tab-rail-shell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: sticky;
  top: 1rem;
}

.tab-rail-shell--expanded {
  align-items: stretch;
}

.rail-toggle {
  width: 56px !important;
  height: 38px !important;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 14px !important;
  background: rgba(var(--v-theme-surface), 0.42);
  align-self: center;
}

.icon-only-tabs {
  width: 56px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 16px;
  background: rgba(var(--v-theme-surface), 0.42);
  overflow: hidden;
  transition: width 0.25s ease;
}

.icon-only-tabs.tabs-expanded {
  width: 100%;
}

.icon-only-tab {
  min-width: 56px !important;
  width: 56px !important;
  min-height: 52px !important;
  padding: 0 !important;
  justify-content: center !important;
  text-transform: none !important;
}

.icon-only-tab--expanded {
  width: 100% !important;
  min-width: 100% !important;
  justify-content: flex-start !important;
  gap: 0.6rem;
  padding: 0 14px !important;
}

.tab-expanded-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ─── Inner Desktop Layout ──────────────────────────────────────────────────── */
.inner-layout {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 1.25rem;
  align-items: start;
  transition: grid-template-columns 0.25s ease;
}

.inner-layout--expanded {
  grid-template-columns: 230px 1fr;
}

.inner-tabs-shell {
  width: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: sticky;
  top: 1rem;
  transition: width 0.25s ease;
}

.inner-tabs-shell--expanded {
  width: 100%;
  align-items: stretch;
}

.inner-icon-tabs {
  width: 56px;
}

.inner-content-shell {
  min-width: 0;
}

.skill-group {
  padding: 1rem;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 18px;
  background: rgba(var(--v-theme-surface), 0.36);
}

.group-heading {
  display: flex;
  align-items: center;
}

.group-heading h3 {
  font-family: 'Jost', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0;
}

.item-card-stack {
  display: grid;
  gap: 1rem;
}

.item-card-stack--one {
  grid-template-columns: 1fr;
}

.item-card-stack--two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.item-card-stack--three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

/* ─── Technology Cards ──────────────────────────────────────────────────────── */
.technology-card {
  width: 100%;
  height: 100%;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.3s ease,
              border-color 0.3s ease;
  border-radius: 14px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.technology-card.on-hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(var(--v-theme-primary), 0.18) !important;
}

.technology-card-title {
  font-family: 'Jost', sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: 0.01em;
  line-height: 1.35;
  white-space: normal;
}

.technology-name {
  color: rgba(var(--v-theme-on-surface), 0.86);
  font-size: 0.85rem;
  font-weight: 700;
  line-height: 1.35;
}

.technology-level {
  color: rgba(var(--v-theme-on-surface), 0.72);
  font-size: 0.85rem;
  font-weight: 800;
  margin-left: 0.75rem;
  white-space: nowrap;
}

.technology-progress {
  position: relative;
  overflow: hidden;
}

.panel-label {
  color: rgba(var(--v-theme-on-surface), 0.74);
  font-family: 'Jost', sans-serif;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.project-chip {
  white-space: normal;
  height: auto !important;
  min-height: 26px;
}

.skill-progress-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.25) 50%,
    rgba(255,255,255,0) 100%
  );
  animation: shimmer 2.2s infinite;
}

@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* ─── Shared Tab Styling ────────────────────────────────────────────────────── */
.v-tab,
.tab-label,
.icon-only-tab {
  text-transform: none !important;
  letter-spacing: 0.4px;
  font-family: 'Jost', sans-serif !important;
}

.tab-label {
  justify-content: flex-start;
}

/* ─── Mobile Layout ─────────────────────────────────────────────────────────── */
.mobile-layout {
  width: 100%;
}

.mobile-tabs {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.inner-mobile-tabs {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 14px;
  overflow: hidden;
}

.mobile-tab,
.inner-mobile-tab {
  min-width: auto !important;
  padding: 8px 12px !important;
  font-size: 0.75rem !important;
  text-transform: none !important;
  letter-spacing: 0.25px !important;
}

.mobile-tab-text {
  display: inline-block;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ─── Animate.css timing ────────────────────────────────────────────────────── */
.animate__animated {
  animation-duration: 0.8s;
}

/* ─── Responsive ────────────────────────────────────────────────────────────── */
@media (max-width: 960px) {
  .skills-container {
    padding: 1rem;
  }

  .item-card-stack,
  .item-card-stack--one,
  .item-card-stack--two,
  .item-card-stack--three {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .skills-container {
    padding: 0.5rem;
  }

  .mobile-tab,
  .inner-mobile-tab {
    padding: 6px 8px !important;
    font-size: 0.7rem !important;
  }

  .mobile-tab-text {
    max-width: 96px;
  }

  .category-intro,
  .skill-group {
    padding: 0.85rem;
  }
}

@media (max-width: 400px) {
  .skills-container {
    padding: 0.25rem;
  }

  .mobile-tab,
  .inner-mobile-tab {
    padding: 4px 6px !important;
    font-size: 0.65rem !important;
  }

  .mobile-tab-text {
    max-width: 72px;
  }

  .technology-card .v-card-title {
    font-size: 0.9rem !important;
  }

  .technology-card .v-card-text {
    font-size: 0.8rem !important;
  }
}

@media (max-width: 960px) and (orientation: landscape) {
  .skills-container {
    padding: 0.5rem;
  }

  .mobile-tabs,
  .inner-mobile-tabs {
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
