// script.js

// --- configuration: 가능한 키워드 목록과 조합 결과 맵 ---
// Everyday fields (사용자에게 보일 이름)
const everydayFields = ["Architecture", "Education", "Fashion", "Music", "Environment"];

// Science fields
const scienceFields = ["AI", "AR", "Robotics", "Neuroscience", "Quantum Physics"];

// Combination map: everyday + science -> idea text
// (아래 문구들은 첨부하신 표/예시를 참고해서 작성한 예시 문장입니다. 필요하면 수정하세요.)
const combinationMap = {
 "Architecture|AI": "Architecture + AI: Generating optimal architectural designs automatically using AI, which optimizes building structure, materials, cost, and environmental impact.",
"Architecture|AR": "Architecture + AR: Utilizing AR technology to project and visualize unbuilt structures onto the real-world environment in real-time.",
"Architecture|Robotics": "Architecture + Robotics: An autonomous construction robot system where robots automatically and precisely install blocks or panels on the construction site.",
"Architecture|Neuroscience": "Architecture + Neuroscience: Architectural design that analyzes user brainwave (EEG) responses in real-time to incorporate data on in-space comfort and stress levels.",
"Architecture|Quantum Physics": "Architecture + Quantum Physics: Developing super-insulating materials using quantum principles like tunneling and lattice structures.",

"Education|AI": "Education + AI: AI-powered coaching that analyzes student performance to auto-generate personalized curricula.",
"Education|AR": "Education + AR: Using AR to visualize and learn abstract (e.g., math, science) concepts with immersive 3D models.",
"Education|Robotics": "Education + Robotics: Educational support robots that assist learning through emotion recognition and responsive conversation.",
"Education|Neuroscience": "Education + Neuroscience: A personalized learning platform that adjusts difficulty and pace in real-time based on a student’s concentration levels, analyzed via brainwave data.",
"Education|Quantum Physics": "Education + Quantum Physics: An approach that views learning as a process of shifting possibilities — just as quantum systems change their states.",

"Fashion|AI": "Fashion + AI: AI-powered personal curation that analyzes body type, taste, and context to automatically recommend outfits.",
"Fashion|AR": "Fashion + AR: AR virtual fitting rooms that let users see clothes on themselves in real-time via apps or smart mirrors.",
"Fashion|Robotics": "Fashion + Robotics: A robotic tailor system that scans body dimensions to automatically cut and sew custom smart apparel.",
"Fashion|Neuroscience": "Fashion + Neuroscience: Emotion-responsive smart apparel that changes color or pattern based on biometric data like brainwaves and heart rate.",
"Fashion|Quantum Physics": "Fashion + Quantum Physics: Apparel that changes color depending on the angle, utilizing the principle of light interference.",

"Music|AI": "Music + AI: An AI composition partner that instantly generates music tailored to the user's real-time emotions or mood.",
"Music|AR": "Music + AR: An immersive AR stage that brings virtual artists or bands into your real-space for a realistic performance.",
"Music|Robotics": "Music + Robotics: A robotic orchestra system where robots precisely play actual instruments, following programmed scores or mimicking human musicians.",
"Music|Neuroscience": "Music + Neuroscience: Creating real-time, customized soundtracks based on stress levels from brainwave data analysis.",
"Music|Quantum Physics": "Music + Quantum Physics: Experimental sound art that translates data from quantum fluctuations into unique, unpredictable sound textures.",

"Environment|AI": "Environment + AI: An AI ecological model that predicts urban, marine, and forest changes to optimize environmental policy.",
"Environment|AR": "Environment + AR: An AR visualization map showing future environmental changes (e.g., city, glacier) overlaid on the present view.",
"Environment|Robotics": "Environment + Robotics: Autonomous robots that detect, collect, and remove waste from environments like oceans, rivers, and cities.",
"Environment|Neuroscience": "Environment + Neuroscience: Neuroscience research analyzing how exposure to nature positively impacts brain activity and emotional well-being.",
"Environment|Quantum Physics": "Environment + Quantum Physics: Quantum-based catalytic materials designed for ultra-efficient purification of water and air pollutants."
};

// --- UI handlers ---
const startBtn = document.getElementById("start-btn");
const screens = {
  start: document.getElementById("start-screen"),
  everyday: document.getElementById("everyday-screen"),
  science: document.getElementById("science-screen"),
  result: document.getElementById("result-screen")
};

const everydayChoicesContainer = document.getElementById("everyday-choices");
const scienceChoicesContainer = document.getElementById("science-choices");
const resultTextEl = document.getElementById("result-text");

let selectedEveryday = null;
let selectedScience = null;

// helper to switch screens
function showScreen(name){
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo(0, 0);
}

// populate choice buttons
function buildChoices(container, items, onClick){
  container.innerHTML = "";
  items.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerText = item;
    btn.addEventListener("click", () => onClick(item, btn));
    container.appendChild(btn);
  });
}

// everyday click
function onEverydayClick(item, btn){
  selectedEveryday = item;
  // highlight selected
  Array.from(everydayChoicesContainer.children).forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  // move to science screen after a short delay
  setTimeout(() => showScreen("science"), 220);
}

// science click
function onScienceClick(item, btn){
  selectedScience = item;
  Array.from(scienceChoicesContainer.children).forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  // generate result
  setTimeout(() => {
    generateResult();
    showScreen("result");
  }, 220);
}

// generate idea based on selections
function generateResult(){
  if (!selectedEveryday || !selectedScience){
    resultTextEl.innerText = "Please select both fields.";
    return;
  }
  const key = `${selectedEveryday}|${selectedScience}`;
  const idea = combinationMap[key] || `${selectedScience} + ${selectedEveryday}: A creative fusion idea.`;
  resultTextEl.innerText = `${idea}`;
}

// again = random new pairing (same everyday, random science)
function generateAgain(){
  if (!selectedEveryday){
    showScreen("everyday");
    return;
  }
  // pick random science
  const randomScience = scienceFields[Math.floor(Math.random() * scienceFields.length)];
  selectedScience = randomScience;
  generateResult();
  // visually update science selection (no buttons highlighted here, but could be extended)
  showScreen("result");
}

// attach events
startBtn.addEventListener("click", () => {
  showScreen("everyday");
});

document.getElementById("everyday-back").addEventListener("click", () => { showScreen("start"); selectedEveryday = null; });
document.getElementById("science-back").addEventListener("click", () => { showScreen("everyday"); selectedScience = null; });
document.getElementById("again-btn").addEventListener("click", generateAgain);
document.getElementById("home-btn").addEventListener("click", () => {
  selectedEveryday = null; selectedScience = null;
  // clear selections visual
  Array.from(everydayChoicesContainer.children).forEach(b => b.classList.remove("selected"));
  Array.from(scienceChoicesContainer.children).forEach(b => b.classList.remove("selected"));
  showScreen("start");
});

// initial build
buildChoices(everydayChoicesContainer, everydayFields, onEverydayClick);
buildChoices(scienceChoicesContainer, scienceFields, onScienceClick);

