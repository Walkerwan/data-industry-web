export default function getStyle(obj, attr) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(obj, false)[attr];
  } else {
    return obj.currentStyle[attr];
  }
}
