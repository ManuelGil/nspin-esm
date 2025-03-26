import { Spinner } from 'nspin-esm';

const spinner = new Spinner({
  frames: ['◐', '◓', '◑', '◒'],
  interval: 120,
  format: ['cyan', 'underline'],
}).start('Loading styled spinner...');

setTimeout(() => {
  spinner.stop('🎨 Styled complete!');
}, 4000);
