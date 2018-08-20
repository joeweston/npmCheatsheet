
$(document).ready(function(){
  $(".hidden").hide().removeClass("hidden"); //preserve class to stop flicker hack
  

  $("#add-outline").on("click", function(){
    UI.addOutline();
  });
  $("#remove-outline").on("click", function(){
    UI.removeOutline();
  });
  $("#add-inset").on("click", function(){
    UI.addInset();
  });
  $("#remove-inset").on("click", function(){
    UI.removeInset();
  });

  $(".slide-container").on("change","input[type=range]", function(){
    $(this).siblings(".slide-value").text( $(this).val() )
    UI.applyOutlines();
    UI.applyInsets();
  })
  $(".color-container").on("change","input[type=color]", function(){
    $(this).siblings(".color-value").text( $(this).val() )
    UI.applyOutlines();
    UI.applyInsets();
  })
  $(".slide-container").on("change","input[type=range]", function(){
    $(this).siblings(".slide-value").text( $(this).val() )
    UI.applyOutlines();
    UI.applyInsets();
    UI.applyBorderRaduis();
  })

  $("#background-color-container").on("change","input[type=color]", function(){
    $(this).siblings(".color-value").text( $(this).val() )
    $(".example").css( {"background-color": $(this).val()} );
  })

  $("#height-slide-container").on("change","input[type=range]", function(){
    $(this).siblings(".slide-value").text( $(this).val() );
    $(".example").css( {"height": $(this).val()} );
  })

  $("#width-slide-container").on("change","input[type=range]", function(){
    $(this).siblings(".slide-value").text( $(this).val() );
    $(".example").css( {"width": $(this).val()} );
  })

});

var border = new Border();

class UI{
  static addOutline(){
    if(border.outlinesCount > 5){return;}
    let borderNum = border.outlinesCount + 1;
    let blur = $(`#outline-${borderNum} input[name='blur']`).val();
    let size = $(`#outline-${borderNum} input[name='size']`).val();
    let color = $(`#outline-${borderNum} input[name='color']`).val();
    border.addOutline(blur, parseInt(size), color);
    UI.applyCss();
    $(`#outline-${border.outlinesCount}`).show();  
  }

  static removeOutline(){
    if(border.outlinesCount < 1){return;}
    $(`#outline-${border.outlinesCount}`).hide();
    border.removeOutline();
    UI.applyCss();
  }

  static applyOutlines(){
    let count = border.outlinesCount;
    for (let i = 0; i < count; i++){
      border.removeOutline();
    }
    for (let i = 0; i < count; i++){
      UI.addOutline();
    }
  }


  static addInset(){
    if(border.insetsCount > 5){return;}
    let borderNum = border.insetsCount + 1;
    let blur = $(`#inset-${borderNum} input[name='blur']`).val();
    let size = $(`#inset-${borderNum} input[name='size']`).val();
    let color = $(`#inset-${borderNum} input[name='color']`).val();
    border.addInset(blur, parseInt(size), color);
    UI.applyCss();
    $(`#inset-${border.insetsCount}`).show();  
  }

  static removeInset(){
    if(border.insetsCount < 1){return;}
    $(`#inset-${border.insetsCount}`).hide();
    border.removeInset();
    UI.applyCss();
  }

  static applyInsets(){
    let count = border.insetsCount;
    for (let i = 0; i < count; i++){
      border.removeInset();
    }
    for (let i = 0; i < count; i++){
      UI.addInset();
    }
  }

  static applyCss(){
    $("#example-text").html(border.css);
    $(".example").css({ "box-shadow" : border.innerCss});
  }

  static applyBorderRaduis(){
    border.borderRadius = $("#extra-controls input[name='border-radius']").val();
    $(".example").css({ "border-radius": border.borderRadiusInnerCss})
  }
}



