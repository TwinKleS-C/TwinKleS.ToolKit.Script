/**
 * + package.popcap_rsgp.pack PopCap-RSGP 打包
 * + package.popcap_rsgp.unpack PopCap-RSGP 解包
 * + package.popcap_rsgp.unpack_resource PopCap-RSGP 资源解包
 */
namespace TwinKleS.Entry.method.package_.popcap_rsgp {

	// ------------------------------------------------

	type Config = {
		pack_buffer_size: string | '?input';
	};

	export function _injector(
		config: Config,
	) {
		g_executor_method.push(
			Executor.method_of({
				id: 'package.popcap_rsgp.pack',
				description: 'PopCap-RSGP 打包',
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
							default_value: package_directory.replace(/((\.rsgp)(\.package))?$/i, '.rsgp'),
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
					let resource_directory = `${package_directory}/resource`;
					CoreX.Tool.Package.PopCapRSGP.pack_fs(package_file, manifest_file, resource_directory, package_data_buffer_size);
					Output.i(`输出路径：${package_file}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					package_directory: undefined!,
					package_file: '?default',
					package_data_buffer_size: config.pack_buffer_size,
				},
				input_filter: Entry.file_system_path_test_generator([['directory', /.+(\.rsgp)(\.package)$/i]]),
				input_forwarder: 'package_directory',
			}),
			Executor.method_of({
				id: 'package.popcap_rsgp.unpack',
				description: 'PopCap-RSGP 解包',
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
							default_value: package_file.replace(/((\.rsgp))?$/i, '.rsgp.package'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
					}
					let manifest_file = `${package_directory}/manifest.json`;
					let resource_directory = `${package_directory}/resource`;
					CoreX.Tool.Package.PopCapRSGP.unpack_fs(package_file, manifest_file, resource_directory);
					Output.i(`输出路径：${package_directory}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					package_file: undefined!,
					package_directory: '?default',
				},
				input_filter: Entry.file_system_path_test_generator([['file', /.+(\.rsgp)$/i]]),
				input_forwarder: 'package_file',
			}),
			Executor.method_of({
				id: 'package.popcap_rsgp.unpack_resource',
				description: 'PopCap-RSGP 资源解包',
				worker(a: Entry.CFSA & {
					package_file: string;
					resource_directory: string | '?default' | '?input';
				}) {
					let package_file: string;
					let resource_directory: string;
					{
						package_file = a.package_file;
						resource_directory = ArgumentParser.path(a.resource_directory, {
							input_message: '请输入输出路径',
							default_value: package_file.replace(/((\.rsgp))?$/i, '.rsgp.resource'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
					}
					CoreX.Tool.Package.PopCapRSGP.unpack_fs(package_file, null, resource_directory);
					Output.i(`输出路径：${resource_directory}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					package_file: undefined!,
					resource_directory: '?default',
				},
				input_filter: Entry.file_system_path_test_generator([['file', /.+(\.rsgp)$/i]]),
				input_forwarder: 'package_file',
			}),
		);
	}

	// ------------------------------------------------

}

({
	injector: TwinKleS.Entry.method.package_.popcap_rsgp._injector,
});