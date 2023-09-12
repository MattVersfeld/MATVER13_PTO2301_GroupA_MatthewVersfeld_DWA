import { LitElement, html, css } from "../library/libs.js";
import { styleMap } from "../library/libs.js";

export class MyState extends LitElement {
    static properties = {
        phase: { type: 'string' },
        counter: { type: 'number' },
    };

    data = {
        active: 'normal',
        counter: 0,
        disabled: false,
        max: 5,
        min: -5,
    };


    machine = {

        states: {
            normal: {
                type: 'normal',
                style: {
                    divWrapper: {
                        margin: 'auto',
                        width: '50%',
                        'text-align': 'center',
                        margin: 'auto',
                    },
                    input: {
                        margin: 'auto',
                        'font-size': '15vh',
                        'text-align': 'center',
                        height: '50vh',
                        width: '99vw',
                    },
                    max: {
                        margin: 'auto',
                        width: '50vw',
                        padding: '1rem',

                    },
                    min: {
                        margin: 'auto',
                        width: '50vw',
                        padding: '1rem',

                    },
                    reset: {
                        margin: 'auto',
                        width: '20vw',
                        padding: '0.5rem',

                    },
                    wrapper: {
                        margin: 'auto',
                        display: 'flex',
                        width: '99vw',
                        'text-align': 'center',
                    }

                },
                increase: () => {
                    this.counter++
                    if (this.counter === this.data.max) {
                        this.phase = this.machine.states.max.type
                        this.disabled.max = !this.data.disabled
                    }
                },
                decrease: () => {
                    this.counter--
                    if (this.counter === this.data.min) {
                        this.phase = this.machine.states.min.type;
                        this.disabled.min = !this.data.disabled
                    }
                },
                reset: () => {
                    this.counter = this.data.counter
                },

            },

            max: {
                type: 'max',
                style: {
                    divWrapper: {
                        width: '50%',
                        'text-align': 'center',
                        margin: 'auto',
                    },
                    input: {
                        'font-size': '15vh',
                        color: 'red',
                        'text-align': 'center',
                        height: '50vh',
                        width: '99vw',
                    },
                    max: {
                        'background-color': 'red',
                        opacity: 0.5,
                        color: 'black',
                        width: '50vw',
                        padding: '1rem',

                    },
                    min: {
                        width: '50vw',
                        padding: '1rem',

                    },
                    reset: {
                        width: '20vw',
                        padding: '0.5rem',

                    },
                    wrapper: {
                        display: 'flex',
                        width: '99vw',
                        'text-align': 'center',
                        margin: 'auto',
                    }
                },
                increase: () => {

                },
                decrease: () => {
                    this.counter--
                    if (this.counter < this.data.max) {
                        this.phase = this.machine.states.normal.type;
                        this.disabled.max = this.data.disabled;
                    };
                },
                reset: () => {
                    this.counter = this.data.counter;
                    this.phase = this.data.active;
                    this.disabled.max = this.data.disabled
                },

            },

            min: {
                type: 'min',
                style: {
                    divWrapper: {
                        width: '50%',
                        'text-align': 'center',
                        margin: 'auto',
                    },
                    input: {
                        'font-size': '15vh',
                        color: 'red',
                        'text-align': 'center',
                        height: '50vh',
                        width: '99vw',
                    },
                    max: {
                        width: '50vw',
                        padding: '1rem',

                    },
                    min: {
                        'background-color': 'red',
                        opacity: 0.5,
                        color: 'grey',
                        width: '50vw',
                        padding: '1rem',

                    },
                    reset: {
                        width: '20vw',
                        padding: '0.5rem',

                    },
                    wrapper: {
                        display: 'flex',
                        width: '99vw',
                        'text-align': 'center',
                        margin: 'auto',
                    },
                },
                increase: () => {
                    this.counter++
                    if (this.counter > this.data.min) {
                        this.phase = this.machine.states.normal.type;
                        this.disabled.min = this.data.disabled;
                    }
                },
                decrease: () => {

                },
                reset: () => {
                    this.counter = this.data.counter
                    this.phase = this.data.active
                    this.disabled.min = this.data.disabled
                },
            },

        }
    }


    constructor() {
        super();
        this.phase = this.data.active;
        this.counter = this.data.counter;
        this.disabled = {
            max: this.data.disabled,
            min: this.data.disabled,
        };
    }

    render() {

        return html`

        <header>
            <div style=${styleMap(this.machine.states[this.phase].style.divWrapper)}>
                <h1>Matt's Counter</h1>
                <p>The state is currently in ${this.phase}</p>
            </div>
        </header>

        <body>
            <div>
                <input type='number' readonly value='${this.counter}' style=${styleMap(this.machine.states[this.phase].style.input)}></input>
            </div>

            <div style=${styleMap(this.machine.states[this.phase].style.wrapper)}>
                <button name='add' @click=${this.machine.states[this.phase].increase} ?disabled=${this.disabled.max} style=${styleMap(this.machine.states[this.phase].style.max)}>+</button>
                <button name='minus' @click=${this.machine.states[this.phase].decrease} ?disabled=${this.disabled.min} style=${styleMap(this.machine.states[this.phase].style.min)}>-</button>
            </div>
        </body>

        <footer style=${styleMap(this.machine.states[this.phase].style.divWrapper)}>
            <button @click=${this.machine.states[this.phase].reset} style=${styleMap(this.machine.states[this.phase].style.reset)}>Reset</button>
        </footer>
        
    `;
    }

}
customElements.define('my-state', MyState);