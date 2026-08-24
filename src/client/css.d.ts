/** CSS 以文本导入（esbuild loader: text），构建期注入为单文件内的 style 标签。 */
declare module "*.css" {
  const css: string;
  export default css;
}
