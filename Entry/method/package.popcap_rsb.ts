/**
 * + package.popcap_rsb.pack PopCap-RSB 打包
 * + package.popcap_rsb.unpack PopCap-RSB 解包
 * + package.popcap_rsb.extract_resource PopCap-RSB 资源提取
 */
namespace TwinKleS.Entry.method.package_.popcap_rsb {

	// ------------------------------------------------

	const RSBPackAndUnpackModeE = [
		'group',
		'subgroup',
		'resource',
	] as const;

	type RSBPackAndUnpackMode = typeof RSBPackAndUnpackModeE[number];

	function make_rsb_package_relative_path(
		mode: RSBPackAndUnpackMode,
	) {
		let result: {
			resource_directory: string;
			packet_file: string;
			packet_manifest_file: string;
		};
		switch (mode) {
			case 'group': {
				result = {
					resource_directory: 'group/{0}/{1}/resource',
					packet_file: 'group/{0}/{1}/packet.rsgp',
					packet_manifest_file: 'group/{0}/{1}/manifest.json',
				};
				break;
			}
			case 'subgroup': {
				result = {
					resource_directory: 'subgroup/{1}/resource',
					packet_file: 'subgroup/{1}/packet.rsgp',
					packet_manifest_file: 'subgroup/{1}/manifest.json',
				};
				break;
			}
			case 'resource': {
				result = {
					resource_directory: 'resource',
					packet_file: 'packet/{1}.rsgp',
					packet_manifest_file: 'packet/{1}.json',
				};
				break;
			}
		}
		return result;
	}

	// ------------------------------------------------

	type ResourceExtractOption = {
		json: boolean | '?input';
		json_crypt: boolean | '?input';
		json_crypt_key: string | '?input';
		image: boolean | '?input';
		image_texture_format_map_list: Record<string, Support.PvZ2.RSB.ResourceExtract.TextureFormatMap>;
		image_texture_format_map_name: string | '?input';
		image_atlas: boolean | '?input';
		image_atlas_resize: boolean | '?input';
		image_sprite: boolean | '?input';
		animation: boolean | '?input';
		animation_json: boolean | '?input';
		animation_flash: boolean | '?input';
		audio: boolean | '?input';
		audio_tool: {
			ffmpeg: string;
			ww2ogg: string;
			ww2ogg_pcb: string;
		};
	};

	// ------------------------------------------------

	type Config = {
		pack_buffer_size: string | '?input';
		resource_extract_option: ResourceExtractOption;
	};

	export function _injector(
		config: Config,
	) {
		g_executor_method.push(
			Executor.method_of({
				id: 'package.popcap_rsb.pack',
				description: 'PopCap-RSB 打包',
				worker(a: Entry.CFSA & {
					package_directory: string;
					package_file: string | '?default' | '?input';
					mode: RSBPackAndUnpackMode | '?input';
					package_data_buffer_size: string | '?input';
					input_packet: boolean | '?input';
					output_new_packet: boolean | '?input';
				}) {
					let package_directory: string;
					let package_file: string;
					let mode: RSBPackAndUnpackMode;
					let package_data_buffer_size: bigint;
					let input_packet: boolean;
					let output_new_packet: boolean;
					{
						package_directory = a.package_directory;
						package_file = ArgumentParser.path(a.package_file, {
							input_message: '请输入输出路径',
							default_value: package_directory.replace(/((\.rsb)(\.package))?$/i, '.rsb'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
						if (a.mode === '?input') {
							mode = RSBPackAndUnpackModeE[
								Input.number([
									`请选择数据导入模式`, [
										`1. 群组：按群+子群树形结构导入，资源与子包均导入自group/<群名>/<子群名>目录`,
										`2. 子群：按子群树形结构导入，资源与子包均导入自subgroup/<子群名>目录`,
										`3. 资源：所有资源导入自resource目录，所有子包导入自packet目录`,
									]
								], Check.enum_checkerx([1, 2, 3]))! as 1 | 2 | 3
								- 1
							];
						} else {
							mode = a.mode;
						}
						if (a.package_data_buffer_size === '?input') {
							package_data_buffer_size = Input.size(`请输入用于保存包数据输出的内存空间大小`)!;
						} else {
							package_data_buffer_size = parse_size_string(a.package_data_buffer_size);
						}
						if (a.input_packet === '?input') {
							input_packet = Input.yon(`是否使用已有子包`)!;
						} else {
							input_packet = a.input_packet;
						}
						if (a.output_new_packet === '?input') {
							output_new_packet = Input.yon(`是否导出新打包的子包（导出至对应模式下的子包文件路径，会覆盖原有子包文件）`)!;
						} else {
							output_new_packet = a.output_new_packet;
						}
					}
					let relative_path = make_rsb_package_relative_path(mode);
					let manifest_file = `${package_directory}/manifest.json`;
					let resource_manifest_file = `${package_directory}/resource_manifest.json`;
					let resource_directory = `${package_directory}/${relative_path.resource_directory}`;
					let packet_file = !input_packet ? null : `${package_directory}/${relative_path.packet_file}`;
					let new_packet_file = !output_new_packet ? null : `${package_directory}/${relative_path.packet_file}`;
					CoreX.Tool.Package.PopCapRSB.pack_fs(package_file, manifest_file, resource_manifest_file, resource_directory, packet_file, new_packet_file, package_data_buffer_size);
					Output.i(`输出路径：${package_file}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					package_directory: undefined!,
					package_file: '?default',
					mode: '?input',
					package_data_buffer_size: config.pack_buffer_size,
					input_packet: '?input',
					output_new_packet: '?input',
				},
				input_filter: Entry.file_system_path_test_generator([['directory', /.+(\.rsb)(\.package)$/i]]),
				input_forwarder: 'package_directory',
			}),
			Executor.method_of({
				id: 'package.popcap_rsb.unpack',
				description: 'PopCap-RSB 解包',
				worker(a: Entry.CFSA & {
					package_file: string;
					package_directory: string | '?default' | '?input';
					mode: RSBPackAndUnpackMode | '?input';
					output_resource: boolean | '?input';
					output_packet: boolean | '?input';
				}) {
					let package_file: string;
					let package_directory: string;
					let mode: RSBPackAndUnpackMode;
					let output_resource: boolean;
					let output_packet: boolean;
					{
						package_file = a.package_file;
						package_directory = ArgumentParser.path(a.package_directory, {
							input_message: '请输入输出路径',
							default_value: package_file.replace(/((\.rsb))?$/i, '.rsb.package'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
						if (a.mode === '?input') {
							mode = RSBPackAndUnpackModeE[
								Input.number([
									`请选择数据导出模式`, [
										`1. 群组：按群+子群树形结构导出，资源与子包均导出至group/<群名>/<子群名>目录`,
										`2. 子群：按子群树形结构导出，资源与子包均导出至subgroup/<子群名>目录`,
										`3. 资源：所有资源导出至resource目录，所有子包导出至packet目录`,
									]
								], Check.enum_checkerx([1, 2, 3]))! as 1 | 2 | 3
								- 1
							];
						} else {
							mode = a.mode;
						}
						if (a.output_resource === '?input') {
							output_resource = Input.yon(`是否导出资源`)!;
						} else {
							output_resource = a.output_resource;
						}
						if (a.output_packet === '?input') {
							output_packet = Input.yon(`是否导出子包`)!;
						} else {
							output_packet = a.output_packet;
						}
					}
					let relative_path = make_rsb_package_relative_path(mode);
					let manifest_file = `${package_directory}/manifest.json`;
					let resource_manifest_file = `${package_directory}/resource_manifest.json`;
					let resource_directory = !output_resource ? null : `${package_directory}/${relative_path.resource_directory}`;
					let packet_file = !output_packet ? null : `${package_directory}/${relative_path.packet_file}`;
					CoreX.Tool.Package.PopCapRSB.unpack_fs(package_file, manifest_file, resource_manifest_file, resource_directory, packet_file);
					Output.i(`输出路径：${package_directory}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					package_file: undefined!,
					package_directory: '?default',
					mode: '?input',
					output_resource: '?input',
					output_packet: '?input',
				},
				input_filter: Entry.file_system_path_test_generator([['file', /.+(\.rsb)$/i]]),
				input_forwarder: 'package_file',
			}),
			Executor.method_of({
				id: 'package.popcap_rsb.extract_resource',
				description: 'PopCap-RSB 资源提取',
				worker(a: Entry.CFSA & {
					package_file: string;
					package_directory: string | '?default' | '?input';
					option: ResourceExtractOption;
				}) {
					let package_file: string;
					let package_directory: string;
					let option: Support.PvZ2.RSB.ResourceExtract.Option = {
						json: null,
						image: null,
						animation: null,
						audio: null,
					};
					{
						package_file = a.package_file;
						package_directory = ArgumentParser.path(a.package_directory, {
							input_message: '请输入输出路径',
							default_value: package_file.replace(/((\.rsb))?$/i, '.rsb.extract'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
						let extract_directory = `${package_directory}/extract`;
						{
							let json: boolean;
							if (a.option.json === '?input') {
								json = Input.yon(`是否提取JSON`)!;
							} else {
								json = a.option.json;
							}
							if (json) {
								option.json = {
									directory: extract_directory,
									crypt: null,
								};
								let crypt: boolean;
								if (a.option.json_crypt === '?input') {
									crypt = Input.yon(`RTON是否已被加密`)!;
								} else {
									crypt = a.option.json_crypt;
								}
								if (crypt) {
									let key: string;
									if (a.option.json_crypt_key === '?input') {
										key = Input.string(`请输入RTON密钥`)!;
									} else {
										key = a.option.json_crypt_key;
									}
									option.json.crypt = {
										key: key,
									};
								}
							}
						}
						{
							let image: boolean;
							if (a.option.image === '?input') {
								image = Input.yon(`是否提取图像`)!;
							} else {
								image = a.option.image;
							}
							if (image) {
								option.image = {
									directory: extract_directory,
									texture_format_map: null!,
									atlas: null,
									sprite: null,
								};
								{
									let map_name_list = Object.keys(a.option.image_texture_format_map_list);
									if (map_name_list.length === 0) {
										throw new MyError(`texture format map list is empty`);
									}
									if (a.option.image_texture_format_map_name === '?input') {
										let map_name_index = Input.number([
											`请选择所应用的纹理格式`, map_name_list.map((e, i) => (`${i + 1}. ${e}`))
										], Check.enum_checkerx(map_name_list.map((e, i) => (i + 1))))!;
										option.image.texture_format_map = a.option.image_texture_format_map_list[map_name_list[map_name_index - 1]];
									} else {
										if (a.option.image_texture_format_map_list[a.option.image_texture_format_map_name] === undefined) {
											throw new MyError(`texture format map not found : ${a.option.image_texture_format_map_name}`);
										}
										option.image.texture_format_map = a.option.image_texture_format_map_list[a.option.image_texture_format_map_name];
									}
								}
								let atlas: boolean;
								if (a.option.image_atlas === '?input') {
									atlas = Input.yon(`是否提取图像Atlas`)!;
								} else {
									atlas = a.option.image_atlas;
								}
								let sprite: boolean;
								if (a.option.image_sprite === '?input') {
									sprite = Input.yon(`是否提取图像Sprite（分解Atlas）`)!;
								} else {
									sprite = a.option.image_sprite;
								}
								if (atlas) {
									let resize: boolean;
									if (a.option.image_atlas_resize === '?input') {
										resize = Input.yon(`是否调整Atlas尺寸（以资源清单内的定义为准）`)!;
									} else {
										resize = a.option.image_atlas_resize;
									}
									option.image.atlas = {
										resize: resize,
									};
								}
								if (sprite) {
									option.image.sprite = {};
								}
							}
						}
						{
							let animation: boolean;
							if (a.option.animation === '?input') {
								animation = Input.yon(`是否提取动画`)!;
							} else {
								animation = a.option.animation;
							}
							if (animation) {
								option.animation = {
									directory: extract_directory,
									json: null,
									flash: null,
								};
								let json: boolean;
								if (a.option.animation_json === '?input') {
									json = Input.yon(`是否提取动画为JSON`)!;
								} else {
									json = a.option.animation_json;
								}
								let flash: boolean;
								if (a.option.animation_flash === '?input') {
									flash = Input.yon(`是否提取动画为Flash`)!;
								} else {
									flash = a.option.animation_flash;
								}
								if (json) {
									option.animation.json = {};
								}
								if (flash) {
									option.animation.flash = {};
								}
							}
						}
						{
							let audio: boolean;
							if (a.option.audio === '?input') {
								audio = Input.yon(`是否提取音频`)!;
							} else {
								audio = a.option.audio;
							}
							if (audio) {
								option.audio = {
									directory: extract_directory,
									tool: {
										ffmpeg: Main.path_at_home(a.option.audio_tool.ffmpeg),
										ww2ogg: Main.path_at_home(a.option.audio_tool.ww2ogg),
										ww2ogg_pcb: Main.path_at_home(a.option.audio_tool.ww2ogg_pcb),
									},
									temp_directory: `${package_directory}/audio_temp`,
								};
							}
						}
					}
					Support.PvZ2.RSB.ResourceExtract.extract_package(
						package_file,
						`${package_directory}/manifest.json`,
						`${package_directory}/resource_manifest.json`,
						`${package_directory}/resource`,
						option,
					);
					CoreX.FileSystem.remove(`${package_directory}/audio_temp`);
					Output.i(`输出路径：${package_directory}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					package_file: undefined!,
					package_directory: '?default',
					option: config.resource_extract_option,
				},
				input_filter: Entry.file_system_path_test_generator([['file', /.+(\.rsb)$/i]]),
				input_forwarder: 'package_file',
			}),
		);
	}

	// ------------------------------------------------

}

({
	injector: TwinKleS.Entry.method.package_.popcap_rsb._injector,
});