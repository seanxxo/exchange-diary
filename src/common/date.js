Date.prototype.removeTime = function () {
  return this.setHours(0, 0, 0, 0);
};

export default Date;
