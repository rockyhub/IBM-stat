// JavaScript Document
loadfeaturedRevValues = function(obj,mvalue) {
	$( '#'+obj+' .row' ).each(function(index) {
	  var barValue = parseInt($(this).find('.barValue').html());		
	  $(this).find('.bar').attr('id','bar'+index);
	  animateBar(barValue,mvalue,index);
});	
}

animateBar = function(a,b,c) {
	var perVal = (a/b)* 100;
	$('#bar'+c).animate({
		width : perVal+'%'
	}, 1000);	
}

function calcProgress(a,b) {
	return (b/a) * 100;
}

function initArcProgress (index,options) {
	var myProgress = index;
    var options        =  (typeof options != 'undefined')                   ?  options    :  new Array();
    var pWidth     =  (typeof options['pWidth'] != 'undefined')     ?  options['pWidth']  :  '300';
    var pHeight     =  (typeof options['pHeight'] != 'undefined')     ?  options['pHeight']  :  '300';	
    var aRadius     =  (typeof options['aRadius'] != 'undefined')     ?  options['aRadius']  :  '120';	
	var pBar 		= (typeof options['pBar'] != 'undefined')     ?  options['pBar']  :  '';
	var arctransForm 		= (typeof options['arctransForm'] != 'undefined')     ?  options['arctransForm']  :  '';	
	var arcPos 		= (typeof options['arcPos'] != 'undefined')     ?  options['arcPos']  :  '';	
	var barStroke 		= (typeof options['barStroke'] != 'undefined')     ?  options['barStroke']  :  '';
	var filledBarStroke 		= (typeof options['filledBarStroke'] != 'undefined')     ?  options['filledBarStroke']  :  '';		
	var aColor     =  (typeof options['arcColor'] != 'undefined')     ?  options['arcColor']  :  '#d1d1d1';	
	var aFColor     =  (typeof options['arcFilledColor'] != 'undefined')     ?  options['arcFilledColor']  :  '#b8161c';	
	var arcPaper,arc_obj,excessValue,
	arcPaperProgress = calcProgress(parseInt($('#'+pBar).attr('data-target')),parseInt($('#'+pBar).attr('data-real')));

	if(arcPaperProgress > 100) {		
		excessValue	= arcPaperProgress - 100;	
		arcPaperProgress = arcPaperProgress - excessValue;
	}	
// Primary Arc Starts
arcPaper = Raphael(myProgress, pWidth, pHeight); // pass div id, width, height

/**
 *  Draws and arc
 *      xloc: the center point of the arc/circle on the x-axis
 *      yloc: the center point of the arc/circle on the y-axis
 *     value: the percentage that the arc should be filled
 *         R: radius. distance from the center of the circle that the arc will be drawn
 * arcLength: length of the arc in degrees. 360 would be a full circle
 */
arcPaper.customAttributes.arc = function(xloc, yloc, value, total, R, arcLength) {
    var alpha = arcLength / total * value,
        a = (90 - alpha) * Math.PI / 180,
        x = xloc + R * Math.cos(a),
        y = yloc - R * Math.sin(a),
        path;

    path = [
        ["M", xloc, yloc - R],
        ["A", R, R, 0, +(alpha > 180), 1, x, y]
    ];

    return {
        path: path
    };
};

// draw the grey background arc
// center is 147, 147
// 100, 100 says to draw 100% of the arc
// 124 is the radius
// 240 is the length of the full arc - 240 or 2/3rds of degrees of a circle

arc_obj = arcPaper.path().attr({
    "stroke": aColor,
    "stroke-width": barStroke,
    arc: [arcPos, arcPos, 100, 100, aRadius , 310]
});
// rotate it 120 degrees to the left since the arc so that it starts from the correct position
// r-120 does the rotation - the negative value rotates it left, a positive value would rotate it to the right
// 147, 147 is the center point that the arc is rotated around.
arc_obj.transform(arctransForm+", "+arcPos+" , "+arcPos);

// draw the primary red arc that will be animated
// same values as above, but the length of the arc starts at 0.1 (would be 0, but IE has a rendering bug if it is set to 0)
arc_obj = arcPaper.path().attr({
    "stroke": aFColor,
    "stroke-width": filledBarStroke ,
    arc: [arcPos, arcPos, 0.1, 100, aRadius , 310]
});
// do the same rotation as the previous arc
arc_obj.transform(arctransForm+", "+arcPos+" , "+arcPos);

// animate the arc
// in this example it is animating up to 80 percent of the full arc
arc_obj.animate({
    arc: [arcPos, arcPos, arcPaperProgress , 100, aRadius , 310]
}, 1500, function() {
    // This call back function will be useful when the arc value is more than 100%
	if(excessValue > 0) {
		arc_obj = arcPaper.path().attr({
			"stroke": aColor,
			"stroke-width": barStroke ,
			arc: [arcPos, arcPos, 0.1, 100, aRadius , excessValue]
		});
		// do the same rotation as the previous arc
		arc_obj.transform(arctransForm+", "+arcPos+" , "+arcPos);
		
		// animate the arc
		// in this example it is animating up to 80 percent of the full arc
		arc_obj.animate({
			arc: [arcPos, arcPos, arcPaperProgress , 100, aRadius , excessValue]
		}, 1500, ">");
	}
  });

}




