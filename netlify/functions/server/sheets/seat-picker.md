---
title: seatPicker
---
import * as PIXI from "pixi.js"; import { Viewport } from "pixi-viewport"; // Height/width of the block images. const blockDimensions = [3840, 1896]; const heightScale = blockDimensions[0] / blockDimensions[1]; class Canvas { private inst: Readonly<{ app: PIXI.Application; viewport: Viewport; }>; constructor(elem: HTMLDivElement) { this.handleResize = this.handleResize.bind(this); this.initInst(elem); this.initHandlers(); } addChild(child: PIXI.DisplayObject): void { this.getContainer().addChild(child); } removeChild(child: PIXI.DisplayObject): void { this.getContainer().removeChild(child); } resetZoom(): void { this.inst.viewport.fitWorld(); } getContainer(): PIXI.Container { return this.inst.viewport; } initInst(elem: HTMLDivElement): void { const [app, viewport] = this.createApp(); this.inst = { app, viewport }; elem.appendChild(this.inst.app.view); } createApp(): [PIXI.Application, Viewport] { const app = new PIXI.Application({ backgroundColor: 0x1099bb, autoDensity: true, resolution: window.devicePixelRatio || 1, }); const viewport = this.createViewport(app); app.stage.addChild(viewport); return [app, viewport]; } createViewport(app: PIXI.Application): Viewport { return new Viewport({ screenWidth: window.innerWidth, screenHeight: window.innerWidth / heightScale, worldWidth: blockDimensions[0], worldHeight: blockDimensions[1], interaction: app.renderer.plugins.interaction, }) .drag() .pinch() .wheel() .decelerate() .fitWorld() .clampZoom({ maxWidth: blockDimensions[0], maxHeight: blockDimensions[1], }) .clamp({ left: true, right: true, top: true, bottom: true, }); } initHandlers(): void { this.handleResize(); window.addEventListener("resize", this.handleResize); } handleResize(): void { this.inst.app.renderer.resize( window.innerWidth, window.innerWidth / heightScale ); this.inst.viewport.resize( window.innerWidth, window.innerWidth / heightScale ); this.inst.viewport.fitWorld(); } } export default Canvas;