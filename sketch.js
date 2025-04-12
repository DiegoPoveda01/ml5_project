let startSystem = false;
let video, bodyPose, poses = [];

let targetX, targetY;
let targetSize = 30;
let handThreshold = 60;

// No usamos preload aún
function preload() {}

window.setup = function () {
  if (!startSystem) return; // Evita que setup se ejecute automáticamente

  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();

  bodyPose = ml5.bodyPose(video, { flipped: true }, () => {
    console.log("Modelo cargado");
    bodyPose.detectStart(video, gotPoses);
  });

  newTargetPosition();
};

window.draw = function () {
  if (!startSystem) return;

  image(video, 0, 0, width, height);

  fill(255, 0, 0);
  noStroke();
  circle(targetX, targetY, targetSize);

  if (poses.length > 0) {
    let pose = poses[0];

    for (let keypoint of pose.keypoints) {
      if (keypoint.confidence > 0.1) {
        if (keypoint.part === "right_wrist") {
          fill(0, 0, 255);
        } else {
          fill(0, 255, 0);
        }
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }

    let rightWrist = pose.keypoints.find(k => k.part === "right_wrist");

    if (rightWrist && rightWrist.confidence > 0.5) {
      let d = dist(rightWrist.x, rightWrist.y, targetX, targetY);
      if (d < targetSize / 2 + handThreshold) {
        newTargetPosition();
      }
    }
  }
};

function gotPoses(results) {
  poses = results;
}

function newTargetPosition() {
  targetX = random(50, width - 50);
  targetY = random(50, height - 50);
}
