(function(){

	var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight,

		VIEW_ANGEL = 50;

	// set some camera attributes
	var VIEW_ANGLE = 45,
  		ASPECT = WIDTH / HEIGHT,
  		NEAR = 0.1,
  		FAR = 10000;
	

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	var renderer = new THREE.WebGLRenderer();

	renderer.setSize(WIDTH, HEIGHT);	// important!!!!

	//container.appendChild(renderer.domElement);
	document.body.appendChild(renderer.domElement);


	// set up the sphere vars
	// var radius = 50,
	// 	segments = 16,
	// 	rings = 16;


	// // create the sphere's material
	// var sphereMaterial = new THREE.MeshLambertMaterial({
	// 	color: 0xcc0000
	// });

	// create a new mesh with
	// sphere geometry - we will cover
	// the sphereMaterial next!
	// var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);

	// add the sphere to the scene
	// scene.add(sphere);



	//create a point light
	var pointLight = new THREE.PointLight(0xff0000);

	// set its position
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

	// add to the scene
	scene.add(pointLight);


	var geometry = new THREE.CubeGeometry(1, 1, 1);
	var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	var cube = new THREE.Mesh(geometry, material);

	scene.add(cube);

	camera.position.z = 5;


	function render(){
		requestAnimationFrame(render);
		renderer.render(scene, camera);

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
	}

	render();

})();