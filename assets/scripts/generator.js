
class Border {
  constructor(outlines = [new SubBorder()], insets = []){
    this._outlines = outlines;
    this._insets = insets;
    this._borderRadius = 0;
  }
  addOutline(blur, size = 5, color, units){
    let len = this._outlines.length;
    if (len === 1){
      size += this._outlines[0].size
    } 
    if (len > 1){
      size += this._outlines[len - 1].size;
    }
    this._outlines.push(new SubBorder(false, blur, size, color, units))
    return this;
  }
  removeOutline(){
    this._outlines.splice(-1, 1);
    return this;
  }

  addInset(blur, size = 5, color, units){
    let len = this._insets.length;
    if (len === 1){
      size += this._insets[0].size
    } 
    if (len > 1){
      size += this._insets[len - 1].size;
    }
    this._insets.push(new SubBorder(true, blur, size, color, units))
    return this;
  }
  removeInset(){
    this._insets.splice(-1, 1);
    return this;
  }
  get innerCss(){
    let cssString = ""
    for (let i = 0; i < this._outlines.length; i++){
      if( i === 0 ){
        cssString += `\n                   ${this._outlines[i].css}`
      } else{
        cssString +=`,\n                   ${this._outlines[i].css}`
      }
    }
    for (let i = 0; i < this._insets.length; i++){
      cssString +=  `,\n                   ${this._insets[i].css}`
    }
    if(this._outlines.length === 0){
      cssString = cssString.substring(1);
      if(this._insets.length === 0){
        cssString = "  none";
      }
    }
    return cssString;
  }
  get css(){
    let innerCssString = this.innerCss;
    let cssString = "";
    cssString += `-webkit-box-shadow:${innerCssString}; \n`;
    cssString += `   -moz-box-shadow:${innerCssString};\n`;
    cssString += `        box-shadow:${innerCssString};`;
    return cssString;
  }
  get outlinesCount(){
    return this._outlines.length
  }
  get insetsCount(){
    return this._insets.length
  }
  get borderRadiusInnerCss(){
    return `${this._borderRadius}px`;
  }
  set borderRadius(val){
    this._borderRadius = val;
  }
  
}


class SubBorder {
  constructor(inset = false, blur = 0, size = 5, color = "#000", units = "px"){
    this._inset = inset;
    this._blur = blur;
    this._size = size;
    this._color = color;
    this._units = units;
  }
  set inset(val){
    this._inset = val;
  }
  set blur(val){
    this._blur = val;
  }
  get size(){
    return this._size;
  }
  set size(val){
    this._size = val;
  }
  set color(val){
    this._color = val;
  }
  set units(val){
    this._units = val;
  }
  get css(){
    return `${this._inset ? "inset ": ""}0 0 ${this._blur}${this._blur?this._units:""} ${this._size}${this._size?this._units:""} ${this._color}`;
  }
}


