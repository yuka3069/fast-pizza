export default function updateLocalStorageState(key, value, expire) {
  localStorage.setExpire(key, JSON.stringify(value), expire);
}

Storage.prototype.setExpire = (key, value, expire = 10 * 1000 * 60) => {
  let obj = {
    value: value,
    expire: expire,
    time: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getExpire = (key) => {
  let obj = JSON.parse(localStorage.getItem(key));
  if (!obj) return null;
  if (Date.now() - obj.time > obj.expire) {
    localStorage.removeItem(key);
    return null;
  }
  return obj.value;
};
