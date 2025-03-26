import { Spinner } from 'nspin-esm';

const spinner = new Spinner({}).start('Processing...');

setTimeout(() => {
  spinner.stop('✅ Done!');
}, 3000);
