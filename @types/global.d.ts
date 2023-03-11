/*declare module "@src/assets/js/http.js" {
    export  const  postWeb:  any
}*/
interface audiosContainerItem{
  uid:number|string,
  node:HTMLAudioElement
}
interface Window {
  audiosContainer: Array<audiosContainerItem>,
  WebKitMutationObserver:any,
  MozMutationObserver:any
}
// declare var $:(selector:string) =>any
declare var process:any