/**
 * + audio.wwise_sound_bank.pack Wwise-Sound-Bank 打包
 * + audio.wwise_sound_bank.unpack Wwise-Sound-Bank 解包
 * + audio.wwise_sound_bank.pack.batch [批处理] Wwise-Sound-Bank 打包
 * + audio.wwise_sound_bank.unpack.batch [批处理] Wwise-Sound-Bank 解包
 */
namespace TwinKleS.Entry.method.audio.wwise_sound_bank {

	// ------------------------------------------------

	type Config = {
		pack_buffer_size: string | '?input';
	};

	export function _injector(
		config: Config,
	) {
		g_executor_method.push(
			Executor.method_of({
				id: 'audio.wwise_sound_bank.pack',
				description: 'Wwise-Sound-Bank 打包',
				worker(a: Entry.CFSA & {
					package_directory: string;
					package_file: string | '?default' | '?input';
					package_data_buffer_size: string | '?input';
				}) {
					let package_directory: string;
					let package_file: string;
					let package_data_buffer_size: bigint;
					{
						package_directory = a.package_directory;
						package_file = ArgumentParser.path(a.package_file, {
							input_message: '请输入输出路径',
							default_value: package_directory.replace(/((\.bnk)(\.package))?$/i, '.bnk'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
						if (a.package_data_buffer_size === '?input') {
							package_data_buffer_size = Input.size(`请输入用于保存包数据输出的内存空间大小`)!;
						} else {
							package_data_buffer_size = parse_size_string(a.package_data_buffer_size);
						}
					}
					let manifest_file = `${package_directory}/manifest.json`;
					let extra_directory = `${package_directory}`;
					CoreX.Tool.Audio.WwiseSoundBank.pack_fs(package_file, manifest_file, extra_directory, package_data_buffer_size);
					Output.i(`输出路径：${package_file}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					package_directory: undefined!,
					package_file: '?default',
					package_data_buffer_size: config.pack_buffer_size,
				},
				input_filter: Entry.file_system_path_test_generator([['directory', /.+(\.bnk)(\.package)$/i]]),
				input_forwarder: 'package_directory',
			}),
			Executor.method_of({
				id: 'audio.wwise_sound_bank.unpack',
				description: 'Wwise-Sound-Bank 解包',
				worker(a: Entry.CFSA & {
					package_file: string;
					package_directory: string | '?default' | '?input';
				}) {
					let package_file: string;
					let package_directory: string;
					{
						package_file = a.package_file;
						package_directory = ArgumentParser.path(a.package_directory, {
							input_message: '请输入输出路径',
							default_value: package_file.replace(/((\.bnk))?$/i, '.bnk.package'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
					}
					let manifest_file = `${package_directory}/manifest.json`;
					let extra_directory = `${package_directory}`;
					CoreX.Tool.Audio.WwiseSoundBank.unpack_fs(package_file, manifest_file, extra_directory);
					Output.i(`输出路径：${package_directory}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					package_file: undefined!,
					package_directory: '?default',
				},
				input_filter: Entry.file_system_path_test_generator([['file', /.+(\.bnk)$/i]]),
				input_forwarder: 'package_file',
			}),
		);
		g_executor_method_of_batch.push(
			Executor.method_of({
				id: 'audio.wwise_sound_bank.pack.batch',
				description: '[批处理] Wwise-Sound-Bank 打包',
				worker(a: Entry.CFSA & {
					package_directory_directory: string;
					package_file_directory: string | '?default' | '?input';
					package_data_buffer_size: string | '?input';
				}) {
					let package_directory_directory: string;
					let package_file_directory: string;
					let package_data_buffer_size: bigint;
					{
						package_directory_directory = a.package_directory_directory;
						package_file_directory = ArgumentParser.path(a.package_file_directory, {
							input_message: '请输入输出路径',
							default_value: package_directory_directory.replace(/$/i, '.bnk_pack'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
						if (a.package_data_buffer_size === '?input') {
							package_data_buffer_size = Input.size(`请输入用于保存包数据输出的内存空间大小`)!;
						} else {
							package_data_buffer_size = parse_size_string(a.package_data_buffer_size);
						}
					}
					let package_data_buffer = Core.ByteArray.alloc(Core.Size.value(package_data_buffer_size));
					simple_batch_execute(
						package_directory_directory,
						['directory', /.+(\.bnk)(\.package)$/i],
						(item) => {
							let package_directory = `${package_directory_directory}/${item}`;
							let package_file = `${package_file_directory}/${item.slice(0, -8)}`;
							let manifest_file = `${package_directory}/manifest.json`;
							let extra_directory = `${package_directory}`;
							CoreX.Tool.Audio.WwiseSoundBank.pack_fs(package_file, manifest_file, extra_directory, package_data_buffer.view());
						},
					);
					Output.i(`输出路径：${package_file_directory}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					package_directory_directory: undefined!,
					package_file_directory: '?default',
					package_data_buffer_size: config.pack_buffer_size,
				},
				input_filter: Entry.file_system_path_test_generator([['directory', null]]),
				input_forwarder: 'package_directory_directory',
			}),
			Executor.method_of({
				id: 'audio.wwise_sound_bank.unpack.batch',
				description: '[批处理] Wwise-Sound-Bank 解包',
				worker(a: Entry.CFSA & {
					package_file_directory: string;
					package_directory_directory: string | '?default' | '?input';
				}) {
					let package_file_directory: string;
					let package_directory_directory: string;
					{
						package_file_directory = a.package_file_directory;
						package_directory_directory = ArgumentParser.path(a.package_directory_directory, {
							input_message: '请输入输出路径',
							default_value: package_file_directory.replace(/$/i, '.bnk_unpack'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
					}
					simple_batch_execute(
						package_file_directory,
						['file', /.+(\.bnk)$/i],
						(item) => {
							let package_file = `${package_file_directory}/${item}`;
							let package_directory = `${package_directory_directory}/${item}.package`;
							let manifest_file = `${package_directory}/manifest.json`;
							let extra_directory = `${package_directory}`;
							CoreX.Tool.Audio.WwiseSoundBank.unpack_fs(package_file, manifest_file, extra_directory);
						},
					);
					Output.i(`输出路径：${package_directory_directory}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					package_file_directory: undefined!,
					package_directory_directory: '?default',
				},
				input_filter: Entry.file_system_path_test_generator([['directory', null]]),
				input_forwarder: 'package_file_directory',
			}),
		);
	}

	// ------------------------------------------------

}

({
	injector: TwinKleS.Entry.method.audio.wwise_sound_bank._injector,
});