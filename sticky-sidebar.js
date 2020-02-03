;(function( $ ){

	$.fn.stickySidebar = function(options) {
		
		var thisObj = this;

		/* Set options for plugin */
		var settings = $.extend({
			header          : '#header',
			content         : 'article',
			fixedClass      : 'fs-fixed',
			bottomClass     : 'fs-bottom',
			parentClass     : 'fs-parent',
			resize          : true,
			widthBreakPoint : false,
		}, options);

		/* Main function */
		var change = function () {
			var o = settings,
				windowTop,
				parentOfSidebar = thisObj.parent(),
				sectionPaddTop;
				
			o.section = 'section';

			function changeVars() {
				parentOfSidebar
					.addClass(o.parentClass)
					.css({ 
						height:	+$(o.content).outerHeight(),
						position: 'relative'
					});
				thisObj.outerWidth( parentOfSidebar.width() );
				sectionPaddTop = Math.abs($(o.section).innerHeight() - $(o.section).height()) / 2;
			}

			function changeSidebar() {
				windowTop = $(window).scrollTop();

				if (windowTop > sectionPaddTop) {
					if ( 
						windowTop + $(o.header).height() + thisObj.height() >=
						$(o.content).offset().top + $(o.content).height() 
					) {
						thisObj.addClass(o.bottomClass);
					} else {
						thisObj.removeClass(o.bottomClass);
					}
					thisObj
						.addClass(o.fixedClass)
						.css("top", +$(o.header).height());
				} else {
					thisObj
						.removeClass(o.fixedClass + ' ' + o.bottomClass)
						.css("top", +thisObj.position().top);
				}

			}

			changeVars();

			$(window).scroll(function () {
				changeSidebar();
			});
			
			if (o.resize) {
				$(window).resize(function () {
					changeVars();
					changeSidebar();
				});
			}

		};

		/* Enable plugin */
		return this.each( change );

	};

})( jQuery );