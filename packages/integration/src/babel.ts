import { transformFileAsync } from '@babel/core';
import {
  macaronBabelPlugin,
  PluginOptions,
  macaronStyledComponentsPlugin,
} from '@macaron-css/babel';

export async function babelTransform(path: string) {
  const options: PluginOptions = { result: ['', ''], path };
  const result = await transformFileAsync(path, {
    plugins: [macaronStyledComponentsPlugin(), [macaronBabelPlugin(), options]],
    presets: ['@babel/preset-typescript'],
    sourceMaps: false,
  });

  if (result === null || result.code === null)
    throw new Error(`Could not transform ${path}`);

  return { result: options.result, code: result.code };
}
