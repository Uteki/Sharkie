let level1;

function initLevel() {
    level1 = new Level(
        [
            new Foe(),
            new Foe(),
            new Foe(),
            new Endboss(),

            //...

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
        ],

        [
            new Coin(500, 200),
            new Coin(570, 200),
            new Coin(640, 200),
            new Coin(710, 200),

            new Coin(1400, 400),
            new Coin(1470, 400),
            new Coin(1540, 400),
            new Coin(1610, 400),

            new Bubble(),
            new Bubble(),
            new Bubble()
        ]
    );
}
