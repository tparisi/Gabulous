Gabatar = function(param)
{
	SB.Entity.call(this, param);
	
	param = param || {};
	
	this.transform = new SB.Transform();
	
    var avParams = {};
    avParams.radiusTop    = 1;
    avParams.radiusBottom = 1;
    avParams.height       = 1.667;
    avParams.materialType = SB.MaterialType.Phong;
    avParams.materialParam = { color: 0x0000ff };
    
//    avParams.ambient = 0x0000ff;

    // Create the params
    var params = {
            materialType: SB.MaterialType.FromFile,
            //materialParam: {color: 0x00ff00, shading: THREE.SmoothShading }
            materialParam: {color: 0x00ff00 },
    } ;


    var url = '../../models/body_hero_nopane.js';
    this.body = SB.Model.loadModel(url, params);
    url = '../../models/avatar_display.js';
    this.display = SB.Model.loadModel(url, params);
    url = '../../models/avatar_frame.js';
    this.displayFrame = SB.Model.loadModel(url, params);

	this.screenTracker = new SB.ScreenTracker( { referencePosition : new THREE.Vector3(0, 1.67, 0) });
	
	this.addComponent(this.transform);
	this.addComponent(this.body);	
	this.addComponent(this.display);	
	this.addComponent(this.displayFrame);	
	this.addComponent(this.screenTracker);	

	this.screenTracker.subscribe("position", this, this.onScreenPositionChanged);

	this.annotation = new SB.Annotation( { style : "text200" } );
	var userText = "Me";
	if (param.info)
	{
		userText = "<div><img src='" + "images/Twitter1.jpg" + "' width='37' height='37'/>" + 
		"<div style='position:absolute; top:4px; left: 48px;'> <b> " 
		+ param.info.user_name + "</b> @" + param.info.screen_name + "</div></div>";
	}
	
	userText = "<div><img src='" + "images/Twitter1.jpg" + "' width='37' height='37'/>" + 
	"<div style='position:absolute; top:4px; left: 48px;'> <b> " 
	+ "Scott Foe" + "</b> @" + "scottfoe" + "<br/>"
	+ "Automated Alert: @cyborgdino has added a story to the product backlog! <b>#ArtHackSF</b>  "
	+ "</div></div>";

	this.annotation.setHTML(userText);
//	this.annotation.dom.style.height = "120px";
//	this.annotation.dom.style.width = "300px";
	this.annotation.show();
}

goog.inherits(Gabatar, SB.Entity);

Gabatar.prototype.realize = function() 
{
	SB.Entity.prototype.realize.call(this);
	this.screenTracker.start();
}

Gabatar.prototype.setUserInfo = function(data) 
{
	var userText = "<div><img src='" + data.profile_image_url + "' width='37' height='37'/>" + 
	"<div style='position:absolute; top:4px; left: 48px;'> <b> " 
	+ data.name + "</b> @" + data.screen_name + "<br>" +
	data.status.text + "</div></div>";
	this.annotation.setHTML(userText);
}

Gabatar.prototype.onScreenPositionChanged = function(pos)
{
	this.annotation.setPosition(pos);
}
