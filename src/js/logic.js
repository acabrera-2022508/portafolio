import View from './view.js';

export default class Logic {
  constructor() {
    // define an array 2d with the buttons to configure in a Map
    this.dictionary = [
      ['q', document.getElementById('qKey')],
      ['w', document.getElementById('wKey')],
      ['e', document.getElementById('eKey')],
      ['r', document.getElementById('rKey')],
      ['t', document.getElementById('tKey')],
      ['y', document.getElementById('yKey')],
      ['u', document.getElementById('uKey')],
      ['i', document.getElementById('iKey')],
      ['o', document.getElementById('oKey')],
      ['p', document.getElementById('pKey')],
      ['a', document.getElementById('aKey')],
      ['s', document.getElementById('sKey')],
      ['d', document.getElementById('dKey')],
      ['f', document.getElementById('fKey')],
      ['g', document.getElementById('gKey')],
      ['h', document.getElementById('hKey')],
      ['j', document.getElementById('jKey')],
      ['k', document.getElementById('kKey')],
      ['l', document.getElementById('lKey')],
      ['z', document.getElementById('zKey')],
      ['x', document.getElementById('xKey')],
      ['c', document.getElementById('cKey')],
      ['v', document.getElementById('vKey')],
      ['b', document.getElementById('bKey')],
      ['n', document.getElementById('nKey')],
      ['m', document.getElementById('mKey')],
    ];

    //  Establish the Map value with the this.dictionary var
    this.abecedary = new Map(this.dictionary);
    
    // Words to be found
    this.wordsContainer = [
      'avion',
      'madera',
      'guitarra',
      'manzana',
      'teclado',
      'universo',
      'carta',
      'polimorfismo',
      'java',
      'javascript',
      'herencia',
      'abstraccion',
      'metodo',
      'netbeans',
      'controlador'
    ].map((word) => word.toLowerCase());

    // Generate the random numer to select a word from wordsContainer
    this.randomNumber = Math.floor(Math.random() * this.wordsContainer.length);
    
    // Word that the user will found
    this.word = this.wordsContainer[this.randomNumber].split('');
    
    // Word to be displayed if user wins or loses
    this.wordCopy = this.wordsContainer[this.randomNumber];

    // Word length to can display the underlines (parameter)
    this.wordLength = this.word.length;
    
    // letters used controller for onclick button and onkeydown
    this.lettersUsed = [];

    // we set all the letters position, doing reference to this.word
    this.letterIndexes = new Map();
    
    // view Object to can acces to their methods
    this.view = new View();
    
    this.logic = null;
    
    // user oportunities to can win the games
    this.oportunities = 7;

    // the user wins or loses?
    this.lose = false;
    
    //  We call the drawUnderlines method from view to dra the underlines
    this.view.drawUnderlines(this.wordLength);
    
    // iterate from abecedary map to add a onclick event to all the buttons.
    // And establish the position letters to the letterIndexes Map
    for (const [letter, button] of this.abecedary) {
      this.setLettersPosition(letter);
      
      button.onclick = () =>
        this.containLetter(this.getKey(letter).children[0].textContent);
    }

    // event listener to use keys instead of buttons
    document.addEventListener('keydown', (e) => {
      let charCode = e.keyCode;
      let isLetterInArray = this.lettersUsed.some((letter) => letter === e.key);

      if (this.word.length === 0 || this.lose) return;

      if (!isLetterInArray && charCode > 64 && charCode < 91) {
        this.onKeyPressed(e);
        this.lettersUsed.push(e.key.toLowerCase());
      }
    });
  }

  setLogic(logic) {
    this.logic = logic;
  }

  getKey(key) {
    return this.abecedary.get(key);
  }

  getWordLength() {
    return this.wordLength;
  }

  getletterIndexes() {
    return this.letterIndexes;
  }

  setLettersPosition(letter) {
    for (let index of this.findIndexes(letter))
      this.letterIndexes.set(index, letter.toLowerCase());
  }

  onKeyPressed(e) {
    this.containLetter(
      this.getKey(e.key.toLowerCase()).children[0].textContent
    );
  }

  findIndexes(letter) {
    let letterIndexes = [];

    this.word.forEach((ltr, i) => {
      if (ltr === letter.toLowerCase()) {
        letterIndexes.push(i);
      }
    });

    return letterIndexes;
  }

  comprobate(letter) {
    return this.word.some((ltr) => ltr === letter.toLowerCase());
  }

  deleteLetter(letter) {
    for (let i = this.findIndexes(letter).length - 1; i >= 0; i--) {
      this.word.splice(this.findIndexes(letter)[i], 1);
    }

    this.findIndexes(letter);
  }

  disableCorrectLetter(letter) {
    let button = this.abecedary.get(letter.toLowerCase());

    button.disabled = true;
    button.classList.add('correct');
    button.classList.remove('hover:bg-zinc-800', 'active:bg-zinc-950');

    this.lettersUsed.push(letter.toLowerCase());
  }

  disableIncorrectLetter(letter) {
    let button = this.abecedary.get(letter.toLowerCase());

    button.disabled = true;
    button.classList.add('incorrect');
    button.classList.remove('hover:bg-zinc-800', 'active:bg-zinc-950');

    this.lettersUsed.push(letter.toLowerCase());
  }

  disableAllLetters() {
    for (let [, button] of this.dictionary) {
      button.disabled = true;
      button.classList.add('disabled');
      button.classList.remove('hover:bg-zinc-800', 'active:bg-zinc-950');
    }
  }

  containLetter(letter) {
    // console.log(this.lettersUsed);
    if (this.comprobate(letter)) {
      this.view.replaceWithLetter(this.getletterIndexes(), letter);
      this.deleteLetter(letter);
      this.disableCorrectLetter(letter);

      // console.log('correcto');
      // console.log(this.word);
      // console.log(this.letterIndexes);

      if (!this.word.length) {
        this.view.openWinModal(this.wordCopy);
        this.disableAllLetters();
      }
    } else this.dontContainLetter(letter);
  }

  dontContainLetter(letter) {
    this.oportunities--;

    if (!this.oportunities) {
      this.lose = true;
      this.disableAllLetters();
      this.view.openLoseModal(this.wordCopy);
    }

    this.disableIncorrectLetter(letter);
    alert(`incorrecto te quedan ${this.oportunities} oportunidades`);

    this.view.drawStickMan(this.oportunities);
  }
}
