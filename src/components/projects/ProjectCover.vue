<template>
  <!-- Illustrated covers for projects without a video. Decorative only. -->
  <div
    v-if="art === 'hospital'"
    class="cv cv-hospital"
  >
    <div class="cv-grid" /><span class="cv-badge">{{ label }}</span>
    <div class="hs-win">
      <div class="hs-bar">
        <i /><i /><i /><span>WARD OVERVIEW</span>
      </div>
      <div class="hs-body">
        <div class="hs-side">
          <b class="on" /><b /><b /><b /><b /><b />
        </div>
        <div class="hs-main">
          <div class="hs-stats">
            <div class="hs-stat">
              <small>PATIENTS</small><strong>128</strong>
            </div><div class="hs-stat">
              <small>LAB ORDERS</small><strong>42</strong>
            </div><div class="hs-stat">
              <small>BEDS</small><strong>87%</strong>
            </div>
          </div>
          <div class="hs-table">
            <div class="hs-row">
              <i /><b /><b /><em>ADMITTED</em>
            </div><div class="hs-row">
              <i /><b /><b /><em class="w">LAB</em>
            </div><div class="hs-row">
              <i /><b /><b /><em>ADMITTED</em>
            </div><div class="hs-row">
              <i /><b /><b /><em class="w">PHARMACY</em>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hs-langs">
      <span>EN</span><span>አማ</span><span>ትግ</span>
    </div>
  </div>
  <div
    v-else-if="art === 'keyboard'"
    class="cv cv-keyboard"
  >
    <div class="cv-grid" /><span class="cv-badge">{{ label }}</span>
    <div class="kb-phone">
      <div class="kb-pad">
        <div class="kb-sugg">
          <span class="on">ሰ</span><span>ሱ</span><span>ሲ</span>
        </div>
        <svg
          viewBox="0 0 120 80"
          aria-hidden="true"
        ><path
          d="M38 64 L38 34 C38 12, 82 12, 82 34 L82 64 M30 64 L46 64 M74 64 L90 64"
          fill="none"
          stroke="#F1E8DD"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        /><line
          x1="8"
          y1="70"
          x2="112"
          y2="70"
          stroke="#5A463B"
          stroke-width="2"
          stroke-dasharray="4 5"
        /></svg>
      </div>
      <div class="kb-keys">
        <b
          v-for="key in fidelKeys"
          :key="key"
          :class="{ ac: key === 'ሰ' }"
        >{{ key }}</b><b>EN</b><b class="sp">SPACE</b><b>↵</b>
      </div>
    </div>
  </div>
  <div
    v-else-if="art === 'meal'"
    class="cv cv-meal"
  >
    <div class="cv-grid" /><span class="cv-badge">{{ label }}</span>
    <div class="ml-phone">
      <header><span>MEAL PASS</span><span>LUNCH</span></header><div class="ml-name">
        Household, 3 members
      </div><div class="ml-qr">
        <i
          v-for="(on, n) in qrCells"
          :key="n"
          :class="{ d: on }"
        />
      </div><div class="ml-timer">
        <b />
      </div>
    </div>
    <div class="ml-toast">
      <i>✓</i><div>Lunch served<small>RECORDED 12:04</small></div>
    </div>
  </div>
  <div
    v-else-if="art === 'roads'"
    class="cv cv-block"
  >
    <span class="cv-badge">{{ label }}</span>
    <svg
      class="ba-map"
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect
        width="640"
        height="400"
        fill="#2E2925"
      />
      <path
        d="M0 300 C 120 280, 200 330, 330 300 S 520 250, 640 270 L 640 400 L 0 400 Z"
        fill="#283A3F"
      />
      <g
        stroke="#4A423B"
        stroke-width="10"
        fill="none"
      ><path d="M-10 80 L650 60" /><path d="M-10 190 L650 170" /><path d="M120 -10 L100 300" /><path d="M300 -10 L290 300" /><path d="M480 -10 L470 280" /></g>
      <g
        stroke="#3B342E"
        stroke-width="4"
        fill="none"
      ><path d="M-10 135 L650 115" /><path d="M210 -10 L195 300" /><path d="M390 -10 L380 290" /><path d="M560 -10 L555 270" /><path d="M-10 245 L650 225" /></g>
      <circle
        cx="390"
        cy="150"
        r="118"
        fill="rgba(143,162,138,.12)"
        stroke="#8FA28A"
        stroke-width="2"
        stroke-dasharray="7 7"
      />
      <g
        stroke-linecap="round"
        stroke-width="10"
        fill="none"
      ><path
        d="M300 176 L298 120"
        stroke="#E5533D"
      /><path
        d="M380 122 L470 118"
        stroke="#E0A43A"
      /><path
        d="M300 176 L384 172"
        stroke="#E5533D"
      /><path
        d="M470 168 L472 230"
        stroke="#E0A43A"
      /></g>
      <g><circle
        cx="390"
        cy="150"
        r="11"
        fill="#F6EFE6"
      /><circle
        cx="390"
        cy="150"
        r="5"
        fill="#6B4435"
      /></g>
    </svg>
    <div class="ba-card">
      <header><span>NEAR HOME</span><span>SINCE YESTERDAY</span></header><strong>4 changes on your roads</strong><div class="ba-tags">
        <span class="n">2 NEW</span><span class="u">1 UPDATED</span><span class="g">1 CLEARED</span>
      </div>
    </div>
  </div>
  <div
    v-else-if="art === 'booking'"
    class="cv cv-bus"
  >
    <div class="cv-grid" /><span class="cv-badge">{{ label }}</span>
    <div class="bq-card">
      <div class="bq-steps">
        <b class="on">1</b><i class="on" /><b class="on">2</b><i /><b>3</b>
      </div><div class="bq-title">
        Your trip
      </div>
      <div class="bq-row">
        <div class="bq-field">
          <small>FROM</small><span>Rome</span>
        </div><div class="bq-field">
          <small>TO</small><span>Florence</span>
        </div>
      </div>
      <div class="bq-row">
        <div class="bq-field">
          <small>DATE</small><span>12 May</span>
        </div><div class="bq-field">
          <small>PASSENGERS</small><span>32</span>
        </div>
      </div>
      <span class="bq-btn">Compare quotes →</span>
    </div>
  </div>
  <div
    v-else-if="art === 'rag'"
    class="cv cv-rag"
  >
    <div class="cv-grid" /><span class="cv-badge">{{ label }}</span>
    <div class="rg-chat">
      <div class="rg-q">
        How should mild dehydration in children be treated?
      </div>
      <div class="rg-a">
        <b /><b /><b class="s" /><div class="rg-cites">
          <span>WHO GUIDELINE, P. 12</span><span>WHO GUIDELINE, P. 31</span>
        </div>
      </div>
      <div class="rg-note">
        <i />ANSWERED FROM 2 SOURCES
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  art: { type: String, required: true },
  label: { type: String, default: '' },
})

const fidelKeys = [...'ሀለሐመሰረቀበተቸነአከወዘየደገጠጸፈ']

// A fixed QR-style pattern: three finder squares plus pseudo-random modules from a seeded generator.
function buildQr (size = 21, seed = 7) {
  let s = seed
  const random = () => ((s = (s * 16807) % 2147483647) / 2147483647)
  const finders = [[0, 0], [size - 7, 0], [0, size - 7]]
  const cells = []
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let value = null
      for (const [fx, fy] of finders) {
        const dx = x - fx
        const dy = y - fy
        if (dx >= 0 && dx < 7 && dy >= 0 && dy < 7) {
          value = dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4)
        } else if (dx >= -1 && dx <= 7 && dy >= -1 && dy <= 7 && value === null) {
          value = false
        }
      }
      cells.push(value ?? random() < 0.48)
    }
  }
  return cells
}
const qrCells = buildQr()
</script>

<style scoped>
.cv{position:absolute;inset:0;overflow:hidden;display:grid;place-items:center;font-family:'DM Sans',Arial,sans-serif;container-type:size}

.cv-badge{position:absolute;bottom:20px;left:24px;z-index:3;font:500 11px/1 'IBM Plex Mono',monospace;letter-spacing:.08em;color:#F1E8DD;background:rgba(20,14,11,.45);border:1px solid rgba(241,232,221,.22);padding:8px 11px;border-radius:999px;backdrop-filter:blur(6px)}

.cv-grid{position:absolute;inset:0;background:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px) 0 0/28px 28px,linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px) 0 0/28px 28px}

.mono{font-family:'IBM Plex Mono',monospace}


/* hospital */
.cv-hospital{background:radial-gradient(ellipse at 75% 20%,rgba(143,162,138,.35),transparent 55%),linear-gradient(145deg,#3E2A21,#1E1511)}

.hs-win{position:relative;height:min(70cqh,330px);aspect-ratio:16/10;max-width:84%;background:#F6EFE6;border-radius:14px;box-shadow:0 30px 60px -25px rgba(0,0,0,.7);display:grid;grid-template-rows:26px 1fr;overflow:hidden;transform:rotate(-2deg) translateY(16px)}

.hs-bar{background:#E7DBCD;display:flex;align-items:center;gap:6px;padding:0 10px}

.hs-bar i{width:8px;height:8px;border-radius:50%;background:#C9B6A3}

.hs-bar span{margin-left:auto;font:600 9px 'IBM Plex Mono',monospace;color:#7A6455;letter-spacing:.06em}

.hs-body{display:grid;grid-template-columns:22% 1fr;min-height:0}

.hs-side{background:#3B2A22;padding:12px 10px;display:grid;align-content:start;gap:9px}

.hs-side b{height:7px;border-radius:4px;background:rgba(241,232,221,.28)}

.hs-side b.on{background:#8FA28A}

.hs-main{padding:12px;display:grid;grid-template-rows:auto 1fr;gap:10px;min-height:0}

.hs-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}

.hs-stat{background:#fff;border:1px solid #E6D9CB;border-radius:9px;padding:8px 9px}

.hs-stat small{display:block;font:500 8px 'IBM Plex Mono',monospace;color:#8A7363;letter-spacing:.06em}

.hs-stat strong{font:700 clamp(14px,2.2cqw,20px)/1.2 'Space Grotesk',sans-serif;color:#2B1E18}

.hs-table{background:#fff;border:1px solid #E6D9CB;border-radius:9px;padding:6px 10px;display:grid;align-content:start}

.hs-row{display:grid;grid-template-columns:14px 1fr .6fr 48px;gap:8px;align-items:center;padding:6px 0;border-bottom:1px solid #F0E6DA}

.hs-row:last-child{border:0}

.hs-row i{width:14px;height:14px;border-radius:50%;background:#D9C7B5}

.hs-row b{height:6px;border-radius:3px;background:#D9C9BA}

.hs-row b+b{background:#EADFD3}

.hs-row em{font:600 8px 'IBM Plex Mono',monospace;font-style:normal;text-align:center;padding:3px 0;border-radius:99px;background:#E3EBDD;color:#4F6548}

.hs-row em.w{background:#F4E3CC;color:#8A5A23}

.hs-langs{position:absolute;right:24px;bottom:18px;display:flex;gap:6px;z-index:3}

.hs-langs span{font:600 12px 'DM Sans',sans-serif;color:#F1E8DD;border:1px solid rgba(241,232,221,.3);border-radius:8px;padding:5px 8px;background:rgba(20,14,11,.4)}


/* keyboard */
.cv-keyboard{background:radial-gradient(ellipse at 30% 15%,rgba(143,162,138,.3),transparent 55%),linear-gradient(150deg,#4A3329,#1E1511)}

.kb-phone{height:88cqh;aspect-ratio:9/14;background:#16100D;border:6px solid #0E0A08;border-radius:30px;padding:12px 8px 10px;display:grid;grid-template-rows:1fr auto;gap:8px;box-shadow:0 30px 60px -20px rgba(0,0,0,.75);transform:translateY(12%)}

.kb-pad{min-height:0}

.kb-pad{background:#2A1E18;border-radius:14px;position:relative;display:grid;place-items:center}

.kb-pad svg{width:62%;height:auto}

.kb-sugg{position:absolute;top:8px;left:8px;right:8px;display:flex;gap:5px}

.kb-sugg span{flex:1;text-align:center;font:600 13px 'Noto Sans Ethiopic','Nyala','Abyssinica SIL',sans-serif;color:#F1E8DD;background:#3A2A22;border-radius:7px;padding:3px 0}

.kb-sugg span.on{background:#8FA28A;color:#1E1511}

.kb-keys{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}

.kb-keys b{aspect-ratio:1/1.05;display:grid;place-items:center;background:#3A2A22;border-radius:6px;color:#F1E8DD;font:500 clamp(10px,2cqw,14px) 'Noto Sans Ethiopic','Nyala','Abyssinica SIL',sans-serif}

.kb-keys b.sp{grid-column:span 5;aspect-ratio:auto;font:500 9px 'IBM Plex Mono',monospace;color:#B9A898}

.kb-keys b.ac{background:#8FA28A;color:#1E1511}


/* meal checker */
.cv-meal{background:radial-gradient(ellipse at 70% 25%,rgba(224,164,58,.25),transparent 55%),linear-gradient(145deg,#3E2A21,#1E1511)}

.ml-phone{padding:12px 11px!important;gap:8px!important;height:86%;aspect-ratio:9/16;background:#F6EFE6;border:6px solid #0E0A08;border-radius:30px;padding:16px 14px;display:grid;grid-template-rows:auto auto 1fr auto;gap:10px;justify-items:center;box-shadow:0 30px 60px -20px rgba(0,0,0,.75);transform:translateY(8%) rotate(3deg)}

.ml-phone header{width:100%;display:flex;justify-content:space-between;font:600 9px 'IBM Plex Mono',monospace;color:#7A6455;letter-spacing:.06em}

.ml-name{font:700 12px 'Space Grotesk',sans-serif;color:#2B1E18;justify-self:start}

.ml-qr{width:88%;aspect-ratio:1;align-self:center;display:grid;grid-template-columns:repeat(21,1fr);background:#fff;padding:7%;border-radius:10px;border:1px solid #E6D9CB}

.ml-qr i{background:transparent}
.ml-qr i.d{background:#1E1511}

.ml-timer{width:100%;height:5px;border-radius:3px;background:#E7DBCD;overflow:hidden}

.ml-timer b{display:block;height:100%;width:68%;background:#8FA28A}

.ml-toast{position:absolute;right:8%;top:24%;z-index:3;display:flex;align-items:center;gap:10px;background:#F6EFE6;color:#2B1E18;border-radius:14px;padding:10px 14px 10px 10px;box-shadow:0 20px 40px -18px rgba(0,0,0,.7);font:600 13px 'DM Sans',sans-serif;transform:rotate(-3deg)}

.ml-toast i{width:26px;height:26px;border-radius:50%;background:#3FBF6F;display:grid;place-items:center;color:#fff;font-style:normal;font-size:14px}

.ml-toast small{display:block;font:500 9px 'IBM Plex Mono',monospace;color:#8A7363;letter-spacing:.05em}


/* blockalert */
.cv-block{background:#2A2622}

.ba-map{position:absolute;inset:0;width:100%;height:100%}

.ba-card{position:absolute;right:7%;bottom:12%;z-index:3;width:min(52%,280px);background:#F6EFE6;border-radius:14px;padding:12px 14px;box-shadow:0 20px 40px -18px rgba(0,0,0,.75);display:grid;gap:7px}

.ba-card header{display:flex;justify-content:space-between;align-items:center;font:600 9px 'IBM Plex Mono',monospace;color:#7A6455;letter-spacing:.06em}

.ba-card strong{font:700 15px/1.2 'Space Grotesk',sans-serif;color:#2B1E18}

.ba-tags{display:flex;gap:5px;flex-wrap:wrap}

.ba-tags span{font:600 9px 'IBM Plex Mono',monospace;padding:4px 7px;border-radius:99px}

.ba-tags .n{background:#F7D9D2;color:#9B3522}
.ba-tags .u{background:#F4E3CC;color:#8A5A23}
.ba-tags .g{background:#E3EBDD;color:#4F6548}


/* bus rental */
.cv-bus{background:radial-gradient(ellipse at 20% 80%,rgba(143,162,138,.3),transparent 55%),linear-gradient(140deg,#5A4033,#2A1D17)}

.bq-card{width:min(70%,380px);background:#F6EFE6;border-radius:16px;padding:16px 18px;display:grid;gap:11px;box-shadow:0 30px 60px -22px rgba(0,0,0,.75);transform:rotate(-2deg) translateY(8px)}

.bq-steps{display:flex;align-items:center;gap:6px}

.bq-steps b{width:20px;height:20px;border-radius:50%;display:grid;place-items:center;font:700 10px 'DM Sans',sans-serif;background:#E7DBCD;color:#7A6455}

.bq-steps b.on{background:#6B4435;color:#fff}

.bq-steps i{flex:1;height:2px;background:#E7DBCD}
.bq-steps i.on{background:#6B4435}

.bq-title{font:700 16px 'Space Grotesk',sans-serif;color:#2B1E18}

.bq-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}

.bq-field{border:1px solid #E1D3C4;background:#fff;border-radius:9px;padding:7px 9px}

.bq-field small{display:block;font:500 8px 'IBM Plex Mono',monospace;color:#8A7363;letter-spacing:.06em}

.bq-field span{font:600 12px 'DM Sans',sans-serif;color:#2B1E18}

.bq-btn{justify-self:end;font:700 12px 'DM Sans',sans-serif;color:#fff;background:#6B4435;border-radius:99px;padding:8px 16px}


/* rag */
.cv-rag{background:radial-gradient(ellipse at 75% 75%,rgba(91,155,213,.22),transparent 55%),linear-gradient(150deg,#3E2A21,#1E1511)}

.rg-chat{width:min(76%,420px);display:grid;gap:10px;transform:translateY(10px)}

.rg-q{justify-self:end;max-width:78%;background:#8FA28A;color:#1E1511;border-radius:14px 14px 4px 14px;padding:9px 12px;font:600 12px/1.35 'DM Sans',sans-serif}

.rg-a{max-width:92%;background:#F6EFE6;border-radius:14px 14px 14px 4px;padding:11px 13px;display:grid;gap:6px;box-shadow:0 24px 50px -24px rgba(0,0,0,.75)}

.rg-a b{height:6px;border-radius:3px;background:#DCCDBE}

.rg-a b.s{width:70%}

.rg-cites{display:flex;gap:5px;margin-top:3px;flex-wrap:wrap}

.rg-cites span{font:600 9px 'IBM Plex Mono',monospace;color:#2F5F86;background:#DCE9F4;border-radius:99px;padding:4px 7px}

.rg-note{justify-self:start;font:500 10px 'IBM Plex Mono',monospace;color:#D7C6B6;letter-spacing:.04em;display:flex;gap:6px;align-items:center}

.rg-note i{width:7px;height:7px;border-radius:50%;background:#5B9BD5}

</style>
