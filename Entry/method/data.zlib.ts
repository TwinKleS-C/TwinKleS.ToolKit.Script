/**
 * + data.zlib.compress ZLib 压缩
 * + data.zlib.uncompress ZLib 解压
 */
namespace TwinKleS.Entry.method.data.zlib {

	// ------------------------------------------------

	type Config = {
	};

	export function _injector(
		config: Config,
	) {
		g_executor_method.push(
			Executor.method_of({
				id: 'data.zlib.compress',
				description: 'ZLib 压缩',
				worker(a: Entry.CFSA & {
					raw_file: string;
					ripe_file: string | '?default' | '?input';
					level: CoreX.Tool.Data.Compress.ZLib.CompressionLevel;
				}) {
					let raw_file: string;
					let ripe_file: string;
					let level: CoreX.Tool.Data.Compress.ZLib.CompressionLevel;
					{
						raw_file = a.raw_file;
						ripe_file = ArgumentParser.path(a.ripe_file, {
							input_message: '请输入输出路径',
							default_value: raw_file.replace(/()?$/i, '.zlib_ripe.bin'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
						level = a.level;
					}
					CoreX.Tool.Data.Compress.ZLib.compress_fs(raw_file, ripe_file, level);
					Output.i(`输出路径：${ripe_file}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					raw_file: undefined!,
					ripe_file: '?default',
					level: 9n,
				},
				input_filter: Entry.file_system_path_test_generator([['file', null]]),
				input_forwarder: 'raw_file',
			}),
			Executor.method_of({
				id: 'data.zlib.uncompress',
				description: 'ZLib 解压',
				worker(a: Entry.CFSA & {
					ripe_file: string;
					raw_file: string | '?default' | '?input';
					raw_data_buffer_size: string | '?input';
				}) {
					let ripe_file: string;
					let raw_file: string;
					let raw_data_buffer_size: bigint;
					{
						ripe_file = a.ripe_file;
						raw_file = ArgumentParser.path(a.raw_file, {
							input_message: '请输入输出路径',
							default_value: ripe_file.replace(/()?$/i, '.zlib_raw.bin'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
						if (a.raw_data_buffer_size === '?input') {
							raw_data_buffer_size = Input.size(`请输入用于保存原始数据的内存空间大小`)!;
						} else {
							raw_data_buffer_size = parse_size_string(a.raw_data_buffer_size);
						}
					}
					CoreX.Tool.Data.Compress.ZLib.uncompress_fs(ripe_file, raw_file, raw_data_buffer_size);
					Output.i(`输出路径：${raw_file}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					ripe_file: undefined!,
					raw_file: '?default',
					raw_data_buffer_size: '?input',
				},
				input_filter: Entry.file_system_path_test_generator([['file', null]]),
				input_forwarder: 'ripe_file',
			}),
		);
	}

	// ------------------------------------------------

}

({
	injector: TwinKleS.Entry.method.data.zlib._injector,
});