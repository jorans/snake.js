(window["webpackJsonpsnake-js"]=window["webpackJsonpsnake-js"]||[]).push([[0],[,,,,,,function(e,t,n){e.exports=n(13)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(3),c=n.n(o),u=(n(11),n(4)),i=n(1),s=n(5);function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(n,!0).forEach(function(t){Object(u.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function m(e,t,n){return function e(t,n,r,a){if(0===a)throw new Error("Exhusted attempts to find fruit position");var o=function(e,t){return{X:v(e),Y:v(t)}}(t,n);return p(o,r,d)?e(t,n,r,--a):o}(e,t,n,100)}function d(e,t){return e.X===t.X&&e.Y===t.Y}function p(e,t,n){return t.some(function(t){return n(e,t)})}function v(e){return Math.floor(Math.random()*Math.floor(e))}function h(e){switch(e){case 1:return"occupied";case 2:return"apple";default:return"empty"}}function b(e,t,n){var r=function(e,t){return[{X:e/2,Y:t/2},{X:e/2,Y:t/2},{X:e/2,Y:t/2},{X:e/2,Y:t/2}]}(t,n);return{gameState:e,speed:300,transform:{dX:0,dY:-1},snake:r,fruit:m(t,n,r),score:0}}var g=function(e){var t=0,n=1,o=2,c=e.height,u=e.width,l=function(e,t){for(var n=[],r=0;r<e;r++){n[r]={id:r,values:[]};for(var a=0;a<t;a++)n[r].values[a]={id:r+":"+a,value:0}}return n}(c,u),v=Object(r.useState)(b(t,u,c)),g=Object(s.a)(v,2),w=g[0],E=g[1];l[w.fruit.Y].values[w.fruit.X].value=2,w.snake.forEach(function(e){return l[e.Y].values[e.X].value=1});var O=l.map(function(e){var t=e.values.map(function(e){return a.a.createElement("td",{key:e.id,className:h(e.value)},"\xa0")});return a.a.createElement("tr",{key:e.id},t)});function k(){var e=w.snake,t=w.gameState,r=w.transform,a=w.score,s=w.fruit,l=function(e,t){var n=e[0].Y+t.dY,r=e[0].X+t.dX;return{Y:n,X:r}}(w.snake,r),v=function(e,t,n){return e.Y<0||e.Y>=n||e.X<0||e.X>=t}(l,u,c),h=function(e,t){var n=Object(i.a)(t);return n.pop(),p(e,n,d)}(l,w.snake),b=v||h?o:t,g=Object(i.a)(e),O=a,k=s;b===n&&(g.unshift(l),g.pop(),function(e,t){return d(e,t)}(l,w.fruit)&&(O+=1,g=function(e){for(var t=e[e.length-1],n=Object(i.a)(e),r=0;r<5;r++)n.push(t);return n}(g),k=m(u,c,g))),E(f({},w,{snake:g,gameState:b,score:O,fruit:k}))}!function(e,t){var n=Object(r.useRef)();Object(r.useEffect)(function(){n.current=e},[e]),Object(r.useEffect)(function(){if(null!==t){var e=setInterval(function(){n.current()},t);return function(){return clearInterval(e)}}},[t])}(function(){w.gameState===n&&k()},w.speed);var X=w.gameState===t?a.a.createElement("p",null,"Click to start"):w.gameState===n?a.a.createElement("p",null,"Use ",a.a.createElement("b",null,"LEFT")," or ",a.a.createElement("b",null,"RIGHT")," to turn the snakes head",a.a.createElement("br",null),"or ",a.a.createElement("b",null,"a, w, d, s")," to go West, North, East or South"):w.gameState===o?a.a.createElement("div",null,a.a.createElement("h3",null,"Game Over!"),a.a.createElement("p",null,"Click to restart")):void 0;return a.a.createElement("div",{className:"snake",align:"center",onClick:function(e){w.gameState===t?E(f({},w,{gameState:n})):w.gameState===n?E(f({},w,{gameState:o})):w.gameState===o&&E(b(t,u,c))},onKeyDown:function(e){var t=e.key||"";w.gameState===n&&("ArrowUp"===t?E(f({},w,{speed:w.speed-100})):"ArrowDown"===t?E(f({},w,{speed:w.speed+100})):"ArrowLeft"===t?E(f({},w,{transform:{dY:-1*w.transform.dX,dX:w.transform.dY}})):"ArrowRight"===t?E(f({},w,{transform:{dY:w.transform.dX,dX:-1*w.transform.dY}})):"a"===t?E(f({},w,{transform:{dY:0,dX:-1}})):"w"===t?E(f({},w,{transform:{dY:-1,dX:0}})):"d"===t?E(f({},w,{transform:{dY:0,dX:1}})):"s"===t?E(f({},w,{transform:{dY:1,dX:0}})):console.log("MOVE - "+e.key))},tabIndex:0},a.a.createElement("h1",null,"Welcome to Snake.js"),X,a.a.createElement("h2",null,"Score:",w.score),a.a.createElement("table",{className:"board"},a.a.createElement("tbody",null,O)))};n(12);var w=function(){return a.a.createElement("div",{className:"App"},a.a.createElement(g,{width:20,height:20}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[6,1,2]]]);
//# sourceMappingURL=main.438c4669.chunk.js.map