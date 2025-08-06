let level1;

function initLevel() {
    level1 = new Level(
        [
            new Foe(250),
            new Foe(250),
            new Foe(250),

            new Foe2("lila", 850),
            new Foe2("green", 850),

            new Foe(1450),
            new Foe(1450),
            new Foe(1450),

            new Foe2("pink", 2050),
            new Foe2("yellow", 2050),

            new Endboss()
        ],

        [
            new BackgroundObject(getAssetPath('content/3. Background/Layers/5. Water/D2.png'), -720), new BackgroundObject(getAssetPath('content/3. Background/Layers/4.Fondo 2/D2.png'), -720),
            new BackgroundObject(getAssetPath('content/3. Background/Layers/3.Fondo 1/D2.png'), -720), new BackgroundObject(getAssetPath('content/3. Background/Layers/1. Light/2.png'), -720),
            new BackgroundObject(getAssetPath('content/3. Background/Layers/2. Floor/D2.png'), -720),

            new BackgroundObject(getAssetPath('content/3. Background/Layers/5. Water/D1.png'), 0), new BackgroundObject(getAssetPath('content/3. Background/Layers/4.Fondo 2/D1.png'), 0),
            new BackgroundObject(getAssetPath('content/3. Background/Layers/3.Fondo 1/D1.png'), 0), new BackgroundObject(getAssetPath('content/3. Background/Layers/1. Light/1.png'), 0),
            new BackgroundObject(getAssetPath('content/3. Background/Layers/2. Floor/D1.png'), 0),

            new BackgroundObject(getAssetPath('content/3. Background/Layers/5. Water/D2.png'), 720), new BackgroundObject(getAssetPath('content/3. Background/Layers/4.Fondo 2/D2.png'), 720),
            new BackgroundObject(getAssetPath('content/3. Background/Layers/3.Fondo 1/D2.png'), 720), new BackgroundObject(getAssetPath('content/3. Background/Layers/1. Light/2.png'), 720),
            new BackgroundObject(getAssetPath('content/3. Background/Layers/2. Floor/D2.png'), 720)
        ],

        [
            new Coin(500, 220),
            new Coin(570, 220),
            new Coin(640, 220),
            new Coin(710, 220),

            new Coin(1400, 40),
            new Coin(1470, 40),
            new Coin(1540, 40),
            new Coin(1610, 40),

            new Coin(2000, 400),
            new Coin(2070, 400),
            new Coin(2140, 400),
            new Coin(2210, 400),

            new Bubble(),
            new Bubble(),
            new Bubble()
        ]
    );
}
