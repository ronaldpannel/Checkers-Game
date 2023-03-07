window.addEventListener("load", function () {
  const squares = document.querySelectorAll(".square");
  const checkers = document.querySelectorAll(".checker");
  const infoDisplay = document.getElementById("info");
  const blackScoreDisplay = document.getElementById("whiteCheckersCaptured");
  const whiteScoreDisplay = document.getElementById("blackCheckersCaptured");
  const nextPlayerDisplay = document.getElementById("player");
  const falseMoveDisplay = document.getElementById("falseMove");
  const startScreen = document.getElementById("startScreen");
  const startBtn = document.getElementById("startBtn");

  let beingDragged;
  let blackScore = 0;
  let whiteScore = 0;
  checkers.forEach((checker, index) => {
    checker.addEventListener("dragstart", dragStart);
    checker.addEventListener("drag", dragging);
    checker.setAttribute("id", `checker${index}`);
    checker.getAttribute("id");
  });
  squares.forEach((square, index) => {
    square.setAttribute("id", `square${index}`);
    square.addEventListener("dragover", dragOver);
    square.addEventListener("drop", dragDrop);
  });

  function dragStart(e) {
    beingDragged = e.target;
    if (beingDragged.classList.contains("checkerBlack")) {
      nextPlayerDisplay.innerText = "White";
    } else {
      nextPlayerDisplay.innerText = "Black";
    }
  }
  function dragOver(e) {
    e.preventDefault();
    if (
      beingDragged.classList.contains("checkerBlack") &&
      e.target.classList.contains("checkerWhite")
    ) {
      setTimeout(() => {
        e.target.classList.add("toRemove");
      }, 750);

      whiteScore++;
      whiteScoreDisplay.innerText = whiteScore;
    }
    if (
      beingDragged.classList.contains("checkerWhite") &&
      e.target.classList.contains("checkerBlack")
    ) {
      e.target.classList.add("toRemove");
      blackScore++;
      blackScoreDisplay.innerText = blackScore;
    }
  }

  function dragging() {
    infoDisplay.innerText = `You are dragging: ${beingDragged.id}`;
  }

  function dragDrop(e) {
    if (e.target.classList.contains("squareCream")) {
      falseMoveDisplay.classList.add("active");
      setTimeout(() => {
        falseMoveDisplay.classList.remove("active");
      }, 750);
      return;
    } else {
      e.target.append(beingDragged);
    }

    if (
      e.target.classList.contains("doubleBlack") &&
      beingDragged.classList.contains("checkerBlack")
    ) {
      beingDragged.classList.add("king");
    }

    if (
      e.target.classList.contains("doubleWhite") &&
      beingDragged.classList.contains("checkerWhite")
    ) {
      beingDragged.classList.add("king");
    }
  }

  startBtn.addEventListener("click", function () {
    startScreen.classList.add("inactive");
  });

  //load function end
});
