
$(document).ready(function(){

	$("#sidebar-inv-title").click(function(e) {
	    $("#sidebar-inv>a").toggleClass("hide");
	    $("#sidebar-inv>div>img").toggleClass("drawer");
	});

	$("#sidebar-str-title").click(function(e) {
	    $("#sidebar-str>a").toggleClass("hide");
	    $("#sidebar-str>div>img").toggleClass("drawer");
	});

	$("#sidebar-con-title").click(function(e) {
	    $("#sidebar-con>a").toggleClass("hide");
	    $("#sidebar-con>div>img").toggleClass("drawer");
	});

	$(".collapse_btn").click(function(){
		$(".sidebar").toggleClass("sidebar_rel");
		$(".collapse_btn").toggleClass("collapse_btn_rel");
		$(".leftmain").toggleClass("leftmain_rel");
	});


	var top_val = $(document).scrollTop();
    var margin_val=margin_bottom*$(window).width()/100;
    var height_val=$(window).height();
    var footer_val=$(".footer").offset().top;
    var bottom_val=margin_val+top_val+height_val-footer_val;
     
       if(bottom_val>0){
          $(".sidebar").css("bottom",bottom_val);
          $(".collapse_btn").css("height",$(window).height()-bottom_val-80);

        }else{
          $(".sidebar").css("bottom","unset");
          $(".collapse_btn").css("height",$(window).height()-80);

        }


	//实现侧边栏不超过底部
  var margin_bottom=80;//单位px

  $(document).scroll(function(){

       //bottom=margin+scrollTop+windows.height-footer.offset.top
       top_val = $(document).scrollTop();
       margin_val=margin_bottom;
       height_val=$(window).height();
       footer_val=$(".footer").offset().top;
       bottom_val=margin_val+top_val+height_val-footer_val;
     
      if(bottom_val>0){
          $(".sidebar").css("bottom",bottom_val);
          $(".collapse_btn").css("height",$(window).height()-bottom_val-80);

        }else{
          $(".sidebar").css("bottom","unset");
          $(".collapse_btn").css("height",$(window).height()-80);

        }


      
    });



});