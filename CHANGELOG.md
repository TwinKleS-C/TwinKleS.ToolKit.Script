# 更新日志

## [6-1.1.0] - 2021-12-16

首个正式版

## [7-1.2.0] - 2021-12-22

适配 core 7-1.2.0

### 新增

* `TwinKleS.CoreX`
	
	新增API `namespace XML` ，包含XML相关的辅助函数。

* `TwinKleS.Support.PopcapAnimation.Convert.common`

	提供PAM转换所需的公共代码

* `TwinKleS.Support.PopcapAnimation.Convert.Flash`

	提供PAM与Flash的相互转换功能（该版本只提供PAM到Flash的转换）

* `TwinKleS.Support.PopcapAnimation.Convert.Finalize`

	提供PAM的终态计算功能，将用于 TwinKleS-ToolKit-Web Animation-Viewer

* `TwinKleS.Support.PvZ2RSB.ResourceExtract`

	加强动画资源提取的支持，现可提取动画为PAM-Flash与PAM-JSON（终态）

* `TwinKleS.Entry.suggestion.fs.animation.popcap_animation`

	新增建议 `fs.animation.popcap_animation.convert.flash.from PAM-JSON转换至Flash` 与 `fs.animation.popcap_animation.convert.finalize PAM-JSON转换至终态`

### 变更

* `TwinKleS.io..Input`

	`Checker` 及相关功能迁移至 `TwinKleS.utility..Check` 。

* `TwinKleS.Support.PvZ2RSB.ResourceManifest`

	`Manifest` 此前以数组形式(`Array<{ id, ...Data }>`)表示`Group`与`Subgroup`，现使用键值对形式(`Record<id, Data>`)。

* `TwinKleS.Entry`

	`config.pause_when_finish` 所启用的终止时暂停功能此前使用 `TwinKleS.CoreX.Process.pause` 实现程序的暂停，现使用 `Input.pause` 。

## [8-1.3.0] - 2022-01-13

适配 core 8-1.3.0

### 变更

* `TwinKleS.Entry..input_available_path_if_need`
	
	此前，当默认生成路径已存在时，只能删除原路径或输入新路径。
	
	此后，提供三项选择：强制使用已存在路径、删除已存在路径并使用之、输入新路径。
	
	第一选项会保留默认路径内的所有文件，这在进行一些需要依赖其中文件的工作时非常有用。

* `TwinKleS.Entry.._injector`
	
	模块 `io` 需要依赖终端的 **虚拟终端序列（VTS）** ，为了在程序中启用这一功能，_injector会判断当前运行环境是否已启用VTS，若未启用则使用API set_std_console_mode 启用。
	
	此前，在不支持VTS的cmd中（**Win7与早期Win10中的内置cmd**），执行`_injector`会使`set_std_console_mode`操作向Entry模块外抛出异常，致使程序提前终止。

	此后，对该操作进行异常捕获与处理，并在已启用VTS时置模块 `io` 中的标志变量 ` ` 为 `true` 。
	
* `TwinKleS.Entry.._entry`
	
	文本修正：将 **执行指令 ...** 修正为 **执行命令 ...**

* `TwinKleS.io`
	
	本模块用以实现面向命令行的输入输出，为了更好地控制和显示文本，需要依赖终端的 **虚拟终端序列（VTS）** 功能。

	此前，即使在不支持VTS的终端中，函数 `set_text_attribute` 也会输出改变文本属性的控制序列，这使得不支持VTS的终端打印出控制序列，影响视觉效果。

	此后，仅当命名空间 `Output` 内新增的标志变量 `g_enabled_virtual_terminal_sequences` 为 `true` 时，函数 `set_text_attribute` 才会输出控制序列

* `TwinKleS.Support.PopcapAnimation.Convert`
	
	因对PAM的如下错误认知，使得一部分PAM动画的转换出现错误（元件错位、静止等）
	
	1. LayerChange是通过重定义子变换的方式与上一帧的变换状态相结合。

	2. 动画元件只会从始至终播放一次，不会重复播放（此前的测试未覆盖全部PAM，故未发现重复播放的情况）。

	正确认知应为：

	1. LayerChange是一次全新的变换，不继承上一帧的变换状态**（discolor属性暂未检查，故暂时未做修改）**。

	2. 动画元件可能重复播放，当播放到动画元件自身的最后一帧时，下一帧播放将复位到动画元件自身的第一帧。

	据此，对组成模块的行为进行修正，并以正确的语意重命名模块 `common` 内函数 `mix_transform_with_raw_change` 重命名为 `comput_transform_of_raw_change` 。

* `TwinKleS.Support.PopcapAnimation.Convert.Finalize`
	
	出于对语意的考虑，将包括模块名在内的单词 `Finalize` 修正为 `Comput` ，并对其他模块中涉及此的代码进行修改。

	另：此前该功能只计算主动画的结构，为了更好地适配新版本AnimationViewer，此后将子动画结构也进行计算。
	
* `TwinKleS.Support.PopcapAnimation.Convert.Flash`
	
	修正生成动画元件的layer时存在的名称错误。

	合并动画的 `action` 与 `audio` 层为 `command` 层，之后，所有的fscommand指令应在该层书写。

	sprite与animation（除main_animation）的索引值从1开始计数；此前索引词从0起计数，不符合人类自然语言惯例。

	sprite与animation元件在flash中的元件类型全部定义为 `graphic` 。

## [9-1.4.0] - 2022-01-31

适配 core 9-1.4.0

### 变更

* all
	
	修复typo及一些错误命名

* `TwinKleS.io`
	
	此前，使用绿色作为信息（information）文本提示色，使用蓝色作为输入文本提示色。

	此后，使用蓝色作为信息（information）文本提示色，使用绿色作为输入文本提示色。

## [10-1.5.0] - 2022-02-16

适配 core 10-1.5.0

### 变更

* `TwinKleS.CoreX..Tool.Expand.PvZ2CHSRSBTextureAlphaIndex.eval_index_list`
	
	此前，当源图像中每一像素的alpha高四位均为1时，产生的索引表为 [ 0b1111, 0b0000 ] ,这会导致后续为PTX编码时出现BUG，导致再解码后的alpha均为 0b0000 。因为若索引表尺寸仅为2，PTX中将不记录索引表尺寸，且实际索引表为 [ 0b0000, 0b1111 ] 。

	此后，产生的索引表为 [ 0b0000, 0b1111 ] 。

## [11-1.5.1] - 2022-02-17

适配 core 11-1.5.1

### 新增

* `TwinKleS.Entry.suggestion.fs.data.hash`
	
	提供计算文件哈希（MD5）的建议。

### 变更

* `TwinKleS.Support.PopcapTexture`
	
	PTX编解码时，将根据所提供的图像尺寸参数计算填充过后的尺寸（ETC1、PVRTC对图像尺寸有要求），并以这一尺寸进行实际编解码，再在输出图像时裁取填充的部分。

* `TwinKleS.CoreX..Tool.Audio.WwiseSoundBank`
	
	由于内部API变更，调整BNK打包解包时的输入输出方式。

## [12-1.5.2] - 2022-02-17

适配 core 12-1.5.2

### 新增

* `TwinKleS.Support.PvZ2LawnStringText`
	
	提供PvZ2文本表版本转换功能。

* `TwinKleS.Entry.suggestion.fs.expand.pvz2.lawn_string_text`
	
	提供PvZ2文本表版本转换功能的建议。

* `TwinKleS.utility..TypeUtility`
	
	增加UTF16数据转字符串的功能。

### 变更

* `TwinKleS.CoreX..JSON`
	
	API调整。

## [13-1.6.0] - 2022-03-20

适配 core 13-1.6.0

**并未提供更新说明**

## [14] - 2022-05-01

适配 core 14

**并未提供更新说明**

