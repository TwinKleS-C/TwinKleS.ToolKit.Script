# TwinKleS ToolKit - Script

**TwinKleS.ToolKit** 的配套脚本。

## 开发准备

1. 首先，安装 ⌈ node.js ⌋ 及 ⌈ typescript ⌋ 。

2. 之后，进入项目目录，执行 ⌈ tsc ⌋ ，将编译项目至输出目录 ⌈ .out ⌋ 内。

3. 初次编译后，还需运行 ⌈ link_config.bat ⌋ ，以在输出目录内创建指向脚本配置文件的符号链接。

4. 最后，删除工具主目录内的脚本目录 ⌈ `<home>/script` ⌋ ，并创建指向项目输出目录的符号链接 ⌈ `<home>/script` ⌋ ，即可开始进行拓展开发。
