!function(e){function t(t){for(var s,a,c=t[0],o=t[1],h=t[2],p=0,u=[];p<c.length;p++)a=c[p],Object.prototype.hasOwnProperty.call(n,a)&&n[a]&&u.push(n[a][0]),n[a]=0;for(s in o)Object.prototype.hasOwnProperty.call(o,s)&&(e[s]=o[s]);for(l&&l(t);u.length;)u.shift()();return r.push.apply(r,h||[]),i()}function i(){for(var e,t=0;t<r.length;t++){for(var i=r[t],s=!0,c=1;c<i.length;c++){var o=i[c];0!==n[o]&&(s=!1)}s&&(r.splice(t--,1),e=a(a.s=i[0]))}return e}var s={},n={0:0},r=[];function a(t){if(s[t])return s[t].exports;var i=s[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=e,a.c=s,a.d=function(e,t,i){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)a.d(i,s,function(t){return e[t]}.bind(null,s));return i},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var c=window.webpackJsonp=window.webpackJsonp||[],o=c.push.bind(c);c.push=t,c=c.slice();for(var h=0;h<c.length;h++)t(c[h]);var l=o;r.push([1,1]),i()}([,function(e,t,i){"use strict";i.r(t);var s=i(0),n=i.n(s);class r extends n.a.Scene{constructor(e,t){super(e),this.config=t,this.fontSize=32,this.lineHeight=42,this.fontStyle={fontSize:this.fontSize+"px",fill:"#fff"},this.screenCenter=[t.width/2,t.height/2],localStorage.setItem("difficulty","Easy")}create(){this.createBG(),this.config.canGoBack&&this.createBackButton()}createBG(){this.add.image(0,0,"sky").setOrigin(0,0)}createBackButton(){this.physics.add.sprite(this.config.width-10,this.config.height-10,"back").setOrigin(1).setInteractive().setScale(2).on("pointerup",(()=>{this.scene.start("MenuScene")}))}createMenu(e,t){const i=[...this.screenCenter];e.forEach((e=>{e.textObject=this.add.text(i[0],i[1],e.text,this.fontStyle).setOrigin(.5,1),i[1]+=this.lineHeight,t(e)}))}}var a=r;var c={Easy:{pipeVerticalDistanceRange:[200,250],pipeHorizontalDistanceRange:[500,550],birdGravity:1100,flapVelocity:400},Medium:{pipeVerticalDistanceRange:[130,180],pipeHorizontalDistanceRange:[450,550],birdGravity:1100,flapVelocity:350},Hard:{pipeVerticalDistanceRange:[95,115],pipeHorizontalDistanceRange:[350,450],birdGravity:1100,flapVelocity:320},Jupiter:{pipeVerticalDistanceRange:[200,250],pipeHorizontalDistanceRange:[500,550],birdGravity:1e7,flapVelocity:400}};var o=class extends a{constructor(e){super("PlayScene",e),this.difficulties={...c},this.bird=null,this.pipes=null,this.isPaused=!1,this.pipeVerticalDistanceRange=[200,250],this.pipeHorizontalDistanceRange=[500,550],this.flapVelocity=400,this.birdGravity=1100,this.score=0,this.scoreText=""}create(){super.create(),this.setLevel(),this.createBird(),this.createPipes(),this.createColliders(),this.createScore(),this.createPauseButton(),this.handleInput(),this.listenToEvents(),this.tapToStart(),this.createAnimation()}update(e,t){this.checkGameStatus(),this.recyclePipes(),this.detectPipePassing()}listenToEvents(){this.pauseEvent||(this.pauseEvent=this.events.on("resume",(()=>{this.isPaused=!1,this.initialTime=3,this.countDownText=this.add.text(...this.screenCenter,"Continue in: "+this.initialTime,this.fontStyle).setOrigin(.5),this.interval=this.time.addEvent({delay:1e3,callback:this.countDown,callbackScope:this,loop:!0})})))}countDown(){this.countDownText.setText("Continue in: "+--this.initialTime),this.initialTime||(this.countDownText.setText(""),this.physics.resume(),this.interval.remove())}createBird(){this.bird=this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,"bird").setFlipX(!0).setScale(3).setOrigin(0),this.bird.setBodySize(this.bird.width,this.bird.height-8),this.bird.body.gravity.y=this.birdGravity,this.bird.setCollideWorldBounds(!0)}createPipes(){this.pipes=this.physics.add.group();for(let e=0;e<4;e++){const e=this.pipes.create(0,0,"pipe").setImmovable(!0).setOrigin(0,1),t=this.pipes.create(0,0,"pipe").setImmovable(!0).setOrigin(0);this.drawPipes(e,t)}this.pipes.setVelocityX(-200)}createColliders(){this.physics.add.collider(this.bird,this.pipes,this.gameOver,null,this)}createScore(){this.score=0,this.scoreText=this.add.text(16,16,"Score: "+this.score,{fontSize:"32px",fill:"#000"});const e=localStorage.getItem("bestScore")||0;this.add.text(16,52,"Best score: "+e,{fontSize:"18px",fill:"#000"})}createPauseButton(){this.isPaused=!1;const e=()=>{this.isPaused=!0,this.physics.pause(),this.scene.pause(),this.scene.launch("PauseScene")};this.add.sprite(this.config.width-10,this.config.height-10,"pause").setInteractive().setScale(3).setOrigin(1).on("pointerdown",e,this),this.input.keyboard.on("keydown_ESC",e,this)}createAnimation(){this.anims.create({key:"fly",frames:this.anims.generateFrameNumbers("bird",{start:8,end:15}),frameRate:8,repeat:-1}),this.bird.play("fly")}handleInput(){this.input.on("pointerdown",this.flap,this),this.input.keyboard.on("keydown_SPACE",this.flap,this)}checkGameStatus(){(this.bird.y<=0||this.bird.getBounds().bottom>=this.config.height)&&this.gameOver()}drawPipes(e,t){const i=this.getRightMostPipe(),s=Phaser.Math.Between(...this.pipeVerticalDistanceRange),n=Phaser.Math.Between(20,this.config.height-20-s),r=Phaser.Math.Between(...this.pipeHorizontalDistanceRange);e.x=r+i,e.y=n,t.x=e.x,t.y=e.y+s,e.name=t.name=""}flap(){this.isPaused||(this.bird.body.velocity.y=-this.flapVelocity)}gameOver(){this.physics.pause(),this.bird.setTint(16711680),this.saveBestScore(),this.time.addEvent({delay:1e3,callback:()=>{this.scene.restart()},loop:!1})}saveBestScore(){const e=localStorage.getItem("bestScore"),t=e&&parseInt(e);(!t||this.score>t)&&localStorage.setItem("bestScore",this.score.toString())}recyclePipes(){const e=[];this.pipes.getChildren().forEach((t=>{t.getBounds().right<=0&&(e.push(t),2===e.length&&this.drawPipes(...e))}))}detectPipePassing(){const e=[];this.pipes.getChildren().forEach((t=>{t.getBounds().right<=this.bird.getBounds().left&&!t.name&&(e.push(t),t.setName("used"),2===e.length&&(this.increaseScore(),this.saveBestScore()))}))}getRightMostPipe(){return Math.max(...this.pipes.getChildren().map((e=>e.x)))}increaseScore(){this.score++,this.scoreText.setText("Score: "+this.score)}setLevel(){const e=localStorage.getItem("difficulty"),t=this.difficulties[e];this.pipeVerticalDistanceRange=t.pipeVerticalDistanceRange,this.pipeHorizontalDistanceRange=t.pipeHorizontalDistanceRange,this.flapVelocity=t.flapVelocity,this.birdGravity=t.birdGravity}tapToStart(){this.physics.pause();const e=()=>{this.startingText.setText(""),this.physics.resume()};this.startingText=this.add.text(...this.screenCenter,"Click mouse to start",this.fontStyle).setOrigin(.5),this.input.once("pointerdown",e,this),this.input.keyboard.once("keydown_SPACE",e,this)}};var h=class extends a{constructor(e){super("MenuScene",e),this.menu=[{scene:"PlayScene",text:"Play"},{scene:"ScoreScene",text:"Score"},{scene:"DifficultyScene",text:"Difficulty"}]}create(){super.create(),this.createMenu(this.menu,(e=>this.setupMenuEvents(e)))}setupMenuEvents(e){const t=e.textObject;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#fff"})})),t.on("pointerup",(()=>{e.scene&&this.scene.start(e.scene),"Exit"===e.text&&this.game.destroy(!0)}))}};class l extends n.a.Scene{constructor(){super("PreloadScene")}preload(){this.load.image("sky","assets/sky.png"),this.load.spritesheet("bird","assets/birdSprite.png",{frameWidth:16,frameHeight:16}),this.load.image("pipe","assets/pipe.png"),this.load.image("pause","assets/pause.png"),this.load.image("back","assets/back.png"),this.load.image("arrow","assets/arrow.png")}create(){this.scene.start("MenuScene"),this.disableCtxMenu()}disableCtxMenu(){document.querySelector("canvas").addEventListener("contextmenu",(e=>e.preventDefault()))}}var p=l;var u=class extends a{constructor(e){super("ScoreScene",{...e,canGoBack:!0})}create(){super.create(),this.displayScore()}displayScore(){const e=localStorage.getItem("bestScore"),t=e?"Your best score: "+e:"No best score :(";this.add.text(...this.screenCenter,t,this.fontStyle).setOrigin(.5)}};var d=class extends a{constructor(e){super("PauseScene",e),this.menu=[{scene:"PlayScene",text:"Continue"},{scene:"MenuScene",text:"Exit"}]}create(){super.create(),this.createMenu(this.menu,(e=>this.setupMenuEvents(e)))}setupMenuEvents(e){const t=e.textObject;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#fff"})})),t.on("pointerup",(()=>{e.scene&&"Continue"===e.text&&(this.scene.stop(),this.scene.resume(e.scene)),"Exit"===e.text&&(this.scene.stop("PlayScene"),this.scene.start(e.scene))}))}};const f={width:800,height:600,startPosition:{x:80,y:300}},g=[p,h,o,u,class extends a{constructor(e){super("DifficultyScene",{...e,canGoBack:!0}),this.menu=[{text:"Easy"},{text:"Medium"},{text:"Hard"},{text:"Jupiter"}]}create(){super.create(),this.level=localStorage.getItem("difficulty"),this.arrow=null,this.createMenu(this.menu,(e=>this.setupMenuEvents(e)))}setupMenuEvents(e){const t=e.textObject;this.arrowToCurrentDifficulty(e),t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#fff"})})),t.on("pointerup",(()=>{localStorage.setItem("difficulty",e.text),this.scene.start("MenuScene")}))}arrowToCurrentDifficulty(e){if(e.text===this.level){const t=e.textObject.getBounds().left-15,i=e.textObject.y;this.add.sprite(t,i,"arrow").setScale(.05).setOrigin(.5,1)}}},d].map((e=>new e(f))),y={type:n.a.AUTO,...f,scale:{mode:n.a.Scale.FIT,parent:"phaser-example",autoCenter:n.a.Scale.CENTER_BOTH},pixelArt:!0,physics:{default:"arcade",arcade:{}},scene:g};new n.a.Game(y)}]);