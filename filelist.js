function FileListPlugin(options) {}

FileListPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
    var filelist = 'In this build:\n\n'

    for (var filename in compilation.assets) {
      const fileSize = compilation.assets[filename].size()
      filelist += ('-' + filename  + ` size: ${fileSize}bytes` + '  \n')
    }

    compilation.assets['filelist.md'] = {
      source: function() {
        return filelist
      },
      size: function() {
        return filelist.length
      },
    }

    callback()
  })
}

module.exports = FileListPlugin