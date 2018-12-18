class NemElement extends HTMLElement {

    constructor() {
        super();
        this._name = null;
        
    }

    static get template() {
        return `
            <style>
                .nem--orange {
                    color: #F5A841;
                }

                .nem--green {
                    color: #59CCBB;
                }

                .nem--blue {
                    color: #49B8E9;
                }
            </style>
            <div><span class="nem--orange">Hello NEMber,</span><span class="nem--green"> <slot></slot></span> <span class="nem--blue">san!</span></div>
        `;
    }

    static get observedAttributes() {
        return ['name'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this._name = newValue;
        this._updateRendering();
    }
     // 要素が挿入された際に呼び出される

    // name属性のゲッター
    get name() {
        return this._name;
    }

    // name属性のセッター
    set name(v) {
        this.setAttribute("name", v);
    }

    _updateRendering() {
        this.textContent = this._name;
    }

    connectedCallback() {
        this
        .attachShadow({
            mode: 'open'
        })
        .innerHTML = NemElement.template;
    }
}

customElements.define('nem-hello', NemElement);
