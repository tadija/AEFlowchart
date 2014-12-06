// Sketch Plugin: AEFlowchart (main library)
// Source: github.com/tadija/AEFlowchart
// Version: 1.0

#import 'AELabelSettings.js'

/*	this is the method which should be called from AEFlowchart plugins
		- elementName should be string which will be used for items naming
		- drawShape should be method which returns some shape for the given label	*/
function createStep(stepName, drawShape)
{
	if([selection count] == 0) {
		[doc showMessage:"Oops, you have to select some text layer"];
	}
	else {
		// iterate selected items
		var loop = [selection objectEnumerator];
		while (label = [loop nextObject]) {

			// create flowchart shapes from text
			if ([label class] === MSTextLayer) {

				styleStepTitle(label);
				var shape = drawShape(label);
				groupStepLayers(stepName, label, shape);

			}
			else {
				[doc showMessage:"Sorry, you have to select text layer"];
			}
		}
	}
}

/*	draw connection lines between selected objects (from top to bottom)	*/
function connectSteps(drawConnections)
{
	if([selection count] < 2) {
		[doc showMessage:"Oops, you have to select at least two layers"];
	} else {
		drawConnections(selection);
	}
}

/*	style the label as defined in AELabelSettings.js	*/
function styleStepTitle(label)
{
	// get current label position
	var currentFrame = [label frame];
	var currentMidX = [currentFrame midX];
	var currentMidY = [currentFrame midY];

	// label settings
	[label setFontPostscriptName:labelFontName];
	[label setFontSize:labelFontSize];
	[label setTextColor:[MSColor colorWithSVGString:labelFontColor]];
	[label setTextAlignment:2]; // center

	// restore label position
	var newFrame = [label frame];
	[newFrame setMidX:currentMidX];
	[newFrame setMidY:currentMidY];

	if (labelDropShadow) {
		// add default shadow
		var shadows = [[label style] shadows];
		if([shadows count] <= 0) [shadows addNewStylePart];
	}
}

/*	group and name the label and shape layers	*/
function groupStepLayers(stepName, label, shape)
{
	var parentGroup = [label parentGroup];

	// create new group
	var newGroup = [parentGroup addLayerOfType:"group"];
	[newGroup setName:stepName + " - " + [label stringValue]];

	// add shape to new group
	[shape setName:stepName + " Shape - " + [label stringValue]];
	[newGroup addLayers:[shape]];
	[parentGroup removeLayer:shape];

	// add label to new group
	[label setName:stepName + " Label - " + [label stringValue]];
	[newGroup addLayers:[label]];
	[parentGroup removeLayer:label];

	// deselect label
	[label setIsSelected:false];

	// refresh group size
	[newGroup resizeRoot:0];
}
