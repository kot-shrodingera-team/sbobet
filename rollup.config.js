import typescript from '@rollup/plugin-typescript';
import prettier from 'rollup-plugin-prettier';
import bookmakerName from './bookmakerName';

export default {
  input: './src/index.ts',
  output: {
    format: 'es',
    file: `./dist/${bookmakerName}.js`,
  },
  plugins: [typescript(), prettier()],
};
