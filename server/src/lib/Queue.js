import Bee from 'bee-queue';
import ConfirmationMail from '../app/jobs/ConfirmationMail';
import redisConfig from '../config/redis';
import '../bootstrap';

const jobs = [ConfirmationMail];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    if (process.env.NODE_ENV !== 'test') {
      jobs.forEach(({ key, handle }) => {
        this.queues[key] = {
          bee: new Bee(key, {
            redis: redisConfig,
          }),
          handle,
        };
      });
    }
  }

  add(queue, job) {
    if (process.env.NODE_ENV !== 'test') {
      return this.queues[queue].bee.createJob(job).save();
    }
    return null;
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name} failed ${err}`);
  }
}

export default new Queue();
