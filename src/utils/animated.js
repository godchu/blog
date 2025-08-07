const typeMap = {
  static: 'staticStickerOnly',
  animation: 'animationStickerOnly',
  sound: 'staticStickerWithSound',
  animation_sound: 'animationStickerWithSound',
  popup: 'animationStickerOnly',
  popup_sound: 'animationStickerWithSound',
  name: 'staticStickerWithOverlay',
  per_sticker_text: 'staticStickerWithOverlay',
};

function getPrimaryKey(type) {
  switch (type) {
    case 'static':
    case 'animation':
    case 'popup':
      return 'url';
    case 'sound':
    case 'animation_sound':
    case 'popup_sound':
      return 'stickerUrl';
    case 'name':
    case 'per_sticker_text':
      return 'baseUrl';
    default:
      throw new Error('Unsupported sticker type');
  }
}

function getSoundUrl(t) {
  return ['sound', 'animation_sound', 'popup_sound'].includes(t.type) ? t.soundUrl : undefined;
}

function getUrl(t) {
  switch (t.type) {
    case 'static':
    case 'sound':
    case 'per_sticker_text':
    // eslint-disable-next-line default-case-last, no-fallthrough
    default:
      return t.staticUrl;
    case 'animation':
    case 'animation_sound':
      return t.animationUrl;
    case 'popup':
    case 'popup_sound':
      return t.popupUrl;
    case 'name':
      return t.customBaseUrl || t.staticUrl;
  }
}

function getOverlayUrl(t) {
  return ['name', 'per_sticker_text'].includes(t.type) ? t.customOverlayUrl : undefined;
}

export function normalizeSticker(t) {
  const mappedType = typeMap[t.type];
  if (!mappedType) throw new Error('Unsupported sticker type!');

  const url = getUrl(t);
  const overlayUrl = getOverlayUrl(t);
  const soundUrl = getSoundUrl(t);
  const key = getPrimaryKey(t.type);

  // Special case: no overlay provided for overlay types, fallback to staticStickerOnly
  if (mappedType === 'staticStickerWithOverlay' && !overlayUrl) {
    return {
      type: 'staticStickerOnly',
      url,
    };
  }

  return {
    type: mappedType,
    [key]: url,
    ...(soundUrl && { soundUrl }),
    ...(overlayUrl && { overlayUrl }),
  };
}
