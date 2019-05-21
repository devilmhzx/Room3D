// 流星
class Dust {
  constructor() {
    this.mesh = new THREE.Object3D();
    var geomLine = new THREE.Geometry();
      geomLine.vertices.push(
        new THREE.Vector3( 0, -10, 0 ),
        new THREE.Vector3( 0, 10, 0 )
      );
    var Mat = new THREE.LineBasicMaterial({color:0xffffff});
    var line = new THREE.Line( geomLine, Mat ); 
    this.mesh.add(line);  
  }
}

class DustStream {
  constructor() {
    this.DustArray = [];
    this.mesh = new THREE.Object3D();
    this.nDust = 75
    this.DustArray = []
    for(var i=0; i<this.nDust; i++){
      this.d = new Dust();   
      this.d.mesh.position.y = -300+Math.random()*600;   
      this.d.mesh.position.x = -300+Math.random()*600;   
      this.d.mesh.position.z = 300-Math.random()*600;
      this.d.mesh.scale.y = 0.5+Math.random()*1.5;
      this.mesh.add(this.d.mesh);
      this.DustArray.push(this.d);
    }
  }

  speed(number){ 
    for (var i = 0; i <this.DustArray.length; i++){       
      this.DustArray[i].mesh.position.y -= number;    
      
      if (this.DustArray[i].mesh.position.y <= -200 ) {
        this.DustArray[i].mesh.position.y=400;        
      }     
    }
    
    for (var i = 0; i <this.DustArray.length; i+=3){       
      this.DustArray[i].mesh.position.y -= number-10;   
      
      if (this.DustArray[i].mesh.position.y <= -200 ) {
        this.DustArray[i].mesh.position.y=400;        
      }     
    }
  }
}

export default DustStream
