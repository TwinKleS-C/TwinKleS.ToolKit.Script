/**
 * + package.popcap_pak.pack PopCap-PAK 打包
 * + package.popcap_pak.unpack PopCap-PAK 解包
 * + package.popcap_pak.unpack_resource PopCap-PAK 资源解包
 * + package.popcap_pak.pack_resource PopCap-PAK 资源打包
 * + package.popcap_pak.crypt PopCap-PAK 加解密
 */
namespace TwinKleS.Entry.method.package_.popcap_pak {

	// ------------------------------------------------

	type Config = {
		pack_buffer_size: string | '?input';
	};

	export function _injector(
		config: Config,
	) {
		g_executor_method.push(
			Executor.method_of({
				id: 'package.popcap_pak.pack',
				description: 'PopCap-PAK 打包',
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
							default_value: package_directory.replace(/((\.pak)(\.package))?$/i, '.pak'),
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
					CoreX.Tool.Package.PopCapPAK.pack_fs(package_file, manifest_file, resource_directory, package_data_buffer_size);
					Output.i(`输出路径：${package_file}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					package_directory: undefined!,
					package_file: '?default',
					package_data_buffer_size: config.pack_buffer_size,
				},
				input_filter: Entry.file_system_path_test_generator([['directory', /.+(\.pak)(\.package)$/i]]),
				input_forwarder: 'package_directory',
			}),
			Executor.method_of({
				id: 'package.popcap_pak.unpack',
				description: 'PopCap-PAK 解包',
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
							default_value: package_file.replace(/((\.pak))?$/i, '.pak.package'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
					}
					let manifest_file = `${package_directory}/manifest.json`;
					let resource_directory = `${package_directory}/resource`;
					CoreX.Tool.Package.PopCapPAK.unpack_fs(package_file, manifest_file, resource_directory);
					Output.i(`输出路径：${package_directory}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					package_file: undefined!,
					package_directory: '?default',
				},
				input_filter: Entry.file_system_path_test_generator([['file', /.+(\.pak)$/i]]),
				input_forwarder: 'package_file',
			}),
			Executor.method_of({
				id: 'package.popcap_pak.unpack_resource',
				description: 'PopCap-PAK 资源解包',
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
							default_value: package_file.replace(/((\.pak))?$/i, '.pak.resource'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
					}
					CoreX.Tool.Package.PopCapPAK.unpack_fs(package_file, null, resource_directory);
					Output.i(`输出路径：${resource_directory}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					package_file: undefined!,
					resource_directory: '?default',
				},
				input_filter: Entry.file_system_path_test_generator([['file', /.+(\.pak)$/i]]),
				input_forwarder: 'package_file',
			}),
			Executor.method_of({
				id: 'package.popcap_pak.pack_resource',
				description: 'PopCap-PAK 资源打包',
				worker(a: Entry.CFSA & {
					resource_directory: string;
					package_file: string | '?default' | '?input';
				}) {
					let resource_directory: string;
					let package_file: string;
					{
						resource_directory = a.resource_directory;
						package_file = ArgumentParser.path(a.package_file, {
							input_message: '请输入输出路径',
							default_value: resource_directory.replace(/((\.pak)(\.resource))?$/i, '.pak'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
					}
					let package_data = Support.PopCapPAK.ResourcePack.pack(resource_directory);
					CoreX.FileSystem.write_file(package_file, package_data[0].view().sub_view(Core.Size.value(0n), package_data[1]));
					Output.i(`输出路径：${package_file}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					resource_directory: undefined!,
					package_file: '?default',
				},
				input_filter: Entry.file_system_path_test_generator([['directory', /.+(\.pak)(\.resource)$/i]]),
				input_forwarder: 'resource_directory',
			}),
			Executor.method_of({
				id: 'package.popcap_pak.crypt',
				description: 'PopCap-PAK 加解密',
				worker(a: Entry.CFSA & {
					plain_file: string;
					cipher_file: string | '?default' | '?input';
				}) {
					let plain_file: string;
					let cipher_file: string;
					{
						plain_file = a.plain_file;
						cipher_file = ArgumentParser.path(a.cipher_file, {
							input_message: '请输入输出路径',
							default_value: plain_file.replace(/((\.pak))?$/i, '.xor.pak'),
							must_exist: false,
							if_exist: a.fs_if_exist,
						});
					}
					CoreX.Tool.Data.Encrypt.XOR.crypt_fs(plain_file, cipher_file, 0xF7n);
					Output.i(`输出路径：${cipher_file}`);
				},
				default_argument: {
					...Entry.k_cfsa,
					plain_file: undefined!,
					cipher_file: '?default',
				},
				input_filter: Entry.file_system_path_test_generator([['file', /.+(\.pak)$/i]]),
				input_forwarder: 'plain_file',
			}),
		);
	}

	// ------------------------------------------------

}

({
	injector: TwinKleS.Entry.method.package_.popcap_pak._injector,
});