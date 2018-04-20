import { Injectable } from '@angular/core';
import '../libs/Leonardo/leonardoPlayer.min.js';

declare var LeonardoPlayer;

@Injectable()
export class LeonardoCoreService {
    leonardoPlayer
    constructor(){
        this.leonardoPlayer = LeonardoPlayer.init();
    }

    addWidget(uid, container, options){
        return this.leonardoPlayer.addWidget(uid, container, options);
    }
    getWidget(uid) {
        return this.leonardoPlayer.getWidget(uid);
    }

    removeWidget(uid) {
        return this.leonardoPlayer.removeWidget(uid);
    }
    
}