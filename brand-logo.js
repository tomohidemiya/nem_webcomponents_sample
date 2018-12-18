class NemBrandLogoElement extends HTMLElement {

    constructor() {
        super();
        this._name = null;
        
    }

    static get template() {
        return `
            <style>
                :host {
                    display: grid;
                    grid-template-columns: auto lfr;
                    align-items: center;
                }
                a {
                    height: 50px;
                    padding: 22px 45px;
                    border-right: 1px solid #eee;
                }
                img {
                    height: 100%;
                }
            </style>
            <a href="">
                <img src="https://nem.io/wp-content/themes/nem/img/logo-nem.svg" alt="nem logo"></img>
            </a>
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
        .innerHTML = NemBrandLogoElement.template;
    }
}

customElements.define('nem-brand-logo', NemBrandLogoElement);
