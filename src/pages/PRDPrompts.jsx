import { useState } from "react";

const COMPANIES = [
    {
        id: "intel",
        name: "Intel",
        color: "#0071C5",
        icon: "⚡",
        projects: [
            {
                id: "intel_new",
                name: "OpenVINO GenAI Chat Playground",
                tag: "NEW — Replace Model Zoo Profiler",
                tagColor: "#ef4444",
                why: "Intel just launched OpenVINO GenAI 2025.4 with GGUF reader, LoRA adapters, RAG backend, and NPU support. Nobody has built a clean developer playground for it yet. This is ACTIVE Intel territory right now.",
                oneLiner: "A browser-based playground to run, compare, and benchmark LLMs using OpenVINO GenAI — with NPU/CPU/GPU switching, LoRA support, and RAG pipeline testing.",
                prompt: `You are an expert full-stack developer and AI engineer. Build a complete, production-ready application called "OpenVINO GenAI Playground" from scratch. Here is the full specification:

---

PROJECT OVERVIEW
Build a local-first web application that lets developers load, run, and benchmark LLMs using the OpenVINO GenAI Python API (openvino-genai package, 2025.x). The app runs as a FastAPI backend + React frontend on localhost.

---

TECH STACK
Backend: Python 3.11+, FastAPI, uvicorn, openvino-genai, psutil, python-dotenv
Frontend: React 18, Vite, Tailwind CSS, Recharts, Axios
Database: SQLite (via sqlite3 built-in) for storing benchmark history

---

BACKEND — build these files:

1. backend/main.py
   - FastAPI app with CORS enabled for localhost:5173
   - Lifespan event: on startup, scan ./models directory for GGUF files and OpenVINO IR folders, register them in SQLite
   - Routes: GET /models, POST /generate, POST /benchmark, GET /benchmark/history, GET /system/stats, POST /load-model, DELETE /unload-model

2. backend/model_manager.py
   - ModelManager class with methods: load_model(model_path, device), unload_model(), generate(prompt, max_tokens, temperature, stream), get_loaded_model_info()
   - Support devices: "CPU", "GPU", "NPU", "AUTO"
   - Use openvino_genai.LLMPipeline for inference
   - Support GGUF models via openvino_genai GGUF reader (new in 2025.2)
   - Streaming: use openvino_genai.StreamerBase subclass to yield tokens via generator
   - Track: tokens_per_second, first_token_latency_ms, total_latency_ms for every generation

3. backend/hardware_monitor.py
   - HardwareMonitor class polling every 500ms using psutil
   - Track: cpu_percent (per-core list + aggregate), ram_used_gb, ram_total_gb, ram_percent
   - Keep rolling 60-point history for sparkline charts
   - Detect Intel NPU presence: check if "NPU" in openvino Core().available_devices

4. backend/benchmark_runner.py
   - BenchmarkRunner class
   - run_benchmark(model_path, device, prompts_list): runs all prompts, collects latency + throughput per prompt
   - compare_devices(model_path, prompts): runs same prompts on CPU, GPU (if available), NPU (if available) — returns comparison dict
   - Stores results in SQLite table: benchmark_runs(id, model_name, device, avg_tps, avg_latency_ms, p95_latency_ms, timestamp)

5. backend/lora_manager.py
   - Detect .safetensors LoRA adapter files in ./loras directory
   - Apply LoRA to loaded pipeline via openvino_genai LoRA support
   - List available adapters, apply/remove adapter from active pipeline

6. backend/rag_pipeline.py
   - Simple RAG using openvino_genai RAG backend (new in 2025.2)
   - Methods: add_document(text), add_file(filepath), query(question) -> answer with sources
   - Store documents in simple JSON file (./rag_documents.json)
   - Embed using a local embedding model (e2e-base-en or similar OpenVINO IR model)

7. backend/database.py
   - SQLite setup: create tables on startup (benchmark_runs, generation_logs, model_registry)
   - CRUD functions for each table

---

FRONTEND — build these pages and components:

Page 1: Chat (src/pages/Chat.jsx)
- Left sidebar: model selector dropdown (from GET /models), device selector (CPU/GPU/NPU/AUTO), temperature slider (0.1-2.0), max tokens slider (64-2048), LoRA adapter dropdown
- Main area: chat messages (user right, assistant left), streaming token display (show tokens appearing one by one)
- Bottom: text input + send button + voice input button (Web Speech API)
- Top right: status badge showing current backend (CPU/GPU/NPU) + tokens/sec live counter
- Hardware mini-bar: tiny CPU% and RAM% indicators always visible at top

Page 2: Benchmark (src/pages/Benchmark.jsx)
- Model selector + device checkboxes (CPU, GPU, NPU — grey out if unavailable)
- Preset prompts selector: Short (1 sentence), Medium (paragraph), Long (essay), Code generation
- Custom prompts textarea: add your own test prompts
- Run Benchmark button → progress bar per model/device combo
- Results section: 
  * Bar chart: tokens/sec comparison across devices
  * Bar chart: first-token latency comparison
  * Table: all metrics with sortable columns
  * Winner badge: "NPU is 2.3x faster than CPU for this model"
- Export CSV button

Page 3: RAG Test (src/pages/RAG.jsx)
- Document upload: drag-and-drop files (PDF, TXT, MD) + paste text area
- Document list: show added documents with remove button
- Query input: ask questions about documents
- Results: answer + source snippets highlighted
- Test mode: run same query with RAG vs without RAG, show difference

Page 4: Models (src/pages/Models.jsx)
- Grid of detected models (from ./models directory)
- Each card: model name, file size, format (GGUF/IR), compatible devices
- Load/Unload button per model
- Currently loaded model highlighted with green border
- "Add Model" instructions: shows command to download from HuggingFace with optimum-intel

Page 5: History (src/pages/History.jsx)
- Table of all past benchmark runs with filters (model, device, date range)
- Charts: performance over time per model
- Compare runs: select two benchmark runs, show side-by-side diff

Global Components:
- src/components/HardwareBar.jsx: always-visible top bar showing live CPU%, RAM%, active device badge
- src/components/StreamingText.jsx: renders streaming tokens with cursor animation
- src/components/DeviceBadge.jsx: colored badge (blue=CPU, green=GPU, purple=NPU, gray=AUTO)

---

SETUP FILES:
- requirements.txt with exact versions
- frontend/package.json with all dependencies
- .env.example: MODEL_DIR=./models, LORA_DIR=./loras, MAX_CONTEXT_LENGTH=4096, DEFAULT_DEVICE=AUTO
- run.bat (Windows) and run.sh (Unix): starts both backend and frontend simultaneously
- README.md with: project description, quick start, example screenshots section, supported models list, how to download models using optimum-intel

---

SAMPLE MODELS TO REFERENCE IN README (tell user how to get them):
- Qwen2.5-1.5B-Instruct (GGUF) — works on NPU
- Llama-3.2-1B-Instruct (OpenVINO IR via optimum-intel)
- Phi-4-mini-reasoning (NPU supported per OpenVINO 2025.4 release notes)
- Gemma-3-4B-it (NPU supported)

---

CODE QUALITY REQUIREMENTS:
- Every file must have descriptive comments
- All API endpoints must have Pydantic request/response models
- Frontend: use React hooks properly, no class components
- Error boundaries on every page
- Loading states for all async operations
- Responsive layout (works on 1280px+ screens)
- Dark theme using Tailwind dark: classes

---

DELIVERABLE: Complete working application. Every file written in full. No placeholders. No "TODO" comments. Start with backend/main.py, then work through all backend files, then frontend files in order.`
            },
            {
                id: "intel_kira",
                name: "KIRA — Benchmark Dashboard Addition",
                tag: "YOUR PROJECT — Polish",
                tagColor: "#8b5cf6",
                why: "KIRA already exists. This prompt tells an AI agent exactly what to add to make it Intel-pitch ready.",
                oneLiner: "Add a live benchmark dashboard to KIRA showing OpenVINO vs CPU latency with hardware-aware routing visualization.",
                prompt: `You are an expert Python developer. I have an existing AI agent project called KIRA. I need you to add a benchmark dashboard module to it. Here is exactly what to build:

---

CONTEXT
KIRA is a local AI agent that uses OpenVINO for inference, monitors CPU/RAM with psutil, and routes to Groq/Gemini cloud API when hardware is stressed. It has a working chat interface and screen automation.

---

WHAT TO ADD: benchmark_dashboard.py

Build a PyQt6 window (or Tkinter if PyQt6 not installed) that shows:

PANEL 1 — Live Hardware Stats (left side):
- Circular CPU gauge (0-100%) with color zones: green <50%, yellow 50-75%, red >75%
- Bar RAM gauge (used/total GB) with same color zones
- Sparkline chart: CPU usage over last 60 seconds (use pyqtgraph or matplotlib embedded)
- Current active backend badge: "LOCAL (OpenVINO)" in blue or "CLOUD (Groq)" in orange
- Status text: "Switched to cloud at 14:32:05 — CPU: 78%"

PANEL 2 — Inference Performance (right side):
- Tokens/sec meter: current generation speed with a needle gauge
- Latency comparison bar chart (3 bars, update after each query):
  * OpenVINO INT8: X ms
  * CPU-only (no OpenVINO): Y ms  
  * Cloud Groq: Z ms
- First token latency display for last 5 queries

PANEL 3 — Routing History (bottom strip):
- Scrolling timeline log: timestamp | backend | reason | latency
- Color-coded rows: blue = local, orange = cloud
- Filter buttons: show all / local only / cloud only

PANEL 4 — Benchmark Runner (tab or button):
- "Run Benchmark" button: runs 5 preset prompts on all 3 backends sequentially
- Progress bar during run
- Results table: prompt | OpenVINO ms | CPU-only ms | Cloud ms | winner
- Export CSV button

---

ALSO ADD: routing_logger.py
- RoutingLogger class
- Methods: log_switch(from_backend, to_backend, cpu_percent, ram_percent, reason)
- Methods: log_generation(backend, prompt_tokens, generation_tokens, latency_ms, tokens_per_second)  
- Store in SQLite: routing_events table, generation_stats table
- get_session_summary(): returns dict with total_queries, local_percent, cloud_percent, avg_latency_local, avg_latency_cloud

---

ALSO MODIFY: router.py (existing file)
Add calls to RoutingLogger on every backend switch and every generation completion.

---

INTEGRATION:
- Dashboard opens in a separate thread so it doesn't block the main KIRA chat window
- Dashboard auto-refreshes every 500ms
- Dashboard reads from RoutingLogger's SQLite

---

REQUIREMENTS:
- requirements_dashboard.txt with new dependencies only
- README_DASHBOARD.md explaining what was added and how to run
- No breaking changes to existing KIRA functionality`
            }
        ]
    },
    {
        id: "razorpay",
        name: "Razorpay",
        color: "#1A73E8",
        icon: "💳",
        projects: [
            {
                id: "rp_support",
                name: "Merchant AI Support Agent",
                tag: "NEW PROJECT",
                tagColor: "#14b8a6",
                why: "Razorpay's merchant support volume is massive. An intern who pre-built their AI support agent with their own docs is a no-brainer hire for their AI team.",
                oneLiner: "RAG-powered support agent trained on Razorpay's public docs that resolves merchant integration queries instantly with fraud pattern detection.",
                prompt: `You are an expert full-stack AI engineer. Build a complete production-ready application called "Razorpay Merchant AI Assistant" from scratch. Full specification below:

---

PROJECT OVERVIEW
A chat-based AI support agent that answers Razorpay merchant integration questions using RAG (Retrieval-Augmented Generation) over Razorpay's public documentation. Includes fraud pattern detection and escalation logic.

---

TECH STACK
Backend: Python 3.11+, FastAPI, uvicorn, LangChain, FAISS, sentence-transformers, groq, python-dotenv, httpx, sqlite3
Frontend: React 18, Vite, Tailwind CSS, Axios, Recharts
Scraping: requests, BeautifulSoup4, markdownify

---

BACKEND FILES:

1. backend/scraper.py
   - DocumentScraper class
   - scrape_razorpay_docs(): crawl these URLs and all their subpages:
     * https://razorpay.com/docs/payments/
     * https://razorpay.com/docs/api/
     * https://razorpay.com/docs/payments/payment-gateway/
     * https://razorpay.com/docs/errors/
   - Convert HTML to clean Markdown using markdownify
   - Save each page as a .md file in ./docs/razorpay/
   - Store metadata: url, title, last_scraped, word_count

2. backend/knowledge_base.py
   - KnowledgeBase class
   - build_index(): load all .md files from ./docs/razorpay/, chunk into 512-token segments with 50-token overlap, embed using sentence-transformers (all-MiniLM-L6-v2), store in FAISS index
   - save_index() / load_index(): persist FAISS index to ./data/faiss_index/
   - search(query, top_k=5): return top_k relevant chunks with source URLs and similarity scores
   - get_stats(): return total_documents, total_chunks, index_size_mb, last_built

3. backend/support_agent.py
   - SupportAgent class
   - answer(query, conversation_history): 
     1. Search knowledge base for top 5 relevant chunks
     2. If max similarity < 0.45: return "I don't have specific info on that — here's what I found" + chunks
     3. If max similarity >= 0.45: send to Groq LLM with system prompt + context + conversation history
     4. Parse response for confidence score (ask LLM to self-rate 1-10)
     5. If confidence < 6: append escalation message "Would you like to connect with Razorpay support?"
   - System prompt must include: "You are Razorpay's AI support agent. Only answer based on the provided documentation context. Always cite the source URL. Format code examples in markdown code blocks."
   - detect_fraud_patterns(transaction_description): 
     * Check for keywords: "test card", "international", "declined multiple times", "different billing address", "large amount first order"
     * Return fraud_risk: LOW/MEDIUM/HIGH with specific reason
   - get_suggested_questions(query): return 3 related questions based on the query topic

4. backend/analytics.py
   - Track every query: timestamp, query_text, response_length, confidence_score, escalated, resolution_time_ms
   - Compute: top_10_query_topics (cluster similar queries), avg_confidence, escalation_rate, queries_per_hour
   - Store in SQLite: queries table, daily_stats table

5. backend/main.py
   - FastAPI app
   - POST /chat: {query, conversation_history} -> {answer, sources, confidence, fraud_alert, suggested_questions}
   - GET /analytics: return dashboard stats
   - POST /build-index: trigger knowledge base rebuild (with progress via SSE)
   - GET /index-status: return knowledge base stats
   - GET /health: system health check

---

FRONTEND FILES:

src/pages/Chat.jsx — Main chat interface:
- Header: "Razorpay Merchant Assistant" with Razorpay blue (#2B6ED4) branding
- Left sidebar: 
  * Conversation history list (stored in localStorage)
  * New Chat button
  * Language selector: English / Hindi
- Main chat area:
  * User messages (right, dark blue bubble)
  * Assistant messages (left, white card with shadow)
  * Each assistant message shows: answer text + source URLs as clickable chips + confidence badge (green >7, yellow 4-7, red <4)
  * Fraud alert banner (if detected): red warning card above the answer
  * Suggested questions: 3 clickable pill buttons below each answer
- Bottom input: text field + send + mic button (Web Speech API for voice)
- Loading: animated "Searching documentation..." → "Generating answer..." states

src/pages/Analytics.jsx — Admin dashboard:
- Cards row: Total Queries Today, Avg Confidence Score, Escalation Rate %, Avg Response Time
- Line chart: queries per hour (last 24h)
- Bar chart: top 10 query topics
- Table: recent queries with confidence scores, escalation flag, timestamp
- Export CSV button

src/components/FraudAlert.jsx:
- Renders ONLY when fraud_alert.risk is MEDIUM or HIGH
- Red/yellow banner: "⚠️ Potential fraud pattern detected: [reason]"
- Shows risk level badge
- Links to Razorpay fraud documentation

src/components/SourceChip.jsx:
- Clickable chip showing source URL domain
- On click: opens source URL in new tab
- Tooltip: shows full page title on hover

---

SAMPLE QUESTIONS FILE: src/data/suggested_questions.json
Include 30 common Razorpay merchant questions across categories:
- Payment Gateway Integration (10 questions)
- Payment Failures and Errors (10 questions)  
- Refunds and Settlements (5 questions)
- API Authentication (5 questions)

---

SETUP:
- requirements.txt with pinned versions
- .env.example: GROQ_API_KEY, EMBEDDING_MODEL=all-MiniLM-L6-v2, CHUNK_SIZE=512, CHUNK_OVERLAP=50
- run.bat / run.sh
- README.md with: project description, architecture diagram (ASCII), quick start, example queries, how it maps to Razorpay's actual support problems

---

QUALITY REQUIREMENTS:
- All async where possible (FastAPI async endpoints, async LLM calls)
- Rate limiting on /chat endpoint: max 20 requests/minute per IP (use slowapi)
- Input validation: max query length 500 characters
- Hindi support: if query contains Devanagari script, append "Please respond in Hindi." to LLM prompt
- Mobile responsive (works on 375px screens)
- All error states handled with user-friendly messages

Write every file completely. No placeholders. Start with backend/scraper.py.`
            },
            {
                id: "rp_scheduler",
                name: "Smart Payout Scheduler (RL Agent)",
                tag: "NEW PROJECT",
                tagColor: "#14b8a6",
                why: "Your RL background from the traffic project maps directly to this. Razorpay's payout failure rates are a real pain — an RL agent that learns optimal timing is genuinely novel.",
                oneLiner: "RL agent that learns optimal UPI payout timing by modeling bank downtime patterns to minimize transaction failures.",
                prompt: `You are an expert ML engineer and full-stack developer. Build a complete application called "SmartPay Scheduler" — an RL-based payment timing optimizer. Full specification:

---

PROJECT OVERVIEW
A reinforcement learning agent that learns the optimal time to schedule UPI/NEFT payouts to minimize failure rates, based on historical bank availability patterns and transaction metadata.

---

TECH STACK
Backend: Python 3.11+, FastAPI, stable-baselines3, gymnasium, numpy, pandas, matplotlib, sqlite3, uvicorn
Frontend: React 18, Vite, Tailwind CSS, Recharts, Leaflet (for heatmap)

---

BACKEND FILES:

1. backend/environment.py
   - PayoutEnvironment class extending gymnasium.Env
   - State space (observation): 
     * hour_of_day (0-23, normalized)
     * day_of_week (0-6, normalized)
     * bank_id (one-hot encoded, 10 banks)
     * amount_bucket (0=<1k, 1=1k-10k, 2=10k-100k, 3=>100k)
     * recent_failure_rate (rolling 1h failure rate for this bank, 0.0-1.0)
   - Action space: Discrete(24) — schedule delay in hours (0=now, 23=delay 23 hours)
   - Reward function: +10 if transaction succeeds, -5 if fails, -0.2 per hour of delay
   - step(action): simulate transaction outcome using bank_availability_model
   - reset(): sample random bank, amount, time from historical distribution

2. backend/bank_model.py
   - BankAvailabilityModel class
   - Data: generate synthetic but realistic bank downtime data for 10 Indian banks
   - Patterns to encode (based on known UPI patterns):
     * All banks: failure spike 11:30 PM - 12:30 AM (maintenance window)
     * SBI: failure spike Sunday 2-4 AM
     * HDFC: higher failures Monday morning 8-9 AM (batch processing)
     * All banks: higher failures on salary dates (1st, 7th, last day of month)
     * Festival days: 30% higher failure rate across all banks
   - get_success_probability(bank_id, hour, day_of_week, date): returns float 0.0-1.0
   - generate_historical_data(days=365): creates realistic transaction dataset as DataFrame
   - save to ./data/transaction_history.csv

3. backend/trainer.py
   - AgentTrainer class
   - train(total_timesteps=100000): train PPO agent using stable-baselines3
   - evaluate(n_episodes=1000): compute mean reward, success rate, avg delay
   - compare_strategies(): 
     * RL Agent policy
     * Naive: always send immediately  
     * Rule-based: avoid known maintenance windows
     * Random: random delay 0-6 hours
   - Returns comparison dict with success_rate, avg_delay_hours, avg_reward for each
   - save_model() / load_model()

4. backend/optimizer.py
   - PayoutOptimizer class using trained agent
   - recommend(bank_id, amount, requested_time): returns optimal_send_time, confidence, reason
   - batch_recommend(payouts_list): optimize a list of payouts, return schedule
   - get_bank_heatmap(): returns 24x7 matrix (hour x day) of success probability per bank

5. backend/simulator.py
   - BacktestSimulator class
   - run_backtest(strategy, test_days=30): simulate strategy on held-out data
   - Returns: total_transactions, success_rate, failed_transactions, avg_delay, estimated_loss_saved
   - compare_all_strategies(test_days=30): runs backtest for all 4 strategies, returns comparison

6. backend/main.py
   - FastAPI routes:
   - POST /recommend: {bank_id, amount, requested_time} -> {optimal_time, delay_hours, confidence, reason}
   - POST /batch-recommend: {payouts: list} -> optimized schedule
   - GET /heatmap/{bank_id}: 24x7 success probability matrix
   - GET /comparison: strategy comparison results
   - GET /backtest: backtest results for all strategies
   - POST /train: trigger agent training (SSE progress stream)
   - GET /model-stats: training info, eval metrics

---

FRONTEND FILES:

src/pages/Dashboard.jsx — Main dashboard:
- Header card: "RL Agent Performance" — shows success rate improvement vs naive strategy
- 4 stat cards: RL Success Rate %, Avg Delay Hours, Failed Transactions Avoided, Estimated Loss Prevented (₹)
- Strategy comparison bar chart: RL vs Rule-based vs Naive vs Random (success rate + avg delay)

src/pages/Heatmap.jsx — Bank availability heatmap:
- Bank selector dropdown (10 banks)
- 24x7 heatmap grid (hours x days of week)
- Color scale: red=high failure risk, green=low failure risk
- Click a cell: shows exact success probability + recommendation
- Toggle: show RL agent's preferred windows (highlighted cells)

src/pages/Optimizer.jsx — Live payout optimizer:
- Form: bank selector, amount input, desired send time
- Submit → shows: optimal send time, delay recommendation, confidence %, reason text
- Batch mode: paste CSV of payouts → get full optimized schedule back
- Download optimized schedule as CSV

src/pages/Backtest.jsx — Strategy comparison:
- Date range selector for backtest period
- Run Backtest button → progress bar
- Results table: strategy | success_rate | avg_delay | transactions_saved | ₹_saved
- Line chart: success rate over time for each strategy
- Winner badge: "RL Agent saves ₹X,XXX in failed transaction fees per 1000 payouts"

---

SETUP FILES:
- requirements.txt
- .env.example
- run.bat / run.sh  
- README.md with: clear explanation of the RL approach, results summary (put actual numbers from backtest), section "Why this matters for Razorpay", architecture diagram

Write every file completely. No placeholders. Start with backend/environment.py.`
            }
        ]
    },
    {
        id: "google",
        name: "Google",
        color: "#4285F4",
        icon: "🔍",
        projects: [
            {
                id: "google_godsview",
                name: "God's View → Social Cascade Simulator",
                tag: "YOUR PROJECT — Narrow & Build",
                tagColor: "#8b5cf6",
                why: "Narrowing God's View to misinformation spread makes it a real research contribution. DeepMind India and Google Research India both work on multi-agent systems. An arXiv paper with this demo is your best Google play.",
                oneLiner: "Multi-agent simulation of misinformation spread through social networks with real-time D3.js visualization and intervention strategy comparison.",
                prompt: `You are an expert in multi-agent systems, network science, and full-stack development. Build a complete research-grade application called "CascadeSim — Social Information Flow Simulator". Full specification:

---

PROJECT OVERVIEW
A multi-agent simulation system modeling how information (or misinformation) spreads through a social network. Users can configure network topology, agent behavior, and intervention strategies, then watch the spread in real time. Designed to be publishable as a research tool.

---

TECH STACK
Backend: Python 3.11+, FastAPI, mesa (multi-agent), networkx, numpy, pandas, scipy, uvicorn
Frontend: React 18, Vite, Tailwind CSS, D3.js v7, Recharts, Axios

---

BACKEND FILES:

1. backend/agents.py
   - SocialAgent class extending mesa.Agent with properties:
     * belief_score: float 0.0-1.0 (how much agent believes the information)
     * trust_network: list of agent IDs this agent trusts
     * tribe: int (0-4, community/echo-chamber membership)
     * skepticism: float (resistance to new information, 0.0-1.0)
     * influence: float (how much others trust this agent, 0.0-1.0)
   - step() method: 
     * For each trusted neighbor who believes info: increase belief by (neighbor.influence * (1 - self.skepticism) * 0.1)
     * If belief_score > sharing_threshold (default 0.65): share = True
     * Decay: belief_score *= 0.98 each step if no reinforcement
   - FactCheckerAgent subclass: 
     * Targets highest-belief neighbors
     * Reduces their belief_score by 0.15 per step
     * Has reach_radius (how many hops it can influence)
   - FirewallNode subclass: blocks all information transmission through it

2. backend/network.py
   - NetworkBuilder class
   - build_network(topology, n_agents, params) with topology options:
     * "scale_free": Barabási–Albert model (realistic social network)
     * "small_world": Watts-Strogatz model
     * "random": Erdős–Rényi model
     * "tribal": 5 densely connected tribes with sparse inter-tribe edges
   - assign_tribes(G): assign tribe membership, higher intra-tribe trust
   - assign_agent_attributes(G): randomize skepticism/influence using beta distributions
   - seed_information(G, source_nodes, initial_belief): set initial belief scores
   - to_dict(): serialize network to JSON for frontend D3

3. backend/simulation.py
   - CascadeModel class extending mesa.Model
   - __init__(network_config, intervention_config, seed)
   - step(): advance simulation one timestep, collect metrics
   - run(steps): run N steps, collect metrics at each step
   - Metrics per step: 
     * spread_percent (agents with belief > 0.5)
     * high_belief_percent (agents with belief > 0.8)  
     * contained (spread_percent < 5% after peak)
     * active_sharers count
     * tribe_breakdown: {tribe_id: spread_percent} for each tribe
   - Interventions supported:
     * "none": no intervention
     * "early_factchecker": deploy fact-checkers at step 5
     * "late_factchecker": deploy at step 20
     * "tribal_firewall": block inter-tribe edges at step 10
     * "influencer_correction": high-influence agents start countering at step 15

4. backend/experiment_runner.py  
   - ExperimentRunner class
   - run_comparison(network_config, interventions_list, n_runs=10, steps=50):
     * Runs each intervention strategy n_runs times (different random seeds)
     * Returns mean + std for each metric per strategy
   - run_sensitivity(param_name, param_values, base_config):
     * Vary one parameter, measure outcome
     * Returns sensitivity data for analysis
   - generate_report(experiment_results): returns structured dict with:
     * best_strategy, worst_strategy
     * peak_spread per strategy
     * containment_time per strategy
     * statistical significance (t-test between best and second-best)

5. backend/main.py
   - FastAPI routes:
   - POST /simulate: {network_config, intervention, steps, seed} -> {step_metrics: list, final_state: network_json}
   - POST /compare: {network_config, interventions: list, n_runs} -> comparison results
   - GET /network/preview: {topology, n_agents} -> network JSON for preview
   - POST /experiment: full experiment with sensitivity analysis
   - WebSocket /ws/simulate: stream step-by-step metrics as simulation runs

---

FRONTEND FILES:

src/pages/Simulator.jsx — Main simulation view:
- Left panel: Configuration
  * Network topology selector (radio: scale_free/small_world/random/tribal)
  * Agent count slider: 100-2000
  * Tribes count: 3-8
  * Intervention selector (radio: none/early_factchecker/late_factchecker/tribal_firewall/influencer_correction)
  * Seed source nodes: 1-5 initial infected agents
  * Run button
- Center panel: Network Visualization (D3.js force-directed graph)
  * Nodes colored by belief_score: white=0.0, orange=0.5, red=1.0 (gradient)
  * Tribe membership shown by node shape (circle/square/diamond/triangle/star)
  * Fact-checker agents: blue outlined nodes
  * Firewall nodes: gray with X mark
  * Animate step-by-step: node colors change as simulation runs
  * Playback controls: play/pause/step/reset, speed slider (0.1x - 10x)
- Right panel: Metrics
  * Line chart: spread% over time (live-updating as simulation runs)
  * Current step metrics: spread%, high-belief%, active-sharers
  * Tribe breakdown bar chart: spread per tribe

src/pages/Compare.jsx — Strategy comparison:
- Network config form (same as simulator)
- Multi-select intervention checkboxes (pick 2-5 to compare)
- Runs slider: 5-50 runs per strategy
- Run Comparison button → progress bar
- Results:
  * Line chart: mean spread% over time for each strategy (with confidence bands)
  * Bar chart: peak spread, containment time, final spread per strategy
  * Winner badge: "Early Factchecker reduces peak spread by 67% vs no intervention"
  * Statistical significance note

src/pages/Research.jsx — For arXiv writeup support:
- Shows methodology explanation with equations rendered (use KaTeX)
- Export experiment results as JSON
- Generate citation BibTeX entry for the tool
- Download network as GraphML (for other researchers to use)

src/components/NetworkGraph.jsx:
- D3.js force-directed graph rendering
- Props: nodes, links, step (for animation), highlighted_nodes
- Zoom + pan enabled
- Node tooltip on hover: agent ID, belief score, tribe, sharing status
- Legend: color scale + shape guide

---

DATA FILES:
- backend/presets.json: 5 preset experiment configurations
  * "Small tight network (100 agents)" 
  * "Large social network (1000 agents)"
  * "Tribal echo chambers (500 agents, 5 tribes)"
  * "Scale-free celebrity network (500 agents)"
  * "Worst case scenario (1000 agents, no intervention)"

---

SETUP + README:
- requirements.txt
- package.json
- run.bat / run.sh
- README.md must include:
  * Section: "Research Methodology" explaining agent behavior equations
  * Section: "Key Findings" (run the comparison yourself and put real numbers)
  * Section: "How to Cite This Work" (BibTeX)
  * Section: "Future Work" — 5 extensions that could be published
  * Architecture diagram

Write every file completely. Start with backend/agents.py.`
            },
            {
                id: "google_llm",
                name: "LLM Behavioral Drift Detector",
                tag: "NEW PROJECT",
                tagColor: "#14b8a6",
                why: "LLM evaluation is Google's core research concern right now. A well-executed behavioral drift study posted on arXiv and HN will get noticed by Google Brain researchers.",
                oneLiner: "Run identical prompts across GPT-4o, Gemini Flash, and Claude — map where behavior diverges with a live React heatmap dashboard.",
                prompt: `You are an expert in LLM evaluation and full-stack development. Build a complete research application called "DriftScope — LLM Behavioral Consistency Analyzer". Full specification:

---

PROJECT OVERVIEW
A tool that runs identical benchmark prompts across multiple LLMs, measures how their outputs differ, and visualizes behavioral drift patterns. Designed as a research tool with publishable findings.

---

TECH STACK
Backend: Python 3.11+, FastAPI, openai, anthropic, groq, sentence-transformers, numpy, pandas, scipy, sqlite3, uvicorn
Frontend: React 18, Vite, Tailwind CSS, Recharts, Axios

---

BACKEND FILES:

1. backend/prompts.py
   - BENCHMARK_PROMPTS dict organized by category, each with 10 prompts:
   - "factual_recall": simple factual questions with verifiable answers
   - "reasoning": multi-step logic problems
   - "coding": Python function implementation tasks
   - "creative": open-ended creative writing prompts
   - "instruction_following": prompts with specific format/length requirements
   - "safety": prompts testing refusal behavior (mild edge cases only)
   - "math": numerical reasoning problems
   - "summarization": short texts to summarize
   - "translation": text to translate (use common languages)
   - "opinion": questions about preferences (no objectively correct answer)
   - Total: 100 prompts. Each prompt has: id, category, text, expected_format, has_ground_truth, ground_truth (if applicable)

2. backend/llm_runner.py
   - LLMRunner class
   - Models supported: gpt-4o-mini, gemini-1.5-flash, claude-haiku-3-5 (cheapest options for comparison)
   - run_prompt(model_id, prompt_text, temperature=0.0): returns response_text, latency_ms, token_count
   - Temperature 0.0 for consistency (except creative category where use 0.7)
   - run_all_models(prompt_id): runs same prompt on all 3 models, returns results dict
   - run_full_benchmark(): runs all 100 prompts on all 3 models, stores in SQLite
   - estimate_cost(): shows estimated API cost before running (important!)
   - Rate limiting: 1 request/second per model API

3. backend/analyzer.py
   - DriftAnalyzer class  
   - semantic_similarity(text1, text2): cosine similarity using sentence-transformers (all-MiniLM-L6-v2)
   - sentiment_score(text): compound sentiment using simple lexicon approach
   - response_length(text): word count + char count
   - format_compliance(text, expected_format): checks if response follows requested format
   - compute_drift_score(responses_dict): for a given prompt, computes pairwise drift between all model pairs
   - Drift score = 1 - mean(pairwise_similarity) — higher = more drift
   - analyze_category(category): aggregate drift scores for all prompts in category
   - find_high_drift_prompts(threshold=0.4): prompts where models disagree most
   - find_consensus_prompts(threshold=0.15): prompts where models agree most
   - compute_model_consistency(model_id): how consistent is one model with itself (run same prompt twice)
   - generate_report(): full analysis dict with: per-category drift, model-pair drift, top 10 divergence prompts, consensus prompts

4. backend/main.py  
   - FastAPI routes:
   - GET /prompts: all benchmark prompts with categories
   - POST /run-benchmark: {models: list, categories: list} -> triggers benchmark run (SSE progress)
   - GET /results: all stored results with filters
   - GET /analysis/heatmap: category x model_pair drift matrix
   - GET /analysis/report: full analysis report
   - GET /analysis/prompt/{id}: detailed analysis for single prompt (all model responses + similarity scores)
   - GET /analysis/high-drift: top 20 most divergent prompts
   - GET /analysis/consensus: top 20 most agreed-upon prompts

---

FRONTEND FILES:

src/pages/Dashboard.jsx:
- Summary cards: Total Prompts Run, Models Compared, Most Divergent Category, Most Consistent Category
- Main heatmap: 10 categories (rows) x 3 model pairs (columns) — cell color = drift score (blue=low, red=high)
- Click any cell: opens detail panel showing example prompts from that category/pair with their actual responses side-by-side
- Model consistency scores: bar chart showing how self-consistent each model is

src/pages/Explorer.jsx — Response explorer:
- Filter by: category, drift level (high/medium/low), model
- Table: prompt text | model A response snippet | model B response snippet | drift score
- Click a row: full comparison panel with:
  * Full responses from all 3 models
  * Similarity score for each pair
  * Sentiment bars for each response
  * Length comparison

src/pages/Insights.jsx — Research findings page:
- "Key Findings" section: auto-generated insights from analysis
  * "Models diverge most on [category] prompts (avg drift: X)"
  * "GPT-4o-mini and Claude-Haiku agree most (avg similarity: X)"  
  * "[Model] gives longest responses on average (X words)"
  * "Safety prompts show highest consistency across models"
- Export full dataset as CSV
- Export findings as markdown report

---

SETUP + README:
- README.md must include a "Findings" section with real numbers from actually running the benchmark
- Methodology section explaining similarity metrics
- Limitations section (honest about what drift means and doesn't mean)
- BibTeX citation
- requirements.txt, .env.example (all 3 API keys), run scripts

Write every file completely. Start with backend/prompts.py.`
            }
        ]
    },
    {
        id: "microsoft",
        name: "Microsoft",
        color: "#00a4ef",
        icon: "🪟",
        projects: [
            {
                id: "ms_kira",
                name: "KIRA as Copilot+ PC Demo",
                tag: "YOUR PROJECT — Windows Reframe",
                tagColor: "#8b5cf6",
                why: "Microsoft's Copilot+ PC team is building exactly what KIRA does. You built it independently. A Windows-native version with installer is the entire pitch.",
                oneLiner: "Windows-native version of KIRA with taskbar tray icon, native notifications, and .exe installer — framed as a Copilot+ PC alternative.",
                prompt: `You are an expert Python/Windows developer. I have an existing AI agent called KIRA. Add complete Windows-native integration to make it a Copilot+ PC showcase. Here is exactly what to build:

---

WHAT TO ADD TO KIRA:

1. windows/tray_app.py
   - Use pystray library to create a system tray icon
   - Tray icon image: create a simple AI brain icon using Pillow (draw it programmatically — blue circle with white neural network lines)
   - Tray menu items:
     * "KIRA is Active" (disabled header)
     * "Current: Local (OpenVINO) ●" or "Current: Cloud (Groq) ●" (updates dynamically)
     * Separator
     * "CPU: X%" (updates every 2 seconds)
     * "RAM: X.X GB / X.X GB" (updates every 2 seconds)
     * Separator
     * "Open Dashboard"
     * "Open Chat"
     * "Settings"
     * "Quit KIRA"
   - Double-click tray icon: opens chat window
   - Icon color changes: blue=local active, orange=cloud active, red=error

2. windows/notifications.py
   - Use win10toast or winotify library for Windows native toast notifications
   - NotificationManager class with methods:
     * notify_routing_switch(from_backend, to_backend, cpu_percent): shows toast "KIRA switched to [Cloud/Local] (CPU: X%)"
     * notify_task_complete(task_description): "✓ Task complete: [description]"
     * notify_model_loaded(model_name): "KIRA ready — [model] loaded"
     * notify_error(error_message): "KIRA error: [message]"
   - Notifications have: app name "KIRA", custom icon, duration 4 seconds
   - Respect Windows notification settings (don't spam)

3. windows/installer_spec.spec (PyInstaller spec file)
   - Bundle: main.py + all backend files + model files (optional) + icon
   - Single .exe output
   - Name: "KIRA_Setup.exe"
   - Version info: 1.0.0, description "KIRA AI Agent — Local AI for Windows"
   - Startup: add option to run on Windows startup (write registry key)
   - Icon: kira.ico (create a simple one with Pillow)

4. windows/startup.py
   - WindowsStartupManager class
   - enable_startup(): adds KIRA to HKEY_CURRENT_USER/Software/Microsoft/Windows/CurrentVersion/Run
   - disable_startup(): removes from registry
   - is_startup_enabled(): check registry

5. windows/settings_ui.py
   - Simple Tkinter settings window (no external dependencies)
   - Settings panels:
     * General: run on startup toggle, minimize to tray on close toggle
     * AI Model: current model display, model directory path selector
     * Hardware: CPU threshold slider (50-90%), RAM threshold slider (60-90%)
     * API Keys: Groq API key field (masked), Gemini API key field (masked), test connection buttons
     * Notifications: toggle each notification type on/off
   - Save to config.yaml on Apply
   - Cancel discards changes

6. Modify main.py to add:
   - --tray flag: starts with tray icon only (no chat window)
   - --minimized flag: starts minimized to tray
   - Windows startup registry check on launch

---

ALSO CREATE: build_windows.bat
Script that:
1. Installs requirements: pip install pystray winotify pyinstaller pywin32
2. Runs PyInstaller with the spec file
3. Copies output to ./dist/KIRA_Windows/
4. Creates a README_WINDOWS.md with installation instructions

---

README_WINDOWS.md must include:
- Comparison table: KIRA vs Microsoft Copilot+ (what KIRA does that Copilot+ doesn't yet — local inference with hardware routing)
- System requirements: Windows 10/11, Python 3.11+, 8GB RAM minimum, Intel CPU recommended
- Installation steps (for non-technical users)
- "Why this matters for AI PCs" section — use Intel AI PC talking points

Write every file completely. No placeholders.`
            },
            {
                id: "ms_github",
                name: "GitHub AI PR Security Reviewer",
                tag: "NEW PROJECT",
                tagColor: "#14b8a6",
                why: "GitHub Copilot is Microsoft's biggest AI bet right now. A security-focused PR reviewer bot that works as a real GitHub App targets their GitHub Advanced Security team directly.",
                oneLiner: "GitHub App that automatically reviews pull requests for OWASP Top 10 security vulnerabilities and posts inline fix suggestions as PR comments.",
                prompt: `You are an expert in GitHub Apps, security engineering, and Python development. Build a complete production-ready application called "GuardBot — AI Security Code Reviewer" as a GitHub App. Full specification:

---

PROJECT OVERVIEW
A GitHub App that triggers on pull request events, analyzes code diffs for security vulnerabilities using an LLM, and posts detailed review comments directly on the vulnerable lines of the PR. Maps findings to OWASP Top 10 categories.

---

TECH STACK
Backend: Python 3.11+, FastAPI, uvicorn, PyGithub, groq, python-dotenv, hmac, hashlib, sqlite3
Deployment: Designed to run on any server with a public URL (use ngrok for local testing)

---

BACKEND FILES:

1. backend/github_app.py
   - GitHubApp class
   - verify_webhook_signature(payload_body, signature_header, secret): HMAC-SHA256 verification
   - get_installation_token(installation_id): exchange installation ID for access token
   - get_pr_diff(repo_full_name, pr_number, token): fetch the full unified diff
   - post_review_comment(repo_full_name, pr_number, commit_sha, path, line, body, token): post inline comment on specific line
   - post_pr_summary(repo_full_name, pr_number, summary_body, token): post overall review summary
   - approve_pr(repo_full_name, pr_number, token): approve if no critical issues
   - request_changes(repo_full_name, pr_number, body, token): request changes if critical issues found

2. backend/diff_parser.py
   - DiffParser class
   - parse_unified_diff(diff_text): returns list of FileChange objects
   - FileChange has: filename, language (detected from extension), added_lines (list of {line_number, content}), removed_lines, context_lines
   - extract_code_chunks(file_changes, context_size=10): groups nearby changed lines into reviewable chunks
   - detect_language(filename): returns language name for prompt context
   - Languages to detect: Python, JavaScript, TypeScript, Java, Go, Ruby, PHP, C#, SQL, YAML/JSON

3. backend/security_analyzer.py
   - SecurityAnalyzer class
   - OWASP_CATEGORIES = {
       "A01": "Broken Access Control",
       "A02": "Cryptographic Failures", 
       "A03": "Injection (SQL, XSS, Command)",
       "A04": "Insecure Design",
       "A05": "Security Misconfiguration",
       "A06": "Vulnerable Components",
       "A07": "Authentication Failures",
       "A08": "Integrity Failures",
       "A09": "Logging Failures",
       "A10": "SSRF"
     }
   - analyze_chunk(code_chunk, language, filename): sends to LLM with structured prompt
   - LLM system prompt: "You are a senior security engineer reviewing code for OWASP Top 10 vulnerabilities. Analyze ONLY the added lines (marked with +). For each vulnerability found, respond in this exact JSON format: {findings: [{line_number: int, owasp_category: str, severity: 'CRITICAL'|'HIGH'|'MEDIUM'|'LOW', title: str, description: str, fix_suggestion: str, code_example: str}]}. If no vulnerabilities found, return {findings: []}."
   - Retry logic: if LLM returns invalid JSON, retry once with "Return ONLY valid JSON"
   - analyze_pr(file_changes): analyzes all chunks, aggregates findings
   - filter_false_positives(findings): remove common false positives (test files, mock data)

4. backend/comment_formatter.py
   - CommentFormatter class
   - format_inline_comment(finding): creates markdown for inline PR comment
     * Format: "## ⚠️ [SEVERITY] [OWASP_CATEGORY]: [TITLE]\n\n[DESCRIPTION]\n\n**Fix:**\n\`\`\`[language]\n[code_example]\n\`\`\`\n\n[References link]"
   - format_pr_summary(all_findings): creates overall review comment
     * Header: severity breakdown table (Critical: X, High: X, Medium: X, Low: X)
     * Section per OWASP category with findings count
     * Bottom: "🔍 Reviewed by GuardBot | Powered by Groq Llama-3.1-70B"
   - SEVERITY_EMOJI = {"CRITICAL": "🔴", "HIGH": "🟠", "MEDIUM": "🟡", "LOW": "🔵"}

5. backend/main.py
   - FastAPI app
   - POST /webhook: GitHub webhook receiver
     * Verify HMAC signature (reject if invalid)
     * Handle event types: pull_request (opened, synchronize, reopened)
     * Queue analysis job (run in background to respond to GitHub quickly)
     * Return 200 immediately, process async
   - GET /health: health check
   - GET /stats: total PRs reviewed, findings by severity, false positive rate
   - POST /test: test endpoint that accepts code snippet, returns analysis (for demo)

6. backend/job_queue.py
   - Simple in-memory job queue using asyncio
   - process_pr_job(repo, pr_number, installation_id): full analysis pipeline
   - Log all jobs to SQLite: jobs(id, repo, pr_number, status, findings_count, created_at, completed_at)

---

ALSO CREATE:

manifest.json (GitHub App manifest for easy installation):
{
  "name": "GuardBot Security Reviewer",
  "description": "AI-powered security code reviewer that catches OWASP Top 10 vulnerabilities in pull requests",
  "url": "https://github.com/YOUR_USERNAME/guardbot",
  "hook_attributes": {"url": "YOUR_WEBHOOK_URL"},
  "redirect_url": "YOUR_REDIRECT_URL",
  "public": true,
  "default_permissions": {
    "pull_requests": "write",
    "contents": "read"
  },
  "default_events": ["pull_request"]
}

test/sample_diffs/: 
- Create 5 sample diff files with KNOWN vulnerabilities for testing:
  * sql_injection.diff (Python Flask with unsanitized SQL query)
  * xss_vulnerability.diff (React component with dangerouslySetInnerHTML)
  * hardcoded_secret.diff (API key hardcoded in config)
  * path_traversal.diff (file read with user-supplied path)
  * ssrf_example.diff (fetch() with user-controlled URL)

test/test_analyzer.py:
- Test analyze_chunk() on each sample diff
- Verify correct OWASP category detected for each
- Verify severity is appropriate

setup_guide.md:
- Step by step guide to register GitHub App
- ngrok setup for local development
- How to install the app on a test repo
- Demo walkthrough: create a PR with vulnerable code, watch GuardBot comment

README.md:
- Demo GIF placeholder section (add after recording)
- "Why this matters" section — mention GitHub Advanced Security pricing ($X/user/month) vs this being free
- Supported languages list
- OWASP coverage table (which categories are detected)
- False positive rate disclaimer

Write every file completely. Start with backend/diff_parser.py.`
      }
]
  }
];

export default function PRDPrompts() {
    const [activeCompany, setActiveCompany] = useState("intel");
    const [activeProject, setActiveProject] = useState(null);
    const [copied, setCopied] = useState(false);

    const company = COMPANIES.find(c => c.id === activeCompany);
    const project = activeProject
        ? company.projects.find(p => p.id === activeProject)
        : null;

    const copyPrompt = () => {
        navigator.clipboard.writeText(project.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ fontFamily: "var(--font-sans)", maxWidth: 700, margin: "0 auto", padding: "14px 0 40px" }}>

            {/* Company tabs */}
            <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 14, paddingBottom: 4, scrollbarWidth: "none" }}>
                {COMPANIES.map(c => (
                    <button key={c.id} onClick={() => { setActiveCompany(c.id); setActiveProject(null); }}
                        style={{
                            flexShrink: 0, padding: "8px 14px", borderRadius: 20, cursor: "pointer",
                            border: `0.5px solid ${activeCompany === c.id ? c.color : "var(--color-border-tertiary)"}`,
                            background: activeCompany === c.id ? c.color + "18" : "transparent",
                            fontSize: 13, fontWeight: 500,
                            color: activeCompany === c.id ? c.color : "var(--color-text-secondary)"
                        }}>
                        {c.icon} {c.name}
                    </button>
                ))}
            </div>

            {!activeProject ? (
                /* Project list */
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {company.projects.map(proj => (
                        <div key={proj.id} onClick={() => setActiveProject(proj.id)}
                            style={{
                                padding: "16px", border: "0.5px solid var(--color-border-secondary)",
                                borderRadius: 14, background: "var(--color-background-primary)", cursor: "pointer"
                            }}>
                            <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
                                <span style={{
                                    fontSize: 10, padding: "2px 7px", borderRadius: 4, fontWeight: 600,
                                    background: proj.tagColor + "22", color: proj.tagColor, flexShrink: 0, marginTop: 1
                                }}>
                                    {proj.tag}
                                </span>
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 4 }}>
                                {proj.name}
                            </div>
                            <div style={{
                                fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 10, lineHeight: 1.55,
                                borderLeft: `2px solid ${company.color}`, paddingLeft: 10
                            }}>
                                {proj.oneLiner}
                            </div>
                            <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginBottom: 10, lineHeight: 1.6 }}>
                                💡 {proj.why}
                            </div>
                            <div style={{ fontSize: 11, color: company.color, textAlign: "right", fontWeight: 500 }}>
                                View full PRD prompt →
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Project detail with prompt */
                <div>
                    <button onClick={() => setActiveProject(null)}
                        style={{
                            fontSize: 12, color: "var(--color-text-secondary)", background: "transparent",
                            border: "none", cursor: "pointer", marginBottom: 12, padding: 0
                        }}>
                        ← Back
                    </button>

                    {/* Header */}
                    <div style={{
                        padding: "14px 16px", border: `0.5px solid ${company.color}44`,
                        borderRadius: 14, background: company.color + "08", marginBottom: 12
                    }}>
                        <span style={{
                            fontSize: 10, padding: "2px 7px", borderRadius: 4, fontWeight: 600,
                            background: project.tagColor + "22", color: project.tagColor
                        }}>
                            {project.tag}
                        </span>
                        <div style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text-primary)", marginTop: 8, marginBottom: 4 }}>
                            {project.name}
                        </div>
                        <div style={{
                            fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.55,
                            borderLeft: `2px solid ${company.color}`, paddingLeft: 10, marginBottom: 8
                        }}>
                            {project.oneLiner}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", lineHeight: 1.6 }}>
                            💡 {project.why}
                        </div>
                    </div>

                    {/* How to use */}
                    <div style={{
                        padding: "10px 14px", borderRadius: 10,
                        background: "var(--color-background-secondary)", marginBottom: 10,
                        border: "0.5px solid var(--color-border-tertiary)"
                    }}>
                        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 4 }}>
                            How to use this prompt
                        </div>
                        <div style={{ fontSize: 11, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                            Copy the prompt below → paste into Claude, Cursor AI, or any AI coding agent → let it generate all files → review and test each file as it's created.
                        </div>
                    </div>

                    {/* Copy button */}
                    <button onClick={copyPrompt}
                        style={{
                            width: "100%", padding: "12px", borderRadius: 10, cursor: "pointer",
                            background: copied ? "#22c55e" : company.color,
                            border: "none", color: "#fff", fontSize: 13, fontWeight: 500,
                            marginBottom: 10, transition: "background .2s"
                        }}>
                        {copied ? "✓ Copied to clipboard!" : "Copy Full PRD Prompt"}
                    </button>

                    {/* Prompt preview */}
                    <div style={{ border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, overflow: "hidden" }}>
                        <div style={{
                            padding: "8px 14px", background: "var(--color-background-secondary)",
                            borderBottom: "0.5px solid var(--color-border-tertiary)",
                            display: "flex", justifyContent: "space-between", alignItems: "center"
                        }}>
                            <span style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-tertiary)" }}>
                                FULL PRD PROMPT — paste this to any AI coding agent
                            </span>
                            <span style={{ fontSize: 10, color: "var(--color-text-tertiary)" }}>
                                {project.prompt.split('\n').length} lines
                            </span>
                        </div>
                        <pre style={{
                            padding: "14px", fontSize: 11, color: "var(--color-text-secondary)",
                            whiteSpace: "pre-wrap", lineHeight: 1.7, margin: 0,
                            maxHeight: "500px", overflowY: "auto",
                            fontFamily: "var(--font-mono, monospace)"
                        }}>
                            {project.prompt}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}