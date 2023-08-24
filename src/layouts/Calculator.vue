<!-- eslint-disable no-alert -->
<!-- eslint-disable no-alert -->
<template>
    <div id="calcWrapper">
        <Display
        :displayValue="dispValue"
        :subDisplayValue="subDispValue"/>
        <Buttons
        v-for="(button, index) in buttons"
            :key="index"
            :bValues="button"
            :handle-press="handlePress"
            :style="getButtonStyle(button)"
        />
    </div>
  </template>

<script>
import Display from './Display.vue';
import Buttons from './Buttons.vue';
import buttons from '../utils/buttons';

export default {
  data() {
    return {
      dispValue: '0',
      subDispValue: '',
      prevValue: '0',
      prevOp: '=',
      opInEffect: false,
      bStyleObjectRegular: {
        width: '25%',
      },
      bStyleObjectLarge: {
        width: '49.9%',
      },
      buttons,
    };
  },
  components: {
    Display,
    Buttons,
  },
  methods: {
    handlePress(event) {
      const number = event.textContent.trim();
      switch (number) {
        case 'AC': this.clearAll();
          break;
        case 'C': this.clearDisplay();
          break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9': this.numberPressed(number);
          break;
        case '+': this.computeOp('+');
          break;
        case '-': this.computeOp('-');
          break;
        case '/': this.computeOp('/');
          break;
        case 'x': this.computeOp('x');
          break;
        case '=': this.equalPressed();
          break;
        case '.': this.addPoint();
          break;
        case '\u00b1': this.negateValue();
          break;
        default:
          alert('KEY ERROR: in default');
      }
    },
    negateValue() {
      if (this.dispValue !== '0') {
        if (this.dispValue.indexOf('-') < 0) {
          this.dispValue = `-${this.dispValue}`;
        } else {
          this.dispValue = this.dispValue.substring(1);
        }
      }
    },
    addPoint() {
      if (this.dispValue.indexOf('.') < 0) {
        this.dispValue += '.';
      }
    },
    equalPressed() {
      try {
        this.computeEqual(this.prevValue, this.dispValue, this.prevOp);
        this.subDispValue = '';
      } catch (e) {
        alert(e);
      }
    },
    numberPressed(number) {
      this.opInEffect = false;
      if (this.dispValue === '0') {
        this.dispValue = number;
      } else if (this.dispValue.length >= 15) {
        alert('KEY ERROR: Display limit reached');
      } else {
        this.dispValue += number;
      }
    },
    computePlus() {
      this.dispValue = this.computeOps(this.prevValue, this.dispValue, '+');
    },
    computeSub() {
      this.dispValue = this.computeOps(this.prevValue, this.dispValue, '-');
    },
    computeDiv() {
      this.dispValue = this.computeOps(this.prevValue, this.dispValue, '/');
    },
    computeMult() {
      this.dispValue = this.computeOps(this.prevValue, this.dispValue, 'x');
    },
    computeOp(op) {
      if (!this.opInEffect) {
        try {
          this.computeEqual(this.prevValue, this.dispValue, this.prevOp);
          this.prevValue = this.dispValue;
          this.dispValue = '0';
          this.prevOp = op;
          this.subDispValue = `${this.prevValue.toString()} ${this.prevOp}    `;
          this.opInEffect = true;
        } catch (e) {
          alert(e);
        }
      }
    },
    computeEqual(op1, op2, op) {
      const Op1Num = parseFloat(op1);
      const Op2Num = parseFloat(op2);
      let result = 0;
      if (op === '+') {
        result = Op1Num + Op2Num;
      } else if (op === '-') {
        result = Op1Num - Op2Num;
      } else if (op === 'x') {
        result = Op1Num * Op2Num;
      } else if (op === '/') {
        if (Op2Num === 0) {
          alert('MATH ERROR: Cannot divide by 0');
        } else {
          result = Op1Num / Op2Num;
        }
      } else {
        result = Op2Num;
      }
      const temp = result.toString();
      if (temp.length >= 15) {
        alert('DISPLAY ERROR: Computation result will not fit on display. Use C or AC to perform a simpler computation.');
      }
      this.dispValue = temp;
      this.prevValue = '0';
      this.prevOp = '=';
    },
    clearDisplay() {
      this.dispValue = '0';
    },
    clearAll() {
      this.clearDisplay();
      this.prevValue = '0';
      this.prevOp = '=';
      this.subDispValue = '';
      this.opInEffect = false;
    },
    getButtonStyle(button) {
      if (button.id === 1) {
        return this.bStyleObjectLarge;
      }
      return this.bStyleObjectRegular;
    },

  },
};
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style>
  #calcWrapper {
    width: 100%;
    margin: auto;
    box-sizing: border-box;
    border: 15px solid black;
    border-radius: 5px;
    height: 700px;
    overflow: hidden;
    box-shadow: 5px 5px 5px #4b4b4c;
  }

  @media screen and (min-width: 768px){
      #calcWrapper {
          width: 40%;
          margin: auto;
      }
  }
  </style>
