!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){o[e]=n},e.parcelRequired7c6=t),t("iU1Pc");var r=document.querySelector(".form"),i=document.querySelector('input[name="delay"]'),u=document.querySelector('input[name="step"]'),l=document.querySelector('input[name="amount"]');function a(e,n){var o=Math.random()>.3;return new Promise((function(t,r){console.log("start"),setTimeout((function(){o?t({position:e,delay:n}):r({position:e,delay:n})}),n)}))}r.addEventListener("submit",(function(e){e.preventDefault();for(var n=0,o=0,t=0;t<Number(l.value);t+=1)n+=1,o=Number(i.value)+Number(u.value),a(n,o).then((function(e){var n=e.position,o=e.delay;console.log("✅ Fulfilled promise ".concat(n," in ").concat(o,"ms"))})).catch((function(e){var n=e.position,o=e.delay;console.log("❌ Rejected promise ".concat(n," in ").concat(o,"ms"))}))}))}();
//# sourceMappingURL=03-promises.9bbe1b08.js.map
