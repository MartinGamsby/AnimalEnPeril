// ============================================================
// Camera
// ============================================================

const cam = { x: 0, y: 0, shakeX: 0, shakeY: 0, shakeInt: 0 };

function updateCam(tx, ty, lw, lh) {
  const cx = tx - W / 2, cy = ty - H / 2;
  cam.x = lerp(cam.x, clamp(cx, 0, Math.max(0, lw - W)), C.CAM_LERP);
  cam.y = lerp(cam.y, clamp(cy, 0, Math.max(0, lh - H)), C.CAM_LERP);
  cam.shakeInt *= 0.88;
  cam.shakeX = (Math.random() - 0.5) * cam.shakeInt;
  cam.shakeY = (Math.random() - 0.5) * cam.shakeInt;
}

function shake(int) { cam.shakeInt = Math.max(cam.shakeInt, int); }
