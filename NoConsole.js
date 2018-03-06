class NoConsole {
  assestsFile(str) {
    return {
      source() {
        return str
      },
      size() {
        return str.length
      },
    }
  }

  apply(compiler) {
    const fileList = []
    const jsFile = /\.(js|jsx)$/g
    const consolePattern = /console.log\(.*\)/mg
    const commentPattern = /\/\/.*\n|\/\*.*\*\//mg
    const strPattern = /["'`].*\1/mg

    compiler.plugin('emit', (compilation, callback) => {
      console.log('delete console start\n')

      for (const fileName in compilation.assets) {
        if (jsFile.test(fileName)) {
          fileList.push(fileName)
        }
      }

      fileList.forEach((f) => {
        let code = compilation.assets[f].source()
        const codeRows = code.split(/\n$/mg)
        code = codeRows
          .map(r => {
            if (!commentPattern.test(r)) {
              r = r.replace(consolePattern, '')
            }

            return r})
          .join('\n')

        compilation.assets[f] = this.assestsFile(code)
      })

      console.log('delete console complete\n')

      callback()
    })
  }
}

module.exports = NoConsole