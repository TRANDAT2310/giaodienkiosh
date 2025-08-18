const symptomInput = document.getElementById("symptom-input");
const suggestionsBox = document.getElementById("suggestions");
const selectedSymptomsBox = document.getElementById("selected-symptoms");

let allSymptoms = [];
let selectedSymptoms = [];

// Lấy danh sách triệu chứng từ backend
fetch("http://127.0.0.1:5000/symptoms")
  .then(res => res.json())
  .then(data => {
    allSymptoms = data; 
    console.log("Danh sách triệu chứng:", allSymptoms);
  });

// Gợi ý autocomplete
symptomInput.addEventListener("input", () => {
  const inputVal = symptomInput.value.toLowerCase().trim();
  suggestionsBox.innerHTML = "";

  if (!inputVal) return;

  const filtered = allSymptoms.filter(s => 
    s.toLowerCase().includes(inputVal) && !selectedSymptoms.includes(s)
  );

  filtered.forEach(symptom => {
    const div = document.createElement("div");
    div.className = "autocomplete-suggestion";
    div.textContent = symptom;
    div.addEventListener("click", () => {
      addSymptom(symptom);
      symptomInput.value = "";
      suggestionsBox.innerHTML = "";
    });
    suggestionsBox.appendChild(div);
  });
});

function addSymptom(symptom) {
  if (selectedSymptoms.includes(symptom)) return;

  selectedSymptoms.push(symptom);

  const span = document.createElement("span");
  span.className = "selected-symptom";
  span.textContent = symptom;
  selectedSymptomsBox.appendChild(span);
}

// Submit form
document.getElementById("symptom-form").addEventListener("submit", function(e) {
  e.preventDefault();
  if (selectedSymptoms.length === 0) {
    alert("Vui lòng chọn ít nhất 1 triệu chứng.");
    return;
  }
  localStorage.setItem("selectedSymptoms", JSON.stringify(selectedSymptoms));
  window.location.href = "recommendation.html";
});
