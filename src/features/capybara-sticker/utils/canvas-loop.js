import fitter from 'canvas-fit';
import loop from 'raf-loop';

export const canvasLoop = (canvas, opt) => {
  if (!canvas) {
    throw new TypeError('must specify a canvas element');
  }

  opt = opt || {};
  let fit = fitter(canvas, opt.parent, opt.scale);
  let app = loop();
  let shape = [0, 0];

  resize();

  window.addEventListener(
    'resize',
    () => {
      resize();
      app.emit('resize');
    },
    false,
  );

  Object.defineProperties(app, {
    scale: {
      get: function () {
        return fit.scale;
      },
      set: function (s) {
        fit.scale = s;
      },
    },
    shape: {
      get: function () {
        return shape;
      },
    },
    parent: {
      get: function () {
        return fit.parent;
      },
      set: function (p) {
        fit.parent = p;
      },
    },
  });

  return app;

  function resize() {}
};
