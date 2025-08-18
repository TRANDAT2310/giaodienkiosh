window.onload = function() {
  const outputBox = document.getElementById("output-symptoms");
  const selectedSymptoms = JSON.parse(localStorage.getItem("selectedSymptoms")) || [];

  if (selectedSymptoms.length === 0) {
    outputBox.innerHTML = "<p class='text-danger'>Bạn chưa chọn triệu chứng nào.</p>";
    return;
  }

  fetch("http://127.0.0.1:5000/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symptoms: selectedSymptoms })
  })
  .then(res => res.json())
  .then(results => {
    results.forEach(item => {
      const div = document.createElement("div");
      div.className = "alert alert-info";
      div.textContent = `${item["triệu_chứng"]} → ${item["mức_độ"]}`;
      outputBox.appendChild(div);
    });
  });
};
