import { Injectable } from '@angular/core';
import 'leonardodls-core/libs-leonardo-player/dist/leonardoPlayer.min.js';
import '../../node_modules/leonardodls-core/libs-leonardo-player/dist/leonardoPlayer.min.css';

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