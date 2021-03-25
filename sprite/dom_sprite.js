class DOMSprite {
    constructor(src, width, height, steps, period, scale, modes, mode) {
        this.scale = scale;
        this.modes = modes;
        let kf_index = 0;
        this.keyframes = "kf_" + kf_index;
        let wrapper = document.createElement("div");
        wrapper.style = "image-rendering: pixelated; image-rendering: crisp-edges;";
        wrapper.style.position = "absolute";
        wrapper.style.left = 0;
        wrapper.style.top = 0;
        wrapper.style.overflow = "hidden";
        wrapper.style.width = (width * scale).toString() + "px";
        wrapper.style.height = (height * scale).toString() + "px";
        this.css = window.document.styleSheets[0];
        let inner = document.createElement("img");
        this.inner = inner;
        this.setMode("right");
        inner.setAttribute("src", src);
        inner.style = "image-rendering: pixelated; image-rendering: crisp-edges;animation:" +
            this.keyframes + " " + period + "s steps(" + steps + ") infinite;"
        inner.style.overflow = "hidden";
        inner.style.width = (steps * width * scale).toString() + "px";
        inner.style.height = (steps * height * scale).toString() + "px";

        this.wrapper = wrapper;
        wrapper.appendChild(inner);
    }
    setMode(mode){
        console.log(mode);
        this.row = this.modes && this.modes.hasOwnProperty(mode) ? this.modes[mode] : 0;
        // this.inner.style.top = this.modes[mode] + "px"
        this.css.insertRule(
            `@keyframes ${this.keyframes} ` +
            `{from{transform:translate3d(0px,-${this.row * this.scale}px,0)} to{transform:translate3d(-100%,-${this.row * this.scale}px,0)}}`,
            this.css.cssRules.length
        );
    }
}
