// IF DATA DOESN`T HANDLE FROM DB, WE NEED TO IMPLEMENT STICKY (SHARED STATE)

const cluster = require("cluster"),
  os = require("os");

if (cluster.isMaster) {
  const cpus = os.cpus().length;

  // Cluster
  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
  console.log(`Cluster Master PID: ${process.pid}`);

  // Restart Worker Crashed
  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.id} crashed. Starting a new worker...`);
      cluster.fork();
    }
  });

  // Broadcasting
  //   Object.values(cluster.workers).forEach(worker => {
  //     worker.send(`Hello worker: ${worker.id}`);
  //   });

  // Restart All Workers
  process.on("SIGUSR2", () => {
    const workers = Object.values(cluster.workers);

    const restartWorker = workerId => {
      const worker = workers[workerId];

      if (!worker) return;

      worker.on("exit", () => {
        if (!worker.exitedAfterDisconnect) return;
        console.log(`Exited process ${worker.process.pid}`);
        cluster.fork().on("listening", () => {
          restartWorker(workerId + 1);
        });
      });

      worker.disconnect();
    };

    restartWorker(0);
  });
} else {
  require("./server");
}
