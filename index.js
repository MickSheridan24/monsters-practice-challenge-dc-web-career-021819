const MONSTERS = "http://localhost:3000/monsters";
const monsterBox = document.getElementById("monster-container");
const forbiddenScroll = document.getElementById("create-monster");
const theyreRightBehindYouRunRunRun = document.getElementById("forward");
const turnBackNowBeforeItsTooLate = document.getElementById("back");

function summonMonster(monster) {
  const ritualCircle = document.createElement("div");
  ritualCircle.innerHTML = `<h3>${monster.name}</h3>
                              <p><strong>AGE: </strong>${Math.floor(monster.age)}</p>
                             <p>${monster.description}</p>`;
  monsterBox.appendChild(ritualCircle);
}
function foolishActOfHubris(folly) {
  folly.preventDefault();
  const foulVerses = folly.target.elements;

  const obj = { name: foulVerses.name.value, age: foulVerses.age.value, description: foulVerses.desc.value };
  summonMonster(obj);
}
function onslaughtOfFiends(presentHorde) {
  while (monsterBox.firstChild) {
    monsterBox.firstChild.remove();
  }
  fetch(MONSTERS)
    .then(resp => resp.json())
    .then(monsters =>
      monsters.slice(presentHorde, presentHorde + 50).forEach(monster => {
        summonMonster(monster);
      })
    );
}
document.addEventListener("DOMContentLoaded", () => {
  let presentHorde = 0;
  onslaughtOfFiends(presentHorde);

  forbiddenScroll.addEventListener("submit", foolishActOfHubris);
  theyreRightBehindYouRunRunRun.addEventListener("click", () => {
    presentHorde += 50;
    onslaughtOfFiends(presentHorde);
  });
  turnBackNowBeforeItsTooLate.addEventListener("click", () => {
    presentHorde -= 50;
    onslaughtOfFiends(presentHorde);
  });
});
