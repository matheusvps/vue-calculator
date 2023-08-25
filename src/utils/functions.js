import { Notify } from 'quasar';

const notify = function (message) {
  Notify.create({
    message,
    color: 'red',
  });
};

export {
  notify,
};
