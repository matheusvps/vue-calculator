const notify = function (message) {
  this.$q.Notify.create({
    message,
  });
};

export {
  notify,
};
