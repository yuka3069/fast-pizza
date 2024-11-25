export default function getLocalStorageState(key) {
  return localStorage.getExpire(key);
}
Storage.prototype.getExpire = (key) => {
  if (!localStorage.getItem(key)) return null;
  let obj = JSON.parse(localStorage.getItem(key));
  if (Date.now() - obj.time > obj.expire) {
    localStorage.removeItem(key);
    return null;
  }
  return obj.value;
};
