const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);
highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score"> ${score.name} - ${score.score}</li>`;
  })
  .join("");
$("#clear").click(function(e) {
  highScoresList.innerHTML = "";
  localStorage.clear();
});
