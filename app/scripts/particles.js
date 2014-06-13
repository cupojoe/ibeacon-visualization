define([
    'Proton'
    ],
    function(Proton) {
        var canvas;
        var context;
        var proton;
        var renderer;
        var emitter;
        var attractionBehaviour, crossZoneBehaviour;
        var maxLife = 5;
        var colorRGB;

        function init() {
            canvas = document.getElementById('particles-canvas');
            canvas.width = canvas.width;
            canvas.height = canvas.width;
            context = canvas.getContext('2d');

            createProton();
            createRenderer();
            tick();
            window.onresize = function(e) {
                canvas.width = canvas.width;
                canvas.height = canvas.width;
                crossZoneBehaviour.reset(new Proton.CircleZone(canvas.width/2, canvas.height/2, canvas.width/2 - 35), 'bound');
            }
        }

        function createProton() {
            proton = new Proton;
        }

        function createEmitter(index, hexColor) {
            emitter = new Proton.Emitter();
            emitter.damping = 0.008;
            emitter.index = index;
            emitter.rate = new Proton.Rate(new Proton.Span(1, 5));
            emitter.addInitialize(new Proton.Mass(1));
            emitter.addInitialize(new Proton.Radius(4));
            emitter.addInitialize(new Proton.Velocity(new Proton.Span(1.5), new Proton.Span(-90, 90), 'polar'));

            emitter.addInitialize(new Proton.Life(1, maxLife));
            emitter.addBehaviour(new Proton.Alpha(1, 0, Infinity, Proton.easeInQuart));

            var attractionCenter = {
                x : canvas.width/2,
                y : canvas.height/2
            };
            //attractionBehaviour = new Proton.Attraction(attractionCenter, 50, 50);
            //crossZoneBehaviour = new Proton.CrossZone(new Proton.RectZone(0, 0, canvas.width, canvas.height), 'bound');
            crossZoneBehaviour = new Proton.CrossZone(new Proton.CircleZone(canvas.width/2, canvas.height/2, canvas.width/2 - 75), 'bound');

            //'#ff9900',
            var color = new Proton.Color(hexColor);
            emitter.addBehaviour(color);

            //emitter.addBehaviour(attractionBehaviour, crossZoneBehaviour);
            emitter.addBehaviour(crossZoneBehaviour);
            emitter.addBehaviour(new Proton.RandomDrift(10, 10, .05));
            emitter.p.x = canvas.width/2 + (canvas.width/2 - 80) * Math.cos( (85+index*12) * Math.PI/180 );
            emitter.p.y = canvas.height/2 + (canvas.height/2 - 80) * Math.sin( (85+index*12) * Math.PI/180 );
            emitter.emit();
            proton.addEmitter(emitter);

            return emitter;

        }

        function removeEmitter(emitter) {
            proton.removeEmitter(emitter);
        }

        function updateEmitterPos(emitter, index) {
            emitter.p.x = canvas.width/2 + (canvas.width/2 - 40) * Math.cos( (85+index*12) * Math.PI/180 );
            emitter.p.y = canvas.height/2 + (canvas.height/2 - 40) * Math.sin( (85+index*12) * Math.PI/180 );
        }

        function createRenderer() {
            renderer = new Proton.Renderer('other', proton);
            renderer.onProtonUpdate = function() {
                context.fillStyle = "rgba(0, 0, 0, 0.02)";
                context.fillRect(0, 0, canvas.width, canvas.height);
            };

            renderer.onParticleUpdate = function(particle) {
                context.beginPath();
                colorRGB = Proton.Util.hexToRGB(particle.color);
                context.strokeStyle = 'rgba(' + colorRGB.r + ',' + colorRGB.g + ',' + colorRGB.b + ',' + particle.alpha + ')';//particle.color;
                context.lineWidth = 1;
                context.moveTo(particle.old.p.x, particle.old.p.y);
                context.lineTo(particle.p.x, particle.p.y);
                context.closePath();
                context.stroke();
            };

            renderer.start();
        }

        function tick() {
            requestAnimationFrame(tick);

            proton.update();
        }

        return {
            init: init,
            createEmitter: createEmitter,
            removeEmitter: removeEmitter,
            updateEmitterPos: updateEmitterPos
        }
    }
);