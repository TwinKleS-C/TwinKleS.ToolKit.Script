/**
 * + other.popcap_zlib.compress PopCap-ZLib 压缩
 * + other.popcap_zlib.uncompress PopCap-ZLib 解压
 * + other.popcap_zlib.compress.batch [批处理] PopCap-ZLib 压缩
 * + other.popcap_zlib.uncompress.batch [批处理] PopCap-ZLib 解压
 */
namespace TwinKleS.Entry.method.other.popcap_zlib {

	// ------------------------------------------------

	type Config = {
	};

	export function _injector(
		config: Config,
	) {
		g_executor_method.push(
			Executor.method_of({
				id: 'other.popcap_zlib.compress',
				description: 'PopCap-ZLib 压缩',
				worker(a: Entry.CFSA & {
					raw_file: string;
					ripe_file: string | '?default' | '?input';
				}) {
					let raw_file: string;
					let ripe_file: string;
					{
						raw_file = a.raw_file;
						ripe_file = ArgumentParser.path(a.ripe_file, {
							input_message: '请输入输出路径',
							default_value: raw_file.replace(/()?$/i, '.popcap_zlib_ripe.bin'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
					}
					CoreX.Tool.Other.PopCapZLib.compress_fs(raw_file, ripe_file);
					Output.i(`输出路径：${ripe_file}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					raw_file: undefined!,
					ripe_file: '?default',
				},
				input_filter: Entry.file_system_path_test_generator([['file', null]]),
				input_forwarder: 'raw_file',
			}),
			Executor.method_of({
				id: 'other.popcap_zlib.uncompress',
				description: 'PopCap-ZLib 解压',
				worker(a: Entry.CFSA & {
					ripe_file: string;
					raw_file: string | '?default' | '?input';
				}) {
					let ripe_file: string;
					let raw_file: string;
					{
						ripe_file = a.ripe_file;
						raw_file = ArgumentParser.path(a.raw_file, {
							input_message: '请输入输出路径',
							default_value: ripe_file.replace(/()?$/i, '.popcap_zlib_raw.bin'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
					}
					CoreX.Tool.Other.PopCapZLib.uncompress_fs(ripe_file, raw_file);
					Output.i(`输出路径：${raw_file}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					ripe_file: undefined!,
					raw_file: '?default',
				},
				input_filter: Entry.file_system_path_test_generator([['file', null]]),
				input_forwarder: 'ripe_file',
			}),
		);
		g_executor_method_of_batch.push(
			Executor.method_of({
				id: 'other.popcap_zlib.compress.batch',
				description: '[批处理] PopCap-ZLib 压缩',
				worker(a: Entry.CFSA & {
					raw_file_directory: string;
					ripe_file_directory: string | '?default' | '?input';
				}) {
					let raw_file_directory: string;
					let ripe_file_directory: string;
					{
						raw_file_directory = a.raw_file_directory;
						ripe_file_directory = ArgumentParser.path(a.ripe_file_directory, {
							input_message: '请输入输出路径',
							default_value: raw_file_directory.replace(/$/i, '.popcap_zlib_compress'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
					}
					simple_batch_execute(
						raw_file_directory,
						['file', null],
						(item) => {
							let raw_file = `${raw_file_directory}/${item}`;
							let ripe_file = `${ripe_file_directory}/${item}`;
							CoreX.Tool.Other.PopCapZLib.compress_fs(raw_file, ripe_file);
						},
					);
					Output.i(`输出路径：${ripe_file_directory}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					raw_file_directory: undefined!,
					ripe_file_directory: '?default',
				},
				input_filter: Entry.file_system_path_test_generator([['directory', null]]),
				input_forwarder: 'raw_file_directory',
			}),
			Executor.method_of({
				id: 'other.popcap_zlib.uncompress.batch',
				description: '[批处理] PopCap-ZLib 解压',
				worker(a: Entry.CFSA & {
					ripe_file_directory: string;
					raw_file_directory: string | '?default' | '?input';
				}) {
					let ripe_file_directory: string;
					let raw_file_directory: string;
					{
						ripe_file_directory = a.ripe_file_directory;
						raw_file_directory = ArgumentParser.path(a.raw_file_directory, {
							input_message: '请输入输出路径',
							default_value: ripe_file_directory.replace(/$/i, '.popcap_zlib_uncompress'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
					}
					simple_batch_execute(
						ripe_file_directory,
						['file', null],
						(item) => {
							let ripe_file = `${ripe_file_directory}/${item}`;
							let raw_file = `${raw_file_directory}/${item}`;
							CoreX.Tool.Other.PopCapZLib.uncompress_fs(ripe_file, raw_file);
						},
					);
					Output.i(`输出路径：${raw_file_directory}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					ripe_file_directory: undefined!,
					raw_file_directory: '?default',
				},
				input_filter: Entry.file_system_path_test_generator([['directory', null]]),
				input_forwarder: 'ripe_file_directory',
			}),
		);
	}

	// ------------------------------------------------

}

({
	injector: TwinKleS.Entry.method.other.popcap_zlib._injector,
});