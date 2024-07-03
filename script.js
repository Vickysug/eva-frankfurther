class ChatWithEvaScene extends Phaser.Scene {
    constructor() {
        super("ChatWithEvaScene");

        this.dialogues = [
            { speaker: "You", text: "Hello Eva, it's an honor to meet you." },
            { speaker: "Eva", text: "Hello! It's nice to meet you too. What would you like to know about my work?" },
            { speaker: "You", text: "I'm curious about your inspiration for painting immigrants." },
            { speaker: "Eva", text: "Living in Whitechapel, I was surrounded by diverse immigrant communities. Their stories and struggles deeply moved me." },
            { speaker: "You", text: "That's fascinating. How did your own experiences as an immigrant influence your art?" },
            { speaker: "Eva", text: "As a Jewish refugee from Nazi Germany, I understood the challenges of adapting to a new country. This personal experience gave me a unique perspective in portraying the immigrant experience." },
            { speaker: "You", text: "Your paintings seem to capture a sense of both struggle and dignity. Was this intentional?" },
            { speaker: "Eva", text: "Absolutely. I wanted to show the humanity in each individual, their resilience in the face of hardship, and the beauty in their everyday lives." },
            { speaker: "You", text: "Thank you for sharing your insights, Eva. Your work is truly inspiring." },
            { speaker: "Eva", text: "Thank you for your interest in my art. I hope it continues to resonate with people and shed light on the immigrant experience." }
        ];

        this.dialogIndex = 0;
    }

    preload() {
        this.load.image('background', 'https://play.rosebud.ai/assets/create an art gallery room full of modern life drawing sketches.png?AGw9');
        this.load.image('eva', 'https://play.rosebud.ai/assets/eva.jpg?2h6X');
    }

    create() {
        this.background = this.add.image(400, 300, 'background').setScale(1.6);
        this.background.alpha = 0;

        this.eva = this.add.image(650, 300, 'eva').setScale(0.4);
        this.eva.setVisible(false); 
        this.eva.alpha = 0;

        this.textBox = this.add.rectangle(400, 550, 800, 200, 0x000000, 0.7);
        this.textBox.setDepth(1001);

        this.speakerText = this.add.text(50, 430, '', { 
            fontSize: '24px',
            fontFamily: 'Arial', 
            fill: '#ffffff'
        });
        this.speakerText.setDepth(1002);

        this.dialogueText = this.add.text(50, 470, '', { 
            fontSize: '20px',
            fontFamily: 'Arial', 
            fill: '#ffffff' 
        }).setWordWrapWidth(700);
        this.dialogueText.setDepth(1002);

        this.updateDialogue();
        
        this.tweens.add({
            targets: this.background,
            alpha: { from: 0, to: 1 },
            duration: 1000,
        });

        this.tweens.add({
            targets: this.eva,
            alpha: { from: 0, to: 1 },
            duration: 1000,
        });
        this.eva.setVisible(true);

        this.input.on('pointerdown', this.updateDialogue, this);
    }
    
    updateDialogue() {
        if (this.dialogIndex >= this.dialogues.length) {
            this.endScene();
            return;
        }

        let currentDialogue = this.dialogues[this.dialogIndex];
        this.speakerText.setText(currentDialogue.speaker + ":");
        this.dialogueText.setText(currentDialogue.text);

        if (currentDialogue.speaker === "Eva") {
            this.eva.setVisible(true);
            this.tweens.add({
                targets: this.eva,
                alpha: { from: 0, to: 1 },
                duration: 500,
            });
        } else {
            this.tweens.add({
                targets: this.eva,
                alpha: { from: 1, to: 0 },
                duration: 500,
            });
        }

        this.dialogIndex++;
    }

    endScene() {
        this.speakerText.setVisible(false);
        this.dialogueText.setVisible(false);
        this.textBox.setVisible(false);
        this.eva.setVisible(false);

        let blackScreen = this.add.rectangle(400, 300, 800, 600, 0x000000);
        blackScreen.setDepth(1000);

        let endText = this.add.text(400, 300, 'End of conversation\nThank you for chatting with Eva Frankfurther', { 
            fontSize: '30px',
            fontFamily: 'Arial', 
            fill: '#ffffff',
            align: 'center'
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
            { text: "The children, Eva and her two siblings, left Berlin six months before their parents and spent some time in Haslemere, being looked after by German refugee teachers, before their parents arrived in England during August 1939.", image: 'background4' },
            { text: "Between 1946 and 1951 she studied at St Martin's School of Art. Some of her fellow students included Leon Kossoff and Frank Auerbach.", image: 'background5' },
            { text: "After graduating, she moved to Whitechapel in London's East End, the home for several generations of successive waves of migrant communities..", image: 'background6' },
            { text: "For the next six years, she earned her living working the evening shift as a counter-hand at Lyons Corner House and, later, in a sugar refinery.", image: 'background7' },
            { text: "Leaving herself free to paint during the day, she painted local immigrants.", image: 'background8' },
            { text: "Inspired by artists as diverse as Rembrandt, Käthe Kollwitz and Picasso, she took as her subject the ethnically diverse, largely immigrant population among whom she lived and worked.", image: 'background9' },
            { text: "Between 1948 and 1958 Frankfurther also travelled extensively in Europe, writing lively and perceptive letters home about the art and people she encountered.", image: 'background10' },
            { text: "She returned to London in 1959 where, suffering from depression, she took her own life. Eva Died in 1959 (age 29 years) in Paddington, London.", image: 'background11' }

        ];
        this.dialogIndex = 0;
        this.buttonCreated = false;
        this.started = false;
    }

    preload() {
        this.load.image('background1', 'https://play.rosebud.ai/assets/eva.jpg?2h6X');
        this.load.image('background2', 'https://play.rosebud.ai/assets/create a scene from a wealthy Jewish home in Germany 1930.png?yuJa');
        this.load.image('background3', 'https://play.rosebud.ai/assets/army tanks in germany 1940.png?ZUj5');
        this.load.image('background4', 'https://play.rosebud.ai/assets/refugee-children.png?JY47');
       
        this.load.image('background5', 'https://play.rosebud.ai/assets/st-martins-school.crop.jpg?KE0K');
        this.load.image('background6', 'https://play.rosebud.ai/assets/whitchaple.jpg?PBOs');
        this.load.image('background7', 'https://play.rosebud.ai/assets/Lyons-Corner-House.crop.jpg?zFlg');
        this.load.image('background8', 'https://play.rosebud.ai/assets/painting1.jpg?7v56');
        this.load.image('background9', 'https://play.rosebud.ai/assets/painting2.jpg?8gqP');
        this.load.image('background10', 'https://play.rosebud.ai/assets/map.png?S3Bf');
        this.load.image('background11', 'https://play.rosebud.ai/assets/eva.jpeg?1W5a');
        this.load.image('button', 'https://play.rosebud.ai/assets/restart_icon.png?oIlO');
        this.load.audio('backgroundMusic', 'https://play.rosebud.ai/assets/Into-the-Abyss.mp3?CSyl');
        this.load.image('startBackground', 'https://play.rosebud.ai/assets/eva.crop.jpg?k1BE');
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
        this.chatButtonBackground = this.add.rectangle(400, 300, 400, 60, 0x111111, 0.6);
        this.chatButton = this.add.text(this.chatButtonBackground.x, this.chatButtonBackground.y,
         'Chat with Eva', {
            fontSize: '35px',
            fontFamily: 'Arial',
            fill: '#fff'
            }).setOrigin(0.5);
        this.chatButton.setInteractive();
        this.chatButton.on('pointerdown', () => {
            this.hideButtons();
            this.goToChat();
        });
        this.chatButton.on('pointerover', () => {
            this.chatButtonBackground.setFillStyle(0x111111, 1.0);
        });
        this.chatButton.on('pointerout', () => {
            this.chatButtonBackground.setFillStyle(0x111111, 0.6);
        });
    }

    goToChat() {
        this.scene.start('ChatWithEvaScene');
    }
    
    hideButtons() {
        if (this.buttonCreated) {
            this.chatButton.setVisible(false);
            this.chatButtonBackground.setVisible(false);
        }
    }

    showButtons() {
        if (this.buttonCreated) {
            this.chatButton.setVisible(true);
            this.chatButtonBackground.setVisible(true);
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
    scene: [VisualNovelScene, ChatWithEvaScene],
    dom: {
        createContainer: true
    },
    title: "Eva Frankfurther"
};

window.phaserGame = new Phaser.Game(config);