/** PvZ2文本表版本转换 */
namespace TwinKleS.Support.PvZ2.LawnStringText {

	// ------------------------------------------------

	/** 文本版本 */
	export const VersionE = [
		'text',      // 文本形式，早期版本（6.?及之前）
		'json_map',  // JSON键值对形式，中期版本
		'json_list', // JSON数组形式，当前版本
	] as const;

	/** 文本版本 */
	export type Version = typeof VersionE[number];

	// ------------------------------------------------

	export function convert(
		source_data: ArrayBuffer,
		source_version: Version | 'auto',
		dest_version: Version,
	): ArrayBuffer {
		let string_map: Record<string, string> = {};
		let actual_source_version: Version;
		let source_map: Record<string, string> | null = null;
		let source_list: Array<string> | null = null;
		if (source_version === 'auto') {
			try {
				let source = CoreX.JSON.read(source_data).value as any;
				let source_variant = source?.objects[0]?.objdata?.LocStringValues;
				if (typeof source_variant !== 'object') {
					throw new MyError(`invalid source`);
				}
				if (source_variant instanceof Array) {
					source_list = source_variant;
					actual_source_version = 'json_list';
				} else {
					source_map = source_variant;
					actual_source_version = 'json_map';
				}
			} catch (e: any) {
				actual_source_version = 'text';
			}
		} else {
			actual_source_version = source_version;
		}
		switch (actual_source_version) {
			case 'text': {
				let source_text = Core._Detail.cast_CharacterListView_to_JS_String(Core._Detail.cast_ByteListView_to_CharacterListView(Core.ByteListView.value(source_data)));
				let key_regexp = /^\[.+\]$/gm;
				let value_regexp = /(.|[\n\r])*?(?=[\n\r]*?(\[|$))/gy;
				let key_match: RegExpExecArray | null;
				let value_match: RegExpExecArray | null;
				while ((key_match = key_regexp.exec(source_text)) !== null) {
					value_regexp.lastIndex = key_regexp.lastIndex + 1;
					value_match = value_regexp.exec(source_text)!;
					string_map[key_match[0].slice(1, -1)] = value_match[0];
					key_regexp.lastIndex = value_regexp.lastIndex;
				}
				break;
			}
			case 'json_map': {
				if (source_map === null) {
					let source = CoreX.JSON.read(source_data).value as any;
					source_map = source?.objects[0]?.objdata?.LocStringValues as Record<string, string>;
					if (typeof source_map !== 'object' || source_map instanceof Array) {
						throw new MyError(`invalid source`);
					}
				}
				for (let key in source_map) {
					if (typeof source_map[key] !== 'string') {
						throw new MyError(`invalid map element`);
					}
					string_map[key] = source_map[key];
				}
				break;
			}
			case 'json_list': {
				if (source_list === null) {
					let source = CoreX.JSON.read(source_data).value as any;
					source_list = source?.objects[0]?.objdata?.LocStringValues as Array<string>;
					if (typeof source_list !== 'object' || !(source_list instanceof Array)) {
						throw new MyError(`invalid source`);
					}
				}
				if (source_list.length % 2 !== 0) {
					throw new MyError(`invalid list size`);
				}
				for (let i = 0; i < source_list.length; i += 2) {
					let key = source_list[i + 0];
					let value = source_list[i + 1];
					if (typeof key !== 'string' || typeof value !== 'string') {
						throw new MyError(`invalid list element`);
					}
					string_map[source_list[i]] = source_list[i + 1];
				}
				break;
			}
		}
		let dest_data: ArrayBuffer;
		switch (dest_version) {
			case 'text': {
				let dest_text: Array<string> = [];
				for (let key in string_map) {
					dest_text.push(`[${key}]\n${string_map[key]}\n`);
				}
				dest_data = Core._Detail.cast_moveable_String_to_ByteArray(Core.String.value(dest_text.join('\n'))).release();
				break;
			}
			case 'json_map': {
				let dest = {
					"version": 1n,
					"objects": [
						{
							"aliases": [
								"LawnStringsData"
							],
							"objclass": "LawnStringsData",
							"objdata": {
								"LocStringValues": string_map
							}
						}
					]
				};
				dest_data = Core.ByteArray.value(CoreX.JSON.write_js(dest)).release();
				break;
			}
			case 'json_list': {
				let dest = {
					"version": 1n,
					"objects": [
						{
							"aliases": [
								"LawnStringsData"
							],
							"objclass": "LawnStringsData",
							"objdata": {
								"LocStringValues": (() => {
									let dest_list: Array<string> = [];
									for (let key in string_map) {
										dest_list.push(key);
										dest_list.push(string_map[key]);
									}
									return dest_list;
								})()
							}
						}
					]
				};
				dest_data = Core.ByteArray.value(CoreX.JSON.write_js(dest)).release();
				break;
			}
		}
		return dest_data;
	}

	// ------------------------------------------------

	export function convert_fs(
		source_file: string,
		dest_file: string,
		source_version: Version | 'auto',
		dest_version: Version,
	): void {
		let source_data = CoreX.FileSystem.read_file(source_file);
		let dest_data = convert(source_data.value, source_version, dest_version);
		CoreX.FileSystem.write_file(dest_file, dest_data);
		return;
	}

	// ------------------------------------------------

}
