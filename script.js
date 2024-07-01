class KitchenScene extends Phaser.Scene {
    constructor() {
        super("KitchenScene");

        this.dialogs = [
            "Rian enters the galley of the stranded ship...",
            "The galley is bustling with activity as the crew prepares for another day.",
            "Rian shares his plan with the right guards.",
            "Fighting breaks loose and the loyal guards are subdued.",
            "Kalis: Rian! We've done it! We've freed the avanc!",
            "Rian: Aye, it was a grand success. Thank you, Kalis.",
            "Rian joins his fellow rebel shipmates as the ship turns around.",
            "Kalis: Now to enjoy a hearty meal as we rebuild peace!",
            "...",
            "..."
        ];

        this.dialogIndex = 0;
    }

    preload() {
        this.load.image('kitchen', `https://play.rosebud.ai/assets/grungy_mess_hall_with_porthole.jpeg?C8RS`);
        this.load.image('cook', `https://play.rosebud.ai/assets/painting1.jpg?7v56`);
    }

    create() {
        this.background = this.add.image(400, 300, 'kitchen').setScale(1.6);
        this.background.alpha = 0;

        this.cook = this.add.image(400, 320, 'cook').setScale(0.6);
        this.cook.setVisible(false); 
        this.cook.alpha = 0;

        this.textBox = this.add.rectangle(400, 550, 800, 200, 0x000000, 0.7);
        this.textBox.setDepth(1001);

        this.text = this.add.text(50, 460, '', { 
            fontSize: '20px',
            fontFamily: 'Arial', 
            fill: '#fff' }).setWordWrapWidth(700);
        this.text.setDepth(1002);

        this.updateDialog();
        
        this.tweens.add({
            targets: this.background,
            alpha: { from: 0, to: 1 },
            duration: 1000,
        });
    }
    
    updateDialog() {
        this.text.setText(this.dialogs[this.dialogIndex]);

        if (this.dialogs[this.dialogIndex] === "Kalis: Rian! We've done it! We've freed the avanc!") {
            this.tweens.add({
                targets: this.cook,
                alpha: { from: 0, to: 1 },
                duration: 500,
            });
            this.cook.setVisible(true);
        }

        this.dialogIndex++;

        if (this.dialogIndex >= this.dialogs.length) {
            this.endScene();
        } else {
            this.input.once('pointerdown', this.updateDialog, this);
        }
    }

    endScene() {
        this.text.setVisible(false);
        this.textBox.setVisible(false);
        this.cook.setVisible(false);

        let blackScreen = this.add.rectangle(400, 300, 800, 600, 0x000000);
        blackScreen.setDepth(1000);

        let endText = this.add.text(400, 300, 'The end\n', { 
            fontSize: '30px',
            fontFamily: 'Arial', 
            fill: '#fff' 
        });
        endText.setOrigin(0.5);
        endText.setDepth(1001);
    }
}

class VisualNovelScene extends Phaser.Scene {
    constructor() {
        super('VisualNovelScene');
        this.dialogData = [
            { text: "Eva Frankfurther was a German-born British artist known for her depictions of the immigrant communities.", image: 'background1' },
            { text: "Eva was born into a cultured and assimilated Jewish family in Berlin in 1930.", image: 'background2' },
            { text: "Following the rise of National Socialism in Germany, she escaped to London with her family in 1939.", image: 'background3' },
            { text: "Between 1946 and 1951 she studied at St Martin's School of Art.", image: 'background4' },
            { text: "Some of her fellow students included Leon Kossoff and Frank Auerbach.", image: 'background5' },
            { text: "After graduating, she moved to Whitechapel in London's East End, the home for several generations of successive waves of migrant communities..", image: 'background6' },
            { text: "For the next six years, she earned her living working the evening shift as a counter-hand at Lyons Corner House and, later, in a sugar refinery.", image: 'background7' },
            { text: "Leaving herself free to paint during the day, she painted local immigrants.", image: 'background8' },
            { text: "Inspired by artists as diverse as Rembrandt, Käthe Kollwitz and Picasso, she took as her subject the ethnically diverse, largely immigrant population among whom she lived and worked.", image: 'background9' },
            { text: "Between 1948 and 1958 Frankfurther also travelled extensively in Europe, writing lively and perceptive letters home about the art and people she encountered.", image: 'background10' }
        
        
        ];
        this.dialogIndex = 0;
        this.buttonCreated = false;
        this.teethBrushed = false;
        this.started = false;
        this.bathroomTasksCompleted = false;
    }

    preload() {
        this.load.image('background1', 'https://play.rosebud.ai/assets/eva.jpg?2h6X');
        this.load.image('background2', 'https://play.rosebud.ai/assets/jewish-home-berlin.jpg?zxhA');
        this.load.image('background3', 'https://play.rosebud.ai/assets/army tanks in germany 1940.png?ZUj5');
        this.load.image('background4', 'https://play.rosebud.ai/assets/migration.jpg?NZuv');
        this.load.image('background5', 'https://play.rosebud.ai/assets/London 1946.png?7wX2');
        this.load.image('background6', 'https://play.rosebud.ai/assets/whitchaple.jpg?PBOs');
        this.load.image('background7', 'https://play.rosebud.ai/assets/Lyons-Corner-House.jpg?G8Eo');
        this.load.image('background8', 'https://play.rosebud.ai/assets/painting1.jpg?7v56');
        this.load.image('background9', 'https://play.rosebud.ai/assets/painting2.jpg?8gqP');
        this.load.image('background10', 'https://play.rosebud.ai/assets/Paris train station Black and white 1950.png?DvOZ');


        
        this.load.image('button', 'https://play.rosebud.ai/assets/restart_icon.png?oIlO');
        this.load.audio('backgroundMusic', 'https://play.rosebud.ai/assets/Into-the-Abyss.mp3?CSyl');
        this.load.image('startBackground', 'https://play.rosebud.ai/assets/eva.jpg?2h6X');
    }

    create() {
        this.startBackground = this.add.image(400, 300, 'startBackground').setScale(1.6);
        this.startBackground.alpha = 0;

        this.background = this.add.image(400, 300, this.dialogData[0].image).setScale(1.6);
        this.background.alpha = 0;

        this.textBox = this.add.rectangle(400, 550, 800, 200, 0x000000, 0.7);
        this.textBox.setDepth(1001);

        this.text = this.add.text(50, 460, '', { 
            fontSize: '20px',
            fontFamily: 'Arial', 
            fill: '#fff' 
        }).setWordWrapWidth(700);
        this.text.setDepth(1002);

        this.updateDialog();

        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
        this.backgroundMusic.play();

        this.tweens.add({
            targets: this.startBackground,
            alpha: { from: 0, to: 1 },
            duration: 2000,
        });
    }

    updateDialog() {
        if (!this.started) {
            this.text.setText(this.dialogData[this.dialogIndex].text);
            this.dialogIndex++;
            this.input.once('pointerdown', () => {
                this.started = true;
                this.tweens.add({
                    targets: this.startBackground,
                    alpha: { from: 1, to: 0 },
                    duration: 1000,
                    onComplete: () => {
                        this.startBackground.setVisible(false);
                        this.updateDialog();
                        this.tweens.add({
                            targets: this.background,
                            alpha: { from: 0, to: 1 },
                            duration: 2000,
                        });
                    }
                });
            }, this);
        } else {
            if (this.dialogIndex >= this.dialogData.length) {
                if (!this.buttonCreated) {
                    this.createButtons();
                } else {
                    this.showButtons();
                }
            } else {
                let currentDialog = this.dialogData[this.dialogIndex];
                this.text.setText(currentDialog.text);
                this.background.setTexture(currentDialog.image);
                this.dialogIndex++;
                this.input.once('pointerdown', this.updateDialog, this);
            }
        }
    }

    createButtons() {
        this.buttonCreated = true;
        this.bathroomButtonBackground = this.add.rectangle(400, 300, 400, 60, 0x111111, 0.6);
        this.bathroomButton = this.add.text(this.bathroomButtonBackground.x, this.bathroomButtonBackground.y,
         'Learn more about Eva', {
            fontSize: '35px',
            fontFamily: 'Arial',
            fill: '#fff'
            }).setOrigin(0.5);
        this.bathroomButton.setInteractive();
        this.bathroomButton.on('pointerdown', () => {
            this.hideButtons();
            this.goToBathroom();
        });
        this.bathroomButton.on('pointerover', () => {
            this.bathroomButtonBackground.setFillStyle(0x111111, 1.0);
        });
        this.bathroomButton.on('pointerout', () => {
            this.bathroomButtonBackground.setFillStyle(0x111111, 0.6);
        });
        this.kitchenButtonBackground = this.add.rectangle(400, 225, 400, 60, 0x111111, 0.6);
        this.kitchenButton = this.add.text(this.kitchenButtonBackground.x, this.kitchenButtonBackground.y,
         'View her Art', {
            fontSize: '35px',
            fontFamily: 'Arial',
            fill: '#fff'
            }).setOrigin(0.5);
        this.kitchenButton.setInteractive();
        this.kitchenButton.on('pointerdown', () => {
            this.hideButtons();
            this.goToKitchen();
        });
        this.kitchenButton.on('pointerover', () => {
            this.kitchenButtonBackground.setFillStyle(0x111111, 1.0);
        });
        this.kitchenButton.on('pointerout', () => {
            this.kitchenButtonBackground.setFillStyle(0x111111, 0.6);
        });
    }

    goToKitchen() {
        if (this.teethBrushed) {
            this.scene.start('KitchenScene');
        } else {
            this.dialogData = [
                { text: "...", image: 'background4' },
                { text: "Rian decided to start fighting today...", image: 'background4' },
                { text: "But it failed because he didn't have enough information...", image: 'background4' },
                { text: "...", image: 'background4' }
            ];
            this.dialogIndex = 0;
            this.updateDialog();
        }
    }

    goToBathroom() {
        if (this.bathroomTasksCompleted) {
            this.dialogData = [
                { text: "Rian has already gathered all the information he can. Now it's time for chaos.", image: 'background4' }
            ];
            this.dialogIndex = 0;
            this.updateDialog();
        } else {
            this.hideButtons();
            this.background.setTexture('background2').setScale(1.6);
            this.background.alpha = 0;
            this.dialogData = [
                { text: "...", image: 'background2' },
                { text: "Rian decided to go listen in on the Lovers' plans.", image: 'background2' },
                { text: "He turns on the listening tap on the venting pipe.", image: 'background2' },
                { text: "The guards grumble about the impossible tasks.", image: 'background2' },
                { text: "After listening, Rian flashes a salty grin at the mirror in front of him.", image: 'background2' },
                { text: "Now he knows who will join him in rebelling, with the right words!", image: 'background2' }
            ];
            this.dialogIndex = 0;
            this.teethBrushed = true;
            this.updateDialog();
            this.bathroomTasksCompleted = true;
            this.tweens.add({
              targets: this.background,
              alpha: { from: 0, to: 1 },
              duration: 2000,
            });
        }
    }
    
    hideButtons() {
        if (this.buttonCreated) {
            this.bathroomButton.setVisible(false);
            this.kitchenButton.setVisible(false);
            this.bathroomButtonBackground.setVisible(false);
            this.kitchenButtonBackground.setVisible(false);
        }
    }

    showButtons() {
        if (this.buttonCreated) {
            this.bathroomButton.setVisible(true);
            this.kitchenButton.setVisible(true);
            this.bathroomButtonBackground.setVisible(true);
            this.kitchenButtonBackground.setVisible(true);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'renderDiv',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    scene: [VisualNovelScene, KitchenScene],
    dom: {
        createContainer: true
    },
    title: "Eva Frankfurther"
};

window.phaserGame = new Phaser.Game(config);