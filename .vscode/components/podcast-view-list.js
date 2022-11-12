class Component extends HTMLElement{
    connectedCallback() {
        this.innerHTML = '<div>podcast-view-list</div>'
    }
}

customElements.define('podcast-view-list', Component)