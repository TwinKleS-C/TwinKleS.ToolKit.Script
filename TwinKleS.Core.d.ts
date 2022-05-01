/**
 * JS API of TwinKleS.ToolKit.Core
 * @version 14
 */
declare namespace TwinKleS.Core {

	// ------------------------------------------------

	/** 内部类型定义模板 */
	class T {

		// ------------------------------------------------

		/** 不存在的属性，用于避免TS类型兼容规则对内部类型的影响 */
		private _T: any;

		// ------------------------------------------------

		/* 通用操作 */

		/** 默认构造 */
		static default(): T;

		/** 复制构造 */
		static copy(t: T): T;

		// ------------------------------------------------

		/** JS值操作 */

		/** JS值构造 */
		static value(t: any): T;

		/** JS值getter */
		get value(): any;

		/** JS值setter */
		set value(t: any);

		// ------------------------------------------------

		/** JSON操作 */

		/** JSON构造 */
		static json(t: JSON.Value): T;

		/** JSON getter */
		get json(): JSON.Value;

		/** JSON setter */
		set json(t: JSON.Value);

		// ------------------------------------------------

		/** 其他 */

		// ------------------------------------------------

	}

	// ------------------------------------------------

	/** void的同义词 */
	type None = void;

	// ------------------------------------------------

	type JS_Null = null;

	/** 空值 */
	class Null {

		// ------------------------------------------------

		private _Null;

		// ------------------------------------------------

		static default(): Null;

		static copy(t: Null): Null;

		// ------------------------------------------------

		static value(t: JS_Null): Null;

		get value(): JS_Null;

		set value(t: JS_Null);

		// ------------------------------------------------

	}

	// ------------------------------------------------

	type JS_Boolean = boolean;

	/** 布尔值 */
	class Boolean {

		// ------------------------------------------------

		private _Boolean;

		// ------------------------------------------------

		static default(): Boolean;

		static copy(t: Boolean): Boolean;

		// ------------------------------------------------

		static value(t: JS_Boolean): Boolean;

		get value(): JS_Boolean;

		set value(t: JS_Boolean);

		// ------------------------------------------------

	}

	// ------------------------------------------------

	type JS_IntegerU8 = bigint;

	/** 8位无符号整数 */
	class IntegerU8 {

		// ------------------------------------------------

		private _IntegerU8;

		// ------------------------------------------------

		static default(): IntegerU8;

		static copy(t: IntegerU8): IntegerU8;

		// ------------------------------------------------

		static value(t: JS_IntegerU8): IntegerU8;

		get value(): JS_IntegerU8;

		set value(t: JS_IntegerU8);

		// ------------------------------------------------

	}

	type JS_IntegerU32 = bigint;

	/** 32位无符号整数 */
	class IntegerU32 {

		// ------------------------------------------------

		private _IntegerU32;

		// ------------------------------------------------

		static default(): IntegerU32;

		static copy(t: IntegerU32): IntegerU32;

		// ------------------------------------------------

		static value(t: JS_IntegerU32): IntegerU32;

		get value(): JS_IntegerU32;

		set value(t: JS_IntegerU32);

		// ------------------------------------------------

	}

	type JS_IntegerU64 = bigint;

	/** 64位无符号整数 */
	class IntegerU64 {

		// ------------------------------------------------

		private _IntegerU64;

		// ------------------------------------------------

		static default(): IntegerU64;

		static copy(t: IntegerU64): IntegerU64;

		// ------------------------------------------------

		static value(t: JS_IntegerU64): IntegerU64;

		get value(): JS_IntegerU64;

		set value(t: JS_IntegerU64);

		// ------------------------------------------------

	}

	type JS_IntegerS = bigint;

	/** 有符号整数 */
	class IntegerS {

		// ------------------------------------------------

		private _IntegerS;

		// ------------------------------------------------

		static default(): IntegerS;

		static copy(t: IntegerS): IntegerS;

		// ------------------------------------------------

		static value(t: JS_IntegerS): IntegerS;

		get value(): JS_IntegerS;

		set value(t: JS_IntegerS);

		// ------------------------------------------------

	}

	type JS_Size = bigint;

	/** 表征尺寸的整数，表现为64位无符号整数 */
	class Size {

		// ------------------------------------------------

		private _Size;

		// ------------------------------------------------

		static default(): Size;

		static copy(t: Size): Size;

		// ------------------------------------------------

		static value(t: JS_Size): Size;

		get value(): JS_Size;

		set value(t: JS_Size);

		// ------------------------------------------------

	}

	type JS_Index = JS_Size;

	/** 表征索引的整数，Size的别名 */
	type Index = Size;

	type JS_Byte = bigint;

	/** 表征字节的整数，表现为8位无符号整数 */
	class Byte {

		// ------------------------------------------------

		private _Byte;

		// ------------------------------------------------

		static default(): Byte;

		static copy(t: Byte): Byte;

		// ------------------------------------------------

		static value(t: JS_Byte): Byte;

		get value(): JS_Byte;

		set value(t: JS_Byte);

		// ------------------------------------------------

	}

	// ------------------------------------------------

	type JS_String = string;

	/** 字符串 */
	class String {

		// ------------------------------------------------

		private _String;

		// ------------------------------------------------

		static default(): String;

		static copy(t: String): String;

		// ------------------------------------------------

		static value(t: JS_String): String;

		get value(): JS_String;

		set value(t: JS_String);

		// ------------------------------------------------

	}

	type JS_StringList = Array<string>;

	/** 字符串列表 */
	class StringList {

		// ------------------------------------------------

		private _StringList;

		// ------------------------------------------------

		static default(): StringList;

		static copy(t: StringList): StringList;

		// ------------------------------------------------

		static value(t: JS_StringList): StringList;

		get value(): JS_StringList;

		set value(t: JS_StringList);

		// ------------------------------------------------

	}

	// ------------------------------------------------

	type JS_Path = string;

	/** 文件路径 */
	class Path {

		// ------------------------------------------------

		private _Path;

		// ------------------------------------------------

		static default(): Path;

		static copy(t: Path): Path;

		// ------------------------------------------------

		static value(t: JS_Path): Path;

		get value(): JS_Path;

		set value(t: JS_Path);

		// ------------------------------------------------

	}

	type JS_PathList = Array<string>;

	/** 文件路径列表 */
	class PathList {

		// ------------------------------------------------

		private _PathList;

		// ------------------------------------------------

		static default(): PathList;

		static copy(t: PathList): PathList;

		// ------------------------------------------------

		static value(t: JS_PathList): PathList;

		get value(): JS_PathList;

		set value(t: JS_PathList);

		// ------------------------------------------------

	}

	// ------------------------------------------------

	type JS_SizeOptional = null | JS_Size;

	/** Optional包装的Path */
	class SizeOptional {

		// ------------------------------------------------

		private _SizeOptional;

		// ------------------------------------------------

		static default(): SizeOptional;

		static copy(t: SizeOptional): SizeOptional;

		// ------------------------------------------------

		static value(t: JS_SizeOptional): SizeOptional;

		get value(): JS_SizeOptional;

		set value(t: JS_SizeOptional);

		// ------------------------------------------------

	}

	type JS_PathOptional = null | JS_Path;

	/** Optional包装的Size */
	class PathOptional {

		// ------------------------------------------------

		private _PathOptional;

		// ------------------------------------------------

		static default(): PathOptional;

		static copy(t: PathOptional): PathOptional;

		// ------------------------------------------------

		static value(t: JS_PathOptional): PathOptional;

		get value(): JS_PathOptional;

		set value(t: JS_PathOptional);

		// ------------------------------------------------

	}

	// ------------------------------------------------

	type JS_ByteArray = ArrayBuffer;

	/** 字节序列容器 */
	class ByteArray {

		// ------------------------------------------------

		private _ByteArray;

		// ------------------------------------------------

		static default(): ByteArray;

		static copy(t: ByteArray): ByteArray;

		// ------------------------------------------------

		static value(t: JS_ByteArray): ByteArray;

		get value(): JS_ByteArray;

		set value(t: JS_ByteArray);

		// ------------------------------------------------

		/**
		 * 根据所给大小构造数组
		 * @param size 数组大小
		 */
		static alloc(
			size: Size,
		): ByteArray;

		// ------------------------------------------------

		/**
		 * 分配新数组
		 * @param size 新数组的大小
		 */
		alloc(
			size: Size,
		): None;

		/**
		 * 释放数组
		 * 
		 * 释放之后表现为nullptr起始、0大小
		 */
		free(
		): None;

		// ------------------------------------------------

		/**
		 * 获取序列大小
		 * @returns 序列大小
		 */
		size(
		): Size;

		// ------------------------------------------------

		/**
		 * 获取观测本序列的视图
		 * @returns 观测本序列的视图
		 */
		view(
		): ByteListView;

		// ------------------------------------------------

		/**
		 * 移交内存的所有权给所返回的ArrayBuffer对象，调用之后对象表现为释放之后的状态
		 */
		release(
		): JS_ByteArray;

		// ------------------------------------------------

	}

	// ------------------------------------------------

	type JS_ByteListView = ArrayBuffer;

	/** 字节序列视图 */
	class ByteListView {

		// ------------------------------------------------

		private _ByteListView;

		// ------------------------------------------------

		static default(): ByteListView;

		static copy(t: ByteListView): ByteListView;

		// ------------------------------------------------

		static value(t: JS_ByteListView): ByteListView;

		get value(): JS_ByteListView;

		set value(t: JS_ByteListView);

		// ------------------------------------------------

		/**
		 * 获取视图大小
		 * @returns 视图大小
		 */
		size(
		): Size;

		// ------------------------------------------------

		/**
		 * 获取子视图
		 * @param begin 起始位置
		 * @param size 大小
		 * @returns 子视图
		 */
		sub_view(
			begin: Index,
			size: Size,
		): ByteListView;

		// ------------------------------------------------

	}

	type JS_ConstantByteListView = JS_ByteListView;

	/** 常量字节序列视图 */
	type ConstantByteListView = ByteListView;

	// ------------------------------------------------

	/** 字节流视图 */
	class ByteStreamView {

		// ------------------------------------------------

		private _ByteStreamView;

		// ------------------------------------------------

		static default(): ByteStreamView;

		static copy(t: ByteStreamView): ByteStreamView;

		// ------------------------------------------------

		/**
		 * 使用字节序列视图作为观测对象，初始流位置为0
		 * @param list 观测对象
		 */
		static look(
			list: ByteListView,
		): ByteStreamView;

		// ------------------------------------------------

		/**
		 * 获取视图大小
		 * @returns 视图大小
		 */
		size(
		): Size;

		// ------------------------------------------------

		/**
		 * 获取流所处的位置，即已流经的字节数
		 * @returns 流所处的位置
		 */
		position(
		): Index;

		/**
		 * 设置流所处的位置
		 * @param position 位置，不可大于视图的大小
		 */
		set_position(
			position: Index,
		): None;

		// ------------------------------------------------

		/**
		 * 获取观测完整序列的视图，即 [ 0, size() )
		 * @returns 观测完整序列的视图
		 */
		view(
		): ByteListView;

		/**
		 * 获取观测已流经序列的视图，即 [ 0, position() )
		 * @returns 观测已流经序列的视图
		 */
		stream_view(
		): ByteListView;

		// ------------------------------------------------

		/**
		 * 从流的当前位置读取一个字节
		 * @returns 读取到的字节
		 */
		read(
		): Byte;

		/**
		 * 向流的当前位置写入一个字节
		 * @param value 字节值
		 */
		write(
			value: Byte,
		): None;

		// ------------------------------------------------

	}

	/** 字节输入流视图 */
	type IByteStreamView = ByteStreamView;

	/** 字节输出流视图 */
	type OByteStreamView = ByteStreamView;

	/** 字节流读写数据时是否使用大端序，默认为false */
	const g_byte_stream_use_big_endian: Boolean;

	// ------------------------------------------------

	/** 字符序列视图 */
	class CharacterListView {

		// ------------------------------------------------

		private _CharacterListView;

		// ------------------------------------------------

		static default(): CharacterListView;

		static copy(t: CharacterListView): CharacterListView;

		// ------------------------------------------------

		/**
		 * 获取视图大小
		 * @returns 视图大小
		 */
		size(
		): Size;

		// ------------------------------------------------

		/**
		 * 获取子视图
		 * @param begin 起始位置
		 * @param size 大小
		 * @returns 子视图
		 */
		sub_view(
			begin: Index,
			size: Size,
		): CharacterListView;

		// ------------------------------------------------

	}

	/** 常量字符序列视图 */
	type ConstantCharacterListView = CharacterListView;

	// ------------------------------------------------

	/** 字符流视图 */
	class CharacterStreamView {

		// ------------------------------------------------

		private _CharacterStreamView;

		// ------------------------------------------------

		static default(): CharacterStreamView;

		static copy(t: CharacterStreamView): CharacterStreamView;

		// ------------------------------------------------

		/**
		 * 使用字符序列视图作为观测对象，初始流位置为0
		 * @param list 观测对象
		 */
		static look(
			list: CharacterListView,
		): CharacterStreamView;

		// ------------------------------------------------

		/**
		 * 获取视图大小
		 * @returns 视图大小
		 */
		size(
		): Size;

		// ------------------------------------------------

		/**
		 * 获取流所处的位置，即已流经的字符数
		 * @returns 流所处的位置
		 */
		position(
		): Index;

		/**
		 * 设置流所处的位置
		 * @param position 位置，不可大于视图的大小
		 */
		set_position(
			position: Index,
		): None;

		// ------------------------------------------------

		/**
		 * 获取观测完整序列的视图，即 [ 0, size() )
		 * @returns 观测完整序列的视图
		 */
		view(
		): CharacterListView;

		/**
		 * 获取观测已流经序列的视图，即 [ 0, position() )
		 * @returns 观测已流经序列的视图
		 */
		stream_view(
		): CharacterListView;

		// ------------------------------------------------

	}

	/** 字符输入流视图 */
	type ICharacterStreamView = CharacterStreamView;

	/** 字符输出流视图 */
	type OCharacterStreamView = CharacterStreamView;

	// ------------------------------------------------

	/** 文件系统 */
	namespace FileSystem {

		// ------------------------------------------------

		/**
		 * 判断路径是否存在
		 * @param path 路径
		 * @returns 路径存在与否
		 */
		function exist(
			path: Path,
		): Boolean;

		/**
		 * 判断路径是否存在且为文件
		 * @param path 文件路径
		 * @returns 文件存在与否
		 */
		function exist_file(
			path: Path,
		): Boolean;

		/**
		 * 判断路径是否存在且为目录
		 * @param path 目录路径
		 * @returns 目录存在与否
		 */
		function exist_directory(
			path: Path,
		): Boolean;

		// ------------------------------------------------

		/**
		 * 创建目录
		 * @param path 目录路径
		 */
		function create_directory(
			path: Path,
		): None;

		/**
		 * 获取当前工作目录
		 * @returns 当前工作目录
		 */
		function current_directory(
		): Path;

		/**
		 * 改变当前工作目录
		 * @param path 目录路径
		 */
		function change_directory(
			path: Path,
		): None;

		// ------------------------------------------------

		/**
		 * 复制文件或目录
		 * @param source 源路径
		 * @param dest 目的路径
		 */
		function copy(
			source: Path,
			dest: Path,
		): None;

		/**
		 * 删除文件或目录
		 * @param path 路径
		 */
		function remove(
			path: Path,
		): None;

		/**
		 * 移动文件或目录
		 * @param old_path 旧路径
		 * @param new_path 新路径
		 */
		function rename(
			old_path: Path,
			new_path: Path,
		): None;

		// ------------------------------------------------

		/**
		 * 创建符号链接
		 * @param link 链接路径
		 * @param target 目标路径，即链接指向的路径，可以不存在或为非法
		 * @param is_directory 指向路径是否为目录；是则调用std::filesystem::create_directory_symlink，否则调用std::filesystem::create_symlink
		 */
		function create_link(
			link: Path,
			target: Path,
			is_directory: Boolean,
		): None;

		/**
		 * 创建硬链接
		 * @param target 目标路径，即链接指向的路径，必须存在
		 * @param link 链接路径
		 */
		function create_hard_link(
			link: Path,
			target: Path,
		): None;

		// ------------------------------------------------

		/**
		 * 计数父目录下的文件与目录
		 * @param directory 父目录路径
		 * @param depth 需要计算的深度，为空时计算所有层级
		 * @returns 父目录下的文件与目录数
		 */
		function count(
			directory: Path,
			depth: SizeOptional,
		): Size;

		/**
		 * 计数父目录下的文件
		 * @param directory 父目录路径
		 * @param depth 需要计算的深度，为空时计算所有层级
		 * @returns 父目录下的文件数
		 */
		function count_file(
			directory: Path,
			depth: SizeOptional,
		): Size;

		/**
		 * 计数父目录下的目录
		 * @param directory 父目录路径
		 * @param depth 需要计算的深度，为空时计算所有层级
		 * @returns 父目录下的目录数
		 */
		function count_directory(
			directory: Path,
			depth: SizeOptional,
		): Size;

		// ------------------------------------------------

		/**
		 * 获取父目录下的文件与目录路径
		 * @param directory 父目录路径
		 * @param depth 需要获取的深度，为空时获取所有层级
		 * @returns 父目录下的文件与目录路径列表
		 */
		function list(
			directory: Path,
			depth: SizeOptional,
		): PathList;

		/**
		 * 获取父目录下的文件路径
		 * @param directory 父目录路径
		 * @param depth 需要获取的深度，为空时获取所有层级
		 * @returns 父目录下的文件路径列表
		 */
		function list_file(
			directory: Path,
			depth: SizeOptional,
		): PathList;

		/**
		 * 获取父目录下的目录路径
		 * @param directory 父目录路径
		 * @param depth 需要获取的深度，为空时获取所有层级
		 * @returns 父目录下的目录路径列表
		 */
		function list_directory(
			directory: Path,
			depth: SizeOptional,
		): PathList;

		// ------------------------------------------------

		/**
		 * 获取文件大小
		 * @param path 文件路径
		 * @returns 文件大小
		 */
		function file_size(
			path: Path,
		): Size;

		/**
		 * 读取文件内容到一个新的字节序列容器
		 * @param path 文件路径
		 * @returns 文件内容
		 */
		function read_file(
			path: Path,
		): ByteArray;

		/**
		 * 读取文件内容到字节输出流中
		 * @param path 文件路径
		 * @param data 文件内容
		 */
		function read_file_to(
			path: Path,
			data: OByteStreamView,
		): None;

		/**
		 * 将字节序列写入文件
		 * @param path 文件路径
		 * @param data 文件内容
		 */
		function write_file(
			path: Path,
			data: ConstantByteListView,
		): None;

		// ------------------------------------------------

	}

	/** JSON */
	namespace JSON {

		type JS_Value = null | boolean | number | bigint | string | JS_Value[] | { [key: string]: JS_Value; };

		/**
		 * 标准JSON值类型，允许 null、boolean、number、bigint(拓展)、string、array、object
		 * ConstraintT是为在 JS_Value 基础上对值的进一步约束，仅用于TS的静态类型检查
		 */
		class Value<ConstraintT extends JS_Value = JS_Value> {

			// ------------------------------------------------

			private _JSON_Value: ConstraintT;

			// ------------------------------------------------

			static default<ConstraintT extends JS_Value>(): Value<ConstraintT>;

			static copy<ConstraintT extends JS_Value>(t: Value<ConstraintT>): Value<ConstraintT>;

			// ------------------------------------------------

			static value<ConstraintT extends JS_Value>(t: ConstraintT): Value<ConstraintT>;

			get value(): ConstraintT;

			set value(t: ConstraintT);

			// ------------------------------------------------

			static json<ConstraintT extends JS_Value>(t: JSON.Value<ConstraintT>): Value<ConstraintT>;

			get json(): JSON.Value<ConstraintT>;

			set json(t: JSON.Value<ConstraintT>);

			// ------------------------------------------------

		}

		/** 写 */
		namespace Write {

			/**
			 * 写至字符串
			 * @param value JSON
			 * @param string 字符串
			 * @param disable_trailing_comma 禁用尾随逗号
			 * @param disable_array_wrap_line 禁用数组元素换行
			 * @param indent_level 缩进计数
			 */
			function write<ConstraintT extends JS_Value>(
				string: OCharacterStreamView,
				value: Value<ConstraintT>,
				disable_trailing_comma: Boolean,
				disable_array_wrap_line: Boolean,
				indent_level: Size,
			): None;

		}

		/** 读 */
		namespace Read {

			/**
			 * 读自字符串
			 * @param string 字符串
			 * @param value JSON
			 */
			function read<ConstraintT extends JS_Value>(
				string: ICharacterStreamView,
				value: Value<ConstraintT>,
			): None;

		}

	}

	/** XML */
	namespace XML {

		/** 结点类型 */
		type JS_Type = 'element' | 'text' | 'comment';

		/** 元素 */
		type JS_Element = {
			/** 名称 */
			name: JS_String,
			/** 属性 */
			attribute: Record<JS_String, JS_String>,
			/** 子结点 */
			child: Array<JS_Node>,
		};

		/** 文本 */
		type JS_Text = {
			/** 是否为cdata */
			cdata: JS_Boolean,
			/** 值 */
			value: JS_String,
		};

		/** 注释 */
		type JS_Comment = {
			/** 值 */
			value: JS_String,
		};

		/** 元素结点 */
		type JS_ElementNode = {
			type: 'element',
			value: JS_Element,
		};

		/** 注释结点 */
		type JS_TextNode = {
			type: 'text',
			value: JS_Text,
		};

		/** 注释结点 */
		type JS_CommentNode = {
			type: 'comment',
			value: JS_Comment,
		};

		/** 结点 */
		type JS_Node = JS_ElementNode | JS_TextNode | JS_CommentNode;

		/** 结点 */
		class Node {

			// ------------------------------------------------

			private _XML_Node;

			// ------------------------------------------------

			static default(): Node;

			static copy(t: Node): Node;

			// ------------------------------------------------

			static value(t: JS_Node): Node;

			get value(): JS_Node;

			set value(t: JS_Node);

			// ------------------------------------------------

		}

		/** 写 */
		namespace Write {

			/**
			 * 写至字符串
			 * @param value XML
			 * @returns 字符串
			 */
			function write(
				value: Node,
			): String;

		}

		/** 读 */
		namespace Read {

			/**
			 * 读自字符串
			 * @param string 字符串
			 * @returns XML
			 */
			function read(
				string: ConstantCharacterListView,
			): Node;

		}

	}

	/** 工具 */
	namespace Tool {

		/** 通用数据处理 */
		namespace Data {

			/** 编码 */
			namespace Encode {

				/** Base64 */
				namespace Base64 {

					/** 编码 */
					namespace Encode {

						/**
						 * 计算编码后数据的大小
						 * @param raw_size 原始数据大小
						 * @returns 编码后数据的大小
						 */
						function compute_ripe_size(
							raw_size: Size,
						): Size;

						/**
						 * 编码
						 * @param raw 原始数据
						 * @param ripe 编码后数据
						 */
						function encode(
							raw: IByteStreamView,
							ripe: OCharacterStreamView,
						): None;

					}

					/** 解码 */
					namespace Decode {

						/**
						 * 计算原始数据的大小
						 * @param ripe 编码后数据
						 * @returns 原始数据的大小
						 */
						function compute_raw_size(
							ripe: ConstantCharacterListView,
						): Size;

						/**
						 * 解码
						 * @param ripe 编码后数据
						 * @param raw 原始数据
						 */
						function decode(
							ripe: ICharacterStreamView,
							raw: OByteStreamView,
						): None;

					}

				}

			}

			/** 加密 */
			namespace Encrypt {

				/** 异或 */
				namespace XOR {

					/**
					 * 加密
					 * @param plain 原始数据
					 * @param cipher 加密后数据
					 * @param key 密钥
					 */
					function crypt(
						plain: IByteStreamView,
						cipher: OByteStreamView,
						key: Byte,
					): None;

				}

				// /** Rijndael */
				// namespace Rijndael {

				// 	/** 加密 */
				// 	namespace Encrypt {

				// 		/**
				// 		 * 加密
				// 		 * @param plain 明文数据
				// 		 * @param cipher 密文数据
				// 		 * @param block_size 只允许4、6、8
				// 		 * @param key_size 只允许4、6、8
				// 		 * @param key 密钥
				// 		 * @param iv 初始向量
				// 		 */
				// 		function encrypt(
				// 			plain: IIntegerU32StreamView,
				// 			cipher: OIntegerU32StreamView,
				// 			block_size: Size,
				// 			key_size: Size,
				// 			key: String,
				// 			iv: String,
				// 		): None;

				// 	}

				// 	/** 解密 */
				// 	namespace Decrypt {

				// 		/**
				// 		 * 解密
				// 		 * @param cipher 密文数据
				// 		 * @param plain 明文数据
				// 		 * @param block_size 只允许4、6、8
				// 		 * @param key_size 只允许4、6、8
				// 		 * @param key 密钥
				// 		 * @param iv 初始向量
				// 		 */
				// 		function decrypt(
				// 			cipher: IIntegerU32StreamView,
				// 			plain: OIntegerU32StreamView,
				// 			block_size: Size,
				// 			key_size: Size,
				// 			key: String,
				// 			iv: String,
				// 		): None;

				// 	}

				// }

			}

			/** 压缩 */
			namespace Compress {

				/** ZLib */
				namespace ZLib {

					/** 压缩 */
					namespace Compress {

						/**
						 * 计算压缩后数据的大小的最大可能值
						 * @param raw_size 原始数据大小
						 * @returns 压缩后数据的大小的最大可能值
						 */
						function compute_ripe_size_bound(
							raw_size: Size,
						): Size;

						/**
						 * 压缩
						 * @param raw 原始数据
						 * @param ripe 压缩后数据
						 * @param level 压缩级别(0~9)
						 */
						function compress(
							raw: IByteStreamView,
							ripe: OByteStreamView,
							level: Size,
						): None;

					}

					/** 解压 */
					namespace Uncompress {

						/**
						 * 解压
						 * @param ripe 压缩后数据
						 * @param raw 原始数据
						 */
						function uncompress(
							ripe: IByteStreamView,
							raw: OByteStreamView,
						): None;

					}

				}

				/** Lzma */
				namespace Lzma {

					/** 压缩 */
					namespace Compress {

						/**
						 * 压缩
						 * @param raw 原始数据
						 * @param ripe 压缩后数据
						 * @param props 压缩后数据的props
						 * @param level 压缩级别(0~9)
						 */
						function compress(
							raw: IByteStreamView,
							ripe: OByteStreamView,
							props: OByteStreamView,
							level: Size,
						): None;

					}

					/** 解压 */
					namespace Uncompress {

						/**
						 * 解压
						 * @param ripe 压缩后数据
						 * @param raw 原始数据
						 * @param props 压缩后数据的props
						 */
						function uncompress(
							ripe: IByteStreamView,
							raw: OByteStreamView,
							props: IByteStreamView,
						): None;

					}

				}

			}

			/** 哈希 */
			namespace Hash {

				/** FNV */
				namespace FNV {

					/**
					 * 计算32位FNV-1值
					 * @param data 数据
					 * @returns 32位FNV-1值
					 */
					function hash_1_32(
						data: ConstantByteListView,
					): IntegerU32;

					/**
					 * 计算64位FNV-1值
					 * @param data 数据
					 * @returns 64位FNV-1值
					 */
					function hash_1_64(
						data: ConstantByteListView,
					): IntegerU64;

					/**
					 * 计算32位FNV-1a值
					 * @param data 数据
					 * @returns 32位FNV-1a值
					 */
					function hash_1a_32(
						data: ConstantByteListView,
					): IntegerU32;

					/**
					 * 计算64位FNV-1a值
					 * @param data 数据
					 * @returns 64位FNV-1a值
					 */
					function hash_1a_64(
						data: ConstantByteListView,
					): IntegerU64;

				}

				/** MD5 */
				namespace MD5 {

					/**
					 * 计算MD5值
					 * @param data 数据
					 * @returns MD5值（字节数组表示）
					 */
					function hash(
						data: ConstantByteListView,
					): ByteArray;

					/**
					 * 计算MD5值，并将结果转换为字符串
					 * @param data 数据
					 * @param use_upper_case_number 使用大写数字
					 * @returns MD5值（字符串表示）
					 */
					function hash_to_string(
						data: ConstantByteListView,
						use_upper_case_number: Boolean,
					): String;

				}

			}

		}

		/** 数据包 */
		namespace Package {

			/** PopCap-PAK数据包 */
			namespace PopCapPAK {

				/** 清单信息 */
				namespace Information {

					namespace JS_N {

						/** 资源 */
						type Resource = {
							/** 路径 */
							path: string;
							/** 时间 */
							time: bigint;
						};

						/** 包 */
						type Package = {
							/** 版本 */
							version: bigint;
							/** 资源 */
							resource: Array<Resource>;
						};

					}

					/** 包 */
					class Package {

						// ------------------------------------------------

						private _Tool_Package_PopCapPAK_Information_Package;

						// ------------------------------------------------

						static default(): Package;

						static copy(t: Package): Package;

						// ------------------------------------------------

						static json(t: JSON.Value<JS_N.Package>): Package;

						get json(): JSON.Value<JS_N.Package>;

						set json(t: JSON.Value<JS_N.Package>);

						// ------------------------------------------------

					}

				}

				/** 打包 */
				namespace Pack {

					/**
					 * 打包
					 * @param package 包
					 * @param manifest 清单
					 * @param resource_directory 资源目录
					 */
					function pack(
						package: OByteStreamView,
						manifest: Information.Package,
						resource_directory: Path,
					): None;

				}

				/** 解包 */
				namespace Unpack {

					/**
					 * 解包
					 * @param package 包
					 * @param manifest 清单
					 * @param resource_directory 资源目录
					 */
					function unpack(
						package: IByteStreamView,
						manifest: Information.Package,
						resource_directory: PathOptional,
					): None;

				}

			}

			/** PopCap-DZ数据包 */
			namespace PopCapDZ {

				/** 清单信息 */
				namespace Information {

					namespace JS_N {

						/**
						 * 资源存储方式
						 * + regular 常规存储
						 * + compress 压缩存储（lzma）
						 * + special_chs 中文版中存在的特殊压缩存储（lzma），未明确
						 */
						type ResourceStoreMethod = 'regular' | 'compress' | 'special_chs';

						/** 资源 */
						type Resource = {
							/** 路径 */
							path: string;
							/** 存储方式 */
							store_method: ResourceStoreMethod;
						};

						/** 包 */
						type Package = {
							/** 资源 */
							resource: Array<Resource>;
						};

					}

					/** 包 */
					class Package {

						// ------------------------------------------------

						private _Tool_Package_PopCapDZ_Information_Package;

						// ------------------------------------------------

						static default(): Package;

						static copy(t: Package): Package;

						// ------------------------------------------------

						static json(t: JSON.Value<JS_N.Package>): Package;

						get json(): JSON.Value<JS_N.Package>;

						set json(t: JSON.Value<JS_N.Package>);

						// ------------------------------------------------

					}

				}

				/** 打包 */
				namespace Pack {

					/**
					 * 打包
					 * @param package 包
					 * @param manifest 清单
					 * @param resource_directory 资源目录
					 */
					function pack(
						package: OByteStreamView,
						manifest: Information.Package,
						resource_directory: Path,
					): None;

				}

				/** 解包 */
				namespace Unpack {

					/**
					 * 解包
					 * @param package 包
					 * @param manifest 清单
					 * @param resource_directory 资源目录
					 */
					function unpack(
						package: IByteStreamView,
						manifest: Information.Package,
						resource_directory: PathOptional,
					): None;

				}

			}

			/** PopCap-RSGP数据包 */
			namespace PopCapRSGP {

				/** 清单信息 */
				namespace Information {

					namespace JS_N {

						/**
						 * 资源类型
						 * + generic 常规资源
						 * + texture 纹理资源
						 */
						type ResourceType = 'generic' | 'texture';

						/** 常规资源信息 */
						type GenericResourceInformation = {
						};

						/** 纹理资源信息 */
						type TextureResourceInformation = {
							/** 索引 */
							index: bigint;
							/** 尺寸 */
							size: [bigint, bigint];
						};

						/** 资源信息 */
						type ResourceInformation = {
							type: 'generic';
							expand: GenericResourceInformation;
						} | {
							type: 'texture';
							expand: TextureResourceInformation;
						};

						/** 资源 */
						type Resource = {
							/** 路径 */
							path: string;
						} & ResourceInformation;

						/** 资源存储方式 */
						type ResourceStoreMethod = [
							/** 以zlib压缩常规资源数据 */
							boolean,
							/** 以zlib压缩纹理资源数据 */
							boolean,
						];

						/** 包 */
						type Package = {
							/** 版本 */
							version: bigint;
							/** 资源存储方式 */
							resource_store_method: ResourceStoreMethod;
							/** 资源 */
							resource: Array<Resource>;
						};

					}

					/** 包 */
					class Package {

						// ------------------------------------------------

						private _Tool_Package_PopCapRSGP_Information_Package;

						// ------------------------------------------------

						static default(): Package;

						static copy(t: Package): Package;

						// ------------------------------------------------

						static json(t: JSON.Value<JS_N.Package>): Package;

						get json(): JSON.Value<JS_N.Package>;

						set json(t: JSON.Value<JS_N.Package>);

						// ------------------------------------------------

					}

				}

				/**
				 * 打包
				 */
				namespace Pack {

					/**
					 * 打包
					 * @param package 包
					 * @param manifest 清单
					 * @param resource_directory 资源目录
					 */
					function pack(
						package: OByteStreamView,
						manifest: Information.Package,
						resource_directory: Path,
					): None;

				}

				/**
				 * 解包
				 */
				namespace Unpack {

					/**
					 * 解包
					 * @param package 包
					 * @param manifest 清单
					 * @param resource_directory 资源目录
					 */
					function unpack(
						package: IByteStreamView,
						manifest: Information.Package,
						resource_directory: PathOptional,
					): None;

				}

			}

			/** PopCap-RSB数据包 */
			namespace PopCapRSB {

				/** 清单信息 */
				namespace Information {

					namespace JS_N {

						/**
						 * 资源类型
						 * + generic 常规资源
						 * + texture 纹理资源
						 */
						type ResourceType = 'generic' | 'texture';

						/** 常规资源信息 */
						type GenericResourceInformation = {
						};

						/** 纹理资源信息 */
						type TextureResourceInformation = {
							/** 尺寸 */
							size: [bigint, bigint];
							/** 格式 */
							format: bigint;
						};

						/** 资源信息 */
						type ResourceInformation = {
							type: 'generic';
							expand: GenericResourceInformation;
						} | {
							type: 'texture';
							expand: TextureResourceInformation;
						};

						/** 资源 */
						type Resource = {
							/** 路径 */
							path: string;
						} & ResourceInformation;

						/** 资源存储方式 */
						type ResourceStoreMethod = [
							/** 以zlib压缩常规资源数据 */
							boolean,
							/** 以zlib压缩纹理资源数据 */
							boolean,
						];

						/** 子群类别 */
						type SubgroupCategory = [null | bigint, null | string];

						/** 子群 */
						type Subgroup = {
							/** 类别 */
							category: SubgroupCategory;
							/** 版本 */
							version: bigint;
							/** 资源存储方式 */
							resource_store_method: ResourceStoreMethod;
							/** 资源 */
							resource: Array<Resource>;
						};

						/** 群 */
						type Group = {
							/** 是否为复合群 */
							composite: boolean;
							/** 子群 */
							subgroup: Record<string, Subgroup>;
						};

						/** 包 */
						type Package = {
							/** 版本 */
							version: bigint;
							/** 启用拓展纹理信息（安卓中文版） */
							expand_texture_information: boolean;
							/** 群 */
							group: Record<string, Group>;
						};

					}

					/** 包 */
					class Package {

						// ------------------------------------------------

						private _Tool_Package_PopCapRSB_Information_Package;

						// ------------------------------------------------

						static default(): Package;

						static copy(t: Package): Package;

						// ------------------------------------------------

						static json(t: JSON.Value<JS_N.Package>): Package;

						get json(): JSON.Value<JS_N.Package>;

						set json(t: JSON.Value<JS_N.Package>);

						// ------------------------------------------------

					}

				}

				/** 打包 */
				namespace Pack {

					/**
					 * 打包
					 * @param package 包
					 * @param manifest 清单
					 * @param resource_manifest 资源清单
					 * @param resource_directory 资源目录
					 * @param packet_file RSGP子包文件
					 * @param new_packet_file 新生成RSGP子包文件
					 */
					function pack(
						package: OByteStreamView,
						manifest: Information.Package,
						resource_manifest: Null,
						resource_directory: Path,
						packet_file: PathOptional,
						new_packet_file: PathOptional,
					): None;

				}

				/** 解包 */
				namespace Unpack {

					/**
					 * 解包
					 * @param package 包
					 * @param manifest 清单
					 * @param resource_manifest 资源清单
					 * @param resource_directory 资源目录
					 * @param packet_file RSGP子包文件
					 */
					function unpack(
						package: IByteStreamView,
						manifest: Information.Package,
						resource_manifest: Null,
						resource_directory: PathOptional,
						packet_file: PathOptional,
					): None;

				}

			}

		}

		/** 图像 */
		namespace Image {

			// ------------------------------------------------

			type JS_ImageSize = [JS_Size, JS_Size];

			/** 表征图像尺寸的整数组 */
			class ImageSize {

				// ------------------------------------------------

				private _Tool_Image_ImageSize;

				// ------------------------------------------------

				static default(): ImageSize;

				static copy(t: ImageSize): ImageSize;

				// ------------------------------------------------

				static value(t: JS_ImageSize): ImageSize;

				get value(): JS_ImageSize;

				set value(t: JS_ImageSize);

				// ------------------------------------------------

			}

			type JS_ImagePosition = [JS_Index, JS_Index];

			/** 表征图像位置的整数组 */
			class ImagePosition {

				// ------------------------------------------------

				private _Tool_Image_ImagePosition;

				// ------------------------------------------------

				static default(): ImagePosition;

				static copy(t: ImagePosition): ImagePosition;

				// ------------------------------------------------

				static value(t: JS_ImagePosition): ImagePosition;

				get value(): JS_ImagePosition;

				set value(t: JS_ImagePosition);

				// ------------------------------------------------

			}

			type JS_Pixel32 = [JS_IntegerU8, JS_IntegerU8, JS_IntegerU8, JS_IntegerU8];

			/** 像素 */
			class Pixel32 {

				// ------------------------------------------------

				private _Tool_Image_Pixel32;

				// ------------------------------------------------

				static default(): Pixel32;

				static copy(t: Pixel32): Pixel32;

				// ------------------------------------------------

				static value(t: JS_Pixel32): Pixel32;

				get value(): JS_Pixel32;

				set value(t: JS_Pixel32);

				// ------------------------------------------------

			}

			// ------------------------------------------------

			/** 位图 */
			class Bitmap {

				// ------------------------------------------------

				private _Tool_Image_Bitmap;

				// ------------------------------------------------

				static default(): Bitmap;

				static copy(t: Bitmap): Bitmap;

				// ------------------------------------------------

				/**
				 * 根据所给大小构造位图
				 * @param size 位图大小
				 */
				static alloc(
					size: ImageSize,
				): Bitmap;

				// ------------------------------------------------

				/**
				 * 分配新位图
				 * @param size 新位图的大小
				 */
				alloc(
					size: ImageSize,
				): None;

				/**
				 * 释放位图
				 */
				free(
				): None;

				// ------------------------------------------------

				/**
				 * 获取位图大小
				 * @returns 位图大小
				 */
				size(
				): ImageSize;

				// ------------------------------------------------

				/**
				 * 获取观测本位图的视图
				 * @returns 观测本位图的视图
				 */
				view(
				): BitmapView;

				// ------------------------------------------------

			}

			/** 位图视图 */
			class BitmapView {

				// ------------------------------------------------

				private _Tool_Image_BitmapView;

				// ------------------------------------------------

				static default(): BitmapView;

				static copy(t: BitmapView): BitmapView;

				// ------------------------------------------------

				/**
				 * 获取视图大小
				 * @returns 视图大小
				 */
				size(
				): ImageSize;

				// ------------------------------------------------

				/**
				 * 获取子视图
				 * @param position 起始位置
				 * @param size 大小
				 * @returns 子视图
				 */
				sub_view(
					position: ImagePosition,
					size: ImageSize,
				): BitmapView;

				// ------------------------------------------------

				/**
				 * 以像素填充视图
				 * @param pixel 像素
				 */
				fill(
					pixel: Pixel32,
				): None;

				/**
				 * 以图像填充视图
				 * @param image 图像
				 */
				draw(
					image: BitmapView,
				): None;

				// ------------------------------------------------

			}

			/** 常量位图视图 */
			type ConstantBitmapView = BitmapView;

			// ------------------------------------------------

			type JS_TextureChannel = 'a_8' | 'rgb_888' | 'rgba_8888' | 'rgb_565_l' | 'rgba_4444_l' | 'rgba_5551_l' | 'argb_4444_l' | 'argb_8888_l';

			/**
			 * 纹理通道枚举
			 * + a_8
			 * + rgb_888
			 * + rgba_8888
			 * + rgb_565_l
			 * + rgba_4444_l
			 * + rgba_5551_l
			 * + argb_4444_l
			 * + argb_8888_l
			 */
			class TextureChannel {

				// ------------------------------------------------

				private _Tool_Image_TextureChannel;

				// ------------------------------------------------

				static default(): TextureChannel;

				static copy(t: TextureChannel): TextureChannel;

				// ------------------------------------------------

				static value(t: JS_TextureChannel): TextureChannel;

				get value(): JS_TextureChannel;

				set value(t: JS_TextureChannel);

				// ------------------------------------------------

			}

			/** 编码 */
			namespace Encode {

				/**
				 * 编码
				 * @param image 图像
				 * @param data 数据
				 * @param channel 纹理通道
				 */
				function encode(
					image: ConstantBitmapView,
					data: OByteStreamView,
					channel: TextureChannel,
				): None;

			}

			/** 解码 */
			namespace Decode {

				/**
				 * 解码
				 * @param data 数据
				 * @param image 图像
				 * @param channel 纹理通道
				 */
				function decode(
					data: IByteStreamView,
					image: BitmapView,
					channel: TextureChannel,
				): None;

			}

			// ------------------------------------------------

			/** 压缩 */
			namespace Compress {

				/** ETC1 */
				namespace ETC1 {

					/** 压缩 */
					namespace Compress {

						/**
						 * 压缩
						 * @param image 图像
						 * @param data 数据
						 */
						function compress(
							image: ConstantBitmapView,
							data: OByteStreamView,
						): None;

					}

					/** 解压 */
					namespace Uncompress {

						/**
						 * 解压
						 * @param data 数据
						 * @param image 图像
						 */
						function uncompress(
							data: IByteStreamView,
							image: BitmapView,
						): None;

					}

				}

				/** PVRTC4 */
				namespace PVRTC4 {

					/** 压缩 */
					namespace Compress {

						/**
						 * 压缩
						 * @param image 图像
						 * @param data 数据
						 * @param with_alpha 是否将alpha通道压缩进数据
						 */
						function compress(
							image: ConstantBitmapView,
							data: OByteStreamView,
							with_alpha: Boolean,
						): None;

					}

					/** 解压 */
					namespace Uncompress {

						/**
						 * 解压
						 * @param data 数据
						 * @param image 图像
						 * @param with_alpha 是否将alpha通道解压至图像
						 */
						function uncompress(
							data: IByteStreamView,
							image: BitmapView,
							with_alpha: Boolean,
						): None;

					}

				}

			}

			// ------------------------------------------------

			/** 文件支持 */
			namespace File {

				/** PNG文件 */
				namespace PNG {

					/**
					 * 获取PNG的图像尺寸
					 * @param data 数据
					 * @returns 图像尺寸
					 */
					function size(
						data: ConstantByteListView,
					): ImageSize;

					/**
					 * 读取PNG
					 * @param data 数据
					 * @returns 图像
					 */
					function read(
						data: IByteStreamView,
					): Bitmap;

					/**
					 * 读取PNG到图像中
					 * @param data 数据
					 * @param image 图像，尺寸须与PNG图像尺寸相等
					 */
					function read_to(
						data: IByteStreamView,
						image: BitmapView,
					): None;

					/**
					 * 将图像写为PNG
					 * @param data 数据
					 * @param image 图像
					 */
					function write(
						data: OByteStreamView,
						image: ConstantBitmapView,
					): None;

					/**
					 * 获取PNG文件的图像尺寸
					 * @param path 文件路径
					 * @returns 图像尺寸
					 */
					function size_file(
						path: Path,
					): ImageSize;

					/**
					 * 读取PNG文件
					 * @param path 文件路径
					 * @returns 图像
					 */
					function read_file(
						path: Path,
					): Bitmap;

					/**
					 * 读取PNG文件到图像中
					 * @param path 文件路径
					 * @param image 图像，尺寸须与PNG图像尺寸相等
					 */
					function read_file_to(
						path: Path,
						image: BitmapView,
					): None;

					/**
					 * 将图像写为PNG文件
					 * @param path 文件路径
					 * @param image 图像
					 */
					function write_file(
						path: Path,
						image: ConstantBitmapView,
					): None;

				}

			}

			// ------------------------------------------------

		}

		/** 动画 */
		namespace Animation {

			/** PopCap-Animation (aka PAM) */
			namespace PopCapAnimation {

				/** PAM信息 */
				namespace Information {

					namespace JS_N {

						/** 矩阵，2x3变换矩阵除去xy的部分 */
						type Matrix = [number, number, number, number];

						/** 旋转，可转换为一个矩阵 */
						type Rotate = [number];

						/** 平移，2x3变换矩阵的xy部分 */
						type Translate = [number, number];

						/** 矩阵与平移 */
						type MatrixAndTranslate = [...Matrix, ...Translate];

						/** 旋转与平移 */
						type RotateAndTranslate = [...Rotate, ...Translate];

						/** 变换变体 */
						type VariantTransform = Translate | MatrixAndTranslate | RotateAndTranslate;

						/** 变换 */
						type Transform = MatrixAndTranslate;

						/** 颜色 */
						type Color = [number, number, number, number];

						/** 命令 */
						type Command = {
							/** 命令 */
							command: string;
							/** 参数 */
							parameter: string;
						};

						/** 层移除 */
						type LayerRemove = {
							/** 索引 */
							index: bigint;
						};

						/** 层添加 */
						type LayerAppend = {
							/** 索引 */
							index: bigint;
							/** 名称 */
							name: null | string;
							/** 资源索引 */
							resource: bigint;
							/** 是否为精灵 */
							sprite: boolean;
						};

						/** 层变换 */
						type LayerChange = {
							/** 索引 */
							index: bigint;
							/** 变换 */
							transform: VariantTransform;
							/** 颜色 */
							color: null | Color;
						};

						/** 帧 */
						type Frame = {
							/** 标签 */
							label: null | string;
							/** 停止 */
							stop: boolean;
							/** 命令 */
							command: Array<Command>;
							/** 层移除 */
							remove: Array<LayerRemove>;
							/** 层添加 */
							append: Array<LayerAppend>;
							/** 层变换 */
							change: Array<LayerChange>;
						};

						/** 图像 */
						type Image = {
							/** 名称 */
							name: string;
							/** 尺寸 */
							size: [bigint, bigint];
							/** 变换 */
							transform: Transform;
						};

						/** 精灵 */
						type Sprite = {
							/** 名称 */
							name: string;
							/** 帧率 */
							frame_rate: number;
							/** 工作区间 */
							work_area: [bigint, bigint];
							/** 帧 */
							frame: Array<Frame>;
						};

						/** 动画 */
						type Animation = {
							/** 版本 */
							version: bigint;
							/** 帧率 */
							frame_rate: bigint;
							/** 位置 */
							position: [number, number];
							/** 尺寸 */
							size: [number, number];
							/** 图像 */
							image: Array<Image>;
							/** 精灵 */
							sprite: Array<Sprite>;
							/** 主精灵 */
							main_sprite: Sprite;
						};

					}

					/** 包 */
					class Animation {

						// ------------------------------------------------

						private _Tool_Animation_PopCapAnimation_Information_Animation;

						// ------------------------------------------------

						static default(): Animation;

						static copy(t: Animation): Animation;

						// ------------------------------------------------

						static json(t: JSON.Value<JS_N.Animation>): Animation;

						get json(): JSON.Value<JS_N.Animation>;

						set json(t: JSON.Value<JS_N.Animation>);

						// ------------------------------------------------

					}

				}

				/** 编码 */
				namespace Encode {

					/**
					 * 编码
					 * @param data 数据
					 * @param information 信息
					 */
					function encode(
						data: OByteStreamView,
						information: Information.Animation,
					): None;

				}

				/** 解码 */
				namespace Decode {

					/**
					 * 解码
					 * @param data 数据
					 * @param information 信息
					 */
					function decode(
						data: IByteStreamView,
						information: Information.Animation,
					): None;

				}

			}

		}

		/** 音频处理 */
		namespace Audio {

			/** Wwise SoundBank (aka BNK) */
			namespace WwiseSoundBank {

				/** BNK信息 */
				namespace Information {

					namespace JS_N {

						/** BKHD */
						type BKHD = {
							/** 版本 */
							version: bigint;
							/** ID */
							id: bigint;
							/** 拓展（十六进制字符串表示的二进制数据） */
							expand: string;
						};

						/** DIDX */
						type DIDX = {
							/** ID */
							id: bigint;
						};

						/** HIRC */
						type HIRC = {
							/** ID */
							id: bigint;
							/** 类型 */
							type: bigint;
							/** 数据（十六进制字符串表示的二进制数据） */
							data: string;
						};

						/** STID */
						type STID = {
							/** 名称 */
							name: string;
						};

						/** 包 */
						type Package = {
							/** bkhd */
							bkhd: BKHD;
							/** didx */
							didx: null | Array<DIDX>;
							/** hirc */
							hirc: null | Array<HIRC>;
							/** stid */
							stid: null | Array<STID>;
							/** 其他块的ID */
							other: Array<string>;
						};

					}

					/** 包 */
					class Package {

						// ------------------------------------------------

						private _Tool_Audio_WwiseSoundBank_Information_Package;

						// ------------------------------------------------

						static default(): Package;

						static copy(t: Package): Package;

						// ------------------------------------------------

						static json(t: JSON.Value<JS_N.Package>): Package;

						get json(): JSON.Value<JS_N.Package>;

						set json(t: JSON.Value<JS_N.Package>);

						// ------------------------------------------------

					}

				}

				/** 打包 */
				namespace Pack {

					/**
					 * 打包
					 * @param package 包
					 * @param manifest 清单
					 * @param extra_directory 附加数据目录
					 */
					function pack(
						package: OByteStreamView,
						manifest: Information.Package,
						extra_directory: Path,
					): None;

				}

				/** 解包 */
				namespace Unpack {

					/**
					 * 解包
					 * @param package 包
					 * @param manifest 清单
					 * @param extra_directory 附加数据目录
					 */
					function unpack(
						package: IByteStreamView,
						manifest: Information.Package,
						extra_directory: PathOptional,
					): None;

				}

			}

			/** Wwise EncodedMedia (aka WEM) */
			namespace WwiseEncodedMedia {

				/** 解码 */
				namespace Decode {

					/**
					 * 解码
					 * @param ripe 已编码的音频数据
					 * @param ffmpeg_file ffmpeg可执行文件的路径，pcm、aac、vorbis音频解码时需要调用该程序
					 * @param ww2ogg_file ww2ogg可执行文件的路径，vorbis音频解码时需要调用该程序
					 * @param ww2ogg_pcb_file ww2ogg-pcb文件的路径，vorbis音频解码时需要使用该文件
					 * @param temp_directory 临时文件目录
					 * @returns 解码后的音频数据
					 */
					function decode(
						ripe: ConstantByteListView,
						ffmpeg_file: Path,
						ww2ogg_file: Path,
						ww2ogg_pcb_file: Path,
						temp_directory: Path,
					): ByteArray;

				}

			}

		}

		/** 其他 */
		namespace Other {

			/** PopCap-RTON */
			namespace PopCapRTON {

				/** RTON所能存储的JSON值类型 */
				type JS_ValidValue = boolean | number | bigint | string | JS_ValidValue[] | { [key: string]: JS_ValidValue; };

				/** 编码 */
				namespace Encode {

					/**
					 * 编码
					 * @param json json
					 * @param rton rton
					 * @param enable_string_index 启用字符串索引，若是，确保同一字符串只会明文编码一次，之后只使用索引值，可减少编码出的rton的大小
					 * @param enable_rtid 启用rtid，若是，符合RTID格式的字符串将编码为0x83系列的rton值单元
					 * @param is_whole_rton 是否为完整rton，若是，将会为rton首尾附加上RTON-DONE标识，此时json必须为object
					 */
					function encode(
						json: JSON.Value<JS_ValidValue>,
						rton: OByteStreamView,
						enable_string_index: Boolean,
						enable_rtid: Boolean,
						is_whole_rton: Boolean,
					): None;

				}

				/** 解码 */
				namespace Decode {

					/**
					 * 解码
					 * @param rton rton
					 * @param json json
					 * @param is_whole_rton 是否为完整rton，若是，将会识别rton首尾的RTON-DONE标识
					 */
					function decode(
						rton: IByteStreamView,
						json: JSON.Value<JS_ValidValue>,
						is_whole_rton: Boolean,
					): None;

				}

				/** 加密 */
				namespace Encrypt {

					/**
					 * 计算密文数据的大小
					 * @param plain_size 明文数据大小
					 * @returns 密文数据的大小
					 */
					function compute_cipher_size(
						plain_size: Size,
					): Size;

					/**
					 * 加密rton
					 * @param plain 明文数据
					 * @param cipher 密文数据
					 * @param key 密钥
					 */
					function encrypt(
						plain: IByteStreamView,
						cipher: OByteStreamView,
						key: String,
					): None;

				}

				/** 解密 */
				namespace Decrypt {

					/**
					 * 计算明文数据的大小
					 * @param cipher_size 密文数据大小
					 * @returns 明文数据的大小
					 */
					function compute_plain_size(
						cipher_size: Size,
					): Size;

					/**
					 * 解密rton
					 * @param cipher 密文数据
					 * @param plain 明文数据
					 * @param key 密钥
					 */
					function decrypt(
						cipher: IByteStreamView,
						plain: OByteStreamView,
						key: String,
					): None;

				}

			}

			/** PopCap-ZLib（附有原始数据大小信息的ZLib） */
			namespace PopCapZLib {

				/** 压缩 */
				namespace Compress {

					/**
					 * 计算压缩后数据的大小的最大可能值
					 * @param raw_size 
					 * @returns 压缩后数据的大小的最大可能值
					 */
					function compute_ripe_size_bound(
						raw_size: Size,
					): Size;

					/**
					 * 压缩
					 * @param raw 原始数据
					 * @param ripe 压缩后数据
					 * @param level 压缩级别(0-9)
					 */
					function compress(
						raw: IByteStreamView,
						ripe: OByteStreamView,
						level: Size,
					): None;

				}

				/** 解压 */
				namespace Uncompress {

					/**
					 * 计算原始数据的大小
					 * @param ripe 压缩后数据
					 * @returns 原始数据的大小
					 */
					function compute_raw_size(
						ripe: ConstantByteListView,
					): Size;

					/**
					 * 解压
					 * @param ripe 压缩后数据
					 * @param raw 原始数据
					 */
					function uncompress(
						ripe: IByteStreamView,
						raw: OByteStreamView,
					): None;

				}

			}

			/** PvZ1-iOS版RSB中的2x系列纹理 */
			namespace PvZ1RSBTexture20SeriesLayout {

				/** 编码 */
				namespace Encode {

					/**
					 * 编码
					 * @param image 图像
					 * @param data 数据
					 * @param channel 纹理通道
					 */
					function encode(
						image: Image.ConstantBitmapView,
						data: OByteStreamView,
						channel: Image.TextureChannel,
					): None;

				}

				/** 解码 */
				namespace Decode {

					/**
					 * 解码
					 * @param data 数据
					 * @param image 图像
					 * @param channel 纹理通道
					 */
					function decode(
						data: IByteStreamView,
						image: Image.BitmapView,
						channel: Image.TextureChannel,
					): None;

				}

			}

			/** PvZ2-安卓中文版RSB中的纹理alpha映射 */
			namespace PvZ2CHSRSBTextureAlphaIndex {

				type JS_IndexList = Array<JS_IntegerU8>;

				/** 编码 */
				namespace Encode {

					/**
					 * 编码
					 * @param image 图像
					 * @param data 数据
					 * @param index alpha索引
					 */
					function encode(
						image: Image.ConstantBitmapView,
						data: OByteStreamView,
						index: JS_IndexList,
					): None;

				}

				/** 解码 */
				namespace Decode {

					/**
					 * 解码
					 * @param data 数据
					 * @param image 图像
					 * @param index alpha索引
					 */
					function decode(
						data: IByteStreamView,
						image: Image.BitmapView,
						index: JS_IndexList,
					): None;

				}

			}

		}

	}

	/** 系统相关 */
	namespace System {

		// ------------------------------------------------

		/**
		 * 退出程序
		 * @param code 退出状态
		 */
		function exit(
			code: IntegerS,
		): None;

		/**
		 * 休眠一段时间，释放CPU使用
		 * @param time 休眠时间，单位为毫秒
		 */
		function sleep(
			time: Size,
		): None;

		// ------------------------------------------------

		/**
		 * 调用宿主环境的命令处理器
		 * @param command 命令参数
		 */
		function system(
			command: String,
		): IntegerS;

		/**
		 * 执行外部程序
		 * @param path 路径
		 * @param argument 参数
		 */
		function process(
			path: Path,
			argument: StringList,
		): IntegerS;

		// ------------------------------------------------

		/**
		 * 暂停，等待用户响应以继续
		 */
		function pause(
		): None;

		/**
		 * 从输入端（Shell）获取一行字符串
		 * @returns 输入的字符串
		 */
		function input(
		): String;

		/**
		 * 向输出端（Shell）输出文本
		 * @param text 文本
		 */
		function output(
			text: String,
		): None;

		// ------------------------------------------------

		namespace Windows {

			// ------------------------------------------------

			/** 标准句柄名称 */
			type JS_StandardHandleName = 'input' | 'output' | 'error';

			// ------------------------------------------------

			/**
			 * 获取当前控制台模式
			 * @param handle_name 句柄名称，参见 {@link JS_StandardHandleName}
			 * @returns 模式
			 */
			function get_standard_console_mode(
				handle_name: String,
			): IntegerU32;

			/**
			 * 设置当前控制台模式
			 * @param handle_name 句柄名称，参见 {@link JS_StandardHandleName}
			 * @param mode 模式
			 */
			function set_standard_console_mode(
				handle_name: String,
				mode: IntegerU32,
			): None;

			// ------------------------------------------------

			/**
			 * 弹出文件选择对话框，要求用户选择任意文件或目录
			 * @param pick_folder 是否选择目录
			 * @param multiple 是否允许多选
			 * @returns 选中的文件路径
			 */
			function select_file_by_dialog(
				pick_folder: Boolean,
				multiple: Boolean,
			): PathList;

			// ------------------------------------------------

		}

		namespace Linux {

			const _;

		}

		// ------------------------------------------------

	}

	// ------------------------------------------------

	/** 其他 */
	namespace _Detail {

		// ------------------------------------------------

		/**
		 * 执行脚本
		 * @param script 脚本
		 * @returns 计算值
		 */
		function evaluate(
			script: ConstantCharacterListView,
			name: String,
		): any;

		// ------------------------------------------------
		// ByteListView <-> CharacterListView

		function cast_ByteListView_to_CharacterListView(
			t: ByteListView,
		): CharacterListView;

		function cast_CharacterListView_to_ByteListView(
			t: CharacterListView,
		): ByteListView;

		// ------------------------------------------------
		// String -> CharacterListView

		function cast_String_to_CharacterListView(
			t: String,
		): CharacterListView;

		// ------------------------------------------------
		// String -> ByteArray

		function cast_moveable_String_to_ByteArray(
			t: String,
		): ByteArray;

		// ------------------------------------------------
		// CharacterListView -> JS_String

		function cast_CharacterListView_to_JS_String(
			t: CharacterListView,
		): JS_String;

		// ------------------------------------------------

	}

	// ------------------------------------------------

	/** 主函数；返回值为null时，表示执行成功，为string时，表示执行失败，返回值为错误信息 */
	type JS_MainFunction = (
		/** 脚本路径；若不以文件形式运行脚本，则为null */
		script_path: null | string,
		/** 启动参数 */
		argument: Array<string>,
	) => null | string;

	// ------------------------------------------------

}
