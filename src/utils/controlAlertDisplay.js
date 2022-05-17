export default (func, msg, displayTime = 1.5) => {
  func(msg);
  setTimeout(() => func(null), displayTime * 1000);
};
