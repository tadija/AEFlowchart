// Main Flowchart Library

#import 'AELabelSettings.js'

/*	this is the method which should be called from AEFlowchart plugins
		- elementName should be string which will be used for items naming
		- drawShape should be method which returns some shape for the given label	*/
function flowchart(elementName, drawShape)
{
	if([selection count] == 0) {
		// nothing is selected
		[doc showMessage:"Oops, you have to select some text layer"];
	}
	else {
		// iterate selected items
		var loop = [selection objectEnumerator]
		while (item = [loop nextObject]) {

			// create flowchart shapes from text
			if ([item class] === MSTextLayer) {

				setupLabel(item);
				var shape = drawShape(item);
				groupLabelAndShape(elementName, item, shape);

			}
			else {
				[doc showMessage:"Sorry, you have to select text layer"];
			}
		}
	}
}

/*	style the label as defined in AELabelSettings.js	*/
function setupLabel(label)
{
	// get current label position
	var currentFrame = [label frame];
	var currentMidX = [currentFrame midX];
	var currentMidY = [currentFrame midY];

	// label settings
	[label setFontPostscriptName:labelFontName];
	[label setFontSize:labelFontSize];
	[label setTextColor:[MSColor colorWithHex:labelFontColor alpha:1]];
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
function groupLabelAndShape(elementName, label, shape)
{
	var parentGroup = [label parentGroup];

	// create new group
	var newGroup = [parentGroup addLayerOfType: "group"];
	[newGroup setName:elementName + " - " + [label stringValue]];

	// add shape to new group
	[shape setName:elementName + " Shape - " + [label stringValue]];
	[newGroup addLayer:shape];
	[parentGroup removeLayer:shape];

	// add label to new group
	[label setName:elementName + " Label - " + [label stringValue]];
	[newGroup addLayer:label];
	[parentGroup removeLayer:label];

	// refresh group size
	[newGroup resizeRoot];
}
