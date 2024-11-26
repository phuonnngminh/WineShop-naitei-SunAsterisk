(function ($) {
	"use strict";

	/*----------------------------
		Cart Plus Minus Button
	------------------------------ */
	$(".cart-plus-minus").prepend('<div class="dec qtybutton">-</div>');
	$(".cart-plus-minus").append('<div class="inc qtybutton">+</div>');
	// $(".qtybutton").on("click", function () {
	// 	var $button = $(this);
	// 	var oldValue = $button.parent().find("input").val();
	// 	if ($button.text() == "+") {
	// 		var newVal = parseFloat(oldValue) + 1;
	// 	}
	// 	else {
	// 		// Don't allow decrementing below zero
	// 		if (oldValue > 1) {
	// 			var newVal = parseFloat(oldValue) - 1;
	// 		}
	// 		else {
	// 			newVal = 1;
	// 		}
	// 	}
	// 	$button.parent().find("input").val(newVal);
	// });
    $(".qtybutton").on("click", function () {
        var $button = $(this);
        var productName = $button.closest("tr").find(".pro-title a").text();
        var oldValue = $button.closest("tr").find(".cart-plus-minus-box").val();
        
        if ($button.hasClass("inc")) {
          var newVal = parseFloat(oldValue) + 1;
        } else {
          // Đảm bảo không giảm xuống dưới 1
          if (oldValue > 1) {
            var newVal = parseFloat(oldValue) - 1;
          } else {
            newVal = 1;
          }
        }
        
        // Gửi thông tin sản phẩm và số lượng mới đến main.js
        updateCartItemQuantity(productName, newVal);
      });
    

    /*-------------------------
		accordion toggle function
	--------------------------*/
	$('.payment-accordion').find('.payment-accordion-toggle').on('click', function () {
		//Expand or collapse this panel
		$(this).next().slideToggle(500);
		//Hide the other panels
		$(".payment-content").not($(this).next()).slideUp(500);
	});
	/* -------------------------------------------------------
		accordion active class for style
	----------------------------------------------------------*/
	$('.payment-accordion-toggle').on('click', function (event) {
		$(this).siblings('.active').removeClass('active');
		$(this).addClass('active');
		event.preventDefault();
	});
})(jQuery);
