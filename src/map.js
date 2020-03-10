export function MP(ak) {
     return new Promise(function (resolve, reject) {
          window.onload = function () {
               resolve(BMapGL)
          }
          var script = document.createElement("script");
          script.type = "text/javascript";
          script.src = "https://api.map.baidu.com/api?v=1.0&type=webgl&ak="+ak
          script.onerror = reject;
          document.head.appendChild(script);
     })
}
