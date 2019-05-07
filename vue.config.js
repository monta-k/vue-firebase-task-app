module.exports = {
  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: ['./src/assets/style/_reset.scss', './src/assets/style/_color.scss'],
        })
        .end();
    });
  },
};
