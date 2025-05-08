const level1 = new Level(
    [
        new Foe(),
        new Foe(),
        new Foe(),
        new Endboss(),

        //...
        new Bubble(),
        new Bubble(),
        new Bubble()
    ],
    [
        new BackgroundObject("../assets/content/3. Background/Layers/5. Water/D2.png", -720), new BackgroundObject("../assets/content/3. Background/Layers/4.Fondo 2/D2.png", -720),
        new BackgroundObject("../assets/content/3. Background/Layers/3.Fondo 1/D2.png", -720), new BackgroundObject("../assets/content/3. Background/Layers/1. Light/2.png", -720),
        new BackgroundObject("../assets/content/3. Background/Layers/2. Floor/D2.png", -720),

        new BackgroundObject("../assets/content/3. Background/Layers/5. Water/D1.png", 0), new BackgroundObject("../assets/content/3. Background/Layers/4.Fondo 2/D1.png", 0),
        new BackgroundObject("../assets/content/3. Background/Layers/3.Fondo 1/D1.png", 0), new BackgroundObject("../assets/content/3. Background/Layers/1. Light/1.png", 0),
        new BackgroundObject("../assets/content/3. Background/Layers/2. Floor/D1.png", 0),

        new BackgroundObject("../assets/content/3. Background/Layers/5. Water/D2.png", 720), new BackgroundObject("../assets/content/3. Background/Layers/4.Fondo 2/D2.png", 720),
        new BackgroundObject("../assets/content/3. Background/Layers/3.Fondo 1/D2.png", 720), new BackgroundObject("../assets/content/3. Background/Layers/1. Light/2.png", 720),
        new BackgroundObject("../assets/content/3. Background/Layers/2. Floor/D2.png", 720)
    ]
);