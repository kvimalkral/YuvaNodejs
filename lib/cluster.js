const cluster = require('cluster');
const os = require('os');
function myCluster(app){
    if(cluster.isMaster){
        console.log(os.cpus().length);
        for(let i=0; i<= os.cpus().length; i++){
               cluster.fork()
        }
      }else{
        app.listen(process.env.PORT, () => {
          console.log(`app listing to port ${process.pid} 4000`);
        });
      }
}

module.exports = {myCluster}