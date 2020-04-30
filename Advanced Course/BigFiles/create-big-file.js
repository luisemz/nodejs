const fs = require("fs"),
  file = fs.createWriteStream("./big.file");

for (let i = 0; i < 1e6; i++) {
  file.write(
    "Cupidatat pariatur sit laborum ex fugiat sint consectetur consequat irure do qui ad enim. Et pariatur incididunt et velit ex ipsum cillum. Ullamco magna aliqua cillum enim eiusmod. Cupidatat consequat laborum amet est magna eu sit est est enim anim duis Lorem. Consequat ut labore aliquip excepteur veniam anim esse consectetur et."
  );
}

file.end();
