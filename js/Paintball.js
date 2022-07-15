AFRAME.registerComponent("paintballs", {
  init: function() {
      this.shootPaintball();
      this.numberGenerator();
  },

  shootPaintball: function() {
    window.addEventListener("keydown", (event)=>{
      if(event.key == "z") {
        var bullet = document.createElement("a-entity")
        
        bullet.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.1,
        })

        var red = this.numberGenerator()
        var blue = this.numberGenerator()
        var green = this.numberGenerator()
        var finalColor = "#"+red+green+blue;
        bullet.setAttribute("material", "color", finalColor)

        var cam = document.querySelector("#camera-rig");      
        pos = cam.getAttribute("position");
        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y + 1.6,
          z: pos.z - 0.08,
        });

        var camera3d = document.querySelector("#camera").object3D;
        var direction = new THREE.Vector3();
        camera3d.getWorldDirection(direction)

        bullet.setAttribute("velocity", direction.multiplyScalar(-20));

        var scene = document.querySelector("#scene");

        bullet.setAttribute("dynamic-body", {
            shape: "sphere",
            mass: "0",
        });

        bullet.addEventListener("collide", this.removeBullet);

        scene.appendChild(bullet);  
      }
    })
  },

  removeBullet: function (f) {
      var scene = document.querySelector("#scene");
      
      var element = e.detail.target.el;
  
      var elementHit = e.detail.body.el;

      element.removeEventListener("collide", this.removeBullet);
    
      scene.removeChild(element);
  },

  numberGenerator: function() {
    var colour = Math.random()
    colour = colour*255

    var c = 0xFFFFFFFF + colour + 1
    c= c.toString(16).toUpperCase();
    c = c.slice(7, 9)
    return(c)
  }
})

