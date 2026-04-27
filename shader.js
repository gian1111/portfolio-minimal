// Background Shader Script
class ShaderBackground {
    constructor() {
        this.canvas = document.getElementById('shaderCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.time = 0;
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    // Funzione Perlin-like noise semplice
    noise(x, y, t) {
        return Math.sin(x * 0.5 + t * 0.3) * Math.sin(y * 0.5 + t * 0.2);
    }
    
    // Film grain / cinematico noise
    getFilmGrain(x, y, t) {
        return (Math.sin(x * 12.9898 + y * 78.233 + t * 100) * 0.5 + 0.5);
    }
    
    animate() {
        this.time += 0.016; // ~60fps
        
        // Clear canvas
        this.ctx.fillStyle = 'transparent';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background gradient
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, 'rgba(20, 25, 50, 0.05)');
        gradient.addColorStop(0.5, 'rgba(15, 20, 40, 0.03)');
        gradient.addColorStop(1, 'rgba(20, 25, 50, 0.05)');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw animated lines
        this.drawAnimatedGrid();
        
        // Draw flowing mesh
        this.drawFlowingMesh();
        
        // Draw mouse glow light
        this.drawMouseGlow();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawAnimatedGrid() {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
        this.ctx.lineWidth = 0.5;
        
        const gridSize = 80;
        
        // Vertical lines
        for (let x = 0; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            
            for (let y = 0; y < this.canvas.height; y += 5) {
                const offset = this.noise(x * 0.01, y * 0.01, this.time) * 3;
                this.ctx.lineTo(x + offset, y);
            }
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            
            for (let x = 0; x < this.canvas.width; x += 5) {
                const offset = this.noise(x * 0.01, y * 0.01, this.time) * 3;
                this.ctx.lineTo(x, y + offset);
            }
            this.ctx.stroke();
        }
    }
    
    drawFlowingMesh() {
        const step = 120;
        const intensity = 0.4;
        
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        this.ctx.lineWidth = 0.8;
        
        for (let x = 0; x < this.canvas.width + step; x += step) {
            for (let y = 0; y < this.canvas.height + step; y += step) {
                const n = this.noise(x * 0.002, y * 0.002, this.time);
                
                // Diagonal lines based on noise
                this.ctx.beginPath();
                this.ctx.moveTo(x + n * intensity, y);
                this.ctx.lineTo(x + step + n * intensity, y + step);
                this.ctx.stroke();
            }
        }
    }
    
    drawMouseGlow() {
        const glowRadius = 120;
        const gradient = this.ctx.createRadialGradient(
            this.mouseX, this.mouseY, 0,
            this.mouseX, this.mouseY, glowRadius
        );
        
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
        gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.03)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(
            this.mouseX - glowRadius,
            this.mouseY - glowRadius,
            glowRadius * 4,
            glowRadius * 4
        );
    }
}

// Initialize shader background
document.addEventListener('DOMContentLoaded', () => {
    new ShaderBackground();
});
