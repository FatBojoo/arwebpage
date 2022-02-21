const createScene = async function(engine) {
    const scale = 0.015;
    const scene = new BABYLON.Scene(engine);

    const alpha =  3*Math.PI/2;
    const beta = Math.PI/50;
    const radius = 220*scale;
    const target = new BABYLON.Vector3(0, 0, 0);

    const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.6;

    const box = BABYLON.MeshBuilder.CreateBox("box", {});
            box.position.x = 0.5;
            box.position.y = 1;

            const boxMaterial = new BABYLON.StandardMaterial("material", scene);
            boxMaterial.diffuseColor = BABYLON.Color3.Random();
            box.material = boxMaterial;

            box.actionManager = new BABYLON.ActionManager(scene);
            box.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, 
                function (evt) {

                    boxMaterial.diffuseColor = BABYLON.Color3.Random();
                }));
    
    const xrHelper = await scene.createDefaultXRExperienceAsync();

    const featuresManager = xrHelper.baseExperience.featuresManager;

    const xrBackgroundRemover = featuresManager.enableFeature(BABYLON.WebXRBackgroundRemover.Name);

    featuresManager.enableFeature(BABYLON.WebXRFeatureName.POINTER_SELECTION, "stable", {
        xrInput: xrHelper.input,
        enablePointerSelectionOnAllControllers: true        
    });

    return scene;
}