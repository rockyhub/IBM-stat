// This JS contains the custom tooltip implementation

$(document).ready(function() {

	//Select all anchor tag with rel set to tooltip	 
	$('.custtooltip').mouseover(function(e) {
		showTooltip(this);
	}).mouseout(function() {
		hideTooltip(this);
	});
	
	//Show and hide tooltip when tabbing 
	$('.custtooltip').focus(function(e) {
		showTooltip(this);
	}).blur(function() {
		hideTooltip(this);
	});
	
	$('.payrollcusttooltip').focus(function(e) {
		showTooltip(this);
	}).blur(function() {
		hideTooltip(this);
	});
	$('.payrollcusttooltip a').live( "click", function(e) {				
		showPayrollTooltip(this);
		e.stopPropagation();	
	});
	$(document).click(function() {
		$('div.tt_wrapper').remove();
	});	
	
});
/* Adding separate tooltip function for Payroll */
showPayrollTooltip = function(element) {
		// Remove if wrapper already present
		$('div.tt_wrapper').remove();
		//Grab the title attribute's value and assign it to a variable
		var tip = $(element).attr('data-title'),	
		topXPos = $(window).width() < 1273 ? "200" : "40",	// Checking the window size. If the window size is smaller than 1273 we are moving the tooltip position	  
		arrowPos = $(window).width() < 1273 ? "right" : "left";
		
		//Append the tooltip template and its value
		$(element).append('<div class="tt_wrapper"><div class="tt_top"></div><div class="tt_body"><div class="tt_content">' + tip + '</div></div><div class="tt_bottom_payroll '+arrowPos+'"></div>');		
				
		//Show the tooltip with faceIn effect
		$('.tt_wrapper').fadeIn('500');
		$('.tt_wrapper').fadeTo('10',0.9);
		var me = $(element);
		var x = me.position().left - topXPos;
        var y = me.position().top - $('.tt_wrapper').height();	
		//Keep changing the X and Y axis for the tooltip, thus, the tooltip move along with the mouse
		$('.tt_wrapper').css('top',y );
		$('.tt_wrapper').css('left', x);	
}
showTooltip = function(element) {
		// Remove if wrapper already present
		$('div.tt_wrapper').remove();
		//Grab the title attribute's value and assign it to a variable
		var tip = $(element).attr('data-title');	
		
		//Remove the title attribute's to avoid the native tooltip from the browser
		//$(this).attr('title','');
		
		//Append the tooltip template and its value
		$(element).append('<div class="tt_wrapper"><div class="tt_top"></div><div class="tt_body"><div class="tt_content">' + tip + '</div></div><div class="tt_bottom"></div>');		
				
		//Show the tooltip with faceIn effect
		$('.tt_wrapper').fadeIn('500');
		$('.tt_wrapper').fadeTo('10',0.9);
		var me = $(element);
		var x = me.position().left - 40;
        var y = me.position().top - $('.tt_wrapper').height();	
		//Keep changing the X and Y axis for the tooltip, thus, the tooltip move along with the mouse
		$('.tt_wrapper').css('top',y );
		$('.tt_wrapper').css('left', x);	
}

hideTooltip = function(element) {
		//Put back the title attribute's value
		//$(this).attr('title',$('.tt_content').html());	
		//Remove the appended tooltip template
		$(element).children('div.tt_wrapper').remove();	
}