export default class View {
  constructor() {
    this.view = null;
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.tableContainer = document.getElementById('table');

    this.winModal = document.getElementById('winModal');
    this.loseModal = document.getElementById('loseModal');
  }

  setView(view) {
    this.view = view;
  }

  drawUnderlines(length) {
    let table = document.createElement('table');
    let tbody = document.createElement('tbody');
    let tr = document.createElement('tr');

    table.setAttribute('class', 'arial');

    for (let i = 0; i < length; i++) {
      let td = document.createElement('td');
      td.innerHTML = '<h1>_</h1>';

      tr.appendChild(td);
    }

    table.appendChild(tbody).appendChild(tr);
    this.tableContainer.append(table);
  }

  replaceWithLetter(lettersContainer, letter) {
    for (const [key, value] of lettersContainer) {
      if (value == letter.toLowerCase())
        this.tableContainer.children[0].children[0].children[0].children[
          key
        ].children[0].textContent = value;
    }
  }

  openWinModal(word) {
    this.winModal.children[1].innerHTML = `The word was: <span>${word}</span>`;
    this.winModal.style.display = 'flex';

    this.winModal.children[3].onclick = () => location.reload()
  }

  openLoseModal(word) {
    this.loseModal.children[1].innerHTML = `The word was: <span>${word}</span>`;
    this.loseModal.style.display = 'flex';

    this.loseModal.children[2].onclick = () => location.reload()
  }

  drawStickMan(errors) {
    // this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (errors == 6) {
      // Cabeza
      this.ctx.beginPath();
      this.ctx.arc(200, 100, 30, 0, Math.PI * 2);
      this.ctx.stroke();
    } else if (errors == 5) {
      // Cuerpo
      this.ctx.moveTo(200, 130);
      this.ctx.lineTo(200, 250);
      this.ctx.stroke();
    } else if (errors == 4) {
      // Brazos
      this.ctx.moveTo(200, 150);
      this.ctx.lineTo(160, 180);
      this.ctx.stroke();

      this.ctx.moveTo(200, 150);
      this.ctx.lineTo(240, 180);
      this.ctx.stroke();
    } else if (errors == 3) {
      // Piernas
      this.ctx.moveTo(200, 250);
      this.ctx.lineTo(160, 300);
      this.ctx.stroke();

      this.ctx.moveTo(200, 250);
      this.ctx.lineTo(240, 300);
      this.ctx.stroke();
    } else if (errors == 2) {
      // Ojos
      this.ctx.beginPath();
      this.ctx.arc(190, 90, 2, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(210, 90, 2, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
    } else if (errors == 1) {
      // Boca
      this.ctx.beginPath();
      this.ctx.arc(200, 105, 10, 0, Math.PI);
      this.ctx.stroke();
    } else if (errors == 0) {
      // Fin del juego (colgando)
      this.ctx.moveTo(200, 80);
      this.ctx.lineTo(200, 50);
      this.ctx.stroke();
    }
  }
}
