import { useState, useEffect } from "react";

const COMPANIES = [
  {
    id: "intel", name: "Intel", color: "#0071C5", icon: "⚡",
    role: "AI PC / OpenVINO Team", package: "18–28 LPA", chance: 72,
    projects: [
      {
        id: "intel_p1", name: "KIRA Benchmark Dashboard", type: "your project", typeColor: "#8b5cf6",
        stack: "Python, OpenVINO, PyQt, psutil",
        pitch: "Intel AI PC Team — KIRA already runs on their own framework. Show it.",
        days: [
          { day: "Day 1", label: "Build", tasks: [
            { id: "i1", t: "Add live CPU/RAM gauge to KIRA main UI using psutil" },
            { id: "i2", t: "Add OpenVINO IR model loader with INT8 quantization toggle" },
            { id: "i3", t: "Log inference timestamps for benchmark comparison" },
          ]},
          { day: "Day 2", label: "Build", tasks: [
            { id: "i4", t: "Build benchmark screen: OpenVINO vs CPU-only latency bar chart" },
            { id: "i5", t: "Visualize the exact threshold when cloud routing kicks in" },
            { id: "i6", t: "Test at 40%, 70%, 90% CPU load — document switching behavior" },
          ]},
          { day: "Day 3", label: "Polish", tasks: [
            { id: "i7", t: "Write README with architecture diagram" },
            { id: "i8", t: "Clean GitHub — proper tags, release v1.0, changelog" },
            { id: "i9", t: "Add 'Powered by OpenVINO' badge + hardware specs to README" },
          ]},
          { day: "Day 4", label: "Demo", tasks: [
            { id: "i10", t: "Record 3-min Loom: voice → Spotify → benchmark screen" },
            { id: "i11", t: "Edit video — add on-screen captions, highlight routing moment" },
            { id: "i12", t: "Take benchmark screenshots for LinkedIn post" },
          ]},
          { day: "Day 5", label: "Pitch", tasks: [
            { id: "i13", t: "Find 10 Intel India OpenVINO engineers on LinkedIn" },
            { id: "i14", t: "Write personalized DM mentioning their specific OpenVINO work" },
            { id: "i15", t: "Write LinkedIn post: 'Built AI agent on OpenVINO as a student'" },
          ]},
          { day: "Day 6", label: "🚀 Launch", tasks: [
            { id: "i16", t: "POST on LinkedIn + tag @IntelAI @OpenVINO" },
            { id: "i17", t: "Send personalized DMs to 10 Intel engineers" },
            { id: "i18", t: "Post on r/LocalLLaMA and r/OpenVINO communities" },
          ]},
          { day: "Day 7", label: "Follow-up", tasks: [
            { id: "i19", t: "Reply to EVERY comment on your post within 2 hours" },
            { id: "i20", t: "DM people who liked/commented but didn't message you" },
            { id: "i21", t: "If no reply in 5 days — send one polite follow-up DM" },
          ]},
        ]
      },
      {
        id: "intel_p2", name: "OpenVINO Model Zoo Profiler", type: "new project", typeColor: "#14b8a6",
        stack: "Python, OpenVINO Model Zoo, FastAPI, React, Chart.js",
        pitch: "Automated benchmarking tool for all OpenVINO IR models — engineers use this daily.",
        days: [
          { day: "Day 1", label: "Build", tasks: [
            { id: "i22", t: "Download 5 IR models from OpenVINO Model Zoo" },
            { id: "i23", t: "Run benchmark_app on each, capture latency + throughput" },
            { id: "i24", t: "Python script to auto-run all and collect results into JSON" },
          ]},
          { day: "Day 2", label: "Build", tasks: [
            { id: "i25", t: "Build React dashboard: model vs hardware performance table" },
            { id: "i26", t: "Add sortable columns: FPS, latency, accuracy, model size" },
            { id: "i27", t: "Add comparison mode: select 2 models side-by-side" },
          ]},
          { day: "Day 3", label: "Polish + Pitch", tasks: [
            { id: "i28", t: "Add hardware tier selector: i5 / i7 / i9 / Xeon profiles" },
            { id: "i29", t: "Deploy on GitHub Pages with live benchmark data" },
            { id: "i30", t: "Send to Intel Model Zoo GitHub contributors directly" },
          ]},
        ]
      }
    ]
  },
  {
    id: "sap", name: "SAP Labs", color: "#009FD9", icon: "🏢",
    role: "AI / GRC / Process Automation", package: "20–35 LPA + PPO", chance: 62,
    projects: [
      {
        id: "sap_p1", name: "SHINO — Enterprise Security Trainer", type: "your project", typeColor: "#8b5cf6",
        stack: "React, Node.js, WebSocket, Phaser",
        pitch: "SAP GRC team — gamified security awareness training for enterprise employees.",
        days: [
          { day: "Day 1", label: "Build", tasks: [
            { id: "s1", t: "Add SQL injection attack: player types payload, DB reacts visually" },
            { id: "s2", t: "Add XSS attack: inject script tag into sandbox web view panel" },
            { id: "s3", t: "Add port scan: animated sweep showing open/closed ports" },
          ]},
          { day: "Day 2", label: "Build", tasks: [
            { id: "s4", t: "Add difficulty: Junior Employee → Senior Dev → CISO mode" },
            { id: "s5", t: "Add defender WAF card that blocks specific attack types" },
            { id: "s6", t: "Add learning tooltip after each attack: what it was + real example" },
          ]},
          { day: "Day 3", label: "Polish", tasks: [
            { id: "s7", t: "Add company logo slot + team size config (enterprise landing)" },
            { id: "s8", t: "Add employee leaderboard: security awareness score ranking" },
            { id: "s9", t: "Rebrand UI from 'game' to 'Security Awareness Training Platform'" },
          ]},
          { day: "Day 4", label: "Demo", tasks: [
            { id: "s10", t: "Record game demo: full attack combo → defender response" },
            { id: "s11", t: "Record enterprise walkthrough: employee training scenario" },
            { id: "s12", t: "Write 1-page product brief PDF with SAP GRC positioning" },
          ]},
          { day: "Day 5", label: "Pitch", tasks: [
            { id: "s13", t: "Find SAP Labs India engineering managers + AI team on LinkedIn" },
            { id: "s14", t: "Find SAP GRC product managers specifically" },
            { id: "s15", t: "Write pitch email: 'Built gamified enterprise security training'" },
          ]},
          { day: "Day 6", label: "🚀 Launch", tasks: [
            { id: "s16", t: "Send personalized pitches to 5 SAP Labs engineers/managers" },
            { id: "s17", t: "Post SHINO on LinkedIn: enterprise security training angle" },
            { id: "s18", t: "Apply to SAP Labs internship portal with SHINO as portfolio" },
          ]},
          { day: "Day 7", label: "Follow-up", tasks: [
            { id: "s19", t: "Follow up SAP after 5 days if no response" },
            { id: "s20", t: "Post SHINO on r/netsec and HackerNews" },
          ]},
        ]
      },
      {
        id: "sap_p2", name: "Natural Language HANA Query Interface", type: "new project", typeColor: "#14b8a6",
        stack: "Python, LLM API, SAP HANA Express, React, FastAPI",
        pitch: "Type plain English (or Hindi) to query SAP HANA — no SQL needed for managers.",
        days: [
          { day: "Day 1", label: "Build", tasks: [
            { id: "s21", t: "Set up SAP HANA Express free trial instance" },
            { id: "s22", t: "Seed sample ERP data: sales, inventory, employees tables" },
            { id: "s23", t: "Build NL → SQL pipeline with schema-aware LLM prompting" },
          ]},
          { day: "Day 2", label: "Build", tasks: [
            { id: "s24", t: "Build React chat interface: type question → see table result" },
            { id: "s25", t: "Test 20 natural language queries — log accuracy rate" },
            { id: "s26", t: "Add voice input using Web Speech API" },
          ]},
          { day: "Day 3", label: "Polish + Pitch", tasks: [
            { id: "s27", t: "Add Hindi query support (SAP India customer angle)" },
            { id: "s28", t: "Record demo video: ask 'Show sales from last quarter' → table appears" },
            { id: "s29", t: "Send to SAP Labs product team with demo video" },
          ]},
        ]
      }
    ]
  },
  {
    id: "google", name: "Google", color: "#4285F4", icon: "🔍",
    role: "DeepMind India / Google Research", package: "25–45 LPA", chance: 18,
    projects: [
      {
        id: "google_p1", name: "God's View → Social Cascade Simulator", type: "your project", typeColor: "#8b5cf6",
        stack: "Python, NetworkX, Mesa, React, D3.js",
        pitch: "DeepMind India — multi-agent simulation of misinformation spread + containment.",
        days: [
          { day: "Day 1", label: "Build", tasks: [
            { id: "g1", t: "Build network graph with 500 agent nodes using NetworkX" },
            { id: "g2", t: "Each agent: probability to share based on connections + trust score" },
            { id: "g3", t: "Add misinformation source: single node seeding false info" },
          ]},
          { day: "Day 2", label: "Build", tasks: [
            { id: "g4", t: "Add interventions: fact-checker agents, firewall nodes, delays" },
            { id: "g5", t: "Measure: no intervention vs 3 different intervention strategies" },
            { id: "g6", t: "Log results: spread%, peak time, containment success rate" },
          ]},
          { day: "Day 3", label: "Visualize", tasks: [
            { id: "g7", t: "Build D3.js real-time graph: nodes change color as info spreads" },
            { id: "g8", t: "Add speed control, pause/play, reset button" },
            { id: "g9", t: "Add side-by-side comparison of two intervention strategies" },
          ]},
          { day: "Day 4", label: "Research", tasks: [
            { id: "g10", t: "Write 2-page technical writeup: method + findings + future work" },
            { id: "g11", t: "Post writeup on Medium/Substack with simulation screenshots" },
            { id: "g12", t: "Tag Google DeepMind researchers on X/Twitter" },
          ]},
          { day: "Day 5", label: "Demo + Pitch", tasks: [
            { id: "g13", t: "Record demo: simulation spreading then fully contained" },
            { id: "g14", t: "Find Google Research India / DeepMind India engineers on LinkedIn" },
            { id: "g15", t: "Send research-focused pitch email — not a product pitch" },
          ]},
          { day: "Day 6", label: "🚀 Launch", tasks: [
            { id: "g16", t: "Post simulation on LinkedIn + X with research framing" },
            { id: "g17", t: "Submit writeup to arXiv (cs.MA — Multi-Agent Systems)" },
            { id: "g18", t: "Post on r/MachineLearning and r/artificial" },
          ]},
          { day: "Day 7", label: "Follow-up", tasks: [
            { id: "g19", t: "Engage any researcher who comments on your post" },
            { id: "g20", t: "Apply to Google STEP / Google Research internship formally" },
          ]},
        ]
      },
      {
        id: "google_p2", name: "LLM Behavioral Drift Detector", type: "new project", typeColor: "#14b8a6",
        stack: "Python, OpenAI API, Gemini API, Pandas, React",
        pitch: "Run 500 identical prompts across models — map where behavior diverges. Novel eval research.",
        days: [
          { day: "Day 1", label: "Build", tasks: [
            { id: "g21", t: "Write 100 benchmark prompts across 10 task categories" },
            { id: "g22", t: "Run same prompts on GPT-4o, Gemini Flash, Claude — log outputs" },
            { id: "g23", t: "Build similarity scorer: cosine similarity + sentiment delta" },
          ]},
          { day: "Day 2", label: "Build", tasks: [
            { id: "g24", t: "Build React heatmap: which prompt categories diverge most" },
            { id: "g25", t: "Add drill-down: click a category to see exact response pairs" },
            { id: "g26", t: "Write analysis: which model is most consistent vs creative" },
          ]},
          { day: "Day 3", label: "Pitch", tasks: [
            { id: "g27", t: "Publish findings as blog post with full methodology" },
            { id: "g28", t: "Post on Hacker News: Show HN — LLM Behavioral Drift study" },
            { id: "g29", t: "Tag Google Brain / DeepMind NLP researchers on X" },
          ]},
        ]
      }
    ]
  },
  {
    id: "microsoft", name: "Microsoft", color: "#00a4ef", icon: "🪟",
    role: "Copilot+ PC / GitHub Security", package: "22–40 LPA", chance: 42,
    projects: [
      {
        id: "ms_p1", name: "KIRA as Copilot+ PC Demo", type: "your project", typeColor: "#8b5cf6",
        stack: "Python, OpenVINO, Windows APIs, Ollama, PyInstaller",
        pitch: "Windows Copilot+ team — local AI agent with hardware-aware cloud fallback on Windows.",
        days: [
          { day: "Day 1", label: "Build", tasks: [
            { id: "m1", t: "Run KIRA on Windows — fix any compatibility issues" },
            { id: "m2", t: "Add Windows-native notifications when routing switches to cloud" },
            { id: "m3", t: "Add Windows taskbar tray icon showing CPU/RAM status" },
          ]},
          { day: "Day 2", label: "Polish", tasks: [
            { id: "m4", t: "Create Windows installer (.exe) using PyInstaller" },
            { id: "m5", t: "Update README: 'AI that respects your hardware' Copilot+ framing" },
            { id: "m6", t: "Test on minimum spec Windows machine (8GB RAM)" },
          ]},
          { day: "Day 3", label: "Demo", tasks: [
            { id: "m7", t: "Record Windows-specific demo showing taskbar icon + notifications" },
            { id: "m8", t: "Find Microsoft India Copilot+ engineers on LinkedIn" },
            { id: "m9", t: "Write pitch: 'Built what Copilot+ PC promises — here it is'" },
          ]},
          { day: "Day 4", label: "🚀 Launch", tasks: [
            { id: "m10", t: "Send pitch to 5 Microsoft Windows AI engineers" },
            { id: "m11", t: "Post on LinkedIn with Copilot+ comparison angle" },
            { id: "m12", t: "Post on r/Windows11 and r/LocalLLaMA" },
          ]},
          { day: "Day 5", label: "Follow-up", tasks: [
            { id: "m13", t: "DM everyone who reacted to the post" },
            { id: "m14", t: "Apply to Microsoft India internship portal formally" },
          ]},
        ]
      },
      {
        id: "ms_p2", name: "GitHub AI PR Security Reviewer", type: "new project", typeColor: "#14b8a6",
        stack: "Python, GitHub API, LLM API, GitHub Actions",
        pitch: "GitHub Copilot team — AI bot reviews PRs for security vulnerabilities before they merge.",
        days: [
          { day: "Day 1", label: "Build", tasks: [
            { id: "m15", t: "Build GitHub App that triggers on PR opened event" },
            { id: "m16", t: "Send diff to LLM: find SQL injection, XSS, hardcoded secrets" },
            { id: "m17", t: "Post findings as PR comment with line-by-line references" },
          ]},
          { day: "Day 2", label: "Build", tasks: [
            { id: "m18", t: "Add severity scoring: Critical / High / Medium / Low" },
            { id: "m19", t: "Add fix suggestion inline in the PR comment" },
            { id: "m20", t: "Test on 5 real open-source PRs with known vulnerabilities" },
          ]},
          { day: "Day 3", label: "Polish + Pitch", tasks: [
            { id: "m21", t: "Write GitHub Marketplace listing description" },
            { id: "m22", t: "Demo: vulnerable PR → bot catches it → suggests fix" },
            { id: "m23", t: "Send to GitHub Security team at Microsoft India" },
          ]},
        ]
      }
    ]
  },
  {
    id: "aws", name: "AWS / Amazon", color: "#FF9900", icon: "☁️",
    role: "Applied Science / Logistics AI", package: "20–38 LPA", chance: 38,
    projects: [
      {
        id: "aws_p1", name: "AWS Cost Anomaly Explainer", type: "new project", typeColor: "#14b8a6",
        stack: "Python, AWS Cost Explorer API, Boto3, LLM API, React",
        pitch: "Every AWS user needs this — AI explains billing spikes in plain English with fixes.",
        days: [
          { day: "Day 1", label: "Build", tasks: [
            { id: "a1", t: "Connect to AWS Cost Explorer API with free-tier account" },
            { id: "a2", t: "Pull cost data by service, region, resource ID" },
            { id: "a3", t: "Detect anomalies: day-over-day spike > 20% threshold" },
          ]},
          { day: "Day 2", label: "Build", tasks: [
            { id: "a4", t: "Send anomaly data to LLM — get plain English explanation" },
            { id: "a5", t: "Build React dashboard: cost timeline + anomaly markers" },
            { id: "a6", t: "Add fix suggestion: what to turn off / scale down" },
          ]},
          { day: "Day 3", label: "Polish", tasks: [
            { id: "a7", t: "Add Slack notification when anomaly is detected" },
            { id: "a8", t: "Deploy on AWS Lambda — eat your own dog food" },
            { id: "a9", t: "Write architecture diagram showing the full pipeline" },
          ]},
          { day: "Day 4", label: "Demo + Pitch", tasks: [
            { id: "a10", t: "Record demo: billing spike → AI explains → suggests fix" },
            { id: "a11", t: "Post on r/aws and dev.to as a tool launch" },
            { id: "a12", t: "Find AWS India Applied Science engineers on LinkedIn" },
          ]},
          { day: "Day 5", label: "🚀 Launch", tasks: [
            { id: "a13", t: "Send pitch to 5 AWS India engineers with live demo link" },
            { id: "a14", t: "Post: 'Built AI that explains your AWS bill in plain English'" },
            { id: "a15", t: "Submit to AWS Community Builders program" },
          ]},
        ]
      },
      {
        id: "aws_p2", name: "Hyperlocal Demand Surge Predictor", type: "new project", typeColor: "#14b8a6",
        stack: "Python, LSTM, OpenWeather API, Folium, FastAPI",
        pitch: "Predicts demand spikes 2–4 hours ahead for pin codes — Prime Now / Quick Commerce value.",
        days: [
          { day: "Day 1", label: "Build", tasks: [
            { id: "a16", t: "Collect public delivery/grocery timing data for one city" },
            { id: "a17", t: "Add weather + event features (holidays, IPL match days)" },
            { id: "a18", t: "Train LSTM: predict demand surge per 4-hour window per pincode" },
          ]},
          { day: "Day 2", label: "Visualize", tasks: [
            { id: "a19", t: "Build pincode-level heatmap using Folium/Leaflet" },
            { id: "a20", t: "Add +2h / +4h prediction toggle on map" },
            { id: "a21", t: "Validate: compare prediction vs actual for past 30 days" },
          ]},
          { day: "Day 3", label: "Pitch", tasks: [
            { id: "a22", t: "Write case study: accuracy numbers for Bhopal/Indore" },
            { id: "a23", t: "Post map visualization on LinkedIn — very shareable visual" },
            { id: "a24", t: "Send to Amazon India logistics and Prime Now teams" },
          ]},
        ]
      }
    ]
  },
  {
    id: "meta", name: "Meta / FAIR", color: "#0866FF", icon: "∞",
    role: "FAIR India / AI Research", package: "25–50 LPA", chance: 15,
    projects: [
      {
        id: "meta_p1", name: "God's View → Network Information Flow", type: "your project", typeColor: "#8b5cf6",
        stack: "Python, Mesa, NetworkX, React, D3.js, FastAPI",
        pitch: "Meta FAIR — multi-agent simulation of misinformation spread through social graphs.",
        days: [
          { day: "Day 1", label: "Build", tasks: [
            { id: "mt1", t: "Build social graph: 1000 agents with trust scores + tribe groupings" },
            { id: "mt2", t: "Implement sharing decision: emotion + trust + repetition factors" },
            { id: "mt3", t: "Add misinformation source: single node seeding false information" },
          ]},
          { day: "Day 2", label: "Build", tasks: [
            { id: "mt4", t: "Add counter-agent: fact-checker bot reducing belief scores" },
            { id: "mt5", t: "Measure: no intervention vs 3 different containment strategies" },
            { id: "mt6", t: "Log results: spread%, peak time, containment success rate" },
          ]},
          { day: "Day 3", label: "Visualize", tasks: [
            { id: "mt7", t: "Build real-time D3 graph: nodes change color as info spreads" },
            { id: "mt8", t: "Add tribe-level view: which communities spread fastest" },
            { id: "mt9", t: "Export as reproducible experiment with fixed random seed" },
          ]},
          { day: "Day 4", label: "Research", tasks: [
            { id: "mt10", t: "Write 3-page technical paper: method + results + future work" },
            { id: "mt11", t: "Submit to arXiv cs.MA or cs.SI (social networks)" },
            { id: "mt12", t: "Post paper + demo on X, tag @MetaAI @ylecun" },
          ]},
          { day: "Day 5", label: "🚀 Pitch", tasks: [
            { id: "mt13", t: "Find Meta FAIR India researchers on LinkedIn (Bangalore team)" },
            { id: "mt14", t: "Send research pitch — arXiv link + 2 sentence summary" },
            { id: "mt15", t: "Post simulation video on LinkedIn with research framing" },
          ]},
        ]
      },
      {
        id: "meta_p2", name: "LLaMA Fine-tuning Visual Dashboard", type: "new project", typeColor: "#14b8a6",
        stack: "Python, HuggingFace, LoRA/PEFT, React, Recharts, FastAPI",
        pitch: "GUI tool to fine-tune LLaMA on custom data with real-time loss curves + A/B eval.",
        days: [
          { day: "Day 1", label: "Build", tasks: [
            { id: "mt16", t: "Build LoRA fine-tuning pipeline for LLaMA 3.2 3B on custom dataset" },
            { id: "mt17", t: "Stream training loss + eval metrics via WebSocket to frontend" },
            { id: "mt18", t: "React dashboard: real-time loss curve + learning rate schedule" },
          ]},
          { day: "Day 2", label: "Build", tasks: [
            { id: "mt19", t: "Add A/B comparison: base LLaMA vs fine-tuned side-by-side chat" },
            { id: "mt20", t: "Add dataset upload: drag CSV → auto-formats for fine-tuning" },
            { id: "mt21", t: "Add adapter export: download LoRA weights as .safetensors" },
          ]},
          { day: "Day 3", label: "Pitch", tasks: [
            { id: "mt22", t: "Write tutorial: 'Fine-tune LLaMA with a GUI in 10 minutes'" },
            { id: "mt23", t: "Post on HuggingFace Hub and tag Meta LLaMA team" },
            { id: "mt24", t: "Post on LinkedIn — target Meta AI open-source team" },
          ]},
        ]
      }
    ]
  },
  {
    id: "razorpay", name: "Razorpay", color: "#1A73E8", icon: "💳",
    role: "AI / Payments Engineering", package: "18–32 LPA + PPO", chance: 55,
    projects: [
      {
        id: "rp_p1", name: "Merchant AI Support Agent", type: "new project", typeColor: "#14b8a6",
        stack: "Python, RAG, LLM API, FAISS, FastAPI, React",
        pitch: "Support agent trained on Razorpay's own docs — resolves merchant queries instantly.",
        days: [
          { day: "Day 1", label: "Build", tasks: [
            { id: "r1", t: "Scrape all Razorpay public documentation pages" },
            { id: "r2", t: "Build RAG pipeline: chunk docs → embed → FAISS vector store" },
            { id: "r3", t: "Chat interface: merchant asks → agent answers with doc reference" },
          ]},
          { day: "Day 2", label: "Build", tasks: [
            { id: "r4", t: "Add fraud pattern detection from transaction description text" },
            { id: "r5", t: "Add escalation: if confidence < 60% → 'Connect to human support'" },
            { id: "r6", t: "Test with 30 real merchant integration questions — log accuracy" },
          ]},
          { day: "Day 3", label: "Polish", tasks: [
            { id: "r7", t: "Build dashboard: query volume, accuracy rate, top 10 topics" },
            { id: "r8", t: "Add Hindi + English query support" },
            { id: "r9", t: "Style it to match Razorpay's design system" },
          ]},
          { day: "Day 4", label: "Demo + Pitch", tasks: [
            { id: "r10", t: "Record: merchant asks broken integration question → instant answer" },
            { id: "r11", t: "Find Razorpay AI + engineering leads on LinkedIn" },
            { id: "r12", t: "Write pitch: 'Built your AI support agent — here is the demo'" },
          ]},
          { day: "Day 5", label: "🚀 Launch", tasks: [
            { id: "r13", t: "Send pitch to 5 Razorpay engineers + internship HR" },
            { id: "r14", t: "Post: 'Built a support agent using Razorpay's own docs'" },
            { id: "r15", t: "Apply to Razorpay internship portal with project as portfolio" },
          ]},
          { day: "Day 6", label: "Follow-up", tasks: [
            { id: "r16", t: "Follow up after 5 days if no response" },
            { id: "r17", t: "Post on dev.to as a tutorial — builds organic credibility" },
          ]},
        ]
      },
      {
        id: "rp_p2", name: "Smart Payout Scheduler (RL Agent)", type: "new project", typeColor: "#14b8a6",
        stack: "Python, Stable-Baselines3, Q-learning, Pandas, FastAPI",
        pitch: "RL agent learns optimal payout timing to minimize failure rates from bank downtime.",
        days: [
          { day: "Day 1", label: "Build", tasks: [
            { id: "r18", t: "Collect public data: bank downtime reports, UPI failure time patterns" },
            { id: "r19", t: "Define RL env: state=time+bank+amount, reward=success minus latency" },
            { id: "r20", t: "Train Q-learning agent over 10k simulation episodes" },
          ]},
          { day: "Day 2", label: "Visualize", tasks: [
            { id: "r21", t: "Build heatmap: which hours have highest success rate per bank" },
            { id: "r22", t: "Show agent's learned policy vs naive random scheduling" },
            { id: "r23", t: "Compare: RL agent vs time-based rule — measure failure rate delta" },
          ]},
          { day: "Day 3", label: "Pitch", tasks: [
            { id: "r24", t: "Write 1-page case study with numbers: X% fewer failures" },
            { id: "r25", t: "Send as second project alongside Support Agent pitch" },
            { id: "r26", t: "Post: 'Applied RL to payment scheduling — results'" },
          ]},
        ]
      }
    ]
  },
  {
    id: "sarvam", name: "Sarvam AI", color: "#6366f1", icon: "🇮🇳",
    role: "Indic Language AI / Voice", package: "15–28 LPA + Equity", chance: 68,
    projects: [
      {
        id: "sv_p1", name: "Hinglish Multi-turn Voice Agent", type: "new project", typeColor: "#14b8a6",
        stack: "Python, Whisper, IndicTTS, LangChain, Ollama, FastAPI",
        pitch: "Voice agent that handles code-switching between Hindi and English mid-sentence.",
        days: [
          { day: "Day 1", label: "Build", tasks: [
            { id: "sv1", t: "Set up Whisper STT with language detection per segment" },
            { id: "sv2", t: "Build language-switch detector: identify Hindi vs English per phrase" },
            { id: "sv3", t: "Route to appropriate TTS per language segment in response" },
          ]},
          { day: "Day 2", label: "Build", tasks: [
            { id: "sv4", t: "Implement multi-turn context retention across 10+ turns" },
            { id: "sv5", t: "Test with 20 mixed Hinglish voice inputs — log success/fail" },
            { id: "sv6", t: "Handle edge case: English question → Hindi answer and vice versa" },
          ]},
          { day: "Day 3", label: "Eval", tasks: [
            { id: "sv7", t: "Build eval dashboard: accuracy rate per language-mix ratio" },
            { id: "sv8", t: "Benchmark against GPT-4 baseline on same 20 test cases" },
            { id: "sv9", t: "Log failure modes honestly: what it gets wrong and why" },
          ]},
          { day: "Day 4", label: "Demo", tasks: [
            { id: "sv10", t: "Add RTT measurement: voice input → response in under 1.5 seconds" },
            { id: "sv11", t: "Record 3-min demo: real Hinglish conversation with code-switching" },
            { id: "sv12", t: "Write honest evaluation: where it works, where it fails" },
          ]},
          { day: "Day 5", label: "🚀 Pitch", tasks: [
            { id: "sv13", t: "Find Sarvam AI founders + engineers on LinkedIn (they are reachable)" },
            { id: "sv14", t: "Send DM: 2 sentences + Loom demo link — nothing more" },
            { id: "sv15", t: "Email AI4Bharat team with eval benchmark results" },
          ]},
          { day: "Day 6", label: "Launch", tasks: [
            { id: "sv16", t: "Post on LinkedIn — tag Sarvam AI, AI4Bharat, @pratyushpankaj" },
            { id: "sv17", t: "Post on X/Twitter in Hindi AI community" },
            { id: "sv18", t: "Post demo on r/india + r/indianprogrammer" },
          ]},
          { day: "Day 7", label: "Follow-up", tasks: [
            { id: "sv19", t: "Reply to every comment immediately — Sarvam team IS on LinkedIn" },
            { id: "sv20", t: "Follow up Sarvam + AI4Bharat after 5 days if no response" },
          ]},
        ]
      },
      {
        id: "sv_p2", name: "Indic Language Eval Leaderboard", type: "new project", typeColor: "#14b8a6",
        stack: "Python, HuggingFace Evaluate, React, Supabase",
        pitch: "Public leaderboard testing LLMs across 5 Indic languages — becomes a cited benchmark.",
        days: [
          { day: "Day 1", label: "Build", tasks: [
            { id: "sv21", t: "Pick 5 languages: Hindi, Tamil, Telugu, Marathi, Bengali" },
            { id: "sv22", t: "Write 50 test prompts per language across 5 task types" },
            { id: "sv23", t: "Run GPT-4o, Gemini Flash, Sarvam-1 — score outputs" },
          ]},
          { day: "Day 2", label: "Build + Publish", tasks: [
            { id: "sv24", t: "Build React leaderboard: model vs language accuracy heatmap" },
            { id: "sv25", t: "Deploy publicly on Vercel — researchers will cite it" },
            { id: "sv26", t: "Write methodology post: how you scored the outputs" },
          ]},
          { day: "Day 3", label: "Pitch", tasks: [
            { id: "sv27", t: "Send leaderboard to Sarvam, AI4Bharat, Microsoft Research India" },
            { id: "sv28", t: "Post on X — tag every Indian AI researcher you can find" },
            { id: "sv29", t: "Submit to HuggingFace Spaces as a live demo" },
          ]},
        ]
      }
    ]
  }
];

const PHASE_COLORS = {
  "Build": "#3b82f6", "Plan + Build": "#3b82f6", "Plan": "#a855f7",
  "Polish": "#8b5cf6", "Demo": "#14b8a6", "Pitch": "#f97316",
  "Research": "#f59e0b", "Visualize": "#14b8a6", "Eval": "#14b8a6",
  "Build + Publish": "#3b82f6", "🚀 Launch": "#ef4444", "🚀 Pitch": "#ef4444",
  "Follow-up": "#6b7280", "Launch": "#ef4444", "Demo + Pitch": "#f97316",
};

export default function CompanyPlanner() {
  const [done, setDone] = useState({});
  const [activeCompany, setActiveCompany] = useState("intel");
  const [activeProject, setActiveProject] = useState(null);
  const [openDay, setOpenDay] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("company_planner_v3");
      if (saved) setDone(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => { setActiveProject(null); setOpenDay(null); }, [activeCompany]);

  const toggleTask = (id) => {
    const n = { ...done, [id]: !done[id] };
    setDone(n);
    try { localStorage.setItem("company_planner_v3", JSON.stringify(n)); } catch {}
  };

  const allTasks = (proj) => proj.days.flatMap(d => d.tasks);
  const doneCt = (proj) => allTasks(proj).filter(t => done[t.id]).length;

  const totalAll = COMPANIES.flatMap(c => c.projects.flatMap(p => allTasks(p))).length;
  const doneAll = COMPANIES.flatMap(c => c.projects.flatMap(p => allTasks(p))).filter(t => done[t.id]).length;
  const pctAll = totalAll ? Math.round(doneAll / totalAll * 100) : 0;

  const company = COMPANIES.find(c => c.id === activeCompany);
  const project = activeProject ? company.projects.find(p => p.id === activeProject) : null;

  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 660, margin: "0 auto", padding: "14px 0 32px" }}>

      {/* Global progress */}
      <div style={{ padding: "10px 14px", background: "var(--color-background-secondary)",
        borderRadius: 12, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
            Overall — 8 companies, 16 projects
          </span>
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>
            {doneAll}/{totalAll} · {pctAll}%
          </span>
        </div>
        <div style={{ height: 6, background: "var(--color-background-primary)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pctAll}%`,
            background: "linear-gradient(90deg,#6366f1,#14b8a6)", borderRadius: 3, transition: "width .4s" }} />
        </div>
      </div>

      {/* Company pills */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 6, marginBottom: 14, scrollbarWidth: "none" }}>
        {COMPANIES.map(c => {
          const ct = c.projects.flatMap(p => allTasks(p)).length;
          const cd = c.projects.flatMap(p => allTasks(p)).filter(t => done[t.id]).length;
          const active = activeCompany === c.id;
          return (
            <button key={c.id} onClick={() => setActiveCompany(c.id)}
              style={{ flexShrink: 0, padding: "7px 11px", borderRadius: 10, cursor: "pointer",
                border: `0.5px solid ${active ? c.color : "var(--color-border-tertiary)"}`,
                background: active ? c.color + "18" : "transparent", textAlign: "center", minWidth: 72 }}>
              <div style={{ fontSize: 15 }}>{c.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: active ? c.color : "var(--color-text-secondary)", marginTop: 1 }}>
                {c.name}
              </div>
              <div style={{ fontSize: 9, color: "var(--color-text-tertiary)", marginTop: 2 }}>
                {ct ? Math.round(cd/ct*100) : 0}%
              </div>
            </button>
          );
        })}
      </div>

      {/* Company banner */}
      {!activeProject && (
        <div style={{ padding: "12px 14px", border: `0.5px solid ${company.color}55`,
          borderRadius: 12, background: company.color + "08", marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 500, color: "var(--color-text-primary)" }}>
                {company.icon} {company.name}
              </div>
              <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 2 }}>{company.role}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: company.color }}>{company.package}</div>
              <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 3 }}>
                Chance: <span style={{ fontWeight: 500,
                  color: company.chance >= 50 ? "#22c55e" : company.chance >= 30 ? "#f59e0b" : "#ef4444" }}>
                  {company.chance}%
                </span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, height: 4, background: "var(--color-background-secondary)",
            borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 2, transition: "width .4s",
              width: `${company.chance}%`,
              background: company.chance >= 50 ? "#22c55e" : company.chance >= 30 ? "#f59e0b" : "#ef4444" }} />
          </div>
        </div>
      )}

      {/* Project list or detail */}
      {!activeProject ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {company.projects.map(proj => {
            const d = doneCt(proj); const t = allTasks(proj).length;
            const pct = t ? Math.round(d/t*100) : 0;
            return (
              <div key={proj.id} onClick={() => setActiveProject(proj.id)}
                style={{ padding: "14px 16px", border: "0.5px solid var(--color-border-secondary)",
                  borderRadius: 12, background: "var(--color-background-primary)", cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ flex: 1, paddingRight: 10 }}>
                    <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 4,
                      background: proj.typeColor + "22", color: proj.typeColor, fontWeight: 500 }}>
                      {proj.type}
                    </span>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)", marginTop: 5 }}>
                      {proj.name}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2 }}>{proj.stack}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500,
                      color: pct===100 ? "#22c55e" : "var(--color-text-secondary)" }}>{d}/{t}</div>
                    <div style={{ fontSize: 10, color: "var(--color-text-tertiary)" }}>done</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "var(--color-text-secondary)", fontStyle: "italic",
                  borderLeft: `2px solid ${company.color}`, paddingLeft: 8, marginBottom: 8, lineHeight: 1.5 }}>
                  {proj.pitch}
                </div>
                <div style={{ height: 3, background: "var(--color-background-secondary)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`,
                    background: pct===100 ? "#22c55e" : company.color, borderRadius: 2 }} />
                </div>
                <div style={{ fontSize: 10, color: company.color, textAlign: "right", marginTop: 5 }}>
                  Open checklist →
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <button onClick={() => { setActiveProject(null); setOpenDay(null); }}
            style={{ fontSize: 12, color: "var(--color-text-secondary)", background: "transparent",
              border: "none", cursor: "pointer", marginBottom: 10, padding: 0 }}>
            ← Back to projects
          </button>

          {/* Project header */}
          <div style={{ padding: "12px 14px", background: "var(--color-background-secondary)",
            borderRadius: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 4,
              background: project.typeColor + "22", color: project.typeColor, fontWeight: 500 }}>
              {project.type}
            </span>
            <div style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)", marginTop: 5, marginBottom: 3 }}>
              {project.name}
            </div>
            <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginBottom: 5 }}>
              {project.stack}
            </div>
            <div style={{ fontSize: 11, color: "var(--color-text-secondary)", fontStyle: "italic",
              borderLeft: `2px solid ${company.color}`, paddingLeft: 8, marginBottom: 8, lineHeight: 1.5 }}>
              {project.pitch}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>
                {doneCt(project)}/{allTasks(project).length} tasks
              </span>
              <span style={{ fontSize: 12, fontWeight: 500,
                color: doneCt(project)===allTasks(project).length?"#22c55e":company.color }}>
                {allTasks(project).length?Math.round(doneCt(project)/allTasks(project).length*100):0}%
              </span>
            </div>
            <div style={{ height: 4, background: "var(--color-background-primary)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 2, transition: "width .4s",
                width: `${allTasks(project).length?Math.round(doneCt(project)/allTasks(project).length*100):0}%`,
                background: doneCt(project)===allTasks(project).length?"#22c55e":company.color }} />
            </div>
          </div>

          {/* Day cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {project.days.map((day, di) => {
              const dayDone = day.tasks.filter(t => done[t.id]).length;
              const allDone = dayDone === day.tasks.length;
              const isOpen = openDay === di;
              const phColor = PHASE_COLORS[day.label] || "#6b7280";
              return (
                <div key={di} style={{ border: `0.5px solid ${isOpen ? company.color+"66" : "var(--color-border-tertiary)"}`,
                  borderRadius: 10, overflow: "hidden", background: "var(--color-background-primary)" }}>
                  <div onClick={() => setOpenDay(isOpen ? null : di)}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", cursor: "pointer" }}>
                    <div style={{ width: 3, height: 36, borderRadius: 2, background: phColor, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                        <span style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-tertiary)" }}>{day.day}</span>
                        <span style={{ fontSize: 10, padding: "1px 5px", borderRadius: 3,
                          background: phColor + "22", color: phColor, fontWeight: 500 }}>{day.label}</span>
                        {allDone && <span style={{ fontSize: 10, color: "#22c55e" }}>✓</span>}
                      </div>
                      <div style={{ width: 70, height: 2.5, background: "var(--color-background-secondary)",
                        borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", borderRadius: 2,
                          width: `${day.tasks.length?Math.round(dayDone/day.tasks.length*100):0}%`,
                          background: allDone ? "#22c55e" : phColor }} />
                      </div>
                    </div>
                    <span style={{ fontSize: 12, color: allDone?"#22c55e":"var(--color-text-tertiary)",
                      fontWeight: allDone?500:400, flexShrink: 0 }}>{dayDone}/{day.tasks.length}</span>
                    <span style={{ fontSize: 12, color: "var(--color-text-tertiary)", flexShrink: 0 }}>
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </div>
                  {isOpen && (
                    <div style={{ borderTop: "0.5px solid var(--color-border-tertiary)", padding: "2px 12px 8px" }}>
                      {day.tasks.map((task, ti) => {
                        const isDone = !!done[task.id];
                        return (
                          <div key={task.id} onClick={() => toggleTask(task.id)}
                            style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0",
                              cursor: "pointer", opacity: isDone ? 0.45 : 1,
                              borderBottom: ti<day.tasks.length-1?"0.5px solid var(--color-border-tertiary)":"none" }}>
                            <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1,
                              border: `1.5px solid ${isDone?"#22c55e":"var(--color-border-secondary)"}`,
                              background: isDone?"#22c55e":"transparent",
                              display: "flex", alignItems: "center", justifyContent: "center", transition: "all .15s" }}>
                              {isDone && <span style={{ fontSize: 10, color: "#fff" }}>✓</span>}
                            </div>
                            <span style={{ fontSize: 13, color: "var(--color-text-primary)", lineHeight: 1.55,
                              textDecoration: isDone?"line-through":"none" }}>{task.t}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}