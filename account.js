class NemAccountElement extends HTMLElement {
    constructor() {
        super();
        this._address = null;
        const shadowRoot = this.attachShadow({mode: 'open'});
    }

    static get template() {
        return `
        <div class="account">
            <h2>アカウント</h2>
            <dl>
                <dt>口座名</dt><dd><span id="account_address"><slot name="address"></slot></span></dd>
                <dt>残高</dt><dd><span id="account_balance"><slot name="balance"></slot>XEM</span></dd>
                <dt>時価総額</dt><dd><span id="polo_price"><slot name="priceJpy"></slot>円 [<slot name="jpy"></slot>JPY/XEM換算]</span></dd>
                <dt>重要度</dt><dd><span id="account_importance"><slot name="importance"></slot></span></dd>
            </dl>
        </div>
        `;
    }

    static get observedAttributes() {
        return ['address'];
    }

    getAccount(address, shadowRoot) {
        const jpy = 7;.251
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
          } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(this.responseText).account);
                const account = JSON.parse(this.responseText).account;
                const balance = account.balance / 1000000;
                const importance = account.importance * 10000;
                const priceJpy = jpy * balance;

                let slots = shadowRoot.querySelectorAll('slot');
                slots[0].innerHTML = address;
                slots[1].innerHTML = balance;
                slots[2].innerHTML = priceJpy;
                slots[3].innerHTML = jpy;
                slots[4].innerHTML = importance;
            }
        };
        const url = 'http://153.122.13.93:7890/account/get?address=' + address;
        xhr.open('GET', url, true);
        xhr.send();
    }

    // 要素が挿入された際に呼び出される
    attributeChangedCallback(address, oldValue, newValue) {
        this._address = newValue;
        this._updateRendering();
    }

    // address属性のゲッター
    get address() {
        return this._address;
    }

    // address属性のセッター
    set address(v) {
        this.setAttribute("address", v);
    }

    _updateRendering() {
        this.getAccount(this._address, this.shadowRoot);
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = NemAccountElement.template;
    }
}

customElements.define('nem-account', NemAccountElement);
