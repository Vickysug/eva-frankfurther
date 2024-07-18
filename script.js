//////////////////////////////////////////////////////////////
// EASY-MODIFY SECTION
// UPDATE VALUES IN THIS SECTION TO EASILY MODIFY GAME

// Your chatbot's name
// NOTE: Every new name for a chatbot creates a new save slot for the chat history.)
const CHARACTER_NAME = "Eva Frankfurther";

// Describe your chatbot here. This defines exactly how it will behave.
const CHARACTER_DESCRIPTION = `
You are Eva Frankfurther, a German-born British artist known for her depictions of the immigrant communities.

Information about you:

You were born into a cultured and assimilated Jewish family in Berlin in 1930.
Following the rise of National Socialism in Germany, you escaped to London with her family in 1939.            
You are your two siblings left Berlin six months before your parents, and spent some time in Haslemere, being looked after by German refugee teachers. Your parents arrived in England during August 1939.
Between 1946 and 1951 she studied at St Martin's School of Art. Some of her fellow students included Leon Kossoff and Frank Auerbach.
After graduating, you moved to Whitechapel in London's East End, the home for several generations of successive waves of migrant communities.
For the next six years, you earned your living working the evening shift as a counter-hand at Lyons Corner House and, later, in a sugar refinery.
Leaving yourself free to paint during the day, you painted local immigrants.
Inspired by artists as diverse as Rembrandt, Käthe Kollwitz and Picasso, you took as your subject the ethnically diverse, largely immigrant population among whom you lived and worked.
Between 1948 and 1958, you also travelled extensively in Europe, writing lively and perceptive letters home about the art and people you encountered.
You returned to London in 1959 where, suffering from depression, you took your own life at 29 years old.

First Message of Roleplay:
*Eva looks at you. Hello Eva, you say. It's an honor to meet you.*

NOTE: 
(Ensure your responses are short so the player can respond. Do not give all the details of your story immediately, try to engage the player and let them ask detailed questions.)
`;

// This is the URL of the image for your chatbot'S background image.
const BACKGROUND_IMAGE_URL = `https://play.rosebud.ai/assets/create an art gallery room full of modern life drawing sketches.png?j1BY` 

// This is the URL of the image for your chatbot.
const CHARACTER_IMAGE_URL = `https://play.rosebud.ai/assets/eva.jpg?o1al` 

// Put URLs of all songs you want to be shuffled in this games's playlist.
const SONG_PLAYLIST_URLS = [
    `https://play.rosebud.ai/assets/Stream Loops 2024-03-20_01.mp3.mp3?PJgF`,
    `https://play.rosebud.ai/assets/Stream Loops 2024-03-06_02.mp3.mp3?3WuI`,
    `https://play.rosebud.ai/assets/Stream Loops 2024-03-06_01.mp3.mp3?PFeZ`
]; 

// END OF EASY-MODIFY VALUES
//////////////////////////////////////////////////////////////

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Preload audio files
        SONG_PLAYLIST_URLS.forEach((url, index) => {
            this.load.audio(`track_${index}`, url);
        });
    }

    create() {
            // Initialize the music manager and other dependencies
            this.game.musicManager = new MusicManager(this.game);
            const musicKeys = SONG_PLAYLIST_URLS.map((_, index) => `track_${index}`);
            this.game.musicManager.setPlaylist(musicKeys);
            this.game.musicManager.playNextTrack();
            this.game.musicManager.shufflePlaylist();
            console.log(this.game.musicManager.playlist);

            // Check for existing save and initialize the game state
            this.checkForExistingSave();

            // Transition to another scene
            this.game.sceneTransitionManager.transitionTo('VisualNovelScene');
        }

    checkForExistingSave() {
        const saveData = localStorage.getItem(PROJECT_NAME);
        if (saveData) {
            console.info('Save detected.');
            this.game.saveData = JSON.parse(saveData);
        } else {
            console.info('No save detected. Initializing new game state.');
            // If no save exists, initialize a new save with default values
            this.game.saveData = {
                chatLog: '',
                characterChatManagerState: null, // Assuming a default empty state is suitable
            }; 

            // Save the initial state to localStorage
            localStorage.setItem(PROJECT_NAME, JSON.stringify(this.game.saveData));
        }
    }
}

function loadScript(url) {
    return new Promise((resolve, reject) => {
        // Check if the script is already loaded
        if (document.querySelector(`script[src="${url}"]`)) {
            resolve();
            return;
        }

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Script loading failed for ' + url));

        document.head.appendChild(script);
    });
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
        this.load.image('background1', 'https://play.rosebud.ai/assets/eva.jpg?o1al');
        this.load.image('background2', 'https://play.rosebud.ai/assets/create a scene from a wealthy Jewish home in Germany 1930.png?8sI5');
        this.load.image('background3', 'https://play.rosebud.ai/assets/army tanks in germany 1940.png?91ia');
        this.load.image('background4', 'https://play.rosebud.ai/assets/refugee-children.png?YR0U');
       
        this.load.image('background5', 'https://play.rosebud.ai/assets/st-martins-school.crop.jpg?ze3L');
        this.load.image('background6', 'https://play.rosebud.ai/assets/whitchaple.jpg?putu');
        this.load.image('background7', 'https://play.rosebud.ai/assets/Lyons-Corner-House.crop.jpg?cFwo');
        this.load.image('background8', 'https://play.rosebud.ai/assets/painting1.jpg?HD8r');
        this.load.image('background9', 'https://play.rosebud.ai/assets/painting2.jpg?ORPN');
        this.load.image('background10', 'https://play.rosebud.ai/assets/map.png?Eeka');
        this.load.image('background11', 'https://play.rosebud.ai/assets/eva.jpeg?tG8T');
        this.load.image('button', 'https://play.rosebud.ai/assets/restart_icon.png?Wvgv');
        this.load.audio('backgroundMusic', 'https://play.rosebud.ai/assets/Into-the-Abyss.mp3?C4MI');
        this.load.image('startBackground', 'https://play.rosebud.ai/assets/eva.crop.jpg?OEUA');
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
        this.scene.start('ChatScene');
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

const VERSION_NUMBER = 'v1'; // Set the version number here.
const PROJECT_NAME = `${CHARACTER_NAME} AI Character ${VERSION_NUMBER}`;
async function initializeGame() {
    try {
        // Load the external script before initializing the Phaser game
        await loadScript(`https://play.rosebud.ai/assets/rosebud_AI_character_template_desktop_library.js.js?RMf6`);
        console.log('Script loaded successfully');

        const config = {
            type: Phaser.AUTO,
            parent: 'renderDiv',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            width: 800,
            height: 600,
            scene: [BootScene, VisualNovelScene, ChatScene],  // Assuming ChatScene also might depend on the loaded script
            dom: {
                createContainer: true,
            },
        };

        // Assuming 'game' is declared in a broader scope if you need to reference it elsewhere
        window.game = new Phaser.Game(config);
        window.game.sceneTransitionManager = new SceneTransitionManager(game);
    } catch (error) {
        console.error('Failed to load external script or initialize the Phaser game:', error);
    }
}

initializeGame();