/** PopCap-PAK资源打包 */
namespace TwinKleS.Support.PopCapPAK.ResourcePack {

	// ------------------------------------------------

	/**
	 * 将资源目录内的所有文件打包为PopCap-PAK数据包
	 * @param resource_directory 资源目录
	 * @returns 数据包数据
	 */
	export function pack(
		resource_directory: string,
	): [Core.ByteArray, Core.Size] {
		let resource_list = CoreX.FileSystem.list_file(resource_directory);
		Output.v(`共${resource_list.length}个资源文件`);
		let manifest_js: Core.Tool.Package.PopCapPAK.Information.JS_N.Package = {
			version: 0n,
			resource: [],
		};
		let package_size_bound = 0;
		package_size_bound += 8; // header size
		package_size_bound += 1; // space
		package_size_bound += 4; // unknown block
		for (let resource of resource_list) {
			manifest_js.resource.push({
				path: resource,
				time: 0n,
			});
			let resource_size = CoreX.FileSystem.file_size(`${resource_directory}/${resource}`);
			package_size_bound += (resource.length + 2) + 6 + 10 + (5 + Number(resource_size) + 128); // resource path + resource path information + resource data information + resource data
		}
		Output.i(`开始打包 ...`);
		let package_data = Core.ByteArray.alloc(Core.Size.value(BigInt(package_size_bound)));
		let package_stream = Core.ByteStreamView.look(package_data.view());
		let manifest = Core.Tool.Package.PopCapPAK.Information.Package.json(Core.JSON.Value.value(manifest_js));
		Core.Tool.Package.PopCapPAK.Pack.pack(package_stream, manifest, Core.Path.value(resource_directory));
		Output.i(`完成`);
		return [package_data, package_stream.position()];
	}

	// ------------------------------------------------

}