class ParticleSystem {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.particles = [];
        this.particleCount = 1500;
        this.particleGroups = [];
        
        this.init();
    }

    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // Setup camera
        this.camera.position.z = 50;

        // Create multiple particle groups with different colors
        const colors = [
            new THREE.Color(0x00ff88), // Primary neon green
            new THREE.Color(0xff00cc), // Secondary neon pink
            new THREE.Color(0x7700ff)  // Accent purple
        ];

        colors.forEach((color, index) => {
            const particleGeometry = new THREE.BufferGeometry();
            const particleMaterial = new THREE.PointsMaterial({
                size: 0.15,
                color: color,
                transparent: true,
                opacity: 0.6,
                blending: THREE.AdditiveBlending
            });

            const positions = new Float32Array(this.particleCount * 3);
            const velocities = new Float32Array(this.particleCount * 3);

            for (let i = 0; i < this.particleCount; i++) {
                const i3 = i * 3;
                positions[i3] = (Math.random() - 0.5) * 100;
                positions[i3 + 1] = (Math.random() - 0.5) * 100;
                positions[i3 + 2] = (Math.random() - 0.5) * 100;

                velocities[i3] = (Math.random() - 0.5) * 0.03;
                velocities[i3 + 1] = (Math.random() - 0.5) * 0.03;
                velocities[i3 + 2] = (Math.random() - 0.5) * 0.03;
            }

            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const particles = new THREE.Points(particleGeometry, particleMaterial);
            
            this.particleGroups.push({
                points: particles,
                velocities: velocities,
                baseColor: color
            });
            
            this.scene.add(particles);
        });

        // Add event listeners
        window.addEventListener('resize', this.onWindowResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));

        // Start animation
        this.animate();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(event) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        this.particleGroups.forEach((group, index) => {
            group.points.rotation.x += mouseY * 0.001 * (index + 1);
            group.points.rotation.y += mouseX * 0.001 * (index + 1);
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.particleGroups.forEach((group, index) => {
            const positions = group.points.geometry.attributes.position.array;

            for (let i = 0; i < this.particleCount; i++) {
                const i3 = i * 3;

                positions[i3] += group.velocities[i3];
                positions[i3 + 1] += group.velocities[i3 + 1];
                positions[i3 + 2] += group.velocities[i3 + 2];

                if (Math.abs(positions[i3]) > 50) {
                    positions[i3] = (Math.random() - 0.5) * 100;
                    group.velocities[i3] = (Math.random() - 0.5) * 0.03;
                }
                if (Math.abs(positions[i3 + 1]) > 50) {
                    positions[i3 + 1] = (Math.random() - 0.5) * 100;
                    group.velocities[i3 + 1] = (Math.random() - 0.5) * 0.03;
                }
                if (Math.abs(positions[i3 + 2]) > 50) {
                    positions[i3 + 2] = (Math.random() - 0.5) * 100;
                    group.velocities[i3 + 2] = (Math.random() - 0.5) * 0.03;
                }
            }

            group.points.geometry.attributes.position.needsUpdate = true;
            group.points.rotation.y += 0.0003 * (index + 1);
            group.points.rotation.x += 0.0001 * (index + 1);
        });

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize particle system when the page loads
window.addEventListener('load', () => {
    new ParticleSystem();
});
