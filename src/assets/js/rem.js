/**
 * Created by Allen Liu on 2022/3/31.
 */

export default function(){
  //动态设置html的font-size ----start
  let designWidth = 750;
  let baseNum = 100;

  function setRootFontSize() {
    let winWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let winHeight = document.documentElement.clientHeight || document.body.clientHeight;
    let html = document.getElementsByTagName('html')[0];
    /*if(winWidth>=1000){
        winWidth = 1000
    }*/
    let frameBili = 4 / 3
    let b = frameBili / (winWidth / winHeight)
    let realW = parseInt(winWidth * b)
    // console.log(realW,3333333333333);


    html.style.fontSize = (realW / designWidth) * baseNum + 'px';
    console.log(html.style.fontSize);
  }

  setRootFontSize();
  window.addEventListener('resize', (e) => {
    setRootFontSize();
  })
//动态设置html的font-size ----end
}