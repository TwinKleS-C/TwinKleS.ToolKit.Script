/** 路径处理工具集 */
namespace TwinKleS.PathUtility {

	// ------------------------------------------------

	/**
	 * 转换路径字符串内的层级分隔符
	 * @param source 源串
	 * @returns 转换结果
	 */
	export function convert_delimiter(
		source: string,
		delimiter: string = '/',
	): string {
		return source.replaceAll(/[\\\/]/g, delimiter);
	}

	/**
	 * 将路径字符串转换为常规路径字符串（仅以/作为层级分隔符）
	 * @param source 源串
	 * @returns 常规路径字符串
	 */
	export function to_regular(
		source: string,
	): string {
		return source.replaceAll('\\', '/');
	}

	// ------------------------------------------------

	/**
	 * 将路径字符串按/分割层级
	 * @param source 源串
	 * @returns 层级数组
	 */
	export function split(
		source: string,
	): Array<string> {
		return to_regular(source).split('/');
	}

	/**
	 * 将路径字符串分割为父目录与名称组成的元组
	 * @param source 源串
	 * @returns 父目录与名称组成的元组；若无父路径，则以null占位
	 */
	export function split_pair(
		source: string,
	): [null | string, string] {
		let list = split(source);
		return [list.length === 1 ? null : list.slice(0, -1).join('/'), list[list.length - 1]];
	}

	/**
	 * 将路径字符串分割为名称与拓展名组成的元组
	 * @param source 源串
	 * @returns 名称与拓展名组成的元组；若无拓展名，则以null占位
	 */
	export function split_extension(
		source: string,
	): [string, null | string] {
		let regular_source = to_regular(source);
		let i = regular_source.lastIndexOf('.');
		if (i === -1) {
			return [regular_source, null];
		} else {
			return [regular_source.slice(0, i), regular_source.slice(i + 1)];
		}
	}

	// ------------------------------------------------

	/** 表示文件与目录组成的树形结构 */
	export type Tree = { [key: string]: null | Tree; };

	/**
	 * 将路径字符串列表转换为树形结构
	 * @param source 源串
	 * @returns 树形结构
	 */
	export function to_tree(
		source: Array<string>,
	): Tree {
		let tree: Tree = {};
		let list = source.map(split);
		for (let path of list) {
			let current = tree;
			for (let i in path) {
				let e = path[i];
				let is_file_name = parseInt(i) === path.length - 1;
				if (current[e] === undefined) {
					current[e] = is_file_name ? null : {};
					current = current[e]!;
				} else {
					if (current[e] === null) {
						throw new MyError(`file is exist : ${e}, ${path.join('/')}`);
					} else {
						if (is_file_name) {
							throw new MyError(`directory is exist : ${e}, ${path.join('/')}`);
						}
						current = current[e]!;
					}
				}
			}
		}
		return tree;
	}

	// ------------------------------------------------

}