import { LitElement, html } from "../library/libs.js";

export class MyState extends LitElement {
    static properties = {
        phase: { type: 'string' },
        counter: { type: 'number' },
    };

    max = 5
    min = -5


    machine = {
        active: 'normal',
        counter: 0,
        disabled: false,

        states: {
            normal: {
                type: 'normal',
                increase: () => {
                    this.counter++
                    if (this.counter === this.max) {
                        this.phase = this.machine.states.max.type
                    }
                },
                decrease: () => {
                    this.counter--
                }
            },

            max: {
                type: 'max',
                increase: () => {

                },
                decrease: () => {
                    this.counter--
                    if (this.counter < this.max) {
                        this.phase = this.machine.states.normal.type
                    }
                }

            },

            min: {
                type: 'min',
                increase: () => { },
                decrease: () => { }
            },
        }
    };



    constructor() {
        super();
        this.phase = this.machine.states[this.machine.active].type;
        this.counter = this.machine.counter;
        this.disabled = this.machine.disabled;
    }

    render() {
        return html`
        <h1>Matt's Counter</h1>
        <p>The state is currently in ${this.phase}</p>
        <input type='number' readonly value='${this.counter}'></input>
        <button @click=${this.machine.states[this.phase].increase} ?disabled=${this.disabled}>+</button>
        <button @click=${this.machine.states[this.phase].decrease} ?disabled=${this.disabled}>-</button>
    `;
    }

}
customElements.define('my-state', MyState);